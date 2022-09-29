/*
Base Baileys-Md By Ichi
Free To Use 
Give Me Credit Please

Don't Sell It!!
*/
 process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
// Module
const {
  downloadContentFromMessage,
  generateWAMessageFromContent,
  proto,
  getDevice
} = require("@adiwajshing/baileys");
const moment = require("moment-timezone");
const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
const { exec, spawn } = require("child_process");
const {
  Sticker,
  createSticker,
  StickerTypes,
} = require("wa-sticker-formatter");
const ffmpeg = require("fluent-ffmpeg");
const xfar = require("xfarr-api");
const hxz = require("hxz-api");
const Carbon = require("unofficial-carbon-now");
const tesseract = require("node-tesseract-ocr");
const yts = require("yt-search");
const translate = require("translate-google");
const anime = require("mal-scraper")

//------------------------------------------------------------------------
// Library

const color = require("../lib/color.js");
const {
  ownerNumber,
  ownerNumberg,
  stickerInfo,
  self,
} = require("../database.json");
const {
  getBuffer,
  getRandom,
  getGroupAdmins,
  runtime,
  sleep,
  short,
  webp2mp4File,
  convert,
  uploadImages,
} = require("../lib/function.js");
const { pinterest, igstalk, igdl, snobg} = require("../lib/scrape.js");
const { ytmp3, ytmp4 } = require("../lib/yt.js");
const ind = require("./ind.js");
const {instagram} = require ("../lib/igpost.js")
//const {fb} = require("../lib/fb")
const {fb2} = require("../lib/fb2")
const {create: tikitoko} = require("../lib/tiktok")
multi = true;
module.exports = async (ichi, msg) => {
  try {
    const time = moment(Date.now())
      .tz("Asia/Jakarta")
      .locale("id")
      .format("DD/MM/YY HH:mm:ss z");
    const ucapan = moment(Date.now())
      .tz("Asia/Jakarta")
      .locale("id")
      .format("a");
    const fromMe = msg.key.fromMe;
    const content = JSON.stringify(msg.message);
    const from = msg.key.remoteJid;
    const type = Object.keys(msg.message)[0];
    const chats =
      type === "conversation" && msg.message.conversation
        ? msg.message.conversation
        : type == "imageMessage" && msg.message.imageMessage.caption
        ? msg.message.imageMessage.caption
        : type == "documentMessage" && msg.message.documentMessage.caption
        ? msg.message.documentMessage.caption
        : type == "videoMessage" && msg.message.videoMessage.caption
        ? msg.message.videoMessage.caption
        : type == "extendedTextMessage" && msg.message.extendedTextMessage.text
        ? msg.message.extendedTextMessage.text
        : type == "buttonsResponseMessage" &&
          msg.message.buttonsResponseMessage.selectedButtonId
        ? msg.message.buttonsResponseMessage.selectedButtonId
        : type == "templateButtonReplyMessage" &&
          msg.message.templateButtonReplyMessage.selectedId
        ? msg.message.templateButtonReplyMessage.selectedId
        : type === "listResponseMessage" &&
          msg.message.listResponseMessage.title
        ? msg.message.listResponseMessage.title
        : "";
    const cmd =
      type === "listResponseMessage" && msg.message.listResponseMessage.title
        ? msg.message.listResponseMessage.title
        : type === "buttonsResponseMessage" &&
          msg.message.buttonsResponseMessage.selectedButtonId
        ? msg.message.buttonsResponseMessage.selectedButtonId
        : type === "conversation" && msg.message.conversation.startsWith(prefix)
        ? msg.message.conversation
        : type == "imageMessage" &&
          msg.message.imageMessage.caption.startsWith(prefix)
        ? msg.message.imageMessage.caption
        : type == "videoMessage" &&
          msg.message.videoMessage.caption.startsWith(prefix)
        ? msg.message.videoMessage.caption
        : type == "extendedTextMessage" &&
          msg.message.extendedTextMessage.text.startsWith(prefix)
        ? msg.message.extendedTextMessage.text
        : "";
    const args = chats.trim().split(/ +/).slice(1);
    const q = args.join(" ");
    const pushname = msg.pushName;
    const isGroup = msg.key.remoteJid.endsWith("@g.us");
    const sender = isGroup
      ? msg.key.participant
        ? msg.key.participant
        : msg.participant
      : msg.key.remoteJid;
    const isOwner = isGroup
      ? sender.includes(ownerNumberg)
      : sender.includes(ownerNumberg);
    const botNumber = ichi.user.id.split(":")[0] + "@s.whatsapp.net";
    const groupMetadata = isGroup ? await ichi.groupMetadata(from) : "";
    const groupMembers = isGroup ? groupMetadata.participants : "";
    const groupAdmins = isGroup ? ind.getGroupAdmins(groupMembers) : "";
    const isBotGroupAdmins = groupAdmins.includes(botNumber)
    const isGroupAdmins =
      groupAdmins.includes(sender)

    const isImage = type == "imageMessage";
    const isVideo = type == "videoMessage";
    const isSticker = type == "stickerMessage";
    const isQuotedMsg = type == "extendedTextMessage";
    const isQuotedImage = isQuotedMsg
      ? content.includes("imageMessage")
        ? true
        : false
      : false;
    const isQuotedAudio = isQuotedMsg
      ? content.includes("audioMessage")
        ? true
        : false
      : false;
    const isQuotedDocument = isQuotedMsg
      ? content.includes("documentMessage")
        ? true
        : false
      : false;
    const isQuotedVideo = isQuotedMsg
      ? content.includes("videoMessage")
        ? true
        : false
      : false;
    const isQuotedSticker = isQuotedMsg
      ? content.includes("stickerMessage")
        ? true
        : false
      : false;

    const isUrl = (uri) => {
      return uri.match(
        new RegExp(
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/,
          "gi"
        )
      );
    };

    if (multi) {
      var prefix = /^[°zZ#$@+,.?=''():√%!¢£¥€π¤ΠΦ_&<`™©®Δ^βα¦|/\\©^]/.test(
        chats
      )
        ? chats.match(/^[°zZ#$@+,.?=''():√%¢£¥€π¤ΠΦ_&<!`™©®Δ^βα¦|/\\©^]/gi)
        : ".";
    } else {
      if (nopref) {
        prefix = "";
      } else {
        prefix = prefa;
      }
    }

    const command = chats.toLowerCase().split(" ")[0] || "";
    const isCmd = chats.startsWith(prefix);
    //OCR
    const configocr = {
      lang: "eng",
      oem: 1,
      psm: 3,
    };
    //Reply

    if (msg.message.conversation.includes("haloo tess")) {
      ichi.sendMessage(from, { text: "bisaa" }, { quoted: msg });
    }

    if (msg.message.conversation.includes("haloo anuu")) {
      ichi.sendMessage(from, { text: "bisaa" }, { quoted: msg });
    }
    if (isCmd) {
      console.log(
        color("[CMD]", "cyan"),
        color(
          moment(msg.messageTimestamp * 1000).format("DD/MM/YY HH:mm:ss"),
          "orange"
        ),
        color(command, "cyan"),
        color(pushname, "orange"),
        color(sender, "lime")
      );
      async function lgr(isp) {
      await ichi.readMessages([isp.key])
       await ichi.sendPresenceUpdate('recording', from) 
      }
lgr(msg)
    }


    //---------------------------------------------------------------------------------------
    // Function

    async function downloadAndSaveMediaMessage(type_file, path_file) {
      if (type_file === "image") {
        var stream = await downloadContentFromMessage(
          msg.message.imageMessage ||
            msg.message.extendedTextMessage?.contextInfo.quotedMessage
              .imageMessage,
          "image"
        );
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk]);
        }
        await fs.writeFileSync(path_file, buffer);
        return fs.readFileSync(path_file);
      } else if (type_file === "video") {
        var stream = await downloadContentFromMessage(
          msg.message.videoMessage ||
            msg.message.extendedTextMessage?.contextInfo.quotedMessage
              .videoMessage,
          "video"
        );
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk]);
        }
        fs.writeFileSync(path_file, buffer);
        return fs.readFileSync(path_file);
      } else if (type_file === "sticker") {
        var stream = await downloadContentFromMessage(
          msg.message.stickerMessage ||
            msg.message.extendedTextMessage?.contextInfo.quotedMessage
              .stickerMessage,
          "sticker"
        );
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk]);
        }
        fs.writeFileSync(path_file, buffer);
        return fs.readFileSync(path_file);
      } else if (type_file === "audio") {
        var stream = await downloadContentFromMessage(
          msg.message.audioMessage ||
            msg.message.extendedTextMessage?.contextInfo.quotedMessage
              .audioMessage,
          "audio"
        );
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk]);
        }
        fs.writeFileSync(path_file, buffer);
        return fs.readFileSync(path_file);
      }
    }
    const adReply = async (teks, judul, isi, quo) => {
      ichi.sendMessage(
        from,
        {
          text: teks,
          contextInfo: {
            externalAdReply: {
              title: judul,
              body: isi,
              mediaType: 3,
              thumbnail: fs.readFileSync("./assets/thumb.jpg"),
            },
          },
        },
        { sendEphemeral: true, quoted: quo }
      );
    };
    const sendFileFromUrl = async (from, url, caption, msg, men) => {
      let mime = "";
      let res = await axios.head(url);
      mime = res.headers["content-type"];
      if (mime.split("/")[1] === "gif") {
        return ichi.sendMessage(
          from,
          {
            video: await convertGif(url),
            caption: caption,
            gifPlayback: true,
            mentions: men ? men : [],
          },
          { quoted: msg }
        );
      }
      let type = mime.split("/")[0] + "Message";
      if (mime.split("/")[0] === "image") {
        return ichi.sendMessage(
          from,
          {
            image: await getBuffer(url),
            caption: caption,
            mentions: men ? men : [],
          },
          { quoted: msg }
        );
      } else if (mime.split("/")[0] === "video") {
        return ichi.sendMessage(
          from,
          {
            video: await getBuffer(url),
            caption: caption,
            mentions: men ? men : [],
          },
          { quoted: msg }
        );
      } else if (mime.split("/")[0] === "audio") {
        return ichi.sendMessage(
          from,
          {
            audio: await getBuffer(url),
            caption: caption,
            mentions: men ? men : [],
            mimetype: "audio/mpeg",
          },
          { quoted: msg }
        );
      } else {
        return ichi.sendMessage(
          from,
          {
            document: await getBuffer(url),
            mimetype: mime,
            caption: caption,
            mentions: men ? men : [],
          },
          { quoted: msg }
        );
      }
    };

    const textImg = (
      teks,
      buffer = fs.readFileSync("assets/thumb.jpg"),
      mess,
      men
    ) => {
      return ichi.sendMessage(
        from,
        { text: teks, mention: men ? men : [] },
        { quoted: mess ? mess : msg }
      );
    };
    // Welcome
    //IDK Why But Sometimes It Become Spam
    /*
    ichi.ev.on("group-participants.update", async (anu) => {
      console.log(anu);
      try {
        let metadata = await ichi.groupMetadata(anu.id);
        let participants = anu.participants;
        for (let num of participants) {
          // Get Profile Picture User
          try {
            ppuser = await ichi.profilePictureUrl(num, "image");
          } catch {
            ppuser =
              "https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg";
          }

          // Get Profile Picture Group

          if (anu.action == "add") {
            const oui = await axios.get(ppuser, {
              responseType: "arraybuffer",
            });
            const linkpp = await uploadImages(oui.data, "tempf");

            const { data } = await axios.get(
              `https://geni-panas.xyz/api/welcome?text1=${metadata.subject}&text2=Hallo! Selamat datang Di Grup ${metadata.subject}&text3=WELCOME&image=${linkpp}&apikey=6tSvkmRz`,
              { responseType: "arraybuffer" }
            );
            await ichi.sendMessage(anu.id, {
              image: data,
              templateButtons: [
                {
                  index: 1,
                  urlButton: {
                    displayText: "REST API",
                    url: "https://geni-panas.xyz",
                  },
                },
              ],
              footer: "Created With Geni Panas Api",
              contextInfo: {
                mentionedJid: [num],
              },
              caption: `Welcome To ${metadata.subject} @${num.split("@")[0]}`,
              jpegThumbnail: data,
            });
          }
        }
      } catch (err) {
        console.log(err);
      }
    });*/


    //----------------------------------------------------------------------------------------
    if (isOwner) {
      if (chats.startsWith("> ")) {
        console.log(
          color("[EVAL]"),
          color(
            moment(msg.messageTimestamp * 1000).format("DD/MM/YY HH:mm:ss"),
            "yellow"
          ),
          color(`Owner!`)
        );
        try {
          let evaled = await eval(chats.slice(2));
          if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
          textImg(`${evaled}`);
        } catch (err) {
          textImg(`${err}`);
        }
      } else if (chats.startsWith("$ ")) {
        console.log(
          color("[EXEC]"),
          color(
            moment(msg.messageTimestamp * 1000).format("DD/MM/YY HH:mm:ss"),
            "yellow"
          ),
          color(`Owner!`)
        );
        exec(chats.slice(2), (err, stdout) => {
          if (err) return textImg(`${err}`);
          if (stdout) textImg(`${stdout}`);
        });
      }
    }
