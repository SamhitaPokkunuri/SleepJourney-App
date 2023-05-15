/* Initialize the objects */
const envfile = require('envfile');
const fs = require('fs');
const express = require('express');
const got = require('./got');
const router = express.Router();

// route blank request match
router.get('/', async function (req, res, next) {
    // Get the authorization token
    await authorize()

    // read the mode from query string 
    const now = new Date()
    const mode = (req.query.mode ? req.query.mode : 'realtime')

    // read the timestamp as a stop filter
    var lastFetchDate = await got.getLastFetchDate("microshare." + req.query.type + "." + mode)
    lastFetchDate = lastFetchDate.replace(/(\r\n|\n|\r)/gm, '')

    // If the mode is history, check if the history time stamp is atleast 30 min away
    if (mode == "history") {
        const timediff = (new Date(lastFetchDate)).getTime() - (new Date(now.toISOString())).getTime()
        console.log(timediff)
        if (Math.abs(timediff) > 30*60*1000) {
            now.setHours(now.getHours() + parseInt(process.env.MICROSHARE_HISTORY_TIMESPAN))
            lastFetchDate = now.toISOString()
        }
    }

    // see if the fetchdate is passed in the querystring
    // if (req.query.fetchdate != null) {
    //	lastFetchDate = req.query.fetchdate
    // }
    //console.log("FetchDatE:" + lastFetchDate)

    // set the api url host based on the request type
    let host = process.env.MICROSHARE_URL_ENV;
    if (req.query.type === 'environment') {
        host = process.env.MICROSHARE_URL_ENV;
    } else if (req.query.type === 'leak') {
        host = process.env.MICROSHARE_URL_LEAK;
    } else if (req.query.type === 'openclose') {
        host = process.env.MICROSHARE_URL_OPENCLOSE;
    } else if (req.query.type === 'current') {
        host = process.env.MICROSHARE_URL_CURRENT;
    } else if (req.query.type === 'occupancy') {
        host = process.env.MICROSHARE_URL_OCCUP;
    }

    // time diff between current datetime and last fetch time
    const timediff = (new Date(lastFetchDate)).getTime() - (new Date(now.toISOString())).getTime()

    // If the request is the first time, set the right page number
    var number = (req.query.pageNumber ? req.query.pageNumber : '1')
    var url = host + '&perPage=' + (req.query.pageSize ? req.query.pageSize : '100') + '&page=' + number;
    console.log(url)

    // set the authorization headers
    const header = {"Authorization": "Bearer " + process.env.MICROSHARE_TOKEN};
    var response = null
    var startpage = (req.query.startpage ? req.query.startpage : '1')

    // if the request is first time from the filebeat and not from the next page request
    if (req.query.firsttime != null) {
        var pagefound = false
        var pagelimit = ((Math.floor(Math.abs(timediff)/(1000*60*60*24))) * 100)/500
        var startpage = 1
      
        // loop through the pages until the last fetch datatime stamp matches, so that we dont have to process all the records
        for (let i = 1; i < 1000; i++) {
            url = host + '&perPage=' + (req.query.pageSize ? req.query.pageSize : '100') + '&page=' + i;
            console.log(url)
            var response = await got.get(url, header)
            var result = JSON.parse(response.body)
            if (result.objs.length > 0) {
                for (var obj in result.objs) {
                    //console.log(result.objs[obj].createDate  + "-" + lastFetchDate)
                    if (result.objs[obj].createDate > lastFetchDate) {
                        pagefound = true
                        number = i
                        startpage = i
                        break;
                    }
                }
            } else {
                pagefound = true
            }

            // If the page is found or result set empty, break out
            if (pagefound) break
        }
    }

    // apply the pagination logic based the params from filebeat
    response = await got.get(url, header)
    if (req.query.pageNumber < 50) {
        res.set('Link', 'http://localhost:3000/microshare?mode=' + mode + '&pageSize=' + req.query.pageSize + '&type=' + req.query.type + '&fetchdate=' + lastFetchDate.replace(/(\r\n|\n|\r)/gm, '') + '&pageNumber=' + (parseInt(req.query.pageNumber) + 1))
    }
    var result = JSON.parse(response.body)

    // This means we have hit the timestamp and we should stop pagination
    if (result.objs.length > 0) {
	    for (var obj in result.objs) {
	    	//console.log(result.objs[obj].createDate  + "-" + lastFetchDate)
	    	if (result.objs[obj].createDate < lastFetchDate) {
	    		res.set('Link', '')
	    		break;
	    	}
	    }
	} else {
		res.set('Link', '')
	}

    res.json(result)

    // no error, lets create the timestamped file - We want to write only if the fetch date is not passed through the querystring
    if (req.query.fetchdate == null) {
    	console.log("added the date")
    	if (result.objs.length > 0) {
    		lastFetchDate = result.objs[result.objs.length-1].createDate
    	}
    	got.setLastFetchDate("microshare." + req.query.type + "." + mode, lastFetchDate)
	}
});

