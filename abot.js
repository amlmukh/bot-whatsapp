require("./set.js");
require("./lib/listmenu");
const {
  BufferJSON,
  WA_DEFAULT_EPHEMERAL,
  generateWAMessageFromContent,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  areJidsSameUser,
  getContentType,
} = require("@adiwajshing/baileys");

const fs = require("fs");
const os = require("os");
const speed = require("performance-now");
const axios = require("axios");
const path = require("path");
const util = require("util");
const chalk = require("chalk");
const timeZone = require("moment-timezone");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;

const ffmpeg = require("fluent-ffmpeg");
const { Configuration, OpenAIApi } = require("openai");
ffmpeg.setFfmpegPath(ffmpegPath);
let setting = require("./database/key.json");
var space = require("to-space-case");
const { performance } = require("perf_hooks");
const { JSDOM } = require("jsdom");
const { spawn, exec, execSync } = require("child_process");

// lib
const {
  smsg,
  formatp,
  tanggal,
  formatDate,
  getTime,
  isUrl,
  sleep,
  clockString,
  runtime,
  fetchJson,
  getBuffer,
  jsonformat,
  format,
  parseMention,
  getRandom,
  getGroupAdmins,
  makeid,
} = require("./lib/myfunc");
const {
  media_JSON,
  mess_JSON,
  setting_JSON,
  antilink_JSON,
  db_user_JSON,
  server_eror_JSON,
  welcome_JSON,
  db_menfes_JSON,
  db_respon_list_JSON,
  auto_downloadTT_JSON,
} = require("./lib/Data_Location.js");
const { jadibot, conns } = require("./lib/jadibot");

// Time
const hariini = timeZone.tz("Asia/Jakarta").format("dddd, DD MMMM YYYY");
const barat = timeZone.tz("Asia/Jakarta").format("HH:mm:ss");
const tengah = timeZone.tz("Asia/Makassar").format("HH:mm:ss");
const timur = timeZone.tz("Asia/Jayapura").format("HH:mm:ss");
const youtube = "https://youtube.com/c/ahmuq";
const wa = `0@s.whatsapp.net`;
const owner = global.owner + "@s.whatsapp.net";
const nyoutube = "muq";
const db_user = db_user_JSON;
var time = timeZone.tz("Asia/Jakarta").format("HH:mm:ss");

// read database
let user = JSON.parse(fs.readFileSync("./database/pengguna.json"));

const cekUser = (satu, dua) => {
  let x1 = false;
  Object.keys(db_user).forEach((i) => {
    if (db_user[i].id == dua) {
      x1 = i;
    }
  });
  if (x1 !== false) {
    if (satu == "id") {
      return db_user[x1].id;
    }
    if (satu == "name") {
      return db_user[x1].name;
    }
    if (satu == "seri") {
      return db_user[x1].seri;
    }
    if (satu == "premium") {
      return db_user[x1].premium;
    }
  }
  if (x1 == false) {
    return null;
  }
};

