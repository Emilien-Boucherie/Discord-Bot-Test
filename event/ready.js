// When client ready, run this only once
module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log('Félicitation, votre bot discord a été correctement initialisé !');
    }
}