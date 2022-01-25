const fs = require('fs');
// require necessary classes from discord.js
const { Client, Intents, Collection } = require('discord.js');

const { token } = require('./config.json');

// new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

// Code for dinamically retrieving all the commands file in the commands folder
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a ne item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

// Code for dinamically retrieving all the event file in the event folder
const eventFiles = fs.readdirSync('./event').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./event/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Once active, listen to commands.
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
       await command.execute(interaction) 
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was and error while executing this command !', ephemeral: true });
    }
});

client.login(token);