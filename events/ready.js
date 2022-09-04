//If client exists and is ready to use, print to console.
module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log('Sakiko reporting for service: v1.04');
    }
}