const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Replies with user infos'),
    async execute(interaction) {
        await interaction.reply(`User info : ${interaction.user.username}\n${interaction.user.tag}\n${interaction.user.avatar}`)
    }
}