/* Initialize the objects */
const express = require('express');
const router = express.Router();
const got = require('./got');

// route blank request match
router.get('/', async function (req, res, next) {

    // set the authorization headers
    const header = {"Authorization": "Bearer " + process.env.SPACETI_TOKEN};

    // if the type is passed in, it would be for building/deployment
    if (req.query.type) {

        // set the url for either building/deployment
        const url = req.query.type === 'building' ? process.env.SPACETI_URL_BUILDING : (req.query.type === 'deployment' ? process.env.SPACETI_URL_DEPLOYMENT : process.env.SPACETI_URL_BEACON);
        
        // set up the url
        const param = '?per_page=' + (req.query.pageSize ? req.query.pageSize : '') + '&page=' + (req.query.pageNumber ? req.query.pageNumber : '1')
        console.log(url + param)
        
        // get the response
        const response = await got.get(url + param, header)
        let body = JSON.parse(response.body)

        // set the page count
        const pageCount = Math.ceil(response.headers['x-total'] / response.headers['x-per-page']);
        const popArray = body.data

        //loop until all the pages are added the popArray and written to the response
        for (let i = 2; i < (pageCount + 1); i++) {
            const reg = /<([^>]+)>; *rel="next"(?:,|$)/g;
            const match = reg.exec(response.headers.link);
            if (match) {
                let resp = await got.get(match[1], header);
                let resBody = JSON.parse(resp.body);
                resBody.data.forEach((a) => {
                    popArray.push(a)
                })
            }
        }
        res.json({data: popArray});
    } else {
        // set the mode realtime/history
        const now = new Date()
        const mode = (req.query.mode ? req.query.mode : 'realtime')

        // get the last read datetime
        var lastFetchDate = await got.getLastFetchDate("spaceti." + mode)
        lastFetchDate = lastFetchDate.replace(/(\r\n|\n|\r)/gm, '')
        console.log(lastFetchDate)

        // If the mode is history, check if the history time stamp is atleast 30 min away
        if (mode == "history") {
            const timediff = (new Date(lastFetchDate)).getTime() - (new Date(now.toISOString())).getTime()
            console.log(timediff)
            if (Math.abs(timediff) > 30*60*1000) {
                now.setHours(now.getHours() + parseInt(process.env.SPACETI_HISTORY_TIMESPAN))
                lastFetchDate = now.toISOString()
            }
        }

        // set the url for spaceti api
        const url = process.env.SPACETI_URL_BEACON_EVENT + '?per_page=' + (req.query.pageSize ? req.query.pageSize : '500') + '&page=' + (req.query.pageNumber ? req.query.pageNumber : '1') + '&sort_by=event_at&event_at_since=' + lastFetchDate;
        console.log(url)

        // get the response
        const response = await got.get(url, header);
        if (response) {
            const result = JSON.parse(response.body)

            const reg = /<([^>]+)>; *rel="next"(?:,|$)/g;
            const match = reg.exec(response.headers.link);

            // make sure to set the next page link, if the number of records more than the 0 or else stop the progression
            if (match && match.length >= 1) { // && result.data && result.data.length == 500
                res.set('Link', 'http://localhost:3000/spaceti?mode=' + mode + '&pageSize=' + response.headers['x-per-page'] + '&pageNumber=' + (parseInt(response.headers['x-page']) + 1))
            } else {
                res.set('Link', '')
            }

            // if the records exist, lets take the last record datetime stamp and save it for the next read
            if (result.data.length > 0) {
                lastFetchDate = result.data[result.data.length-1].attributes.event_at
            }
            res.json(result);

            // no error, lets create the timestamped file
            got.setLastFetchDate("spaceti." + mode, lastFetchDate)
        } else {
            res.json([]);
        }
    }

});

// route match for adhoc history
router.get('/adhochistory', async function (req, res, next) {

    // set Authorization headers
    const header = {"Authorization": "Bearer " + process.env.SPACETI_TOKEN};

    // set the mode
    const now = new Date()
    const mode = 'adhochistory'

    // read the timestamp as a stop filter
    var lastFetchDate = await got.getLastFetchDate("spaceti." + mode)
    lastFetchDate = lastFetchDate.replace(/(\r\n|\n|\r)/gm, '')
    console.log(lastFetchDate)

    // If the mode is history, check if the history time stamp is atleast 30 min away
    const timediff = (new Date(lastFetchDate)).getTime() - (new Date(now.toISOString())).getTime()
    console.log(timediff)
    if (timediff < 0) {

        // set up the spaceti api url
        const url = process.env.SPACETI_URL_BEACON_EVENT + '?per_page=' + (req.query.pageSize ? req.query.pageSize : '500') + '&page=1&sort_by=event_at&event_at_since=' + lastFetchDate;
        console.log(url)

        // get the response
        const response = await got.get(url, header);
        if (response != null) {

            // parse the json response
            const result = JSON.parse(response.body)
            const reg = /<([^>]+)>; *rel="next"(?:,|$)/g;
            const match = reg.exec(response.headers.link);
            const number = (req.query.pageNumber ? req.query.pageNumber : '1')

            // Dont crawl too many pages as it might loadup logstash and servers
            if (match && match.length >= 1 && parseInt(number) <= 3) { // && result.data && result.data.length == 500
                res.set('Link', 'http://localhost:3000/spaceti/adhochistory?mode=' + mode + '&pageSize=' + response.headers['x-per-page'] + '&pageNumber=' + (parseInt(number) + 1))
            } else {
                res.set('Link', '')
            }

            // if the records exist, lets take the last record datetime stamp and save it for the next read
            if (result.data.length > 0) {
                lastFetchDate = result.data[result.data.length-1].attributes.event_at
            }
            res.json(result);

            // no error, lets create the timestamped file
            got.setLastFetchDate("spaceti." + mode, lastFetchDate)

            return
        }
    }

    // if reached here, we probabaly exhausted all the pages and no more pages to crawl
    res.set('Link', '')
    res.json([]);
    now.setYear(2050)
    lastFetchDate = now.toISOString()
    got.setLastFetchDate("spaceti." + mode, lastFetchDate)
    
});

module.exports = router;
