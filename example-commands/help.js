var fs = require("fs")
var discord = require("discord.js")
module.exports = {
    name: "help",
    category: "Main",
    description: "Get list of all commands or command help",
    usage: "!help [command name]",
    run: async function (bot, command, args, message) {
        if (args.length) {
            if (fs.existsSync("./example-commands/" + args[0] + ".js")) {
                var command = require("./" + args[0] + ".js")
                var embed = new discord.RichEmbed()
                    .setTitle(command.name.charAt(0).toUpperCase() + command.name.slice(1))
                    .setDescription(command.description)
                embed.addField('Category', command.category, true)
                if(command.aliases){
                    embed.addField('Aliases', command.aliases, true)
                }
                embed.addField('Usage', command.usage, true)
                message.channel.send(embed)
            } else {
                message.channel.send("Invalid command")
            }
        } else {
            var list = {}
            fs.readdirSync("./example-commands").forEach(file => {
                var command = require("./" + file)
                if (!list[command.category]) list[command.category] = []
                list[command.category].push(command.name)
            })
            var embed = new discord.RichEmbed()
                .setTitle("Main Help")
                .setDescription("<> = needed argument, [] = optional argument")
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