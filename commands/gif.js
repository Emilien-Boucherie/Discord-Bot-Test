const { SlashCommandBuilder } = require('@discordjs/builders');
const { giphyAPI } = require ('../config.json')
const fetch = require('node-fetch')

module.exports = {
    data : new SlashCommandBuilder()
	.setName('gif')
	.setDescription('Sends a random gif!')
	.addStringOption(option =>
		option.setName('search')
            .setDescription('the keyword searched')),
			
    async execute(interaction) {
        const keyword = interaction.options.getString('search');
        const url = `http://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${giphyAPI}`
        const result = await fetch(url);
        const json = await result.json()
        const index = Math.floor(Math.random() * json.data.length)
        await interaction.reply(`${json.data[index].url}`)
    }
}