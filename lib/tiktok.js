const axios = require('axios');
const cheerio = require('cheerio');

exports.create = async(link) =>{
const {data: get} = await axios("https://ssstik.io/abc?url=dl", {method: "POST", data: `id=${link}`})
let $ = cheerio.load(get)
let ps5 = $(".pure-button").attr("href")
console.log(ps5)
return ps5
} 

