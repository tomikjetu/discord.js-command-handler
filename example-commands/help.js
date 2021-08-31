var fs = require("fs")
var discord = require("discord.js")
//This is simple help command, which loads all files (Creates discord embed) in provided directory path.
//Wont work with directories in directories 
//Needs changes for your code - edit paths
module.exports = {
    name: "help",
    category: "Main",
    description: "Get list of all commands or command help",
    usage: "!help [command name]",
    run: async function (bot, command, args, message) {
        if (args.length) {
            if (fs.existsSync("./example-commands/" + args[0] + ".js")) { 
                var command = require("./" + args[0] + ".js")
                var embed = new discord.MessageEmbed()
                    .setTitle(command.name.charAt(0).toUpperCase() + command.name.slice(1))
                    .setDescription(command.description)
                embed.addField('Category', command.category, true)
                if(command.aliases){
                    embed.addField('Aliases', command.aliases.join(", "), true)
                }
                embed.addField('Usage', command.usage, true)
                message.channel.send("Arguments: <> = needed argument, [] = optional argument")
                message.channel.send({embeds: [embed]})
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
            var embed = new discord.MessageEmbed()
                .setTitle("Main Help")
                .setDescription("Prefix: " + bot.handler.getPrefix(message.guild.id))
            for (category in list) {
                var commands = []
                for (cmd in list[category]) {
                    commands.push(list[category][cmd])
                }
                embed.addField("**" + category.charAt(0).toUpperCase() + category.slice(1) + "**", commands.join(", "))
            }
            message.channel.send({embeds: [embed]})
        }
    }
}