var fs = require("fs")

var handler = function (client, path, prefix) {
    this.client = client
    this.path = path
    this.prefix = prefix
    this.commands = {}
    this.aliases = {}
    this.startTime = Date.now()
    client.startTime = Date.now()
    loadCommands(this)
    this.handleCommand = handleCommand
}
module.exports = handler

function handleCommand(message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(this.prefix)) return
    var plain = message.content.substr(this.prefix.length, message.content.length - this.prefix.length)
    var args = plain.trim().split(" ")
    var command = args.shift().toLowerCase()
    var executeCmd = this.commands[command] || this.commands[this.aliases[command]]
    if (executeCmd) {
        var startTime = Date.now()
        executeCmd.run(this.client, command, args, message).then(function () {
            console.log("(" + message.author.username + " (" + message.author.id + ")) Command " + command + " executed in " + (Date.now() - startTime) + "ms")
        })
    }
}

function loadCommands(handler) {
    console.log("Loading Commands")
    fs.readdirSync(process.cwd() +handler.path).forEach(file => {
        var command = require(process.cwd() + handler.path + "/" + file)
        if(command.name && command.category && command.description && command.usage && command.run){
            handler.commands[command.name] = command
            for(alias in command.aliases){
                handler.aliases[command.aliases[alias]] = command.name
            }
        }
    })
    console.log("All commands loaded in " + (Date.now() - handler.startTime) + "ms")
}