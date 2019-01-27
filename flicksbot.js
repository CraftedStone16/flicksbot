const Discord = require('discord.js');
const Util = require('discord.js');
const fastify = require('fastify')
const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);
fastify.listen(process.env.PORT || 3000, function (err) {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
});

var prefix = "=="
var modprefix = "=!"
var botversion = '3.0.0'
var ac = '531467728452845568'
var punishments = '538562493451075643'
var logs = "537044774168035368"

client.on('ready', () => {
  console.log(`Bot version: ${botversion}`);
  console.log(`Bot Prefix: "${prefix}"`);
  console.log('All commands Loaded!');
});

client.on('message', message => {
    let args = message.content.split(' ').slice(1);
    var result = args.join(' ');
    let adminRole = message.guild.roles.find(role => role.name === 'Admin')
    let modRole = message.guild.roles.find(role => role.name === 'MOD')
    let muteRole = message.guild.roles.find(role => role.name === 'Muted');

    if (message.content.startsWith(prefix +'test')) {
      message.channel.send('This is a test command!!')
    } else

    if (message.content.startsWith(prefix +'blowjob')) {
      message.channel.send('I am gonna blow you so hard that your mom will be like... What is that noise?')
    } else

    if (message.content.startsWith(prefix +'gay')) {
      message.channel.send('Your so gay that your mom had to drive you to a LGBT Community so you can belong with your people!')
    } else

    if (message.content.startsWith(prefix +'announce')) {
      if(message.member.roles.has(modRole.id)) {
        let announce = args.join(' ')
        message.delete()
        if (announce.length < 1) return message.channel.send(`You must provide an announcement message to send!`);
        client.channels.get(`${ac}`).send(`**ATTENTION**\n${announce}\n\n<@&535967499091443713>`)
      } else {
        message.channel.send('You do not have the permission to use that command!')
      }
    } else

    // Punishment Commands
    if (message.content.startsWith(modprefix + 'warn')) {
      if(message.member.roles.has(modRole.id)) {
        message.delete(1500);
        let reason = args.slice(1).join(' ');
        let user = message.mentions.users.first();
        if (!message.mentions.users.first()) return message.reply('You must mention someone to warn them.').catch(console.error);
        if (reason.length < 3) return message.reply('You must provide a reason for the warning');
        let warnlog = new Discord.RichEmbed()
        .setColor('PURPLE')
        .addField(':warning: __User Warned__', `${message.author} **Warned** ${user} for \`${reason}\`!`)
        .setFooter(`${message.createdAt}`)

        let embedwarn = new Discord.RichEmbed ()
        .setTitle('')
        .setThumbnail(`${user.displayAvatarURL}`)
        .setColor('PURPLE')
        .addField('Action:', 'Warning')
        .addField('User:', `${user.tag}`)
        .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
        .addField('Reason:', `${reason}`)
        client.channels.get(`${punishments}`).send(embedwarn)
        message.channel.send('That user has successfully been warned! :ok_hand:').then(message => message.delete(1500));
        client.channels.get(`${logs}`).send(warnlog)
      } else {
        message.channel.send('You do not have the permission to use that command!')
        client.channels.get(`${logs}`).send(`**${message.author.username}** just tried using the \`warn\` command in <#${message.channel.id}>!`)
      }
    } else

    if (message.content.startsWith(modprefix + 'mute')) {
      if(message.member.roles.has(modRole.id)) {
        message.delete(1500);
        let reason = args.slice(1).join(' ');
        let user = message.mentions.users.first();
        if (!message.mentions.users.first()) return message.reply('You must mention someone to mute them.').catch(console.error);
        if (reason.length < 3) return message.reply('You must provide a reason for the mute').catch(console.error);

        let mutelog = new Discord.RichEmbed()
        .setColor('GREEN')
        .addField(':speak_no_evil: __User Muted__', `${message.author} **Muted** ${user} for \`${reason}\`!`)
        .setFooter(`${message.createdAt}`)

        let embedmute = new Discord.RichEmbed()
        .setTitle('')
        .setThumbnail(`${user.displayAvatarURL}`)
        .setColor('GREEN')
        .addField('Action:', 'Mute')
        .addField('User:', `${user.tag}`)
        .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
        .addField('Reason:', `${reason}`)

        if(!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').catch(console.error);

        message.guild.member(user).addRole(muteRole.id)
        client.channels.get(`${punishments}`).send(embedmute)
        message.channel.send('That user has successfully been muted! :ok_hand:').then(message => message.delete(1500));
        client.channels.get(`${logs}`).send(mutelog)

      }
    } else

    if (message.content.startsWith(modprefix + 'unmute')) {
      if(message.member.roles.has(modRole.id)) {
        message.delete(1500);
        let user = message.mentions.users.first();

        let unmutelog = new Discord.RichEmbed()
        .setColor('GREEN')
        .addField(':monkey_face: __User Unmuted__', `${message.author} **Unmuted** ${user}!`)
        .setFooter(`${message.createdAt}`)

        let embedunmute = new Discord.RichEmbed()
        .setTitle('')
        .setThumbnail(`${user.displayAvatarURL}`)
        .setColor('GREEN')
        .addField('Action:', 'Un-Mute')
        .addField('User:', `${user.tag}`)
        .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)

        if(!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').catch(console.error);

        if (message.guild.member(user).roles.has(muteRole.id)) {
          message.guild.member(user).removeRole(muteRole.id).then(() => {
            client.channels.get(`${punishments}`).send(embedunmute)
            message.channel.send('That user has successfully been unmuted! :ok_hand:').then(message => message.delete(1500));
            client.channels.get(`${logs}`).send(unmutelog)
          });
        } else
          message.channel.send(`That user is not muted! To mute that user do \`${prefix}mute\``)
        }
      }
    });
client.on('message', message => {
    let args = message.content.split(' ').slice(1);
    var result = args.join(' ');
    let adminRole = message.guild.roles.find(role => role.name === 'Admin')
    let modRole = message.guild.roles.find(role => role.name === 'MOD')
    let muteRole = message.guild.roles.find(role => role.name === 'Muted');

    if (message.content.startsWith(modprefix + 'kick')) {
      if(message.member.roles.has(modRole.id)) {
        message.delete(1500);
        let reason = args.slice(1).join(' ');
        let user = message.mentions.users.first();
        if (!message.mentions.users.first()) return message.reply('You must mention someone to kick them.').catch(console.error);
        if (reason.length < 3) return message.reply('You must provide a reason for the kick');

        if (!message.guild.member(user).kickable) return message.reply('I cannot kick that member');
        message.guild.member(user).kick();

        let kicklog = new Discord.RichEmbed()
        .setColor('BLUE')
        .addField(':boot: __User Kicked__', `${message.author} **Kicked** ${user} for \`${reason}\`!`)
        .setFooter(`${message.createdAt}`)

        let embedkick = new Discord.RichEmbed()
        .setTitle('')
        .setThumbnail(`${user.displayAvatarURL}`)
        .setColor('BLUE')
        .addField('Action:', 'Kick')
        .addField('User:', `${user.tag}`)
        .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
        .addField('Reason:', `${reason}`)
        client.channels.get(`${punishments}`).send(embedkick)
        client.channels.get(`${logs}`).send(kicklog)
      } else {
        message.channel.send('You do not have the permission to use that command!')
        client.channels.get(`${logs}`).send(`**${message.author.username}** just tried using the \`kick\` command in <#${message.channel.id}>!`)
      }
    } else

    if (message.content.startsWith(modprefix + 'ban')) {
      if(message.member.roles.has(modRole.id)) {
        message.delete(1500);
        let reason = args.slice(1).join(' ');
        let user = message.mentions.users.first();
        if (!message.mentions.users.first()) return message.reply('You must mention someone to ban them.').catch(console.error);
        if (reason.length < 3) return message.reply('You must provide a reason for the ban');

        if (!message.guild.member(user).bannable) return message.reply('I cannot ban that member');
        message.guild.ban(user, );

        let banlog = new Discord.RichEmbed()
        .setColor('RED')
        .addField(':no_entry_sign: __User Banned__', `${message.author} **Banned** ${user} (${user}) for \`${reason}\``)
        .setFooter(`${message.createdAt}`)

        let embedban = new Discord.RichEmbed()
        .setTitle('')
        .setThumbnail(`${user.displayAvatarURL}`)
        .setColor('RED')
        .addField('Action:', 'Ban')
        .addField('User:', `${user.tag}`)
        .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
        .addField('Reason:', `${reason}`)
        .addField('\u200b', `User ID: ${user.id}`)
        client.channels.get(`${punishments}`).send(embedban)
        client.channels.get(`${logs}`).send(banlog)
      } else {
        message.channel.send('You do not have the permission to use that command!')
        client.channels.get(`${logs}`).send(`**${message.author.username}** just tried using the \`ban\` command in <#${message.channel.id}>!`)
      }
    } else

    if (message.content.startsWith(modprefix + 'unban')) {
      if(message.member.roles.has(modRole.id)) {
        message.delete(1500);
        let user = args[0];
        if (!user) return message.reply('You must supply a user ID.').catch(console.error);
        message.guild.unban(user);

        let unbanlog = new Discord.RichEmbed()
        .setColor('RED')
        .addField(':o: __User Unbanned__', `${message.author} **Unbanned** <@${user}>!`)
        .setFooter(`${message.createdAt}`)

        let embedunban = new Discord.RichEmbed()
        .setTitle('')
        .setThumbnail(`${user.displayAvatarURL}`)
        .setColor('RED')
        .addField('Action:', 'Un-Ban')
        .addField('User:', `<@${user}>`)
        .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
        client.channels.get(`${punishments}`).send(embedunban)
        client.channels.get(`${logs}`).send(unbanlog)
      } else {
        message.channel.send('You do not have the permission to use that command!')
        client.channels.get(`${logs}`).send(`**${message.author.username}** just tried using the \`unban\` command in <#${message.channel.id}>!`)
      }
    }

    // if (message.content.startsWith(prefix +'porn')) {
    //   message.channel.send('Kate sits through chemistry by her extremely gorgeous friend Jacob. Just looking at him makes her even more wet. She imagines his dick pounding and penetrating her as hard as he can. She almost moans out loud from desire. Jacob''s hand slips down her pants. She gasps then whispers in his ear. "Ditch your next class with me." He nods, knowing what it means. Finally Chemistry was over and Kate and Jacob start walking through the halls, finding a place of secrecy. They end up in the storage room."Jacob, fuck me, fuck me so damn hard. Please" Kate screams. She takes off her shirt revealing her gigantic double Ds. Jacob takes off his shirt then peels off his pants revealing a 10-inch cock. Jacob cannot wait and starts rubbing his cock vigorously until Kate has her pants fully off. Her pussy and all around it is drenched from being so horny. She moves his hands out of the way and starts licking his cock.')
    //   message.channel.send('He moans in pleasure and she begins to gag from going to deep. He grabs her pussy and rubs it hard. She screams with pleasure. He shoves her on the ground fondling her breasts. He grabs her arms and holds her down then shoves his dick deep inside of her. He goes very slow. She screams everytime he gets deeper than before. Kate begins to moan and plead for more. Jacob answers her wish and fucks her as fast and hard as he can. He goes faster and faster with each thrust. They''re both screaming and moaning. Kate squirts all over his dick then Jacobs cums inside her.')
    // }
});