module.exports = abot = async (abot, m, store, chatUpdate, mek) => {
  try {
    var body =
      m.mtype === "conversation"
        ? m.message.conversation
        : m.mtype == "imageMessage"
        ? m.message.imageMessage.caption
        : m.mtype == "videoMessage"
        ? m.message.videoMessage.caption
        : m.mtype == "extendedTextMessage"
        ? m.message.extendedTextMessage.text
        : m.mtype == "buttonsResponseMessage"
        ? m.message.buttonsResponseMessage.selectedButtonId
        : m.mtype == "listResponseMessage"
        ? m.message.listResponseMessage.singleSelectReply.selectedRowId
        : m.mtype == "templateButtonReplyMessage"
        ? m.message.templateButtonReplyMessage.selectedId
        : m.mtype === "messageContextInfo"
        ? m.message.buttonsResponseMessage?.selectedButtonId ||
          m.message.listResponseMessage?.singleSelectReply.selectedRowId ||
          m.text
        : "";
    var budy = typeof m.text == "string" ? m.text : "";
    var prefix = prefa
      ? /^[Â°â€¢Ï€Ã·Ã—Â¶âˆ†Â£Â¢â‚¬Â¥Â®â„¢+âœ“_=|~!?@#$%^&.Â©^]/gi.test(body)
        ? body.match(
            /^[Â°â€¢Ï€Ã·Ã—Â¶âˆ†Â£Â¢â‚¬Â¥Â®â„¢+âœ“_=|~!?@#$%^&.Â©^]/gi
          )[0]
        : ""
      : prefa ?? global.prefix;
    const isCmd = body.startsWith(prefix);
    const command = body
      .replace(prefix, "")
      .trim()
      .split(/ +/)
      .shift()
      .toLowerCase();
    const args = body.trim().split(/ +/).slice(1);
    const text = (q = url = args.join(" "));
    const fatkuns = m.quoted || m;
    const reply = m.reply;
    const quoted =
      fatkuns.mtype == "buttonsMessage"
        ? fatkuns[Object.keys(fatkuns)[1]]
        : fatkuns.mtype == "templateMessage"
        ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]]
        : fatkuns.mtype == "product"
        ? fatkuns[Object.keys(fatkuns)[0]]
        : m.quoted
        ? m.quoted
        : m;
    const mime = (quoted.msg || quoted).mimetype || "";
    const qmsg = quoted.msg || quoted;
    const from = m.chat;
    const from1 = m.key.remoteJid;
    const isMedia = /image|video|sticker|audio/.test(
      m.quoted ? m.quoted.mtype : m.mtype
    );
    const isVideo = (m.quoted ? m.quoted.mtype : m.mtype) == "videoMessage";
    const isImage = (m.quoted ? m.quoted.mtype : m.mtype) == "imageMessage";
    const pushname = m.pushName || "No Name";
    const botNumber = await abot.decodeJid(abot.user.id);
    const isCreator = [botNumber, ...global.owner]
      .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
      .includes(m.sender);
    const isOwner = [botNumber, ...global.owner]
      .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
      .includes(m.sender);
    const myNumber = m.sender == botNumber ? true : false;
    const isGroup = m.key.remoteJid.endsWith("@g.us");
    const sender = isGroup
      ? m.key.participant
        ? m.key.participant
        : m.participant
      : m.key.remoteJid;
    //const isRegist = cekUser(sender)

    const color = (text, color) => {
      return !color ? chalk.green(text) : chalk.keyword(color)(text);
    };

    // Group
    const groupMetadata = m.isGroup
      ? await abot.groupMetadata(m.chat).catch((e) => {})
      : "";
    const groupName = m.isGroup ? groupMetadata.subject : "";
    const participants = m.isGroup ? await groupMetadata.participants : "";
    const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : "";
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
    const isPremium = isOwner || cekUser("premium", sender) == true;

    // Limit
    try {
      let isNumber = (x) => typeof x === "number" && !isNaN(x);
      let limitUser = isPremium
        ? global.limitawal.premium
        : global.limitawal.free;
      let user = global.db.data.users[m.sender];
      if (typeof user !== "object") global.db.data.users[m.sender] = {};

      // Afk
      if (user) {
        if (!isNumber(user.afkTime)) user.afkTime = -1;
        if (!("afkReason" in user)) user.afkReason = "";
        if (!isNumber(user.limit)) user.limit = limitUser;
      } else
        global.db.data.users[m.sender] = {
          afkTime: -1,
          afkReason: "",
          limit: limitUser,
        };

      let chats = global.db.data.chats[m.chat];
      if (typeof chats !== "object") global.db.data.chats[m.chat] = {};
      if (chats) {
        if (!("mute" in chats)) chats.mute = false;
        if (!("antilink" in chats)) chats.antilink = true;
      } else
        global.db.data.chats[m.chat] = {
          mute: false,
          antilink: true,
        };

      // Reset Limit
      let cron = require("node-cron");
      cron.schedule(
        "00 12 * * *",
        () => {
          let user = Object.keys(global.db.data.users);
          let limitUser = isPremium
            ? global.limitawal.premium
            : global.limitawal.free;
          for (let jid of user) global.db.data.users[jid].limit = limitUser;
          console.log("Reseted Limit");
        },
        {
          scheduled: true,
          timezone: "Asia/Jakarta",
        }
      );

      let setting = global.db.data.settings[botNumber];
      if (typeof setting !== "object") global.db.data.settings[botNumber] = {};
      if (setting) {
        if (!isNumber(setting.status)) setting.status = 0;
        if (!("autobio" in setting)) setting.autobio = true;
        if (!("templateImage" in setting)) setting.templateImage = true;
        if (!("templateVideo" in setting)) setting.templateVideo = false;
        if (!("templateGif" in setting)) setting.templateGif = false;
        if (!("templateMsg" in setting)) setting.templateMsg = false;
        if (!("templateLocation" in setting)) setting.templateLocation = false;
      } else
        global.db.data.settings[botNumber] = {
          status: 0,
          autobio: true,
          templateImage: true,
          templateVideo: false,
          templateGif: false,
          templateMsg: false,
          templateLocation: false,
        };
    } catch (err) {
      console.error(err);
    }

    async function replyprem(teks) {
      let buttons = [
        {
          buttonId: ".buypremium",
          buttonText: { displayText: "⬆️ Upgrade Premium" },
          type: 1,
        },
      ];
      return abot.sendButtonText(
        m.chat,
        buttons,
        teks,
        `Fiture ini khusus premium`,
        m
      );
    }

    // OpenAI Setting
    if (setting.autoAI) {
      if (budy) {
        try {
          if (setting.keyopenai === "ISI_APIKEY_OPENAI_DISINI")
            return reply(
              "Apikey belum diisi\n\nSilahkan isi terlebih dahulu apikeynya di file key.json\n\nApikeynya bisa dibuat di website: https://beta.openai.com/account/api-keys"
            );
          const configuration = new Configuration({
            apiKey: setting.keyopenai,
          });
          const openai = new OpenAIApi(configuration);

          const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: budy,
            temperature: 0.3,
            max_tokens: 3000,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
          });
          m.reply(`${response.data.choices[0].text}\n\n`);
        } catch (err) {
          console.log(err);
          m.reply("Maaf, sepertinya ada yang error");
        }
      }
    }

    function mentions(teks, mems = [], id) {
      if (id == null || id == undefined || id == false) {
        let res = abot.sendMessage(from, { text: teks, mentions: mems });
        return res;
      } else {
        let res = abot.sendMessage(
          from,
          { text: teks, mentions: mems },
          { quoted: msg }
        );
        return res;
      }
    }

    // Anti Link
    if (db.data.chats[m.chat].antilink) {
      if (budy.match(`chat.whatsapp.com`)) {
        if (!isBotAdmins) return m.reply(`Ehh bot gak admin`);
        let gclink =
          `https://chat.whatsapp.com/` + (await abot.groupInviteCode(m.chat));
        let isLinkThisGc = new RegExp(gclink, "i");
        let isgclink = isLinkThisGc.test(m.text);
        if (isgclink) return m.reply(`Ngapain Lu Ngirim Link Group Ini?`);
        if (isAdmins) return m.reply(`Admin Mah Bebas Yakan?`);
        if (isOwner) return m.reply(`Owner Bot Mah Bebas Yakan?`);
        m.reply(
          `[ *ANTI LINK* ]\n\nKamu Terdeteksi Mengirim Link Grup, Kamu Akan Di Kick!!!`
        );
        abot.groupParticipantsUpdate(m.chat, [m.sender], "remove");
      }
    }

    // Sayying time
    const hours = timeZone().tz("Asia/Jakarta").format("HH:mm:ss");
    if (hours < "23:59:00") {
      var sayyingTime = "Selamat Malam 🌃";
    }
    if (hours < "19:00:00") {
      var sayyingTime = "Selamat Petang 🌆";
    }
    if (hours < "18:00:00") {
      var sayyingTime = "Selamat Sore 🌅";
    }
    if (hours < "15:00:00") {
      var sayyingTime = "Selamat Siang 🏙";
    }
    if (hours < "10:00:00") {
      var sayyingTime = "Selamat Pagi 🌄";
    }
    if (hours < "05:00:00") {
      var sayyingTime = "Selamat Subuh 🌉";
    }
    if (hours < "03:00:00") {
      var sayyingTime = "Selamat Tengah Malam 🌌";
    }
    // auto set bio
    if (db.data.settings[botNumber].autobio) {
      let setting = global.db.data.settings[botNumber];
      if (new Date() * 1 - setting.status > 1000) {
        let uptime = await runtime(process.uptime());
        await abot.setStatus(
          `${global.namabot} | Runtime : ${runtime(process.uptime())}`
        );
        setting.status = new Date() * 1;
      }
    }

    // Respon Cmd with media
    if (
      isMedia &&
      m.msg.fileSha256 &&
      m.msg.fileSha256.toString("base64") in global.db.data.sticker
    ) {
      let hash = global.db.data.sticker[m.msg.fileSha256.toString("base64")];
      let { text, mentionedJid } = hash;
      let messages = await generateWAMessage(
        m.chat,
        { text: text, mentions: mentionedJid },
        {
          userJid: abot.user.id,
          quoted: ftroli.quoted && m.quoted.fakeObj,
        }
      );
      messages.key.fromMe = areJidsSameUser(m.sender, abot.user.id);
      messages.key.id = m.key.id;
      messages.pushName = m.pushName;
      if (m.isGroup) messages.participant = m.sender;
      let msg = {
        ...chatUpdate,
        messages: [proto.WebMessageInfo.fromObject(messages)],
        type: "append",
      };
      abot.ev.emit("messages.upsert", msg);
    }

    // Public & Self
    if (!abot.public) {
      if (!m.key.fromMe) return;
    }

    async function sendAbotMessage(chatId, message, options = {}) {
      let generate = await generateWAMessage(chatId, message, options);
      let type2 = getContentType(generate.message);
      if ("contextInfo" in options)
        generate.message[type2].contextInfo = options?.contextInfo;
      if ("contextInfo" in message)
        generate.message[type2].contextInfo = message?.contextInfo;
      return await abot.relayMessage(chatId, generate.message, {
        messageId: generate.key.id,
      });
    }

    var mdu = ["red", "green", "yellow", "blue", "magenta", "cyan", "white"];
    var halalu = mdu[Math.floor(Math.random() * mdu.length)];
    var mdo = ["red", "green", "yellow", "blue", "magenta", "cyan", "white"];
    var halalo = mdo[Math.floor(Math.random() * mdo.length)];
    var mdi = ["red", "green", "yellow", "blue", "magenta", "cyan", "white"];
    var halali = mdi[Math.floor(Math.random() * mdi.length)];
    var mda = ["red", "green", "yellow", "blue", "magenta", "cyan", "white"];
    var halala = mda[Math.floor(Math.random() * mda.length)];
    var mde = ["red", "green", "yellow", "blue", "magenta", "cyan", "white"];
    var halale = mde[Math.floor(Math.random() * mde.length)];

    // Push Message To Console && Auto Read
    if (m.message) {
      abot.readMessages([m.key]);
      console.log(
        chalk.yellow.bgCyan.bold(" - AHMUQ BOT "),
        color(`[ PESAN ]`, `${halalu}`),
        color(`FROM`, `${halalo}`),
        color(`${pushname}`, `${halali}`),
        color(`Text :`, `${halala}`),
        color(`${body}`, `${halale}`)
      );
    }

    let mentionUser = [
      ...new Set([
        ...(m.mentionedJid || []),
        ...(m.quoted ? [m.quoted.sender] : []),
      ]),
    ];
    for (let jid of mentionUser) {
      let user = global.db.data.users[jid];
      if (!user) continue;
      let afkTime = user.afkTime;
      if (!afkTime || afkTime < 0) continue;
      let reason = user.afkReason || "";
      m.reply(
        `
Jangan tag dia!
Dia sedang AFK ${reason ? "dengan alasan " + reason : "tanpa alasan"}
Selama ${clockString(new Date() - afkTime)}
`.trim()
      );
    }

    if (db.data.users[m.sender].afkTime > -1) {
      let user = global.db.data.users[m.sender];
      abot.sendTextWithMentions(
        m.chat,
        `@${m.sender.split("@")[0]} berhenti AFK${
          user.afkReason ? " setelah " + user.afkReason : ""
        }
Selama ${clockString(new Date() - user.afkTime)}`
      );
      user.afkTime = -1;
      user.afkReason = "";
    }

    const reSize = async (buffer, ukur1, ukur2) => {
      return new Promise(async (resolve, reject) => {
        let jimp = require("jimp");
        var baper = await jimp.read(buffer);
        var ab = await baper
          .resize(ukur1, ukur2)
          .getBufferAsync(jimp.MIME_JPEG);
        resolve(ab);
      });
    };

    const ftroli = {
      key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast",
      },
      message: {
        orderMessage: {
          itemCount: 99999,
          status: 200,
          thumbnail: await reSize(thumb, 100, 100),
          surface: 200,
          message: `Ahlul`,
          orderTitle: "Ahlul",
          sellerJid: "0@s.whatsapp.net",
        },
      },
      contextInfo: { forwardingScore: 999, isForwarded: true },
      sendEphemeral: true,
    };
    const fdoc = {
      key: {
        participant: "0@s.whatsapp.net",
        ...(m.chat ? { remoteJid: `status@broadcast` } : {}),
      },
      message: {
        documentMessage: {
          title: `Ahlul`,
          jpegThumbnail: await reSize(thumb, 100, 100),
        },
      },
    };
    const fkontak = {
      key: {
        participant: `0@s.whatsapp.net`,
        ...(m.chat ? { remoteJid: `status@broadcast` } : {}),
      },
      message: {
        contactMessage: {
          displayName: `Ahlul`,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;ytname,;;;\nFN:ytname\nitem1.TEL;waid=6289512545999:6289512545999\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
          jpegThumbnail: await reSize(thumb, 100, 100),
          thumbnail: await reSize(thumb, 100, 100),
          sendEphemeral: true,
        },
      },
    };

    function pickRandom(list) {
      return list[Math.floor(list.length * Math.random())];
    }

    const seactions = [
      {
        title: `𝐒𝐈𝐋𝐀𝐇𝐊𝐀𝐍 𝐏𝐈𝐋𝐈𝐇 𝐃𝐈 𝐁𝐀𝐖𝐀𝐇`,
        rows: [
          { title: `👌 All menu`, rowId: `allmenu` },
          { title: `📼 Owner menu`, rowId: `ownermenu` },
          { title: `🤖 Open AI`, rowId: `openai` },
          { title: `🎶 Download menu`, rowId: `downloadmenu` },
          { title: `📼 Group menu`, rowId: `groupmenu` },
          { title: `🙌 Converter Menu`, rowId: `convertmenu` },
        ],
      },
    ];

    const listMenuMessage = {
      text: `Hai @${
        sender.split("@")[0]
      } Pencet Button List Menunya Nya Di Bawah Ya`,
      buttonText: "🪀 MENU 🪀",
      sections: seactions,
      listType: 1,
    };

    const backMenu = {
      buttonText: "🪀 OTHER MENU 🪀",
      sections: seactions,
      listType: 1,
    };

    // End
    switch (command) {
      // Start Cmd
      case "verify":
      case "register":
      case "daftar":
      case "regis":
        {
          if (cekUser("id", sender) !== null)
            return reply("Kamu sudah terdaftar !!");
          var res_us = `${makeid(10)}`;
          var user_name = `#GR${makeid(5)}`;
          let object_user = {
            id: sender,
            name: user_name,
            seri: res_us,
            premium: false,
          };
          db_user.push(object_user);
          fs.writeFileSync(
            "./database/pengguna.json",
            JSON.stringify(db_user, 2, null)
          );
          mentions(`𝖬𝖾𝗆𝗎𝖺𝗍 𝖴𝗌𝖾𝗋 @${sender.split("@")[0]}`, [sender]);
          await sleep(1500);
          var verify_teks = `───「 𝗧𝗘𝗥𝗩𝗘𝗥𝗜𝗙𝗜𝗞𝗔𝗦𝗜 」────

○ ID : @${sender.split("@")[0]}
○ Name : ${user_name}
○ Seri : ${res_us}

silahkan ketik #rules
untuk membaca rules bot
`;
          var buttonMessage = {
            text: verify_teks,
            footer: "Klik button untuk melihat menu",
            mentions: [sender],
            buttons: [
              {
                buttonId: "#menu",
                buttonText: { displayText: "️⋮☰ 𝗠𝗘𝗡𝗨" },
                type: 1,
              },
            ],
            headerType: 1,
          };
          abot.sendMessage(from, buttonMessage, { quoted: m });
        }
        break;

      case "menu":
      case "help":
      case "m":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          let me = m.sender;
          let usernya = `${("id", db_user).length}`;
          let menu = `
*Hello ${pushname} 👋, ${sayyingTime}*,`;
          let menunya = `
*INFO USER*
Name: ${pushname}
Nomor: @${me.split("@")[0]}
Premium: ${isPremium ? "✅" : `❌`}
Limit: ${isPremium ? "Unlimited" : `${db.data.users[m.sender].limit}`}

*INFO BOT*
Nama Bot: ${global.namabot}
Owner: @${owner.split("@")[0]}
Mode: ${abot.public ? "Public" : `Self`}
Prefix:「 MULTI-PREFIX 」
User pada database : ${usernya} User

*TIME*
Date: ${hariini}
Wib: ${barat} WIB
Wita: ${tengah} WITA
Wit: ${timur} WIT`;
          let buttons = [
            {
              buttonId: `cmd`,
              buttonText: { displayText: "Menu" },
              type: 1,
            },
            {
              buttonId: `donasi`,
              buttonText: { displayText: "Donasi" },
              type: 1,
            },
            {
              buttonId: `owner`,
              buttonText: { displayText: "Owner" },
              type: 1,
            },
          ];
          let buttonMessage = {
            image: fs.readFileSync(`./media/img/1.png`),
            caption: `${menu}`,
            footer: `${menunya}\n\n${global.wm}`,
            buttons: buttons,
            headerType: 3,
          };
          abot.sendMessage(m.chat, buttonMessage, { quoted: ftroli });
        }
        break;

      case "cmd":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          abot.sendMessage(from, listMenuMessage);
        }
        break;

      case "allmenu":
        if (cekUser("id", sender) == null) return reply(mess.notregist);
        sendAbotMessage(from, {
          text: `Hai Kak @${sender.split("@")[0]}\n\n${allmenu(
            prefix,
            hituet
          )}`,
        });
        break;

      case "ownermenu":
        if (cekUser("id", sender) == null) return reply(mess.notregist);
        sendAbotMessage(from, {
          text: `Hai Kak @${sender.split("@")[0]}\n\n${ownermenu(
            prefix,
            hituet
          )}`,
          mentions: [sender],
          contextInfo: {
            mentionedJid: [sender],
          },
        });
        break;

      case "groupmenu":
        if (cekUser("id", sender) == null) return reply(mess.notregist);
        sendAbotMessage(from, {
          text: `Hai Kak @${sender.split("@")[0]}\n\n${groupmenu(
            prefix,
            hituet
          )}`,
          mentions: [sender],
          contextInfo: {
            mentionedJid: [sender],
          },
        });
        break;

      case "openai":
        if (cekUser("id", sender) == null) return reply(mess.notregist);
        sendAbotMessage(from, {
          text: `Hai Kak @${sender.split("@")[0]}\n\n${openai(prefix, hituet)}`,
          mentions: [sender],
          contextInfo: {
            mentionedJid: [sender],
          },
        });
        break;

      case "downloadmenu":
        if (cekUser("id", sender) == null) return reply(mess.notregist);
        sendAbotMessage(from, {
          text: `Hai Kak @${sender.split("@")[0]}\n\n${downloadmenu(
            prefix,
            hituet
          )}`,
          mentions: [sender],
          contextInfo: {
            mentionedJid: [sender],
          },
        });
        break;

      case "convertmenu":
        if (cekUser("id", sender) == null) return reply(mess.notregist);
        sendAbotMessage(from, {
          text: `Hai Kak @${sender.split("@")[0]}\n\n${convertmenu(
            prefix,
            hituet
          )}`,
          mentions: [sender],
          contextInfo: {
            mentionedJid: [sender],
          },
        });
        break;

      // Owner
      case "author":
      case "owner":
      case "creator":
        {
          abot.sendContact(m.chat, global.owner, m);
        }
        break;

      case "tqto":
      case "thanksto":
      case "contributor":
        {
          let tqto = `
*THANKS TO*`;
          let tag = `
@Adiwajshing (Baileys)
@Thanks To Allah
@Thanks To Me`;
          let buttons = [
            {
              buttonId: `rules`,
              buttonText: { displayText: "Rules" },
              type: 1,
            },
            {
              buttonId: `donasi`,
              buttonText: { displayText: "Donasi" },
              type: 1,
            },
            {
              buttonId: `owner`,
              buttonText: { displayText: "Owner" },
              type: 1,
            },
          ];
          let buttonMessage = {
            image: { url: "./media/img/1.png" },
            caption: `${tqto}`,
            footer: `${tag}\n\n${global.wm}`,
            buttons: buttons,
            headerType: 4,
          };
          abot.sendMessage(m.chat, buttonMessage, { quoted: ftroli });
        }
        break;

      case "rules":
        {
          let rules = `
*RULES*`;
          let rulesnya = `
1. Jangan Pernah Spam Bot
2. Jangan Call Nomer Bot
3. Jangan Mengeksploitasi Bot

Sanksi : *Warn/Soft Block*
`;
          let buttons = [
            { buttonId: `menu`, buttonText: { displayText: "Menu" }, type: 1 },
            {
              buttonId: `donasi`,
              buttonText: { displayText: "Donasi" },
              type: 1,
            },
            {
              buttonId: `tqto`,
              buttonText: { displayText: "Thanks To" },
              type: 1,
            },
          ];
          let buttonMessage = {
            image: { url: "./media/img/1.png" },
            caption: `${rules}`,
            footer: `${rulesnya}\n\n${global.wm}`,
            buttons: buttons,
            headerType: 4,
          };
          abot.sendMessage(m.chat, buttonMessage, { quoted: ftroli });
        }
        break;

      case "donasi":
      case "donate":
        {
          let payment = `
*Hai Kak ${pushname}, ${sayyingTime}*`;
          let donate = `
donate to me so that the bot can develop more.

*e-wallet*
Dana: 08126915328
Gopay: 08126915328`;
          let buttons = [
            {
              buttonId: `rules`,
              buttonText: { displayText: "Rules" },
              type: 1,
            },
            { buttonId: `menu`, buttonText: { displayText: "Menu" }, type: 1 },
            {
              buttonId: `owner`,
              buttonText: { displayText: "Owner" },
              type: 1,
            },
          ];
          let buttonMessage = {
            image: { url: "./media/img/1.png" },
            caption: `${payment}`,
            footer: `${donate}\n\n${global.wm}`,
            buttons: buttons,
            headerType: 4,
          };
          abot.sendMessage(m.chat, buttonMessage, { quoted: ftroli });
        }
        break;

      // Main
      case "runtime":
      case "tes":
        {
          let lowq = `*Bot Telah Online Selama*\n*${runtime(
            process.uptime()
          )}*`;
          let buttons = [
            {
              buttonId: "donasi",
              buttonText: { displayText: "Donasi" },
              type: 1,
            },
          ];
          await abot.sendButtonText(m.chat, buttons, lowq, nyoutube, m, {
            quoted: fkontak,
          });
        }
        break;
      case "req":
      case "request":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          if (!text) throw `Example : ${prefix + command} Fitur Min`;
          let ownernya = owner + "@s.whatsapp.net";
          let me = m.sender;
          let pjtxt = `Pesan Dari : @${me.split("@")[0]} \nUntuk : @${
            ownernya.split("@")[0]
          }\n\n${command} ${text}`;
          let ments = [ownernya, me];
          let buttons = [
            {
              buttonId: "hehehe",
              buttonText: { displayText: "Thanks" },
              type: 1,
            },
          ];
          await abot.sendButtonText(ownernya, buttons, pjtxt, nyoutube, m, {
            mentions: ments,
            quoted: fdoc,
          });
          let akhji = `*Request Telah Terkirim*\n*Ke Owner @${
            ownernya.split("@")[0]
          }*\n_Terima Kasih🙏_`;
          await abot.sendButtonText(m.chat, buttons, akhji, nyoutube, m, {
            mentions: ments,
            quoted: fkontak,
          });
        }
        break;
      // Database
      case "ceklimit":
      case "checklimit":
      case "limit":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          m.reply("*Your limit:* " + db.data.users[m.sender].limit);
        }
        break;
      // Features
      case "afk":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          let user = global.db.data.users[m.sender];
          user.afkTime = +new Date();
          user.afkReason = text;
          m.reply(`${m.pushName} Telah Afk${text ? ": " + text : ""}`);
        }
        break;
      // User Menu

      case "buypremium":
      case "jadiowner":
      case "sewabot":
        {
          const seactiones = [
            {
              title: `LIST SEWABOT`,
              rows: [
                { title: `1 MINGGU`, rowId: `${prefix}sewakay 1minggu` },
                { title: `1 BULAN`, rowId: `${prefix}sewakay 1bulan` },
                { title: `1 TAHUN`, rowId: `${prefix}sewakay 1tahun` },
                { title: `PERMANENT`, rowId: `${prefix}sewakay permanent` },
              ],
            },
            {
              title: `LIST PREMIUM`,
              rows: [
                { title: `1 MINGGU`, rowId: `${prefix}premkay 1minggu` },
                { title: `1 BULAN`, rowId: `${prefix}premkay 1bulan` },
                { title: `1 TAHUN`, rowId: `${prefix}premkay 1tahun` },
                { title: `PERMANENT`, rowId: `${prefix}premkay permanent` },
              ],
            },
            {
              title: `LIST JADI OWNER`,
              rows: [
                { title: `1 MINGGU`, rowId: `${prefix}ownkay 1minggu` },
                { title: `1 BULAN`, rowId: `${prefix}ownkay 1bulan` },
                { title: `1 TAHUN`, rowId: `${prefix}ownkay 1tahun` },
                { title: `PERMANENT`, rowId: `${prefix}ownkay permanent` },
              ],
            },
          ];
          const listSw = {
            text: `Hai ${pushname}`,
            mentions: [sender],
            footer: `Mau ${command} ya? Silahkan Pencet Di Bawah Ya Kak`,
            buttonText: "SELECT",
            sections: seactiones,
            listType: 1,
          };
          abot.sendMessage(from, listSw, { quoted: m });
        }
        break;

      case "sewakay":
        if (args[0] == "1minggu") {
          reply(
            `Pesanan Kamu Sedang Di Proses Oleh Bot, Silahkan Tunggu Nanti Juga Di Chat Owner Untuk Di Konfirmasi`
          );
          abot.sendMessage(
            creator,
            {
              text: `*❏ ORDER ❏*
📮 : *Paket:* 10K • Sewabot 1 Minggu
- @${sender.split("@")[0]}`,
              mentions: [sender],
            },
            { quoted: m }
          );
        } else if (args[0] == "1bulan") {
          reply(
            `Pesanan Kamu Sedang Di Proses Oleh Bot, Silahkan Tunggu Nanti Juga Di Chat Owner Untuk Di Konfirmasi`
          );
          abot.sendMessage(
            creator,
            {
              text: `*❏ ORDER ❏*
📮 : *Paket:* 20K • Sewabot 1 Bulan
- @${sender.split("@")[0]}`,
              mentions: [sender],
            },
            { quoted: m }
          );
        } else if (args[0] == "1tahun") {
          reply(
            `Pesanan Kamu Sedang Di Proses Oleh Bot, Silahkan Tunggu Nanti Juga Di Chat Owner Untuk Di Konfirmasi`
          );
          abot.sendMessage(
            creator,
            {
              text: `*❏ ORDER ❏*
📮 : *Paket:* 35K • Sewabot 1 Tahun
- @${sender.split("@")[0]}`,
              mentions: [sender],
            },
            { quoted: m }
          );
        } else if (args[0] == "permanent") {
          reply(
            `Pesanan Kamu Sedang Di Proses Oleh Bot, Silahkan Tunggu Nanti Juga Di Chat Owner Untuk Di Konfirmasi`
          );
          abot.sendMessage(
            creator,
            {
              text: `*❏ ORDER ❏*
📮 : *Paket:* 45K • Sewabot Permanent
- @${sender.split("@")[0]}`,
              mentions: [sender],
            },
            { quoted: m }
          );
        }
        break;

      case "premkay":
        if (args[0] == "1minggu") {
          reply(
            `Pesanan Kamu Sedang Di Proses Oleh Bot, Silahkan Tunggu Nanti Juga Di Chat Owner Untuk Di Konfirmasi`
          );
          abot.sendMessage(
            creator,
            {
              text: `*❏ ORDER ❏*
📮 : *Paket:* 10K • Premium 1 Minggu
- @${sender.split("@")[0]}`,
              mentions: [sender],
            },
            { quoted: m }
          );
        } else if (args[0] == "1bulan") {
          reply(
            `Pesanan Kamu Sedang Di Proses Oleh Bot, Silahkan Tunggu Nanti Juga Di Chat Owner Untuk Di Konfirmasi`
          );
          abot.sendMessage(
            creator,
            {
              text: `*❏ ORDER ❏*
📮 : *Paket:* 20K • Premium 1 Bulan
- @${sender.split("@")[0]}`,
              mentions: [sender],
            },
            { quoted: m }
          );
        } else if (args[0] == "1tahun") {
          reply(
            `Pesanan Kamu Sedang Di Proses Oleh Bot, Silahkan Tunggu Nanti Juga Di Chat Owner Untuk Di Konfirmasi`
          );
          abot.sendMessage(
            creator,
            {
              text: `*❏ ORDER ❏*
📮 : *Paket:* 35K • Premium 1 Tahun
- @${sender.split("@")[0]}`,
              mentions: [sender],
            },
            { quoted: m }
          );
        } else if (args[0] == "permanent") {
          reply(
            `Pesanan Kamu Sedang Di Proses Oleh Bot, Silahkan Tunggu Nanti Juga Di Chat Owner Untuk Di Konfirmasi`
          );
          abot.sendMessage(
            creator,
            {
              text: `*❏ ORDER ❏*
📮 : *Paket:* 45K • Premium Permanent
- @${sender.split("@")[0]}`,
              mentions: [sender],
            },
            { quoted: m }
          );
        }
        break;
      case "botkay":
        if (args[0] == "1minggu") {
          reply(
            `Pesanan Kamu Sedang Di Proses Oleh Bot, Silahkan Tunggu Nanti Juga Di Chat Owner Untuk Di Konfirmasi`
          );
          abot.sendMessage(
            creator,
            {
              text: `*❏ ORDER ❏*
📮 : *Paket:* 10K • Jadibot 1 Minggu
- @${sender.split("@")[0]}`,
              mentions: [sender],
            },
            { quoted: m }
          );
        } else if (args[0] == "1bulan") {
          reply(
            `Pesanan Kamu Sedang Di Proses Oleh Bot, Silahkan Tunggu Nanti Juga Di Chat Owner Untuk Di Konfirmasi`
          );
          abot.sendMessage(
            creator,
            {
              text: `*❏ ORDER ❏*
📮 : *Paket:* 20K • Jadibot 1 Bulan
- @${sender.split("@")[0]}`,
              mentions: [sender],
            },
            { quoted: m }
          );
        } else if (args[0] == "1tahun") {
          reply(
            `Pesanan Kamu Sedang Di Proses Oleh Bot, Silahkan Tunggu Nanti Juga Di Chat Owner Untuk Di Konfirmasi`
          );
          abot.sendMessage(
            creator,
            {
              text: `*❏ ORDER ❏*
📮 : *Paket:* 35K • Jadibot 1 Tahun
- @${sender.split("@")[0]}`,
              mentions: [sender],
            },
            { quoted: m }
          );
        } else if (args[0] == "permanent") {
          reply(
            `Pesanan Kamu Sedang Di Proses Oleh Bot, Silahkan Tunggu Nanti Juga Di Chat Owner Untuk Di Konfirmasi`
          );
          abot.sendMessage(
            creator,
            {
              text: `*❏ ORDER ❏*
📮 : *Paket:* 45K • Jadibot Permanent
- @${sender.split("@")[0]}`,
              mentions: [sender],
            },
            { quoted: m }
          );
        }
        break;
      case "ownkay":
        if (args[0] == "1minggu") {
          reply(
            `Pesanan Kamu Sedang Di Proses Oleh Bot, Silahkan Tunggu Nanti Juga Di Chat Owner Untuk Di Konfirmasi`
          );
          abot.sendMessage(
            creator,
            {
              text: `*❏ ORDER ❏*
📮 : *Paket:* 10K • Jadi Owner 1 Minggu
- @${sender.split("@")[0]}`,
              mentions: [sender],
            },
            { quoted: m }
          );
        } else if (args[0] == "1bulan") {
          reply(
            `Pesanan Kamu Sedang Di Proses Oleh Bot, Silahkan Tunggu Nanti Juga Di Chat Owner Untuk Di Konfirmasi`
          );
          abot.sendMessage(
            creator,
            {
              text: `*❏ ORDER ❏*
📮 : *Paket:* 20K • Jadi Owner 1 Bulan
- @${sender.split("@")[0]}`,
              mentions: [sender],
            },
            { quoted: m }
          );
        } else if (args[0] == "1tahun") {
          reply(
            `Pesanan Kamu Sedang Di Proses Oleh Bot, Silahkan Tunggu Nanti Juga Di Chat Owner Untuk Di Konfirmasi`
          );
          abot.sendMessage(
            creator,
            {
              text: `*❏ ORDER ❏*
📮 : *Paket:* 35K • Jadi Owner 1 Tahun
- @${sender.split("@")[0]}`,
              mentions: [sender],
            },
            { quoted: m }
          );
        } else if (args[0] == "permanent") {
          reply(
            `Pesanan Kamu Sedang Di Proses Oleh Bot, Silahkan Tunggu Nanti Juga Di Chat Owner Untuk Di Konfirmasi`
          );
          abot.sendMessage(
            creator,
            {
              text: `*❏ ORDER ❏*
📮 : *Paket:* 45K • Jadi Owner Permanent
- @${sender.split("@")[0]}`,
              mentions: [sender],
            },
            { quoted: m }
          );
        }
        break;

      // Group
      case "linkgroup":
      case "linkgc":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          let response = await abot.groupInviteCode(m.chat);
          abot.sendText(
            m.chat,
            `https://chat.whatsapp.com/${response}\n\nLink Group : ${groupMetadata.subject}`,
            m,
            { detectLink: true }
          );
        }
        break;

      case "ephemeral":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          if (args[0] === "1") {
            await abot
              .groupToggleEphemeral(m.chat, 1 * 24 * 3600)
              .then((res) => m.reply(jsonformat(res)))
              .catch((err) => m.reply(jsonformat(err)));
          } else if (args[0] === "7") {
            await abot
              .groupToggleEphemeral(m.chat, 7 * 24 * 3600)
              .then((res) => m.reply(jsonformat(res)))
              .catch((err) => m.reply(jsonformat(err)));
          } else if (args[0] === "90") {
            await abot
              .groupToggleEphemeral(m.chat, 90 * 24 * 3600)
              .then((res) => m.reply(jsonformat(res)))
              .catch((err) => m.reply(jsonformat(err)));
          } else if (args[0] === "off") {
            await abot
              .groupToggleEphemeral(m.chat, 0)
              .then((res) => m.reply(jsonformat(res)))
              .catch((err) => m.reply(jsonformat(err)));
          } else {
            let sections = [
              {
                title: "CHANGE EPHEMERAL GROUP",
                rows: [
                  {
                    title: "Ephemeral 1 day",
                    rowId: `ephemeral 1`,
                    description: `Activate the ephemeral group for 1 day`,
                  },
                  {
                    title: "Ephemeral 7 day's",
                    rowId: `ephemeral 7`,
                    description: `Activate the ephemeral group for 7 day's`,
                  },
                  {
                    title: "Ephemeral 90 days's",
                    rowId: `ephemeral 90`,
                    description: `Activate the ephemeral group for 90 day's`,
                  },
                  {
                    title: "Ephemeral Off",
                    rowId: `ephemeral off`,
                    description: `Deactivate this Ephemeral group`,
                  },
                ],
              },
            ];
            abot.sendListMsg(
              m.chat,
              `Please select the following Ephemeral Options List !`,
              abot.user.name,
              `Hello Admin ${groupMetadata.subject}`,
              `Click Here`,
              sections,
              m
            );
          }
          db.data.users[m.sender].limit -= 1;
        }
        break;

      case "setppgroup":
      case "setppgrup":
      case "setppgc":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          if (!m.isGroup) throw mess.group;
          if (!isAdmins) throw mess.admin;
          if (!/image/.test(mime))
            throw `Kirim/Reply Image Dengan Caption ${prefix + command}`;
          if (/webp/.test(mime))
            throw `Kirim/Reply Image Dengan Caption ${prefix + command}`;
          let media = await abot.downloadAndSaveMediaMessage(qmsg);
          await abot
            .updateProfilePicture(m.chat, { url: media })
            .catch((err) => fs.unlinkSync(media));
          m.reply(mess.success);
          db.data.users[m.sender].limit -= 1;
        }
        break;

      case "setname":
      case "setsubject":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          if (!text) throw "Text ?";
          await abot
            .groupUpdateSubject(m.chat, text)
            .then((res) => m.reply(mess.success))
            .catch((err) => m.reply(jsonformat(err)));
          db.data.users[m.sender].limit -= 1;
        }
        break;
      case "setdesc":
      case "setdesk":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          if (!text) throw "Text ?";
          await abot
            .groupUpdateDescription(m.chat, text)
            .then((res) => m.reply(mess.success))
            .catch((err) => m.reply(jsonformat(err)));
          db.data.users[m.sender].limit -= 1;
        }
        break;
      case "setppbot":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          if (!isCreator) throw mess.owner;
          if (!/image/.test(mime))
            throw `Kirim/Reply Image Dengan Caption ${prefix + command}`;
          if (/webp/.test(mime))
            throw `Kirim/Reply Image Dengan Caption ${prefix + command}`;
          let media = await abot.downloadAndSaveMediaMessage(qmsg);
          await abot
            .updateProfilePicture(botNumber, { url: media })
            .catch((err) => fs.unlinkSync(media));
          m.reply(mess.success);
        }
        break;

      case "vote":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          if (!m.isGroup) throw mess.group;
          if (m.chat in vote)
            throw `_Masih ada vote di chat ini!_\n\n*${prefix}hapusvote* - untuk menghapus vote`;
          if (!text)
            throw `Masukkan Alasan Melakukan Vote, Example: *${
              prefix + command
            } Owner Ganteng*`;
          m.reply(
            `Vote dimulai!\n\n*${prefix}upvote* - untuk ya\n*${prefix}devote* - untuk tidak\n*${prefix}cekvote* - untuk mengecek vote\n*${prefix}hapusvote* - untuk menghapus vote`
          );
          vote[m.chat] = [q, [], []];
          await sleep(1000);
          upvote = vote[m.chat][1];
          devote = vote[m.chat][2];
          teks_vote = `*「 VOTE 」*

*Alasan:* ${vote[m.chat][0]}

┌〔 UPVOTE 〕
│ 
├ Total: ${vote[m.chat][1].length}
│
│ 
└────

┌〔 DEVOTE 〕
│ 
├ Total: ${vote[m.chat][2].length}
│
│ 
└────

*${prefix}hapusvote* - untuk menghapus vote`;
          let buttonsVote = [
            {
              buttonId: `${prefix}upvote`,
              buttonText: { displayText: "𝚄𝙿𝚅𝙾𝚃𝙴" },
              type: 1,
            },
            {
              buttonId: `${prefix}devote`,
              buttonText: { displayText: "𝙳𝙴𝚅𝙾𝚃𝙴" },
              type: 1,
            },
          ];

          let buttonMessageVote = {
            text: teks_vote,
            footer: abot.user.name,
            buttons: buttonsVote,
            headerType: 1,
          };
          abot.sendMessage(m.chat, buttonMessageVote);
        }
        break;
      case "upvote":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          if (!m.isGroup) throw mess.group;
          if (!(m.chat in vote))
            throw `_*tidak ada voting digrup ini!*_\n\n*${prefix}vote* - untuk memulai vote`;
          isVote = vote[m.chat][1].concat(vote[m.chat][2]);
          wasVote = isVote.includes(m.sender);
          if (wasVote) throw "Kamu Sudah Vote";
          vote[m.chat][1].push(m.sender);
          menvote = vote[m.chat][1].concat(vote[m.chat][2]);
          teks_vote = `*「 VOTE 」*

*Alasan:* ${vote[m.chat][0]}

┌〔 UPVOTE 〕
│ 
├ Total: ${vote[m.chat][1].length}
${vote[m.chat][1].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join("\n")}
│ 
└────

┌〔 DEVOTE 〕
│ 
├ Total: ${vote[m.chat][2].length}
${vote[m.chat][2].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join("\n")}
│ 
└────

*${prefix}hapusvote* - untuk menghapus vote`;
          let buttonsUpvote = [
            {
              buttonId: `${prefix}upvote`,
              buttonText: { displayText: "𝚄𝙿𝚅𝙾𝚃𝙴" },
              type: 1,
            },
            {
              buttonId: `${prefix}devote`,
              buttonText: { displayText: "𝙳𝙴𝚅𝙾𝚃𝙴" },
              type: 1,
            },
          ];

          let buttonMessageUpvote = {
            text: teks_vote,
            footer: abot.user.name,
            buttons: buttonsUpvote,
            headerType: 1,
            mentions: menvote,
          };
          abot.sendMessage(m.chat, buttonMessageUpvote);
        }
        break;
      case "devote":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          if (!m.isGroup) throw mess.group;
          if (!(m.chat in vote))
            throw `_*tidak ada voting digrup ini!*_\n\n*${prefix}vote* - untuk memulai vote`;
          isVote = vote[m.chat][1].concat(vote[m.chat][2]);
          wasVote = isVote.includes(m.sender);
          if (wasVote) throw "Kamu Sudah Vote";
          vote[m.chat][2].push(m.sender);
          menvote = vote[m.chat][1].concat(vote[m.chat][2]);
          teks_vote = `*「 VOTE 」*

*Alasan:* ${vote[m.chat][0]}

┌〔 UPVOTE 〕
│ 
├ Total: ${vote[m.chat][1].length}
${vote[m.chat][1].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join("\n")}
│ 
└────

┌〔 DEVOTE 〕
│ 
├ Total: ${vote[m.chat][2].length}
${vote[m.chat][2].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join("\n")}
│ 
└────

*${prefix}hapusvote* - untuk menghapus vote`;
          let buttonsDevote = [
            {
              buttonId: `${prefix}upvote`,
              buttonText: { displayText: "𝚄𝙿𝚅𝙾𝚃𝙴" },
              type: 1,
            },
            {
              buttonId: `${prefix}devote`,
              buttonText: { displayText: "𝙳𝙴𝚅𝙾𝚃𝙴" },
              type: 1,
            },
          ];

          let buttonMessageDevote = {
            text: teks_vote,
            footer: abot.user.name,
            buttons: buttonsDevote,
            headerType: 1,
            mentions: menvote,
          };
          abot.sendMessage(m.chat, buttonMessageDevote);
        }
        break;

      case "cekvote":
        if (cekUser("id", sender) == null) return reply(mess.notregist);
        if (!m.isGroup) throw mess.group;
        if (!(m.chat in vote))
          throw `_*tidak ada voting digrup ini!*_\n\n*${prefix}vote* - untuk memulai vote`;
        teks_vote = `*「 VOTE 」*

*Alasan:* ${vote[m.chat][0]}

┌〔 UPVOTE 〕
│ 
├ Total: ${upvote.length}
${vote[m.chat][1].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join("\n")}
│ 
└────

┌〔 DEVOTE 〕
│ 
├ Total: ${devote.length}
${vote[m.chat][2].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join("\n")}
│ 
└────

*${prefix}hapusvote* - untuk menghapus vote


©${abot.user.id}
`;
        abot.sendTextWithMentions(m.chat, teks_vote, m);
        break;
      case "deletevote":
      case "delvote":
      case "hapusvote":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          if (!m.isGroup) throw mess.group;
          if (!(m.chat in vote))
            throw `_*tidak ada voting digrup ini!*_\n\n*${prefix}vote* - untuk memulai vote`;
          delete vote[m.chat];
          m.reply("Berhasil Menghapus Sesi Vote Di Grup Ini");
        }
        break;
      case "group":
      case "grup":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          if (args[0] === "close") {
            await abot
              .groupSettingUpdate(m.chat, "announcement")
              .then((res) => m.reply(`Sukses Menutup Group`))
              .catch((err) => m.reply(jsonformat(err)));
          } else if (args[0] === "open") {
            await abot
              .groupSettingUpdate(m.chat, "not_announcement")
              .then((res) => m.reply(`Sukses Membuka Group`))
              .catch((err) => m.reply(jsonformat(err)));
          } else {
            let buttons = [
              {
                buttonId: "group open",
                buttonText: { displayText: "Open" },
                type: 1,
              },
              {
                buttonId: "group close",
                buttonText: { displayText: "Close" },
                type: 1,
              },
            ];
            await abot.sendButtonText(
              m.chat,
              buttons,
              `Mode Group`,
              abot.user.name,
              m
            );
          }
        }
        break;
      case "editinfo":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          if (args[0] === "open") {
            await abot
              .groupSettingUpdate(m.chat, "unlocked")
              .then((res) => m.reply(`Sukses Membuka Edit Info Group`))
              .catch((err) => m.reply(jsonformat(err)));
          } else if (args[0] === "close") {
            await abot
              .groupSettingUpdate(m.chat, "locked")
              .then((res) => m.reply(`Sukses Menutup Edit Info Group`))
              .catch((err) => m.reply(jsonformat(err)));
          } else {
            let buttons = [
              {
                buttonId: "editinfo open",
                buttonText: { displayText: "Open" },
                type: 1,
              },
              {
                buttonId: "editinfo close",
                buttonText: { displayText: "Close" },
                type: 1,
              },
            ];
            await abot.sendButtonText(
              m.chat,
              buttons,
              `Mode Edit Info`,
              abot.user.name,
              m
            );
          }
        }
        break;
      case "antilink":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          if (args[0] === "on") {
            if (db.data.chats[m.chat].antilink)
              return m.reply(`Sudah Aktif Sebelumnya`);
            db.data.chats[m.chat].antilink = true;
            m.reply(`Antilink Aktif !`);
          } else if (args[0] === "off") {
            if (!db.data.chats[m.chat].antilink)
              return m.reply(`Sudah Tidak Aktif Sebelumnya`);
            db.data.chats[m.chat].antilink = false;
            m.reply(`Antilink Tidak Aktif !`);
          } else {
            let buttons = [
              {
                buttonId: "antilink on",
                buttonText: { displayText: "On" },
                type: 1,
              },
              {
                buttonId: "antilink off",
                buttonText: { displayText: "Off" },
                type: 1,
              },
            ];
            await abot.sendButtonText(
              m.chat,
              buttons,
              `Mode Antilink`,
              global.wm,
              m
            );
          }
        }
        break;
      case "mute":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          if (args[0] === "on") {
            if (db.data.chats[m.chat].mute)
              return m.reply(`Sudah Aktif Sebelumnya`);
            db.data.chats[m.chat].mute = true;
            m.reply(`${abot.user.name} telah di mute di group ini !`);
          } else if (args[0] === "off") {
            if (!db.data.chats[m.chat].mute)
              return m.reply(`Sudah Tidak Aktif Sebelumnya`);
            db.data.chats[m.chat].mute = false;
            m.reply(`${abot.user.name} telah di unmute di group ini !`);
          } else {
            let buttons = [
              {
                buttonId: "mute on",
                buttonText: { displayText: "On" },
                type: 1,
              },
              {
                buttonId: "mute off",
                buttonText: { displayText: "Off" },
                type: 1,
              },
            ];
            await abot.sendButtonText(
              m.chat,
              buttons,
              `Mute Bot`,
              abot.user.name,
              m
            );
          }
        }
        break;

      case "kick":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          let users = m.mentionedJid[0]
            ? m.mentionedJid
            : m.quoted
            ? [m.quoted.sender]
            : [text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"];
          await abot
            .groupParticipantsUpdate(m.chat, users, "remove")
            .then((res) => m.reply(jsonformat(res)))
            .catch((err) => m.reply(jsonformat(err)));
        }
        break;
      case "add":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          let users = m.mentionedJid[0]
            ? m.mentionedJid
            : m.quoted
            ? [m.quoted.sender]
            : [text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"];
          await abot
            .groupParticipantsUpdate(m.chat, users, "add")
            .then((res) => m.reply(jsonformat(res)))
            .catch((err) => m.reply(jsonformat(err)));
        }
        break;
      case "promote":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          let users = m.mentionedJid[0]
            ? m.mentionedJid
            : m.quoted
            ? [m.quoted.sender]
            : [text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"];
          await abot
            .groupParticipantsUpdate(m.chat, users, "promote")
            .then((res) => m.reply(jsonformat(res)))
            .catch((err) => m.reply(jsonformat(err)));
        }
        break;
      case "demote":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          let users = m.mentionedJid[0]
            ? m.mentionedJid
            : m.quoted
            ? [m.quoted.sender]
            : [text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"];
          await abot
            .groupParticipantsUpdate(m.chat, users, "demote")
            .then((res) => m.reply(jsonformat(res)))
            .catch((err) => m.reply(jsonformat(err)));
        }
        break;

      case "setppgroup":
      case "setppgrup":
      case "setppgc":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          if (!m.isGroup) throw mess.group;
          if (!isAdmins) throw mess.admin;
          if (!/image/.test(mime))
            throw `Kirim/Reply Image Dengan Caption ${prefix + command}`;
          if (/webp/.test(mime))
            throw `Kirim/Reply Image Dengan Caption ${prefix + command}`;
          let media = await abot.downloadAndSaveMediaMessage(qmsg);
          await abot
            .updateProfilePicture(m.chat, { url: media })
            .catch((err) => fs.unlinkSync(media));
          m.reply(mess.success);
        }
        break;

      case "tagall":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          let teks = `══✪〘 *👥 Tag All* 〙✪══
 
 ➲ *Pesan : ${q ? q : "kosong"}*\n\n`;
          for (let mem of participants) {
            teks += `⭔ @${mem.id.split("@")[0]}\n`;
          }
          abot.sendMessage(
            m.chat,
            { text: teks, mentions: participants.map((a) => a.id) },
            { quoted: ftroli }
          );
        }
        break;
      case "hidetag":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          abot.sendMessage(
            m.chat,
            { text: q ? q : "", mentions: participants.map((a) => a.id) },
            { quoted: ftroli }
          );
        }
        break;
      case "totag":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          if (!m.quoted) throw `Reply pesan dengan caption ${prefix + command}`;
          abot.sendMessage(m.chat, {
            forward: m.quoted.fakeObj,
            mentions: participants.map((a) => a.id),
          });
        }
        break;

      // Convert
      case "sticker":
      case "s":
      case "stickergif":
      case "sgif":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          if (db.data.users[m.sender].limit < 1) return reply(mess.endLimit);
          if (/image/.test(mime)) {
            m.reply(mess.wait);
            let media = await abot.downloadMediaMessage(qmsg);
            let encmedia = await abot.sendImageAsSticker(m.chat, media, m, {
              packname: global.packname,
              author: global.author,
            });
            await fs.unlinkSync(encmedia);
          } else if (/video/.test(mime)) {
            m.reply(mess.wait);
            if (qmsg.seconds > 11) return m.reply("Maksimal 10 detik!");
            let media = await abot.downloadMediaMessage(qmsg);
            let encmedia = await abot.sendVideoAsSticker(m.chat, media, m, {
              packname: global.packname,
              author: global.author,
            });
            await fs.unlinkSync(encmedia);
          } else {
            m.reply(
              `Kirim/reply gambar/video/gif dengan caption ${
                prefix + command
              }\nDurasi Video/Gif 1-9 Detik`
            );
          }
          db.data.users[m.sender].limit -= 1;
        }
        break;
      case "stickerwm":
      case "swm":
      case "stickergifwm":
      case "sgifwm":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          if (db.data.users[m.sender].limit < 1) return reply(mess.endLimit);
          let [teks1, teks2] = text.split`|`;
          if (!teks1)
            throw `Kirim/reply image/video dengan caption ${
              prefix + command
            } teks1|teks2`;
          if (!teks2)
            throw `Kirim/reply image/video dengan caption ${
              prefix + command
            } teks1|teks2`;
          m.reply(mess.wait);
          if (/image/.test(mime)) {
            let media = await abot.downloadMediaMessage(qmsg);
            let encmedia = await abot.sendImageAsSticker(m.chat, media, m, {
              packname: teks1,
              author: teks2,
            });
            await fs.unlinkSync(encmedia);
          } else if (/video/.test(mime)) {
            if ((quoted.msg || quoted).seconds > 11)
              return m.reply("Maksimal 10 detik!");
            let media = await abot.downloadMediaMessage(qmsg);
            let encmedia = await abot.sendVideoAsSticker(m.chat, media, m, {
              packname: teks1,
              author: teks2,
            });
            await fs.unlinkSync(encmedia);
          } else {
            throw `Kirim Gambar/Video Dengan Caption ${
              prefix + command
            }\nDurasi Video 1-9 Detik`;
          }
          db.data.users[m.sender].limit -= 1;
        }
        break;
      case "smeme":
      case "stickmeme":
      case "stikmeme":
      case "stickermeme":
      case "stikermeme":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          if (db.data.users[m.sender].limit < 1) return reply(mess.endLimit);
          if (!text)
            throw `Kirim/reply image/video dengan caption ${
              prefix + command
            } teks1|teks2`;
          m.reply(mess.wait);
          if (/image/.test(mime)) {
            atas = text.split("|")[0] ? text.split("|")[0] : "-";
            bawah = text.split("|")[1] ? text.split("|")[1] : "-";
            let { TelegraPh } = require("./lib/uploader");
            let mee = await abot.downloadAndSaveMediaMessage(qmsg);
            let mem = await TelegraPh(mee);
            let smeme = `https://api.memegen.link/images/custom/${encodeURIComponent(
              atas
            )}/${encodeURIComponent(bawah)}.png?background=${mem}`;
            let awikwok = await abot.sendImageAsSticker(m.chat, smeme, m, {
              packname: global.packname,
              author: global.author,
            });
            await fs.unlinkSync(awikwok);
          } else {
            throw `Kirim Gambar/Video Dengan Caption ${
              prefix + command
            }\nDurasi Video 1-9 Detik`;
          }
          db.data.users[m.sender].limit -= 1;
        }
        break;
      case "emojimix":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          if (db.data.users[m.sender].limit < 1) return reply(mess.endLimit);
          let [emoji1, emoji2] = text.split`+`;
          if (!emoji1) throw `Example : ${prefix + command} 😅+🤔`;
          if (!emoji2) throw `Example : ${prefix + command} 😅+🤔`;
          let anu = await fetchJson(
            `https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(
              emoji1
            )}_${encodeURIComponent(emoji2)}`
          );
          for (let res of anu.results) {
            let encmedia = await abot.sendImageAsSticker(m.chat, res.url, m, {
              packname: global.packname,
              author: global.author,
              categories: res.tags,
            });
            await fs.unlinkSync(encmedia);
          }
          db.data.users[m.sender].limit -= 1;
        }
        break;
      //Fiture Downloader
      case "ytmp3":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          if (db.data.users[m.sender].limit < 1) return reply(mess.endLimit);
          if (!url) throw `Example : ${prefix + command} url`;
          let ytmp3 = await fetchJson(
            `https://saipulanuar.ga/api/download/ytmp3?url=${url}`
          );
          reply(`*YTMP3 DOWNLOAD*
*title:* ${ytmp3.result.title}
*channel:* ${ytmp3.result.channel}
*published:* ${ytmp3.result.published}
*views:* ${ytmp3.result.views}
*type:* audio/mp3
_Sedang mengirim audio..._`);
          abot.sendMessage(
            m.chat,
            {
              audio: { url: ytmp3.result.url },
              mimetype: "audio/mpeg",
              caption: `Done`,
            },
            { quoted: m }
          );
          db.data.users[m.sender].limit -= 1;
        }
        break;

      case "tiktokdl":
      case "ttmp4":
      case "ttdl":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          if (db.data.users[m.sender].limit < 1) return reply(mess.endLimit);
          if (!url) throw `masukan command ${prefix + command} url`;
          let ttdl = await fetchJson(
            `https://saipulanuar.ga/api/download/tiktok?url=${url}`
          );
          reply(`*TIKTOK DOWNLOAD*
*username:* ${ttdl.result.username}
*desc:* ${ttdl.result.description}
*type:* video/mp4
_Sedang mengirim video..._`);
          abot.sendMessage(
            m.chat,
            {
              video: { url: ttdl.result.video },
              mimetype: "video/mp4",
              caption: `Done`,
            },
            { quoted: m }
          );
          db.data.users[m.sender].limit -= 1;
        }
        break;

      case "fbdl":
      case "fbmp4":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          if (db.data.users[m.sender].limit < 1) return reply(mess.endLimit);
          if (!url) throw `masukan command ${prefix + command} url`;
          let fbdl = await fetchJson(
            `https://saipulanuar.ga/api/download/fb?url=${url}`
          );
          reply(`*FACEBOOK DOWNLOAD*
*Judul:* ${fbdl.result.title}
*type:* video/mp4
_Sedang mengirim video..._`);
          abot.sendMessage(
            m.chat,
            {
              video: { url: fbdl.result.hd },
              mimetype: "video/mp4",
              caption: `Done`,
            },
            { quoted: m }
          );
          db.data.users[m.sender].limit -= 1;
        }
        break;
      // Fiture Search

      case "pinterest":
        {
          if (cekUser("id", sender) == null) return reply(mess.notregist);
          if (db.data.users[m.sender].limit < 1) return reply(mess.endLimit);
          if (!text) throw `masukan command ${prefix + command} query`;
          m.reply(mess.wait);
          let { pinterest } = require("./lib/scraper");
          anu = await pinterest(text);
          result = anu[Math.floor(Math.random() * anu.length)];
          abot.sendMessage(
            m.chat,
            { image: { url: result }, caption: "• Media Url : " + result },
            { quoted: m }
          );
          db.data.users[m.sender].limit -= 1;
        }
        break;

      //Ai Fiture
      case "ai":
        if (cekUser("id", sender) == null) return reply(mess.notregist);
        if (db.data.users[m.sender].limit < 1) return reply(mess.endLimit);
        try {
          if (setting.keyopenai === "ISI_APIKEY_OPENAI_DISINI")
            return reply(
              "Apikey belum diisi\n\nSilahkan isi terlebih dahulu apikeynya di file key.json\n\nApikeynya bisa dibuat di website: https://beta.openai.com/account/api-keys"
            );
          if (!text)
            return reply(
              `Chattingan dengan AI.\nTanyakan apa saja kepada ai dengan cara penggunaan \n\n${prefix}${command} tolong berikan motivasi cinta`
            );
          const configuration = new Configuration({
            apiKey: setting.keyopenai,
          });
          const openai = new OpenAIApi(configuration);

          const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: text,
            temperature: 0.3,
            max_tokens: 3000,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
          });
          m.reply(`${response.data.choices[0].text}\n\n`);
        } catch (err) {
          console.log(err);
          m.reply("Maaf, sepertinya ada yang error");
          db.data.users[m.sender].limit -= 1;
        }
        break;

      // Owner Menu
      case "self":
        {
          if (!isOwner) throw mess.owner;
          abot.public = false;
          m.reply("Self Mode Activate");
        }
        break;

      case "public":
        {
          if (!isOwner) throw mess.owner;
          abot.public = true;
          m.reply("Public Mode Activate");
        }
        break;

      case "setnamabot":
        {
          if (!isOwner) throw mess.owner;
          if (!text) throw `Example : ${prefix + command} WhatsApp ✅`;
          let name = await abot.updateProfileName(text);
          m.reply(`Successfully renamed bot to ${name}`);
        }
        break;

      case "join":
        {
          if (!isOwner) return reply(mess.owner);
          if (!text) return reply(`Contoh ${prefix + command} linkgc`);
          if (!isUrl(args[0]) && !args[0].includes("whatsapp.com"))
            return reply("Link Invalid!");
          let result = args[0].split("https://chat.whatsapp.com/")[1];
          await abot
            .groupAcceptInvite(result)
            .then((res) => reply(jsonformat(res)))
            .catch((err) => reply(jsonformat(err)));
        }
        break;

      case "addprem":
        {
          if (!isOwner) return reply(mess.owner);
          if (!text) return reply("*Contoh:*\n#addprem 628xxx");
          var number_one = text + "@s.whatsapp.net";
          if (cekUser("id", number_one) == null)
            return reply("User tersebut tidak terdaftar di database");
          if (cekUser("premium", number_one) == true)
            return reply("User tersebut sudah premium");
          setUser("±premium", number_one, true);
          reply(
            `*PREMIUM*\n*ID:* @${number_one.split("@")[0]}\n*Status:* aktif`
          );
        }
        break;

      case "delprem":
        {
          if (!isOwner) return reply(mess.OnlyOwner);
          if (!text) return reply("*Contoh:*\n#delprem 628xxx");
          var number_one = q + "@s.whatsapp.net";
          if (cekUser("id", number_one) == null)
            return reply("User tersebut tidak terdaftar di database");
          if (cekUser("premium", number_one) == false)
            return reply("User tersebut tidak premium");
          setUser("±premium", number_one, false);
          reply(
            `*PREMIUM*\n*ID:* @${number_one.split("@")[0]}\n*Status:* tidak`
          );
        }
        break;

      case "setexif":
        {
          if (!isOwner) throw mess.owner;
          if (!text) throw `Example : ${prefix + command} packname|author`;
          global.packname = text.split("|")[0];
          global.author = text.split("|")[1];
          m.reply(
            `Exif berhasil diubah menjadi\n\n⭔ Packname : ${global.packname}\n⭔ Author : ${global.author}`
          );
        }
        break;

      case "bcgc":
      case "bcgroup":
        {
          if (!isOwner) throw mess.owner;
          if (!text)
            throw `Text mana?\n\nExample : ${prefix + command} fatih-san`;
          let getGroups = await abot.groupFetchAllParticipating();
          let groups = Object.entries(getGroups)
            .slice(0)
            .map((entry) => entry[1]);
          let anu = groups.map((v) => v.id);
          m.reply(
            `Mengirim Broadcast Ke ${anu.length} Group Chat, Waktu Selesai ${
              anu.length * 1.5
            } detik`
          );
          for (let i of anu) {
            await sleep(1500);
            let btn = [
              {
                urlButton: {
                  displayText: "Source Code",
                  url: "https://github.com/DikaArdnt/Hisoka-Morou",
                },
              },
              {
                callButton: {
                  displayText: "Number Phone Owner",
                  phoneNumber: "+62 882-9202-4190",
                },
              },
              {
                quickReplyButton: {
                  displayText: "Status Bot",
                  id: "ping",
                },
              },
              {
                quickReplyButton: {
                  displayText: "Contact Owner",
                  id: "owner",
                },
              },
              {
                quickReplyButton: {
                  displayText: "Script",
                  id: "sc",
                },
              },
            ];
            let txt = `「 Broadcast Bot 」\n\n${text}`;
            abot.send5ButImg(i, txt, abot.user.name, global.thumb, btn);
          }
          m.reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`);
        }
        break;

      // End Cmd
      default:
        if (budy.startsWith("=>")) {
          if (!isOwner) return m.reply(mess.owner);
          function Return(sul) {
            sat = JSON.stringify(sul, null, 2);
            bang = util.format(sat);
            if (sat == undefined) {
              bang = util.format(sul);
            }
            return m.reply(bang);
          }
          try {
            m.reply(
              util.format(eval(`(async () => { return ${budy.slice(3)} })()`))
            );
          } catch (e) {
            m.reply(String(e));
          }
        }

        if (budy.startsWith(">")) {
          if (!isOwner) return m.reply(mess.owner);
          try {
            let evaled = await eval(budy.slice(2));
            if (typeof evaled !== "string")
              evaled = require("util").inspect(evaled);
            await m.reply(evaled);
          } catch (err) {
            await m.reply(String(err));
          }
        }

        if (budy.startsWith("$")) {
          if (!isOwner) return m.reply(mess.owner);
          exec(budy.slice(2), (err, stdout) => {
            if (err) return m.reply(`${err}`);
            if (stdout) return m.reply(stdout);
          });
        }

        if (isCmd && budy.toLowerCase() != undefined) {
          if (m.chat.endsWith("broadcast")) return;
          if (m.isBaileys) return;
          let msgs = global.db.data.database;
          if (!(budy.toLowerCase() in msgs)) return;
          abot.copyNForward(m.chat, msgs[budy.toLowerCase()], true);
        }
    }
  } catch (err) {
    m.reply(util.format(err));
  }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.greenBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
