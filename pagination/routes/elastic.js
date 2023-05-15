/* Initialize the objects */
const express = require('express');
const got = require('./got');
const router = express.Router();

// route blank request match
router.get('/', async function (req, res, next) {

    // read the mode from query string 
    const now = new Date()
    const mode = (req.query.mode ? req.query.mode : 'realtime')

    // get the last read datetime
    var lastFetchDate = await got.getLastFetchDate("elastic." + req.query.type + "." + mode)
    console.log("Elastic FetchDate:" + lastFetchDate)

    // If the mode is history, check if the history time stamp is atleast 30 min away
    if (mode == "history") {
        const timediff = (new Date(lastFetchDate)).getTime() - (new Date(now.toISOString())).getTime()
        if (Math.abs(timediff) > 30*60*1000) {
            now.setHours(now.getHours() + parseInt(process.env.ARBNCO_HISTORY_TIMESPAN))
            lastFetchDate = now.toISOString()
        }
    }

    // Set the index name based on the type "microshare"/"spaceti"/"arbnco"
    let host = '';
    if (req.query.type === 'arbnco') {
        host = process.env.ElASTIC_URL + '/arbnco-nexus-ncg-staging-events/_search?sort=@timestamp';
    } else if (req.query.type === 'spaceti') {
        host = process.env.ElASTIC_URL + '/spaceti-nexus-ncg-staging-events/_search?sort=@timestamp';
    } else if (req.query.type === 'microshare') {
        host = process.env.ElASTIC_URL + '/microshare-nexus-ncg-staging-events/_search?sort=@timestamp';
    }

    // set the page number and page size
    const size = parseInt(req.query.pageSize ? req.query.pageSize : '100');
    const number = parseInt(req.query.pageNumber ? req.query.pageNumber : '1');

    // set up the url to crawl
    const url = host + '&size=' + size //+ '&from=' + number;
    console.log("url:" + url)

    // set the authorization headers
    const header = {"Authorization": "Basic " + process.env.ELASTIC_TOKEN};
    const response = await got.getwithbody(url, header, {"query":{"range": {"@timestamp": {"gte":lastFetchDate.replace(/(\r\n|\n|\r)/gm, '')}}}} )
    const result = response.body;

    // keep crawling until we get a non 200 response or the number of items is not equal to the page size
    if (response.statusCode === 200 && result.hits.hits.length == size) {
        console.log("Size:" + result.hits.hits.length)
        res.set('Link', 'http://localhost:3000/elastic?mode=' + mode + '&pageSize=' + size + '&type=' + req.query.type + '&pageNumber=' + (number+1))
    } else {
        res.set('Link', '');
    }
    
    // no error, lets create the timestamped file - We want to write only if the fetch date is not passed through the querystring
    if (result.hits.hits.length > 0) {
        lastFetchDate = result.hits.hits[result.hits.hits.length-1]['_source']["@timestamp"]
    }

    // write the response
    res.json(result)

    // no error, lets create the timestamped file
    got.setLastFetchDate("elastic." + req.query.type + "." + mode, lastFetchDate)
});

// route match for adhoc history
router.get('/adhochistory', async function (req, res, next) {

    // set the mode, its always adhochistory
    const now = new Date()
    const mode = 'adhochistory'

    // get the last read datetime
    var lastFetchDate = await got.getLastFetchDate("elastic." + req.query.type + "." + mode)
    lastFetchDate = lastFetchDate.replace(/(\r\n|\n|\r)/gm, '')
    console.log("Elastic FetchDate:" + lastFetchDate)

    // If the mode is history, check if the history time stamp is atleast 30 min away
    const timediff = (new Date(lastFetchDate)).getTime() - (new Date(now.toISOString())).getTime()
    if (timediff < 0) {
        // Set the index name based on the type "microshare"/"spaceti"/"arbnco"
        let host = '';
        if (req.query.type === 'arbnco') {
            host = process.env.ElASTIC_URL + '/arbnco-nexus-ncg-staging-events/_search?sort=@timestamp';
        } else if (req.query.type === 'spaceti') {
            host = process.env.ElASTIC_URL + '/spaceti-nexus-ncg-staging-events/_search?sort=@timestamp';
        } else if (req.query.type === 'microshare') {
            host = process.env.ElASTIC_URL + '/microshare-nexus-ncg-staging-events/_search?sort=@timestamp';
        }

        // set the page number and page size
        const size = parseInt(req.query.pageSize ? req.query.pageSize : '100');
        const number = parseInt(req.query.pageNumber ? req.query.pageNumber : '1');

        // set up the url to crawl
        const url = host + '&size=' + size //+ '&from=' + number;
        console.log("url:" + url)

        // set the authorization headers
        const header = {"Authorization": "Basic " + process.env.ELASTIC_TOKEN};
        const response = await got.getwithbody(url, header, {"query":{"range": {"@timestamp": {"gte":lastFetchDate.replace(/(\r\n|\n|\r)/gm, '')}}}} )
        if (response != null) {

            // keep crawling until we get a non 200 response or the number of items is not equal to the page size
            const result = response.body;
            if (response.statusCode === 200 && result.hits.hits.length > 0 && parseInt(number) < 3) {
                res.set('Link', 'http://localhost:3000/elastic/adhochistory?mode=' + mode + '&pageSize=' + size + '&type=' + req.query.type + '&pageNumber=' + (number+1))
            } else {
                res.set('Link', '');
            }

            // no error, lets create the timestamped file - We want to write only if the fetch date is not passed through the querystring
            if (result.hits.hits.length > 0) {
                lastFetchDate = result.hits.hits[result.hits.hits.length-1]['_source']["@timestamp"]
            }
            res.json(result);

            // no error, lets create the timestamped file
            got.setLastFetchDate("elastic." + req.query.type + "." + mode, lastFetchDate)

            return
        }
    }

    // if reached here, we probabaly exhausted all the pages and no more pages to crawl
    res.set('Link', '')
    res.json([]);
    now.setYear(2050)
    lastFetchDate = now.toISOString()
    got.setLastFetchDate("elastic." + req.query.type + "." + mode, lastFetchDate)
});


module.exports = router;
