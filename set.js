const fs = require("fs");
const chalk = require("chalk");

global.APIs = {
  abot: "..",
};

global.APIKeys = {
  "..": "YOUR APIKEY",
};

// Other
global.hituet = 0;
global.apikey = [""];
global.apikeyprem = [""];
global.apikeyvip = ["YOUR APIKEY"];
global.namabot = ["Ahmuq Bot"];
global.namaowner = ["Ahlul Mukhramin"];
global.creator = "628126915328@s.whatsapp.net";
global.owner = ["628126915328", "62895329715990"];
global.packname = "© Powered By";
global.author = "Abot";
global.sessionName = "session";
global.prefa = ["", "!", ".", "🐦", "🐤", "🗿"];
global.prefix = [""];
global.symbol1 = "•";
global.symbol2 = ">";
global.wm = "© Ahlul Mukhramin";
global.mess = {
  success: "Success ✓",
  admin: "Fitur Khusus Admin Group!",
  botAdmin: "Bot Harus Menjadi Admin Terlebih Dahulu!",
  owner: "Fitur Khusus Owner Bot",
  group: "Fitur Khusus Group Chat",
  private: "Fitur Khusus Private Chat!",
  bot: "Fitur Khusus Nomor Bot",
  wait: "Wait...",
  waitdl: "Proses..., mohon ditunggu mungkin akan memakan sedikit waktu :)",
  notregist:
    "Kamu belum terdaftar di database bot silahkan daftar terlebih dahulu dengan cara #verify",
  premium: "Kamu Bukan User Premium, Beli Sana Ke Owner Bot",
  endLimit:
    "Limit Harian Anda Telah Habis, Limit Akan Direset Setiap Pukul 00:00 WIB.",
};
global.limitawal = {
  free: "100",
  premium: "unlimited",
};
global.thumb = fs.readFileSync("./media/img/1.png");
global.qris = { url: "https://telegra.ph/file/052a898e9741a8738f71e.jpg" };

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.greenBright(`Update'${__filename}'`));
  delete require.cache[file];
  require(file);
});