if (chats.includes("instagram.com") && chats.includes("https") && !isCmd) {
  urlig = chats.match(/https:\/\/.+\.instagram.+/g)[0]
  await adReply(ind.wait(), "Instagram", `~> Request By ${pushname}`, msg);
  try {
    const getig = await instagram(urlig);
    let gasdfghasfghasfy = `┌──「 *INSTAGRAM* 」
├ *Request By:* ${pushname}
└──「 *AISHA* 」`;

    for (i of getig.data) {
      if (i.type == "video") {
        ichi.sendMessage(
          from,
          { video: { url: i.url }, caption: gasdfghasfghasfy },
          { quoted: msg }
        );
      } else {
        ichi.sendMessage(
          from,
          { image: { url: i.url }, caption: gasdfghasfghasfy },
          { quoted: msg }
        );
      }
    }
  } catch (err) {
    textImg(ind.err(chats.split(" ")[0].split(prefix)[1], err));
  }
}
if (chats.includes("tiktok.com") && chats.includes("https") && !isCmd) {
  urltik = chats.match(/https:\/\/.+\.tiktok.+/g)[0]
  await adReply(ind.wait(), "Tiktok", `~> Request By ${pushname}`, msg);
  try {
    const gettt = await tikitoko(urltik)
    //sendFileFromUrl(from, gettt, `*Request By:* ${pushname}`, msg);
    await ichi.sendMessage(from, {video: {url: gettt}, caption: `*Request By:* ${pushname}`})


  } catch (err) {
    textImg(ind.err(chats.split(" ")[0].split(prefix)[1], err));
  }
}

