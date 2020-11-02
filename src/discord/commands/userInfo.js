const { MessageEmbed } = require('discord.js-light');

const { getUserFromName } = require('../../database/index');

let name = 'userinfo';
let aliases = ['ui'];
let owner = false;
let run = async (msg, args, isOwner) => {
  if (!args[0]) {
    return msg.channel.send(new MessageEmbed()
      .setTitle('You must include the name of a user.')
      .setColor('#e9172b'));
  }

  let uName = args[0];

  let userData = await getUserFromName(uName);

  if (userData === null) {
    return msg.channel.send(new MessageEmbed()
      .setTitle('User does not exist.')
      .setColor('#e9172b'));
  }

  if (!isOwner) {
    return msg.channel.send(new MessageEmbed()
      .setTitle(`User: \`${uName}\``)
      .setDescription(`**Uploads**: \`${userData.uploads}\`\n**Redirects**: \`${userData.redirects}\``)
      .setColor('#1eda61'));
  }

  return msg.channel.send(new MessageEmbed()
    .setTitle(`User: \`${uName}\``)
    .setDescription(`**Key**: \`${userData.key}\`
**Owner**: \`${userData.owner}\`
**Uploads**: \`${userData.uploads}\`
**Redirects**: \`${userData.redirects}\`
**Created at**: \`${userData.CreatedAt}\``)
    .setColor('#1eda61'));
};

module.exports = { name, aliases, run, owner };
