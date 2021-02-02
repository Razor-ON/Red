const { Client, MessageEmbed } = require('discord.js');
const client = new Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

let hex = '#7ee268';
let announcementChannel = '806216830787911770';
let hugChainChannel = '806239006752374805';

client.on('message', async message => {
    if(message.author.bot) return;
    if (message.content === 'ping') {
        message.reply('Pong!');
    } else if (message.content === '!!welcome') {
        let embed = new MessageEmbed()
            .setColor(hex)
            .setTitle(`Welcome to ${message.guild.name}!`)
            .setThumbnail(message.guild.iconURL())
            .setDescription(`**${message.guild.name}** is an emote server dedicated to keep an emote archive for the rich people of Nitro <:Happy:805110065882988554>`)

        await message.channel.send(embed);

        embed
            .setColor(hex)
            .setTitle(`How to add emojis?`)
            .setThumbnail('')
            .setDescription(`React below with <:yes:805110098203639808> and you'll be granted a role that allows you to manage the emojis. Abuse of this power will lead to a ban!`)
        await message.channel.send(embed);

        embed
            .setColor(hex)
            .setTitle(`Access chats`)
            .setThumbnail('')
            .setDescription(`React below with <:hugs:805110056399274065> to access the chat channels! <:blank:806231826040750122><:blank:806231826040750122><:blank:806231826040750122><:blank:806231826040750122><:blank:806231826040750122><:blank:806231826040750122><:blank:806231826040750122><:blank:806231826040750122><:blank:806231826040750122><:blank:806231826040750122><:blank:806231826040750122>`)
        await message.channel.send(embed);

        embed
            .setColor(hex)
            .setTitle(`Rules & Info`)
            .setThumbnail('')
            .setDescription(`\`\`\`RULES\`\`\`\n\`›\` __No racism, sexism, foul langauge or hate__\nWe're all here to share the same wealthiness of having Discord Nitro and we're here to have emotes to flex with, the chat is there to enjoy chatter every now and then so no reason to be toxic\n\n\`›\`__Do not add NSFW/NSFL emotes__\nSuggestive and easy emotes can be fine but overly sexual or gore emotes are not accepted. When in doubt always ask <@220147157573828620>\n\n\`›\`__Have Fun__\nThis is a friends emote server, don't make it into something more xo\n\n\`\`\`INFO\`\`\`\nEmotes in this server are not owned or commissioned by us, we're simply collectors.. Wealthy Nitro user collectors <:kek:805109615296774205>. This server puts high trust in it's users and the fact that we're all here for a good reason and a good cause, abusing your power to delete emotes or mess up stuff will lead to a ban and always remember that the bot has one command that brings back everything to what it was so you won't be doing us any harm lmao.`)
        await message.channel.send(embed);

    } else if (message.content === '!!showcase') {
        message.guild.emojis.cache.forEach(emoji => {
            let embed = new MessageEmbed()
                .setThumbnail(emoji.url)
                .setTitle(emoji.name)
                .setColor(hex)
            message.channel.send(embed);
        });
    }

    if(message.channel.id === hugChainChannel){
        if(message.content !== '<:hugs:805110056399274065>'){
            message.delete();
            message.author.send(`You can only send <:hugs:805110056399274065> in <#${message.channel.id}>`);
            return;
        } else {
            if(isNaN(message.channel.topic)) message.channel.setTopic('0');
            else message.channel.setTopic(message.channel.topic + 1);
        };
    };
});

client.on('emojiCreate', async emoji => {
    const auditlogs = await emoji.guild.fetchAuditLogs({
        type: "EMOJI_CREATE",
    });

    let updates = emoji.guild.channels.cache.get(announcementChannel);

    let embed = new MessageEmbed()
        .setColor(hex)
        .setTitle('Emote Added!')
        .setAuthor(auditlogs.entries.first().executor.tag, auditlogs.entries.first().executor.displayAvatarURL())
        .setDescription(`**Emoji name:** ${emoji.name}`)
        .setThumbnail(emoji.url)
        .setTimestamp()
    updates.send(embed);
})

client.on('emojiDelete', async emoji => {
    const auditlogs = await emoji.guild.fetchAuditLogs({
        type: "EMOJI_DELETE",
    });

    let updates = emoji.guild.channels.cache.get(announcementChannel);

    let embed = new MessageEmbed()
        .setColor(hex)
        .setTitle('Emote Removed!')
        .setAuthor(auditlogs.entries.first().executor.tag, auditlogs.entries.first().executor.displayAvatarURL())
        .setDescription(`**Emoji name:** ${emoji.name}`)
        .setThumbnail(emoji.url)
        .setTimestamp()
    updates.send(embed);
})

client.on('emojiUpdate', async (oldEmoji, newEmoji) => {
    if (oldEmoji === newEmoji) return;
    const auditlogs = await oldEmoji.guild.fetchAuditLogs({
        type: "EMOJI_UPDATE",
    });

    let updates = oldEmoji.guild.channels.cache.get(announcementChannel);

    let embed = new MessageEmbed()
        .setColor(hex)
        .setTitle('Emote Updated!')
        .setAuthor(auditlogs.entries.first().executor.tag, auditlogs.entries.first().executor.displayAvatarURL())
        .setDescription(`Emoji name changed from **${oldEmoji.name}** to **${newEmoji.name}**`)
        .setThumbnail(newEmoji.url)
        .setTimestamp()
    updates.send(embed);
})

client.login(process.env.BOT_TOKEN);