if (chats.toLowerCase() == "bot") {
  textImg(`Hai, aku Aisha!\nGunakan #help untuk memulai menggunakan Aisha Bot.\nOtsu~`)
}
    //----------------------------------------------------------------------------------------------
    //MENU

    // Please Don't Change This T_T

    const menuBut = [
      {
        index: 1,
        urlButton: {
          displayText: "Source Code",
          url: "https://github.com/ichizza/Chizza-md",
        },
      }, // Please Don't Change This T_T
      {
        index: 2,
        callButton: { displayText: "Owner", phoneNumber: "+6285755495437" },
      },
      {
        index: 3,
        quickReplyButton: { displayText: "MENU", id: prefix + "allmenu" },
      },
      {
        index: 4,
        quickReplyButton: { displayText: "RULES", id: prefix + "rules" },
      },
    ];

    switch (command) {
      case prefix + "r":
        if (!q) return;
        ichi.sendMessage(from, {
          react: {
            text: q,
            key: {
              id: msg.message.extendedTextMessage.contextInfo.stanzaId,
              remoteJid: from,
              participant:
                msg.message.extendedTextMessage.contextInfo.participant,
            },
          },
        });
        break;
      case prefix + "test":
        ichi.sendMessage(from, { text: "Test Apa Nih?" });

        break;
      case prefix + "self":
        if (isOwner) {
          if ((q = "on")) {
            _editod.self = true
            ichi.sendMessage(from, { text: "Owner Mode!" });
          } else if ((q = "off")) {
            _editod.self = false;
            ichi.sendMessage(from, { text: "Public Mode!" });
          } else {
            textImg("Pilihan on Atau off!");
          }
        }
        break;

      case prefix + "menu":
      case prefix + "help":
        thumb = fs.readFileSync("./assets/header.jpg")
        const thumbs = await Buffer.from(thumb, "base64")
        await ichi.sendMessage(from, {
          caption: `*「AISHA」*
Hai Kak ${pushname}.
Saya Aisha, Silahkan Pilih Pilihan Fitur Yang Ada.

Terima Kasih Sudah Menjadi Teman Aku!`,
          location: { jpegThumbnail: thumbs },
          templateButtons: menuBut,
          footer: "ᴮᵉᵗᵃ ᵂʰᵃᵗˢᵃᵖᵖ ᴮᵒᵗ ᴹᵘˡᵗⁱ ᴰᵉᵛⁱᶜᵉ ❤️‍🔥",
        });

        break;

      case prefix + "allmenu":
        try {
          var pepeh = await ichi.profilePictureUrl(sender, "image");
        } catch {
          var pepeh =
            "https://i.pinimg.com/736x/f0/d3/28/f0d328d2f116501a495f7981376a8d3f.jpg";
        }
        sendFileFromUrl(from, pepeh, ind.menu(prefix, ucapan, time));
        break;
      case prefix + "sewa":
        textImg(ind.rent());
        break;

      //About Menu
      case prefix + "owner":
        for (let x of ownerNumber) {
          const vcard =
            "BEGIN:VCARD\n" + // metadata of the contact card
            "VERSION:3.0\n" +
            "FN:I C H I\n" + // full name
            "ORG:SenyaTeam;\n" + // the organization of the contact
            "TEL;type=CELL;type=VOICE;waid=6285755495437:+62 857 5549 5437\n" + // WhatsApp ID + phone number
            "END:VCARD";
          ichi.sendMessage(from, {
            contacts: {
              displayName: "I C H I",
              contacts: [{ vcard }],
            },
          });
        }
        break;
      case prefix + "donate":
      case prefix + "donasi":
        textImg(ind.donate());
        break;
      case prefix + "rules":
      case prefix + "rule":
        textImg(ind.rules(prefix));
        break;
      // Owner Menu
      case prefix + "eval":
        if (!isOwner) return;
        if (!q) return textImg("Masukkan Javascript Code!");
        try {
          let evaled = await eval(chats.slice(6));
          if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
          textImg(`${evaled}`);
        } catch (err) {
          textImg(`${err}`);
        }

        break;

      case prefix + "join":
        if (!isOwner) return;

        if (!q) return textImg(ind.wrongFormat(prefix));
        if (!q.includes("https://chat.whatsapp.com/"))
          return textImg(ind.wrongFormat(prefix));
        try {
          const response = await ichi.groupAcceptInvite(
            q.split("https://chat.whatsapp.com/")[1]
          );
          console.log(color("[JOIN GROUP]", "lime"), color(response, "cyan"));
        } catch (err) {
          textImg("Pastikan Link Group Benar Dan Tidak Kadaluarsa!");
        }
        break;

      case prefix + "leave":
        try {
          if (q) {
            await ichi.groupLeave(q);
            console.log(color("[Leave GROUP]", "lime"), color(q, "cyan"));
          } else {
            await ichi.groupLeave(from);
            console.log(color("[Leave GROUP]", "lime"), color(from, "cyan"));
          }
        } catch (err) {
          textImg("Pastikan Link Group Benar Dan Tidak Kadaluarsa!");
        }
        break;

      case prefix + "setppbot":
      case prefix + "setpp":
        if (!isOwner) return;
        if (isImage || isQuotedImage) {
          let ppimg = await downloadAndSaveMediaMessage(
            "image",
            "ppeehhh.jpeg"
          );
          await ichi.updateProfilePicture(botNumber, { url: "ppeehhh.jpeg" });
          textImg("Done!");
        } else {
          textImg(ind.wrongFormat(prefix));
        }

        break;

      //System Menu
      case prefix + "del":
      case prefix + "delete":
      case prefix + "hapus":
        if (!isQuotedMsg) return textImg(ind.wrongFormat(prefix));
        if (
          (msg.message.extendedTextMessage.contextInfo.participant = botNumber)
        ) {
          ichi.sendMessage(from, {
            delete: {
              remoteJid: from,
              fromMe: true,
              id: msg.message.extendedTextMessage.contextInfo.stanzaId,
              participant: botNumber,
            },
          });
        } else {
          textImg(ind.wrongFormat(prefix));
        }

        break;

      case prefix + "runtime":
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
        await textImg(`*── 「 BOT UPTIME 」 ──*\n\n❏${formater(uptime)}`);
        break;

      //Group Menu

      case prefix + "revoke":
        if (!isGroup)
          return textImg("Perintah Ini Hanya Bisa Digunakan di Group!");
        if (!isGroupAdmins)
          return textImg("Perintah Ini Hanya Bisa Digunakan Oleh Admin Group!");
        if (!isBotGroupAdmins) return textImg("Jadikan Bot Admin Dahulu!");
        try {
          const code = await ichi.groupRevokeInvite(from);
          ichi.sendMessage(from, {
            text:
              "Link Group Telah DiUbah Oleh Admin @" +
              sender.split("@")[0].split(":")[0],
            contextInfo: { mentionedJid: [sender] },
          });
          ichi.sendMessage(
            sender,
            { text: `New Group Link: https://chat.whatsapp.com/${code}` },
            { quoted: msg }
          );
        } catch (err) {
          textImg(`${err}`);
        }
        break;

      case prefix + "add":
        if (!isGroup)
          return textImg("Perintah Ini Hanya Bisa Digunakan di Group!");
        if (!isGroupAdmins)
          return textImg("Perintah Ini Hanya Bisa Digunakan Oleh Admin Group!");
        if (!isBotGroupAdmins) return textImg("Jadikan Bot Admin Dahulu!");
        if (q) {
          ichi.groupParticipantsUpdate(from, [q+"@s.whatsapp.net"], "add");
        } else {
          textImg(ind.wrongFormat(prefix));
        }
        break;

      case prefix + "kick":
        if (!isGroup)
          return textImg("Perintah Ini Hanya Bisa Digunakan di Group!");
        if (!isGroupAdmins)
          return textImg("Perintah Ini Hanya Bisa Digunakan Oleh Admin Group!");
        if (!isBotGroupAdmins) return textImg("Jadikan Bot Admin Dahulu!");
        if (isQuotedMsg) {
          ichi.groupParticipantsUpdate(
            from,
            [msg.message.extendedTextMessage.contextInfo.participant],
            "remove"
          );
        } else {
          if (!q) return textImg(ind.wrongFormat(prefix));
          ichi.groupParticipantsUpdate(
            from,
            [msg.message.extendedTextMessage.contextInfo.mentionedJid],
            "remove"
          );
        }
        break;

      case prefix + "promote":
        if (!isGroup)
          return textImg("Perintah Ini Hanya Bisa Digunakan di Group!");
        if (!isGroupAdmins)
          return textImg("Perintah Ini Hanya Bisa Digunakan Oleh Admin Group!");
        if (!isBotGroupAdmins) return textImg("Jadikan Bot Admin Dahulu!");
        if (isQuotedMsg) {
          ichi.groupParticipantsUpdate(
            from,
            [msg.message.extendedTextMessage.contextInfo.participant],
            "promote"
          );
        } else {
          if (!q) return textImg(ind.wrongFormat(prefix));
          ichi.groupParticipantsUpdate(
            from,
            [msg.message.extendedTextMessage.contextInfo.mentionedJid],
            "promote"
          );
        }
        break;

      case prefix + "demote":
        if (!isGroup)
          return textImg("Perintah Ini Hanya Bisa Digunakan di Group!");
        if (!isGroupAdmins)
          return textImg("Perintah Ini Hanya Bisa Digunakan Oleh Admin Group!");
        if (!isBotGroupAdmins) return textImg("Jadikan Bot Admin Dahulu!");
        if (isQuotedMsg) {
          ichi.groupParticipantsUpdate(
            from,
            [msg.message.extendedTextMessage.contextInfo.participant],
            "demote"
          );
        } else {
          if (!q) return textImg(ind.wrongFormat(prefix));
          ichi.groupParticipantsUpdate(
            from,
            [q.split("@")[1] + "@s.whatsapp.net"],
            "demote"
          );
        }
        break;

      case prefix + "leave":
        if (!isGroup)
          return textImg("Perintah Ini Hanya Bisa Digunakan di Group!");
        if (!isGroupAdmins)
          return textImg("Perintah Ini Hanya Bisa Digunakan Oleh Admin Group!");
        try {
          ichi.groupLeave(from);
        } catch (err) {
          ichi.groupLeave(from);
        }
        break;
      case prefix + "group":
        if (!isGroup)
          return textImg("Perintah Ini Hanya Bisa Digunakan di Group!");
        if (!isGroupAdmins)
          return textImg("Perintah Ini Hanya Bisa Digunakan Oleh Admin Group!");
        if (!isBotGroupAdmins) return textImg("Jadikan Bot Admin Dahulu!");
        if (q === "open") {
          await ichi.groupSettingUpdate(from, "not_announcement");
          textImg("*Group Dibuka Oleh Admin:* " + pushname);
        } else if (q === "close") {
          await ichi.groupSettingUpdate(from, "announcement");
          textImg("*Group Ditutup Oleh Admin:* " + pushname);
        } else {
          textImg(ind.wrongFormat(prefix));
        }

        break;

      case prefix + "hidetag":
        if (!isGroup) return textImg(ind.groupOnly());

        if (isGroupAdmins || isOwner) {
          ichi.sendMessage(from, {
            text: q ? q : "",
            mentions: groupMembers.map((a) => a.id),
          });
        } else {
          textImg(ind.adminsOnly());
        }
        break;

      // Anime Menu
      case prefix + "anime":
        if (!q) return textImg(ind.wrongFormat(prefix));
        await adReply(ind.wait(), "Anime", `~> Request By ${pushname}`, msg);
        try {
          const { title, synopsis, picture, trailer, englishTitle, japaneseTitle, synonyms, type, episodes, aired, premiered, broadcast, producers, studios, source, duration, rating, status, genres, score, scoreStats, ranked, popularity, members, favorites, id, url } = await anime.getInfoFromName(q);
          const getnime = await anime.getInfoFromName(q);

          let txt = ''
          for (let i = 0; i < getnime.characters.length; i++) { txt +=`\nName: ${getnime.characters[i].name}\nRole: ${getnime.characters[i].role}\nLink: ${getnime.characters[i].link}\nPictures: ${getnime.characters[i].picture}\n`}
          for (let i = 0; i < getnime.staff.length; i++) { txt +=`\nName: ${getnime.staff[i].name}\nRole: ${getnime.staff[i].role}\nLink: ${getnime.staff[i].link}\nPicture: ${getnime.staff[i].picture}\n`}
           
          sendFileFromUrl(from, picture,`*── 「 ANIME SEARCH 」 ──*\n\n--> *Result for*: ${q}\n\nTitle: ${title}\n\nURL: ${url}\n\nSynopsis: ${synopsis}\n\n${txt}\n\nTrailer: ${trailer}\n\nEnglish Title: ${englishTitle}\n\nJapanese title: ${japaneseTitle}\n\nSynonyms: ${synonyms}\n\nType: ${type}\n\nEpisodes: ${episodes}\n\nAired: ${aired}\n\nPremiered: ${premiered}\n\nBroadcast: ${broadcast}\n\nProducers: ${producers}\n\nStudios: ${studios}\n\nSource: ${source}\n\nDuration: ${duration}\n\nRating ${rating}\n\nStatus: ${status}\n\nGenre: ${genres}\n\nScore: ${score}\n\nScore Stats: ${scoreStats}\n\nRanked: ${ranked}\n\nPopularity: ${popularity}\n\nMembers: ${members}\n\nFavorite: ${favorites}\n\nID: ${id}`)
   
        } catch (err) {
          textImg(ind.err(chats.split(" ")[0].split(prefix)[1], err));
        }

        break;

      case prefix + "manga":
        if (!q) return textImg(ind.wrongFormat(prefix));
        await adReply(ind.wait(), "Manga", `~> Request By ${pushname}`, msg);
        try {
          const getmanga = await xfar.anime.manga(q);
          let hajdhsdjask = `「 *M A N G A* 」\n\n`;

          for (audhjd of getmanga) {
            hajdhsdjask += `*Judul:* ${audhjd.judul}\n`;
            hajdhsdjask += `*Link:* ${audhjd.link}\n\n`;
          }

          sendFileFromUrl(from, getmanga[0].thumbnail, hajdhsdjask);
        } catch (err) {
          textImg(ind.err(chats.split(" ")[0].split(prefix)[1], err));
        }

        break;

      case prefix + "character":
      case prefix + "chara":
      case prefix + "char":
        if (!q) return textImg(ind.wrongFormat(prefix));
        await adReply(
          ind.wait(),
          "Character",
          `~> Request By ${pushname}`,
          msg
        );
        try {
          const getchar = await hxz.chara(q);
          for (let i = 0; i < 3; i++) {
            sendFileFromUrl(from, getchar[i], `*${q}*`);
          }
        } catch (err) {
          textImg(ind.err(chats.split(" ")[0].split(prefix)[1], err));
        }

        break;

      case prefix + "waifu":
        await adReply(ind.wait(), "Waifu", `~> Request By ${pushname}`, msg);
        try {

           axios.get("https://api.waifu.pics/sfw/waifu").then(({data}) => {
sendFileFromUrl(from, data.url)
})
          
        } catch (err) {
          textImg(ind.err(chats.split(" ")[0].split(prefix)[1], err));
        }

        break;

      //Search Menu

      case prefix + "film":
      case prefix + "movie":
        if (!q) return textImg(ind.wrongFormat(prefix));
        await adReply(ind.wait(), "Movie", `~> Request By ${pushname}`, msg);
        try {
          const getfilm = await xfar.search.film(q);
          let ahgsdash = `「 *M O V I E* 」\n\n`;

          for (audhjd of getfilm) {
            ahgsdash += `*Judul:* ${audhjd.judul}\n`;
            ahgsdash += `*Quality:* ${audhjd.quality}\n`;
            ahgsdash += `*Type:* ${audhjd.type}\n`;
            ahgsdash += `*Date:* ${audhjd.upload}\n`;
            ahgsdash += `*Link:* ${audhjd.link}\n\n`;
          }

          sendFileFromUrl(from, getfilm[0].thumb, ahgsdash);
        } catch (err) {
          textImg(ind.err(chats.split(" ")[0].split(prefix)[1], err));
        }

        break;

      case prefix + "lirik":
      case prefix + "lyrics":
      case prefix + "lyric":
        if (!q) return textImg(ind.wrongFormat(prefix));
        await adReply(ind.wait(), "Lyrics", `~> Request By ${pushname}`, msg);
        try {
          const { data } = await axios.get(
            "https://www.lyricsfreak.com/search.php?a=search&q=" + q
          );
          let $ = cheerio.load(data);

          let h1 = $(".song");
          const hh = h1.attr("href");

          const huu = await axios.get("https://www.lyricsfreak.com" + hh);
          let s = cheerio.load(huu.data);

          let h2 = s(".lyrictxt").text();

          textImg(`「 *L I R I K* 」\n\n${h2}`);
        } catch (err) {
          textImg(ind.err(chats.split(" ")[0].split(prefix)[1], err));
        }
        break;

      case prefix + "wattpad":
        if (!q) return textImg(ind.wrongFormat(prefix));
        await adReply(ind.wait(), "Wattpad", `~> Request By ${pushname}`, msg);
        try {
          const getwp = await xfar.search.wattpad(q);
          let hajdhsdjasks = `「 *WATTPAD* 」\n\n`;

          for (audhjds of getwp) {
            hajdhsdjasks += `*Judul:* ${audhjds.judul}\n`;
            hajdhsdjasks += `*Read:* ${audhjds.dibaca}\n`;
            hajdhsdjasks += `*Rating:* ${audhjds.divote}\n`;
            hajdhsdjasks += `*Link:* ${audhjds.url}\n`;
            hajdhsdjasks += `*Desc:* ${audhjds.description}\n\n`;
          }

          sendFileFromUrl(from, getwp[0].thumb, hajdhsdjasks);
        } catch (err) {
          textImg(ind.err(chats.split(" ")[0].split(prefix)[1], err));
        }

        break;

      case prefix + "webtoon":
      case prefix + "webtoons":
        if (!q) return textImg(ind.wrongFormat(prefix));
        await adReply(ind.wait(), "Webtoon", `~> Request By ${pushname}`, msg);
        try {
          const getwt = await xfar.search.webtoons(q);
          let hajdhsdjaskp = `「 *WEBTOON* 」\n\n`;

          for (audhjds of getwt) {
            hajdhsdjaskp += `*Judul:* ${audhjds.judul}\n`;
            hajdhsdjaskp += `*like:* ${audhjds.like}\n`;
            hajdhsdjaskp += `*Creator:* ${audhjds.creator}\n`;
            hajdhsdjaskp += `*Genre:* ${audhjds.genre}\n`;
            hajdhsdjaskp += `*Link:* ${audhjds.url}\n\n`;
          }

          textImg(hajdhsdjaskp);
        } catch (err) {
          textImg(ind.err(chats.split(" ")[0].split(prefix)[1], err));
        }

        break;

      case prefix + "drakor":
        if (!q) return textImg(ind.wrongFormat(prefix));
        await adReply(ind.wait(), "Drakor", `~> Request By ${pushname}`, msg);
        try {
          const getdr = await xfar.Drakor(q);
          let hajdhsdjaska = `「 *DRAKOR* 」\n\n`;

          for (audhjds of getdr) {
            hajdhsdjaska += `*Judul:* ${audhjds.judul}\n`;
            hajdhsdjaska += `*Tahun:* ${audhjds.years}\n`;
            hajdhsdjaska += `*Genre:* ${audhjds.genre}\n`;
            hajdhsdjaska += `*Link:* ${audhjds.url}\n\n`;
          }

          sendFileFromUrl(from, getdr[0].thumbnail, hajdhsdjaska);
        } catch (err) {
          textImg(ind.err(chats.split(" ")[0].split(prefix)[1], err));
        }

        break;

      case prefix + "pinterest":
        if (!q) return textImg(ind.wrongFormat(prefix));
        await adReply(
          ind.wait(),
          "Pinterest",
          `~> Request By ${pushname}`,
          msg
        );
        try {
          const pin = await pinterest(q);
          let pilih = await Math.floor(Math.random() * pin.length);
          let cap = await short(pin[pilih]);
          sendFileFromUrl(from, pin[pilih], cap);
        } catch (err) {
          textImg(ind.err(chats.split(" ")[0].split(prefix)[1], err));
        }

        break;

      case prefix + "gcsearch":
        if (!q) return textImg(ind.wrongFormat(prefix));
        await adReply(
          ind.wait(),
          "Gc Search",
          `~> Request By ${pushname}`,
          msg
        );
        try {
          if (!isGroup) {
            let getgc = await hxz.linkwa(q);
            let fgashghfgasjfn = `┌──「 *G R O U P* 」\n│\n`;

            for (sjka of getgc) {
              fgashghfgasjfn += `├「*${sjka.nama} 」\n`;
              fgashghfgasjfn += `├「${sjka.link} 」\n│\n`;
            }

            textImg(fgashghfgasjfn);
          } else {
            textImg(
              "Result akan dikirim ke private chat untuk menghindari antilink"
            );
            let getgc = await hxz.linkwa(q);
            let fgashghfgasjfn = `┌──「 *G R O U P* 」\n│\n`;

            for (sjka of getgc) {
              fgashghfgasjfn += `├「*${sjka.nama} 」\n`;
              fgashghfgasjfn += `├「${sjka.link} 」\n│\n`;
            }

            ichi.sendMessage(sender, { text: fgashghfgasjfn }, { quoted: msg });
          }
        } catch (err) {
          textImg(ind.err(chats.split(" ")[0].split(prefix)[1], err));
        }
        break;

      case prefix + "igstalk":
      case prefix + "instagramstalk":
        if (!q) return textImg(ind.wrongFormat(prefix));
        await adReply(ind.wait(), "IG Stalk", `~> Request By ${pushname}`, msg);
        try {
          const getigstalk = await igstalk(q);

          let cap = `┌──「 *IG STALK* 」\n│\n`;
          cap += `├ *Username:* ${q} \n`;
          cap += `├ *Fullname:* ${getigstalk.graphql.user.full_name} \n`;
          cap += `├ *Followers:* ${getigstalk.graphql.user.edge_followed_by.count} \n`;
          cap += `├ *Following:* ${getigstalk.graphql.user.edge_follow.count} \n`;
          cap += `├ *Private:* ${
            getigstalk.graphql.user.is_private ? "Private" : "Not Private"
          } \n`;
          cap += `├ *Bio:* ${
            getigstalk.graphql.user.biography
              ? getigstalk.graphql.user.biography
              : "No Bio"
          } \n│\n`;
          cap += `└──「 *AISHA* 」`;
          sendFileFromUrl(
            from,
            getigstalk.graphql.user.profile_pic_url_hd,
            cap
          );
        } catch (err) {
          textImg(ind.err(chats.split(" ")[0].split(prefix)[1], err));
        }
        break;

      // Media Menu
      case prefix + "toimg":
        if (!isQuotedSticker) return textImg(ind.wrongFormat(prefix));
        await adReply(
          ind.wait(),
          "Sticker To Image",
          `~> Request By ${pushname}`,
          msg
        );
        let rand = await Math.floor(Math.random() * 7613786);
        var rand1 = rand + ".webp";
        let buffer = await downloadAndSaveMediaMessage("sticker", "./" + rand1);

        var rand2 = rand + ".png";
        await fs.writeFileSync(`./${rand1}`, buffer);
        if (msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated == false) {
          exec(`ffmpeg -i ./${rand1} ./${rand2}`, (err) => {
            fs.unlinkSync(`./${rand1}`);
            if (err) return textImg(err);
            ichi.sendMessage(
              from,
              { image: fs.readFileSync(`${rand2}`) },
              { quoted: msg }
            );

            fs.unlinkSync(`${rand2}`);
          });
        } else {
          /*
		          webp2mp4File(`./${rand1}`).then( data => {
			       fs.unlinkSync(`./${rand1}`)
			       ichi.sendMessage(from, { video: { url: data.result }}, { quoted: msg })
			       
				  })*/
        }
        break;
case prefix+"stickernobg":
case prefix+"snobg":
  if (isImage || isQuotedImage) {
    await adReply(
      ind.wait(),
      "Sticker",
      `~> Request By ${pushname}`,
      msg
    );
    let file = await downloadAndSaveMediaMessage(
      "image",
      "temp/" + sender + ".png"
    );
    const ngcgnchnhcjj = await snobg(file)
    ichi.sendMessage(from, {sticker: ngcgnchnhcjj}, {quoted: msg})
    } else {
      textImg("Hanya Bisa Menggunakan Gambar!")
    }


break
      case prefix + "sticker":
      case prefix + "stiker":
      case prefix + "s":
        if (isImage || isQuotedImage) {
          await adReply(
            ind.wait(),
            "Sticker",
            `~> Request By ${pushname}`,
            msg
          );
          let file = await downloadAndSaveMediaMessage(
            "image",
            "temp/" + sender + ".png"
          );
          let sticker = new Sticker(file, {
            pack: stickerInfo.pack, // The pack name
            author: stickerInfo.author, // The author name
            type: StickerTypes.FULL, // The sticker type
            categories: ["🤩", "🎉"], // The sticker category
            id: "12345", // The sticker id
            quality: 75, // The quality of the output file
            background: "transparent", // The sticker background color (only for full stickers)
          });

          const buffer = await sticker.toBuffer();
          ichi.sendMessage(from, { sticker: buffer }, { quoted: msg });
        } else if (isVideo || isQuotedVideo) {
          await adReply(
            ind.wait(),
            "Sticker",
            `~> Request By ${pushname}`,
            msg
          );
          if (
            isQuotedVideo
              ? msg.message.extendedTextMessage.contextInfo.quotedMessage
                  .videoMessage.seconds > 15
              : msg.message.videoMessage.seconds > 15
          )
            return textImg("too long duration, max 15 seconds");
          let file = await downloadAndSaveMediaMessage(
            "video",
            "./temp/" + sender + ".mp4"
          );
          let ahsuhfkj = await convert("./temp/" + sender + ".mp4");

          let sticker = new Sticker(fs.readFileSync(ahsuhfkj), {
            pack: stickerInfo.pack, // The pack name
            author: stickerInfo.author, // The author name
            type: StickerTypes.FULL, // The sticker type
            categories: ["🤩", "🎉"], // The sticker category
            id: "12345", // The sticker id
            quality: 75, // The quality of the output file
            background: "transparent", // The sticker background color (only for full stickers)
          });

          const stikk = await sticker.toBuffer();

          ichi.sendMessage(from, { sticker: stikk }, { quoted: msg });
        } else {
          textImg("Reply Gambar Atau Video!");
        }
        break;

      case prefix + "ocr":
        try {
          if (isImage) {
            await adReply(ind.wait(), "OCR", `~> Request By ${pushname}`, msg);
            let media = await downloadAndSaveMediaMessage(
              "image",
              "temp/ocr.png"
            );
            const asjfhasjkfhasji = await tesseract.recognize(media, configocr);

            textImg(asjfhasjkfhasji);
          } else if (isQuotedImage) {
            await adReply(ind.wait(), "OCR", `~> Request By ${pushname}`, msg);
            let media = await downloadAndSaveMediaMessage(
              "image",
              "temp/ocr.png"
            );
            const asjfhasjkfhasjia = await tesseract.recognize(
              media,
              configocr
            );

            textImg(asjfhasjkfhasjia);
          }
        } catch (err) {
          textImg(ind.err(chats.split(" ")[0].split(prefix)[1], err));
        }
        break;
      //Maker Menu
      case prefix + "carbon":
      case prefix + "code":
        if (!q) return textImg(ind.wrongFormat(prefix));
        await adReply(
          ind.wait(),
          "Carbon Now-Sh",
          `~> Request By ${pushname}`,
          msg
        );
        try {
          const carbon = new Carbon.createCarbon()
            .setCode(q)
            .setBackgroundColor("#1b3648");

          const bufferr = await Carbon.generateCarbon(carbon);
          ichi.sendMessage(from, { image: bufferr }, { quoted: msg });
        } catch (err) {
          textImg(ind.err(chats.split(" ")[0].split(prefix)[1], err));
        }

        break;

      // Downloader Menu

      case prefix + "tiktok":
      case prefix + "tik":
      case prefix + "tt":
      case prefix + "ttdl":
        if (!q) return textImg(ind.wrongFormat(prefix));
        if (!isUrl) return textImg(ind.noUrl());
        await adReply(ind.wait(), "Tiktok", `~> Request By ${pushname}`, msg);
        try {
          const gettt = await tikitoko(q)
          //sendFileFromUrl(from, gettt, `*Request By:* ${pushname}`, msg);
          await ichi.sendMessage(from, {video: {url: gettt}, caption: `*Request By:* ${pushname}`})
        } catch (err) {
          textImg(ind.err(chats.split(" ")[0].split(prefix)[1], err));
        }
        break;

      case prefix + "ytmp3":
      case prefix + "mp3":
        if (!q) return textImg(ind.wrongFormat(prefix));
        if (!isUrl) return textImg(ind.noUrl());
        await adReply(
          ind.wait(),
          "Youtube Mp3",
          `~> Request By ${pushname}`,
          msg
        );
        try {
          const getmp3 = await hxz.youtube(q);
          const gmp3 = await ytmp3(q);
          let sifugtgfrasdjkfhsdj = `┌──「 *YTMP3* 」
│
├ *Title:* ${getmp3.title}
├ *Size:* ${getmp3.size_mp3}
│
└──「 *AISHA* 」`;

          sendFileFromUrl(from, getmp3.thumb, sifugtgfrasdjkfhsdj, msg);
          sendFileFromUrl(from, gmp3.url, sifugtgfrasdjkfhsdj, msg);
        } catch (err) {
          textImg(ind.err(chats.split(" ")[0].split(prefix)[1], err));
        }

        break;

      case prefix + "ytmp4":
      case prefix + "mp4":
        if (!q) return textImg(ind.wrongFormat(prefix));
        if (!isUrl) return textImg(ind.noUrl());
        await adReply(
          ind.wait(),
          "Youtube Mp4",
          `~> Request By ${pushname}`,
          msg
        );
        try {
          const getmp4 = await hxz.youtube(q);
          const gmp4 = await ytmp4(q);
          let asjdghfashgfashgf = `┌──「 *YTMP4* 」
│
├ *Title:* ${getmp4.title}
├ *Size:* ${getmp4.size}
│
└──「 *AISHA* 」`;
          sendFileFromUrl(from, getmp4.thumb, asjdghfashgfashgf, msg);
          sendFileFromUrl(from, gmp4.url, asjdghfashgfashgf, msg);
        } catch (err) {
          textImg(ind.err(chats.split(" ")[0].split(prefix)[1], err));
        }

        break;

      case prefix + "yts":
      case prefix + "ytsearch":
        if (!q) return textImg(ind.wrongFormat(prefix));
        await adReply(
          ind.wait(),
          "Youtube Search",
          `~> Request By ${pushname}`,
          msg
        );
        try {
          const getyts = await yts(q);
          let afhasuyduytsduyt = `┌──「 *YT SEARCH* 」\n│\n`;

          for (i of getyts.all) {
            afhasuyduytsduyt += `├ *Title:* ${i.title}\n`;
            afhasuyduytsduyt += `├ *Url* ${i.url}\n│\n`;
          }
          afhasuyduytsduyt += "└──「 *AISHA* 」";
          sendFileFromUrl(from, getyts.all[0].image, afhasuyduytsduyt);
        } catch (err) {
          textImg(ind.err(chats.split(" ")[0].split(prefix)[1], err));
        }
        break;

      case prefix + "play":
      case prefix + "ytplay":
        if (!q) return textImg(ind.wrongFormat(prefix));
        await adReply(
          ind.wait(),
          "Youtube Play",
          `~> Request By ${pushname}`,
          msg
        );
        try {
          const waitget = await yts(q);
          const getplay = await hxz.youtube(waitget.all[0].url);
          const glink = await ytmp3(waitget.all[0].url);
          let ashgasfgashfash = `┌──「 *PLAY* 」
│
├ *Title:* ${getplay.title}
├ *Size:* ${getplay.size_mp3}
│
└──「 *AISHA* 」`;

          sendFileFromUrl(from, getplay.thumb, ashgasfgashfash, msg);
          sendFileFromUrl(from, glink.url, ashgasfgashfash, msg);
        } catch (err) {
          textImg(ind.err(chats.split(" ")[0].split(prefix)[1], err));
        }

        break;

      case prefix + "fb":
      case prefix + "facebook":
        if (!q) return textImg(ind.wrongFormat(prefix));
        if (!isUrl) return textImg(ind.noUrl());
        await adReply(ind.wait(), "Facebook", `~> Request By ${pushname}`, msg);
        try {
          const getfb = await fb2(q)
          let abdvhjasdashjh = `*Request By:* ${pushname}`
          sendFileFromUrl(from, getfb.url[1].url, abdvhjasdashjh, msg);
        } catch (err) {
          textImg(ind.err(chats.split(" ")[0].split(prefix)[1], err));
        }

        break;

      case prefix + "twitter":
      case prefix + "twiter":
      case prefix + "twt":
        if (!q) return textImg(ind.wrongFormat(prefix));
        if (!isUrl) return textImg(ind.noUrl());
        await adReply(ind.wait(), "Twitter", `~> Request By ${pushname}`, msg);
        try {
          const gettwt = await xfar.Twitter(q);

          sendFileFromUrl(from, gettwt.medias[1].url, txt, msg);
        } catch (err) {
          textImg(ind.err(chats.split(" ")[0].split(prefix)[1], err));
        }

        break;

      case prefix + "ig":
      case prefix + "igdl":
      case prefix + "instagram":
        if (!q) return textImg(ind.wrongFormat(prefix));
        if (!isUrl) return textImg(ind.noUrl());
        await adReply(
          ind.wait(),
          "Instagram ",
          `~> Request By ${pushname}`,
          msg
        );
        try {
          const getig = await instagram(q);
          let gasdfghasfghasfy = `┌──「 *INSTAGRAM* 」
├ *Request By:* ${pushname}
└──「 *AISHA* 」`;

          for (i of getig.data) {
            if (i.type == "video") {
              ichi.sendMessage(
                from,
                { video: { url: i.url }, caption: gasdfghasfghasfy },
                { quoted: msg }
              );
            } else {
              ichi.sendMessage(
                from,
                { image: { url: i.url }, caption: gasdfghasfghasfy },
                { quoted: msg }
              );
            }
          }
        } catch (err) {
          textImg(ind.err(chats.split(" ")[0].split(prefix)[1], err));
        }

        break;

      case prefix + "tr":
      case prefix + "translate":
        if (!q) return textImg(ind.wrongFormat(prefix));
        await adReply(
          ind.wait(),
          "Translate",
          `~> Request By ${pushname}`,
          msg
        );
        try {
          const trs = await translate(q.slice(2), { to: q.split(" ")[0] });
          textImg(trs);
        } catch (err) {
          textImg(ind.err(chats.split(" ")[0].split(prefix)[1], err));
        }

        break;

      case prefix + "gempa":
        await adReply(
          ind.wait(),
          "BMKG Gempa",
          `~> Request By ${pushname}`,
          msg
        );
        try {
          const { data } = await axios.get(
            "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json"
          );
          let asbnfvashfgyjas = `┌──「 *G E M P A* 」
│
├ *TimeStamp:* ${data.Infogempa.gempa.Tanggal}
├ *Time:* ${data.Infogempa.gempa.Jam}
├ *Coordinates:* ${data.Infogempa.gempa.Coordinates}
├ *Magnitude:* ${data.Infogempa.gempa.Magnitude}
├ *Depth:* ${data.Infogempa.gempa.Kedalaman}
├ *Region:* ${data.Infogempa.gempa.Wilayah}
├ *Potention:* ${data.Infogempa.gempa.Potensi}
├ *Effect:* ${data.Infogempa.gempa.Dirasakan}
│
└──「 *AISHA* 」 `;

          sendFileFromUrl(
            from,
            "https://data.bmkg.go.id/DataMKG/TEWS/" +
              data.Infogempa.gempa.Shakemap,
            asbnfvashfgyjas
          );
        } catch (err) {
          textImg(ind.err(chats.split(" ")[0].split(prefix)[1], err));
        }

        break;
      //----------------------------------------------------------------------------------------------------
    }
  } catch (err) {
    console.log(color("[ERR]", "red"), color(err, "cyan"));
  }
};
