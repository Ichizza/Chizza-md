const axios = require("axios")
const {ds, crsf, session} = require("./data.json")

exports.instagram = async(link) => {
let l;
const spli = link.split("")
if (spli[spli.length - 1] = "/") {
    l = link
} else {
    l = link + "/"
}
if (l.includes("?")) {
    let s = l.split("/")
    delete s[5]
    l = s.join("/")
}
console.log(l)
const {data} = await axios.get(l + "?__a=1&__d=dis",  {headers: {
    accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "id,ja;q=0.9,en-US;q=0.8,en;q=0.7",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
    cookie: `csrftoken=${crsf}; ds_user_id=${ds}; sessionid=${session};`

}})
/*console.log(JSON.parse(JSON.stringify(data)))
console.log(data.items[0].video_versions)*/
let u = []
for (i of data.items) {
if (i.carousel_media) {
for (o of i.carousel_media) {
    if (o.video_versions) {
        u.push({url: o.video_versions[0].url, type: "video"})
       } else {
           u.push({url: o.image_versions2.candidates[0].url, type: "image"})
         //  u.push(data.items.length)
       }
}
} else {
if (i.video_versions) {
 u.push({url: i.video_versions[0].url, type: "video"})
} else {
   u.push({url: i.image_versions2.candidates[0].url, type: "image"})
   // u.push(data.items.length)
}
}
}
let cap;
if (data.items[0].caption == null) {
    cap = ""
} else {
cap = data.items[0].caption.text

}
let p = {user: data.items[0].user.full_name, caption: cap, data: u}
console.log(p)
  return p
}

