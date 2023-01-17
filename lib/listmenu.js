const chalk = require("chalk");
const fs = require("fs");

global.allmenu = (prefix, hituet) => {
  return `🅞 = Khusus Owner
G = Khusus Group
F = Free User
P = Premium

   Owner Menu
${(hituet += 1)} ${prefix}bc 🅞
${(hituet += 1)} ${prefix}join 🅞
${(hituet += 1)} ${prefix}shutdown 🅞
${(hituet += 1)} ${prefix}autodltt 🅞
${(hituet += 1)} ${prefix}autosticker 🅞
${(hituet += 1)} ${prefix}setppbot 🅞
${(hituet += 1)} ${prefix}addprem 🅞
${(hituet += 1)} ${prefix}delprem 🅞
${(hituet += 1)} ${prefix}addowner 🅞
${(hituet += 1)} ${prefix}delowner 🅞
${(hituet += 1)} ${prefix}addlist 🅞
${(hituet += 1)} ${prefix}dellist 🅞
${(hituet += 1)} ${prefix}updatelist 🅞
${(hituet += 1)} ${prefix}listnya 🅞
${(hituet += 1)} ${prefix}addvn 🅞
${(hituet += 1)} ${prefix}delvn 🅞
${(hituet += 1)} ${prefix}listvn 🅞
${(hituet += 1)} ${prefix}ban add 🅞
${(hituet += 1)} ${prefix}ban del 🅞

   Open AI
${(hituet += 1)} ${prefix}ai 🅕

   Group Menu
${(hituet += 1)} ${prefix}linkgroup G
${(hituet += 1)} ${prefix}ephemeral [option] G
${(hituet += 1)} ${prefix}setppgc [image] G
${(hituet += 1)} ${prefix}setname [text] G
${(hituet += 1)} ${prefix}setdesc [text] G
${(hituet += 1)} ${prefix}group [option] G
${(hituet += 1)} ${prefix}editinfo [option] G
${(hituet += 1)} ${prefix}add 628xxx G
${(hituet += 1)} ${prefix}kick @user G
${(hituet += 1)} ${prefix}hidetag [text] G
${(hituet += 1)} ${prefix}tagall [text] G
${(hituet += 1)} ${prefix}totag [reply] G
${(hituet += 1)} ${prefix}antilink [on/off] G
${(hituet += 1)} ${prefix}mute [on/off] G
${(hituet += 1)} ${prefix}promote @user G
${(hituet += 1)} ${prefix}demote @user G
${(hituet += 1)} ${prefix}vote [text] G
${(hituet += 1)} ${prefix}devote G
${(hituet += 1)} ${prefix}upvote G
${(hituet += 1)} ${prefix}cekvote G
${(hituet += 1)} ${prefix}hapusvote G

   Convert Menu
${(hituet += 1)} ${prefix}sticker [image] F
${(hituet += 1)} ${prefix}stickergif [gif] F
${(hituet += 1)} ${prefix}stickerwm [image] F
${(hituet += 1)} ${prefix}smeme [image] F
${(hituet += 1)} ${prefix}emojimix [emoji1+emoji2] F

   Downloader Menu
${(hituet += 1)} ${prefix}ytmp3 [url]
${(hituet += 1)} ${prefix}tiktokdl [url] 
${(hituet += 1)} ${prefix}ttdl [url]
${(hituet += 1)} ${prefix}fbdl [url]
${(hituet += 1)} ${prefix}fbmp4 [url]
${(hituet += 1)} ${prefix}pinterest [gambar yang ingin dicari]
`;
};

global.ownermenu = (prefix) => {
  return `🅞 = Khusus Owner
🅖 = Khusus Group
🅕 = Free User
🅟 = Premium

   Owner Menu
${prefix}bc 🅞
${prefix}join 🅞
${prefix}shutdown 🅞
${prefix}autodltt 🅞
${prefix}autosticker 🅞
${prefix}setppbot 🅞
${prefix}addprem 🅞
${prefix}delprem 🅞
${prefix}addowner 🅞
${prefix}delowner 🅞
${prefix}addlist 🅞
${prefix}dellist 🅞
${prefix}updatelist 🅞
${prefix}listnya 🅞
${prefix}addvn 🅞
${prefix}delvn 🅞
${prefix}listvn 🅞
${prefix}ban add 🅞
${prefix}ban del 🅞
`;
};

global.convertmenu = (prefix) => {
  return `🅞 = Khusus Owner
 🅖 = Khusus Group
 🅕 = Free User
 🅟 = Premium

   Convert Menu
${prefix}sticker [image] F
${prefix}stickergif [gif] F
${prefix}stickerwm [image] F
${prefix}smeme [image] F
${prefix}emojimix [emoji1+emoji2] F
 `;
};

global.openai = (prefix) => {
  return `🅞 = Khusus Owner
  🅖 = Khusus Group
  🅕 = Free User
  🅟 = Premium
 
    Open AI
 ${prefix}ai [text] F
  `;
};

global.downloadmenu = (prefix) => {
  return `🅞 = Khusus Owner
🅖 = Khusus Group
🅕 = Free User
🅟 = Premium

   Download Menu
${prefix}ytmp3 [url]
${prefix}tiktokdl [url] 
${prefix}ttdl [url]
${prefix}fbdl [url]
${prefix}fbmp4 [url]
${prefix}pinterest [gambar yang ingin dicari]
`;
};

global.groupmenu = (prefix) => {
  return `🅞 = Khusus Owner
🅖 = Khusus Group
🅕 = Free User
🅟 = Premium

   Group Menu
${prefix}linkgroup G
${prefix}ephemeral [option] G
${prefix}setppgc [image] G
${prefix}setname [text] G
${prefix}setdesc [text] G
${prefix}group [option] G
${prefix}editinfo [option] G
${prefix}add 628xxx G
${prefix}kick @user G
${prefix}hidetag [text] G
${prefix}tagall [text] G
${prefix}totag [reply] G
${prefix}antilink [on/off] G
${prefix}mute [on/off] G
${prefix}promote @user G
${prefix}demote @user G
${prefix}vote [text] G
${prefix}devote G
${prefix}upvote G
${prefix}cekvote G
${prefix}hapusvote G
`;
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
