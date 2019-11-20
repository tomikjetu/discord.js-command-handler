module.exports = {
    name: "uptime",
    category: "Main",
    description: "Writes the uptime",
    usage: "!uptime",
    run: async function (bot, command, args, message) {
        message.channel.send("Uptime: " + ((Date.now() - bot.startTime) / 1000 / 60) + "minutes")
    }
}
