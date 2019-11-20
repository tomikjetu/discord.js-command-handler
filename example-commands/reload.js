module.exports = {
    name: "reload",
    category: "Main",
    description: "Reloads commands",
    usage: "!reload",
    run: async function (bot, command, args, message) {
        //todo permissions here
        bot.handler.reloadCommands(bot.handler)
    }
}