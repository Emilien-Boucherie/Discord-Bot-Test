const { SlashCommandBuilder } = require('@discordjs/builders');

// simple command for testing response with information from server
module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Replies with server infos'),
    async execute(interaction) {
        await interaction.reply(`Server name : ${interaction.guild.name}\nTotal members : ${interaction.guild.memberCount}`)
    }
}
