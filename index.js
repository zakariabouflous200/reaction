const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config(); // To load the .env file

// Load bot token from .env file
const TOKEN = process.env.BOT_TOKEN;

// Array of channel IDs where the bot will react to images and videos
const TARGET_CHANNEL_IDS = ['1316561632952057866', '1316561638912163850', '1316561646931415130']; // Replace with your channel IDs

// Emojis to react with (including custom emojis)
const EMOJIS = [
  '❤️', // Default emoji
  '<:customEmoji1:1311421042199363645>', // Custom static emoji
  '<:customEmoji2:1311420395164926002>',
  '<:customEmoji3:1292159366862213163>',
  '<:customEmoji4:1289708468533461128>',
  '<:customEmoji5:1311420396721017094>',
  '<:customEmoji6:1311420395164926002>',
  '<:customEmoji7:1289708725824782378>',
  '<:customEmoji8:1289709813902610434>',
];

// User-specific emojis: Map user IDs to their respective emojis
const USER_EMOJIS = {
  '1253514802362585209': '<:customUserEmoji1:1311420543244701786>', // User 1 with custom emoji
  '852970899614859297': '<:customUserEmoji2:1320811994936377375>',
  '1033812944879898736': '<:customUserEmoji2:1320813013225177162>', // User 2 with another emoji
};

// Create a new Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// When the bot is ready
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Listen for messages
client.on('messageCreate', async (message) => {
  // Ignore messages from bots
  if (message.author.bot) return;

  // React to media messages in specific channels
  if (TARGET_CHANNEL_IDS.includes(message.channel.id)) {
    const hasMedia = message.attachments.some((attachment) =>
      attachment.contentType?.startsWith('image/') || // Check for images
      attachment.contentType?.startsWith('video/')    // Check for videos
    );

    if (hasMedia) {
      // React with emojis
      for (const emoji of EMOJIS) {
        try {
          await message.react(emoji);
        } catch (error) {
          console.error(`Failed to react with ${emoji}:`, error);
        }
      }

      // Mention @here in the channel
      try {
        await message.channel.send('@here ajiw tchoufo zin');
      } catch (error) {
        console.error('Failed to send @here mention:', error);
      }
    }
  }

  // React to messages from specific users
  const userEmoji = USER_EMOJIS[message.author.id];
  if (userEmoji) {
    try {
      await message.react(userEmoji);
    } catch (error) {
      console.error(`Failed to react with ${userEmoji} for user ${message.author.id}:`, error);
    }
  }
});

// Log in to Discord
client.login(TOKEN);