const axios = require("axios")

exports.fb2 = async(url) => {
const {data} = await axios('https://ssyoutube.com/api/convert', {method: "POST", data: `url=${url}`})
return data
}
