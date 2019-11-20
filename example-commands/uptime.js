var timeString = require("../timeString")
module.exports = {
    name: "uptime",
    category: "Main",
    description: "Writes the uptime",
    usage: "!uptime",
    run: async function (bot, command, args, message) {
        message.channel.send("Uptime: " + timeString(Date.now() - bot.startTime))
    }
}