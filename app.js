let express = require('express')
const http = require('http')
const app = express()
const httpServer = http.createServer(app)
const qrcode = require('qrcode')
const { resizeImage } = require('./lib/function')
const {exec} = require("child_process") 
global.qr = ' '

app.set('json spaces', 2);
app.use(express.json());
app.get('/', async (req, res, next) => {
    try {
        res.setHeader("content-type", "image/png")
        res.send(await resizeImage(await qrcode.toBuffer(global.qr), 512, 512))
    } catch (error) {
        res.send('err, ' + error.message)
    }
})
app.get('/uptime', async (req, res, next) => {
  const formater = (seconds) => {
          const pad = (s) => {
            return (s < 10 ? "0" : "") + s;
          };
          const hrs = Math.floor(seconds / (60 * 60));
          const mins = Math.floor((seconds % (60 * 60)) / 60);
          const secs = Math.floor(seconds % 60);
          return " " + pad(hrs) + ":" + pad(mins) + ":" + pad(secs);
        };
        const uptime = process.uptime();
res.send({code: 200, pesan: "Tolol Lu!", processUptime: formater(uptime)})
})
app.get('/del', async (req, res, next) => {
    try {
        await require("fs").unlinkSync("ichi.json")
res.redirect("/")
exec("npx pm2 start npm --run 'start:start'")
    } catch (error) {
        res.send('err, ' + error.message)
    }
})

app.get('/restart', async (req, res) => {
    try {
     
res.redirect("/")
exec("npx pm2 restart 0")
    } catch (error) {
        res.send('err, ' + error.message)
    }
})
const qrPrint = (qr) => {
    app.get('/', async (req, res) => {
        res.setHeader("content-type", "image/png")
        res.send(await resizeImage(await qrcode.toBuffer(qr), 512, 512))
    })
}

// Run the server
const PORT = 3000
httpServer.listen(PORT, () => {
    console.log('[INFO] Web api Server on port ' + PORT)
})