// route match for adhoc history
router.get('/adhochistory', async function (req, res, next) {
    // Get the authorization token
    await authorize()

    // set the mode
    const now = new Date()
    const mode = 'adhochistory'

    // read the timestamp as a stop filter
    var lastFetchDate = await got.getLastFetchDate("microshare." + req.query.type + "." + mode)
    lastFetchDate = lastFetchDate.replace(/(\r\n|\n|\r)/gm, '')

    // If the fetch date is passed in
    //if (req.query.fetchdate != null) {
    //    lastFetchDate = req.query.fetchdate
    //}

    console.log(lastFetchDate)
    // If the mode is history, check if the history time stamp is atleast 30 min away
    const timediff = (new Date(lastFetchDate)).getTime() - (new Date(now.toISOString())).getTime()
    if (timediff < 0) {

        // set the api url host based on the request type
        let host = process.env.MICROSHARE_URL_ENV;
        if (req.query.type === 'environment') {
            host = process.env.MICROSHARE_URL_ENV;
        } else if (req.query.type === 'leak') {
            host = process.env.MICROSHARE_URL_LEAK;
        } else if (req.query.type === 'openclose') {
            host = process.env.MICROSHARE_URL_OPENCLOSE;
        } else if (req.query.type === 'current') {
            host = process.env.MICROSHARE_URL_CURRENT;
        } else if (req.query.type === 'occupancy') {
            host = process.env.MICROSHARE_URL_OCCUP;
        }

        // If the request is the first time, set the right page number
        var number = (req.query.pageNumber ? req.query.pageNumber : '1')
        var url = host + '&sort=createDate&perPage=' + (req.query.pageSize ? req.query.pageSize : '100') + '&page=' + number;

        // set the authorization headers
        const header = {"Authorization": "Bearer " + process.env.MICROSHARE_TOKEN};
        var response = null
        var startpage = (req.query.startpage ? req.query.startpage : '1')

        // if the request is first time from the filebeat and not from the next page request
        if (req.query.firsttime != null) {
            var pagefound = false
            var pagelimit = ((Math.floor(Math.abs(timediff)/(1000*60*60*24))) * 100)/500
            var startpage = 1
          
            // loop through the pages until the last fetch datatime stamp matches, so that we dont have to process all the records
            for (let i = 1; i < 1000; i++) {
                url = host + '&sort=createDate&perPage=' + (req.query.pageSize ? req.query.pageSize : '100') + '&page=' + i;
                console.log(url)
                var response = await got.get(url, header)
                var result = JSON.parse(response.body)
                if (result.objs.length > 0) {
                    for (var obj in result.objs) {
                        //console.log(result.objs[obj].createDate  + "-" + lastFetchDate)
                        if (result.objs[obj].createDate > lastFetchDate) {
                            pagefound = true
                            number = i
                            startpage = i
                            break;
                        }
                    }
                } else {
                    pagefound = true
                }

                // If the page is found or result set empty, break out
                if (pagefound) break
            }
        }

        // apply the pagination logic based the params from filebeat
        response = await got.get(url, header)
        var result = JSON.parse(response.body)

        // Dont crawl too many pages as it might loadup logstash and servers
        if ((parseInt(number) - parseInt(startpage)) < 2) {
            res.set('Link', 'http://localhost:3000/microshare/adhochistory?startpage=' + startpage + '&mode=' + mode + '&pageSize=' + req.query.pageSize + '&type=' + req.query.type + '&pageNumber=' + (parseInt(number) + 1))
        } else {
            res.set('Link', '')
        }

        // set the lastread date time stamp
        if (result.objs.length > 0) {
            lastFetchDate = result.objs[result.objs.length-1].createDate
        } else {
            res.set('Link', '')
        }

        res.json(result)

        // no error, lets create the timestamped file
        got.setLastFetchDate("microshare." + req.query.type + "." + mode, lastFetchDate)

        return
    }

    // if reached here, we probabaly exhausted all the pages and no more pages to crawl
    res.set('Link', '')
    res.json([]);
    now.setYear(2050)
    lastFetchDate = now.toISOString()
    got.setLastFetchDate("microshare." + req.query.type + "." + mode, lastFetchDate)
});

// function to authorize the user
const authorize = async () => {
    const currentTime = Math.floor(Date.now() / 1000)
    if (currentTime > process.env.MICROSHARE_TOKEN_TIMESTAMP) {
        await microshareLogin();
    }
}

// function to get the access token using the login and password
const microshareLogin = async () => {
    console.log("login with username/password")
    body = await got.post(process.env.MICROSHARE_URL_AUTH, {
        username: 'chrisn@thenetworkcontrolgroup.com',
        password: 'ZESS_veak8scin!plup',
        client_id: '1261E397-AF85-473F-8A84-C76CF7E3B167',
        grant_type: 'password',
        scope: 'ALL:ALL'
    });
    const data = fs.readFileSync(".env", {encoding: 'utf8', flag: 'r'})
    const envdata = envfile.parse(data)
    envdata.MICROSHARE_TOKEN = body.access_token;
    envdata.MICROSHARE_TOKEN_TIMESTAMP = Math.floor(Date.now() / 1000) + parseInt(body.expires_in);
    fs.writeFileSync(".env", envfile.stringify(envdata));
    process.env.MICROSHARE_TOKEN = body.access_token;
    process.env.MICROSHARE_TOKEN_TIMESTAMP = envdata.MICROSHARE_TOKEN_TIMESTAMP;
    return body.access_token
}

// function to get the access token using the refresh token
const microshareRefreshTokenLogin = async (refreshtoken) => {
    let body = null
    if (refreshtoken) {
        console.log("login with refreshtoken")
        body = await got.post(process.env.MICROSHARE_URL_AUTH, {
            refresh_token: refreshtoken,
            client_id: '1261E397-AF85-473F-8A84-C76CF7E3B167',
            grant_type: 'refresh_token',
            scope: 'ALL:ALL'
        });

        if (body) {
            fs.writeFileSync("microshare.token", JSON.stringify(body))
            return body.access_token
        } else {
            return await microshareLogin()
        }
    }
}

module.exports = router;
