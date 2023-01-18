const chalk = require("chalk");
const fs = require("fs");

global.allmenu = (prefix, hituet) => {
  return `
┌──⭓ *Owner Menu*
│
│⭔ ${prefix}self
│⭔ ${prefix}public
│⭔ ${prefix}setnamabot
│⭔ ${prefix}join [link]
│⭔ ${prefix}addprem [number]
│⭔ ${prefix}delprem [number]
│⭔ ${prefix}bcgroup [text]
│⭔ ${prefix}bcall [text]
│⭔ ${prefix}setppbot [image]
│⭔ ${prefix}setexif
│⭔ ${prefix}anticall [on/off]
│⭔ ${prefix}setstatus
│⭔ ${prefix}setnamebot
│
└───────⭓

┌──⭓ *OPEN AI*
│
│⭔ ${prefix}ai [text]
│
└───────⭓


┌──⭓ *Group Menu*
│
│⭔ ${prefix}linkgroup
│⭔ ${prefix}ephemeral [option]
│⭔ ${prefix}setppgc [image]
│⭔ ${prefix}setname [text]
│⭔ ${prefix}setdesc [text]
│⭔ ${prefix}group [option]
│⭔ ${prefix}editinfo [option]
│⭔ ${prefix}add @user
│⭔ ${prefix}kick @user
│⭔ ${prefix}hidetag [text]
│⭔ ${prefix}tagall [text]
│⭔ ${prefix}totag [reply]
│⭔ ${prefix}antilink [on/off]
│⭔ ${prefix}mute [on/off]
│⭔ ${prefix}promote @user
│⭔ ${prefix}demote @user
│⭔ ${prefix}vote [text]
│⭔ ${prefix}devote
│⭔ ${prefix}upvote
│⭔ ${prefix}cekvote
│⭔ ${prefix}hapusvote
│
└───────⭓


┌──⭓ *Convert Menu*
│
│⭔ ${prefix}sticker [image] 
│⭔ ${prefix}stickergif [gif]
│⭔ ${prefix}stickerwm [image]
│⭔ ${prefix}smeme [image] 
│⭔ ${prefix}emojimix [emoji1+emoji2]
│
└───────⭓


┌──⭓ *Downloader Menu*
│
│⭔ ${prefix}ttdl [url]
│⭔ ${prefix}facebook [url]
│⭔ ${prefix}pinterest [url]
│⭔ ${prefix}ytmp3 [url]
│⭔ ${prefix}ytmp4 [url]
│⭔ ${prefix}igdl [url]
│⭔ ${prefix}instagramdownload [url]
│
└───────⭓
`;
};

global.ownermenu = (prefix) => {
  return `┌──⭓ *Owner Menu*
  │
  │⭔ ${prefix}self
  │⭔ ${prefix}public
  │⭔ ${prefix}setnamabot
  │⭔ ${prefix}join [link]
  │⭔ ${prefix}addprem [number]
  │⭔ ${prefix}delprem [number]
  │⭔ ${prefix}bcgroup [text]
  │⭔ ${prefix}bcall [text]
  │⭔ ${prefix}setppbot [image]
  │⭔ ${prefix}setexif
  │⭔ ${prefix}anticall [on/off]
  │⭔ ${prefix}setstatus
  │⭔ ${prefix}setnamebot
  │
  └───────⭓
`;
};

global.convertmenu = (prefix) => {
  return `
┌──⭓ *Convert Menu*
│
│⭔ ${prefix}sticker [image] 
│⭔ ${prefix}stickergif [gif]
│⭔ ${prefix}stickerwm [image]
│⭔ ${prefix}smeme [image] 
│⭔ ${prefix}emojimix [emoji1+emoji2]
│
└───────⭓`;
};

global.openai = (prefix) => {
  return `
┌──⭓ *OPEN AI*
│
│⭔ ${prefix}ai [text]
│
└───────⭓`;
};

global.downloadmenu = (prefix) => {
  return `
  
┌──⭓ *Downloader Menu*
│
│⭔ ${prefix}ttdl [url]
│⭔ ${prefix}facebook [url]
│⭔ ${prefix}pinterest [url]
│⭔ ${prefix}play [query]
│⭔ ${prefix}ytmp3 [url]
│⭔ ${prefix}ytmp4 [url]
│
└───────⭓`;
};

global.groupmenu = (prefix) => {
  return `
  ┌──⭓ *Owner Menu*
  │
  │⭔ ${prefix}self
  │⭔ ${prefix}public
  │⭔ ${prefix}setnamabot
  │⭔ ${prefix}join [link]
  │⭔ ${prefix}addprem [number]
  │⭔ ${prefix}delprem [number]
  │⭔ ${prefix}bcgroup [text]
  │⭔ ${prefix}bcall [text]
  │⭔ ${prefix}setppbot [image]
  │⭔ ${prefix}setexif
  │⭔ ${prefix}anticall [on/off]
  │⭔ ${prefix}setstatus
  │⭔ ${prefix}setnamebot
  │
  └───────⭓
`;
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
