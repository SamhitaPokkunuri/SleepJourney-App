
/* Initialize the objects */
const express = require('express');
const router = express.Router();
const got = require('./got');

// route blank request match
router.get('/', async function (req, res, next) {

    // Authorization header
    const header = {"Authorization": process.env.ARBNCO_TOKEN};

    // If the type is passed as query string param it's deployments or else its realtime/history.
    if (req.query.type) {
        // API url of arbnco deployment 
        var url = process.env.ARBNCO_URL_DEPLOYMENT;

        // Replace the SiteID with the ID passed from the filebeat 
        url = url.replace("{{SITEID}}", req.query.SITEID) + '?per_page=1000'

        // send the request
        const response = await got.get(url, header)
        let body = JSON.parse(response.body)

        // write out the response
        res.json(body);
    } else {

        // get the mode
        const now = new Date()
        const mode = (req.query.mode ? req.query.mode : 'realtime')

        // get the last read datetime
        var lastFetchDate = await got.getLastFetchDate("arbnco." + mode)
        lastFetchDate = lastFetchDate.replace(/(\r\n|\n|\r)/gm, '')
        console.log("Last Fetch: " + lastFetchDate)

        // If the mode is history, check if the history time stamp is atleast 30 min away
        if (mode == "history") {
            const timediff = (new Date(lastFetchDate)).getTime() - (new Date(now.toISOString())).getTime()
            console.log(timediff)
            if (Math.abs(timediff) > 30 * 60 * 1000) {
                now.setHours(now.getHours() + parseInt(process.env.ARBNCO_HISTORY_TIMESPAN))
                lastFetchDate = now.toISOString()
            }
        }

        // Take few min off to make sure all events are recorded
        const lfDate = new Date(lastFetchDate)
        lfDate.setMinutes(lfDate.getMinutes() - 10)
        var newlastFetchDate = lfDate.toISOString()
        console.log("New Fetch Date:" + newlastFetchDate)

        // add the params to the API URL & replace the SITEID with the ID passed from filebeat
        var url = process.env.ARBNCO_URL + '&per_page=' + (req.query.pageSize ? req.query.pageSize : '500') + '&page=1&from=' + newlastFetchDate;
        url = url.replace("{{SITEID}}", req.query.SITEID)
        console.log(url)
        
        // send the request
        const response = await got.get(url, header);
        const result = JSON.parse(response.body)
        var keys = Object.keys(result.data);

        // get the datatime of the last record from the response. This will be written to the lastread file, 
        // so that next time the process runs, it will use the new set datetime
        if (keys.length > 0) {
            lastFetchDate = (new Date(keys[keys.length - 1])).toISOString();
        }
        console.log(lastFetchDate)
        const body = JSON.parse(response.body);

        // make sure to set the next page link, if the number of records more than the pagesize or else stop the progression
        //if (req.query.pageNumber < body['total_pages']) {
        if (body['total_records'] > 500) {
            console.log("Setting up next page")
            res.set('Link', 'http://localhost:3000/arbnco?mode=' + mode + '&pageSize=' + body['page_size'] + '&SITEID=' + req.query.SITEID + '&pageNumber=' + (parseInt(req.query.pageNumber) + 1))
        } else {
            res.set('Link', '')
        }
        res.json(body);

        // no error, lets create the timestamped file
        got.setLastFetchDate("arbnco." + mode, lastFetchDate)
    }
});

// route match for adhoc history
router.get('/adhochistory', async function (req, res, next) {

    // Authorization header
    const header = {"Authorization": process.env.ARBNCO_TOKEN};
    const now = new Date()
    const mode = 'adhochistory'

    // get the last read datetime
    var lastFetchDate = await got.getLastFetchDate("arbnco." + mode)
    lastFetchDate = lastFetchDate.replace(/(\r\n|\n|\r)/gm, '')
    console.log("Last Fetch: " + lastFetchDate)

    // If the mode is history, check if the history time stamp is atleast 30 min away
    const timediff = (new Date(lastFetchDate)).getTime() - (new Date(now.toISOString())).getTime()
    if (timediff < 0) {
        // add the params to the API URL & replace the SITEID with the ID passed from filebeat
        var url = process.env.ARBNCO_URL + '&per_page=' + (req.query.pageSize ? req.query.pageSize : '500') + '&page=1&from=' + lastFetchDate;
        url = url.replace("{{SITEID}}", req.query.SITEID)
        console.log(url)

        // send the request
        const response = await got.get(url, header);
        if (response != null) {

            // make sure the number of records exist, if not set the lastread datetime to sometime in the distance future so it will 
            // not run again, until we change the lastread datetime in the file
            const result = JSON.parse(response.body)
            var keys = Object.keys(result.data);
            console.log(result)
            if (keys.length > 0) {
                lastFetchDate = (new Date(keys[keys.length-1])).toISOString();
            } else {
                now.setYear(2050)
                lastFetchDate = now.toISOString()
                got.setLastFetchDate("arbnco." + mode, lastFetchDate)
                return
            }

            console.log(lastFetchDate)
            const body = JSON.parse(response.body);
            const number = (req.query.pageNumber ? req.query.pageNumber : '1')

            // Dont crawl too many pages as it might loadup logstash and servers
            //if (req.query.pageNumber < body['total_pages']) {
            if (keys.length != 0 && parseInt(number) <= 3) {
                console.log("Setting up next page")
                res.set('Link', 'http://localhost:3000/arbnco/adhochistory?mode=' + mode + '&pageSize=' + body['page_size'] + '&SITEID=' + req.query.SITEID + '&pageNumber='+(parseInt(number)+1))
            } else {
                res.set('Link', '')
            }
            res.json(body);

            // no error, lets create the timestamped file
            got.setLastFetchDate("arbnco." + mode, lastFetchDate)

            return
        }
    }
    
    // if reached here, we probabaly exhausted all the pages and no more pages to crawl
    res.set('Link', '')
    res.json([]);
    now.setYear(2050)
    lastFetchDate = now.toISOString()
    got.setLastFetchDate("arbnco." + mode, lastFetchDate)
});

module.exports = router;
