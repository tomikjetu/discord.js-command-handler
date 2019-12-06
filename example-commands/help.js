var fs = require("fs")
var discord = require("discord.js")
module.exports = {
    name: "help",
    category: "Main",
    description: "Get list of all commands or command help",
    usage: "!help [command name]",
    //Code needs som changes to work for your bot (change paths, etc.)
    run: async function (bot, command, args, message) {
        locpaths = []
        var paths = getAllPaths("./example-commands") //path
        if (args.length) {
            var found = false
            paths.forEach(file => {
                if (!file.endsWith(".js")) return
                var command = require("../../" + file.replace("./", "")) //path ("../../")
                if (command.name == args[0]) {
                    var embed = new discord.RichEmbed()
                        .setTitle(command.name.charAt(0).toUpperCase() + command.name.slice(1))
                        .setDescription(command.description)
                    embed.addField('Category', command.category, true)
                    if (command.aliases) {
                        embed.addField('Aliases', command.aliases, true)
                    }
                    embed.addField('Usage', command.usage, true)
                    message.channel.send(embed)
                    found = true
                }
            })
            if (!found) message.channel.send("Invalid command")
        } else {
            var list = {}
            paths.forEach(file => {
                if (!file.endsWith(".js")) return
                var command = require("../../" + file.replace("./", "")) //path ("../../")
                if (!list[command.category]) list[command.category] = []
                list[command.category].push(command.name)
            })
            var embed = new discord.RichEmbed()
                .setTitle("Main Help")
                .setDescription("<> = needed argument, [] = optional argument. \n" +
                    "Prefix: " + bot.handler.getPrefix(message.guild.id))
            for (category in list) {
                var commands = []
                for (cmd in list[category]) {
                    commands.push(list[category][cmd])
                }
                embed.addField("**" + category.charAt(0).toUpperCase() + category.slice(1) + "**", commands)
            }
            message.channel.send(embed)
        }
    }
}

var locpaths = []
function getAllPaths(path) {
    fs.readdirSync(path).forEach(file => {
        if (fs.lstatSync(path + "/" + file).isDirectory()) getAllPaths(path + "/" + file)
        else locpaths.push(path + "/" + file)
    })
    return locpaths
}
