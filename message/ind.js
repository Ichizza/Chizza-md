exports.wait = () => {
   return ("Mohon tunggu sebentar~")
}

exports.rules = (prefix) => {
    return `
*── 「 RULES 」 ──*
1. Jangan spam bot. 
Sanksi: *WARN/SOFT BLOCK*
2. Jangan telepon bot.
Sanksi: *SOFT BLOCK*
3. Jangan mengeksploitasi bot.
Sanksi: *PERMANENT BLOCK*
Jika sudah dipahami rules-nya, silakan ketik *${prefix}menu* untuk memulai!

*Note:* Bot Masih Dalam Program Beta.Jika Bot Tidak Merespon Di Grup Silahkan Gunakan Di Private Chat!
    `
}

exports.wrongFormat = (prefix) => {
    return `Format salah ‼️ Silakan cek cara penggunaan di *${prefix}allmenu*.`
}

exports.rent = () => {
    return `*「 S E W A 」*
Sebelum melakukan pembayaran, hubungi dahulu owner https://wa.me/6285755495437
    
┌──「 *ADD GROUP* 」
├ *1 Minggu:* Rp.5.000
├ *1 Bulan:* Rp.10.000
│
├「 *Premium* 」
├ *1 Bulan*: Rp.5.000
│
└──「 *I C Z A* 」 
    
┌──「 *P A Y M E N T* 」
│
├ *Dana:* 6285895618295
├ *Gopay:* 6285895618295
├ *Pulsa:* 6285895618295 (+5k)
│
└──「 *I C Z A* 」 
    
*NOTE:* Untuk Pulsa Akan Dikenakan Tambahan Rp.5.000`
}
exports.donate = () => {
return `┌──「 *D O N A T E* 」
│
├ Beri Semangat Owner!
│
├ *Dana:* 6285895618295
├ *Gopay:* 6285895618295
├ *Pulsa:* 6285895618295 (+5k)
│
└──「 *I C Z A* 」 `

}
exports.menu = (prefix, salam, time) => {
return `┌──「 *I C Z A* 」
├ *Selamat ${salam}*
├ *${time}*
│
├ *Note:* Bot Masih Dalam Program Beta.
├ Jika Bot Tidak Merespon Di Grup Silahkan Gunakan Di Private Chat!
│
├ *Iklan:* Menjual Otp Nomor Luar Negeri.Gunakan ${prefix}otp
├ *Iklan:* Menjual RDP/VPS Murah.Gunakan ${prefix}rdp
│
├「 ABOUT-MENU 」
├ ${prefix}owner
├ ${prefix}rules
├ ${prefix}donate
├ ${prefix}sewa
│
├「 OWNER-MENU 」
├ > evaluate
├ $ exec
├ ${prefix}join link
├ ${prefix}leave <groupId>
├ ${prefix}setppbot (reply/send image)
│
├「 SYSTEM-MENU 」
├ ${prefix}allmenu
├ ${prefix}delete (reply pesan)
├ ${prefix}runtime
│
├「 GROUP-MENU 」
├ ${prefix}revoke
├ ${prefix}add number
├ ${prefix}kick tag/reply
├ ${prefix}promote tag/reply
├ ${prefix}demote tag/reply
├ ${prefix}leave
├ ${prefix}group open/close
├ ${prefix}hidetag text
│
├「 ANIME-MENU 」
├ ${prefix}anime query
├ ${prefix}manga query
├ ${prefix}character query
├ ${prefix}waifu
│
├「 SEARCH-MENU 」
├ ${prefix}film query
├ ${prefix}lirik query
├ ${prefix}wattpad query
├ ${prefix}webtoons query
├ ${prefix}drakor query
├ ${prefix}pinterest query
├ ${prefix}gcsearch query
├ ${prefix}igstalk username
│
├「 MEDIA-MENU 」
├ ${prefix}toimg (reply sticker)
├ ${prefix}tomp3 (reply video)
├ ${prefix}sticker (send/reply image/video)
├ ${prefix}ocr (send/reply image)
│
├「 MAKER-MENU 」
├ ${prefix}carbon code
│
├「 DOWNLOADER-MENU 」
├ ${prefix}tiktok link
├ ${prefix}ytmp3 link
├ ${prefix}ytmp4 link
├ ${prefix}play query
├ ${prefix}facebook link
├ ${prefix}twitter link
├ ${prefix}instagram link
│
├「 INFO-MENU 」
├ ${prefix}translate (kode bahasa|kalimat)
├ ${prefix}gempa
│
├「 Thanks To」
├ Geni-Panas Team
├ and all sup
│
│ *ᶜᵒᵈᵉ ʷⁱᵗʰ ˡᵒᵛᵉ ᶠʳᵒᵐ ˢⁱᵈᵒᵃʳʲᵒ ❤*
│
└──「 *I C H I* 」 `

}


exports.getGroupAdmins = function(participants){
    let admins  = []
	for (let i of participants) {
		i.admin  !== null ? admins.push(i.id) : ''
	}
	return admins
}

exports.groupOnly = function(){
    return "Perintah Ini Hanya Bisa Digunakan di Group!"
}

exports.adminsOnly = function(){
    return "Perintah Ini Hanya Bisa Digunakan Admin Group!"
}

exports.err = (cmd, err) => {
    return `Error ${cmd}: ${err}`
}

exports.noUrl = () => {
    return "Input Harus Berupa Url!"
}