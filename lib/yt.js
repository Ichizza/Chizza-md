const axios = require("axios");
const cheerio = require("cheerio");

async function yt(linkk) {
  return new Promise(async(resolve, reject) => {
    const {data} = await axios.get("https://easysave.net/ytmp4/#url=" + linkk, {
      headers: {
  cookie: "PHPSESSID=82114b9aa4fd2b7f4b1d399269796db0; pll_language=en; _gid=GA1.2.1434943369.1665844140; _gat_gtag_UA_186343763_1=1; _ga_89JXKDVYKN=GS1.1.1665844140.1.0.1665844140.0.0.0; _ga=GA1.1.2006129509.1665844140"
      }
  })
  
  let s = cheerio.load(data)
  let token = s("#token").attr("value")
  
  const {data: rsty} = await axios("https://easysave.net/wp-json/aio-dl/video-data/", {method: "post", data: {
      url: linkk,
      token: token
  }, headers: {
  cookie: "PHPSESSID=82114b9aa4fd2b7f4b1d399269796db0; pll_language=en; _gid=GA1.2.1434943369.1665844140; _gat_gtag_UA_186343763_1=1; _ga_89JXKDVYKN=GS1.1.1665844140.1.0.1665844140.0.0.0; _ga=GA1.1.2006129509.1665844140"
  }})
  //console.log(s("#mylink").attr("href"))
  
        resolve({
          title: rsty.title,
          size: rsty.medias[1].formattedSize,
          quality: rsty.medias[1].quality,
          url: rsty.medias[1].url,
          thumb: rsty.thumbnail
        });
     
  });
}




module.exports = {
yt
}
