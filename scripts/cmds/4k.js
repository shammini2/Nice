const axios = require("axios");

module.exports = {
  config: {
    name: "4k",
    version: "1.1",
    role: 0,
    author: "ArYAN",
    countDown: 5,
    longDescription: "Upscale images to 4K resolution.",
    category: "image",
    guide: {
      en: "${pn} reply to an image to upscale it to 4K resolution."
    }
  },

  onStart: async function ({ message, event }) {
    if (
      !event.messageReply ||
      !event.messageReply.attachments ||
      !event.messageReply.attachments[0] ||
      event.messageReply.attachments[0].type !== "photo"
    ) {
      return message.reply("📸 𝙿𝚕𝚎𝚊𝚜𝚎 𝚛𝚎𝚙𝚕𝚢 𝚝𝚘 𝚊𝚗 𝚒𝚖𝚊𝚐𝚎 𝚝𝚘 𝚞𝚙𝚜𝚌𝚊𝚕𝚎 𝚒𝚝");
    }

    const imgurl = encodeURIComponent(event.messageReply.attachments[0].url);
    const upscaleUrl = `https://aryan-xyz-upscale-api-phi.vercel.app/api/upscale-image?imageUrl=${imgurl}&apikey=ArYANAHMEDRUDRO`;

    message.reply("🆙 𝟰𝚔 𝚢𝚘𝚞𝚛 𝚒𝚖𝚊𝚐𝚎, 𝚙𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...", async (err, info) => {
      try {
        const response = await axios.get(upscaleUrl);
        const imageUrl = response.data.resultImageUrl;
        const attachment = await global.utils.getStreamFromURL(imageUrl, "upscaled.png");

        message.reply({
          body: "🦆 𝚈𝚘𝚞𝚛 𝟰𝙺 𝚒𝚖𝚊𝚐𝚎 𝚒𝚜 𝚛𝚎𝚊𝚍𝚢",
          attachment
        });

        message.unsend(info.messageID);
      } catch (error) {
        console.error("Upscale Error:", error.message);
        message.reply("❌ 𝙴𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚛𝚎𝚍 𝚝𝚑𝚎 𝚒𝚖𝚊𝚐𝚎.");
      }
    });
  }
};
