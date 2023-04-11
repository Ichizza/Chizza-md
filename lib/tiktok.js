const axios = require("axios")
const cheerio = require("cheerio")

exports.tiktok = async(url)=> {
   
    try {
const {data: gts} = await axios.get("https://tikdown.org/id")
let $ = cheerio.load(gts)
let token = $('#download-form > input[type="hidden"]').attr("value")
const {data: rata, headers: head} = await axios.get(`https://tikdown.org/getAjax?url=${url}&_token=${token}`)
let s = cheerio.load(rata.html)
let urls = s("a").toArray()
let hers = s(urls[0]).attr("href")

return hers

} catch (err) {
    console.log(err)
}
}
