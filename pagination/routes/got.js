const fs = require("fs");
const got = require('got');

const get = async (url, header) => {
    try {
    	const response = await got(url, {
            headers: header
        });
        return response;
    } catch (error) {
        console.log(error.response.body);
    }
};

const getwithbody = async (url, header, bodyjson) => {
    try {
    	const response = await got.post(url, {
    		headers: header,
            json: bodyjson,
			responseType: 'json'
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

const post = async (url, options) => {
    try {
    	const {body} = await got.post(url, {
	        json: options,
			responseType: 'json'
		});
		return body;
    } catch (error) {
        console.log(error.response.body);
    }
};

const setLastFetchDate  = async (platform, lastfetchdate) => {
	const now = new Date()
	const fileName = platform + ".lastread"
	try {
		if (lastfetchdate === null) lastfetchdate = now.toISOString()
		fs.writeFileSync(fileName, lastfetchdate);
	} catch (err) {
		console.error(err)
	}
}

const getLastFetchDate  = async (platform) => {
	const now = new Date()
	const fileName = platform + ".lastread"
	try {
		const data = fs.readFileSync(fileName, {encoding:'utf8', flag:'r'})
		return data
	} catch(err) {
		//console.error(err)
		return now.toISOString()
	}
}

module.exports.get = get;
module.exports.setLastFetchDate = setLastFetchDate;
module.exports.getLastFetchDate = getLastFetchDate;
module.exports.getwithbody = getwithbody;
module.exports.post = post;
