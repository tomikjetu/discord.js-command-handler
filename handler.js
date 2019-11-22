var fs = require("fs")

var handler = function (client, path, prefix) {
    this.client = client
    this.path = path
    this.prefix = prefix

    this.commands = {}
    this.aliases = {}
    this.startTime = Date.now()

    client.startTime = Date.now()
    client.handler = this

    loadCommands(this)

    this.handleCommand = handleCommand
    this.reloadCommands = reloadCommands
    this.getPrefix = getPrefix
    this.updatePrefix = (prefix) => this.prefix = prefix
}
module.exports = handler

function handleCommand(message) {
    if (message.author.bot) return
    var prefix = this.getPrefix(message.guild.id)
    if (!message.content.startsWith(prefix)) return
    var plain = message.content.substr(prefix.length, message.content.length - prefix.length)
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

function reloadCommands(handler) {
    console.log("Reloading Commands")
    handler.aliases = {}
    var reloadStart = Date.now()
    for (command in handler.commands) {
        delete require.cache[require.resolve(process.cwd() + handler.path + "/" + handler.commands[command].filename)]
        delete handler.commands[command]
    }
    load(handler)
    console.log("All commands reloaded in " + (Date.now() - reloadStart) + "ms")
}

function loadCommands(handler) {
    console.log("Loading Commands")
    load(handler)
    console.log("All commands loaded in " + (Date.now() - handler.startTime) + "ms")
}

function load(handler) {
    fs.readdirSync(process.cwd() + handler.path).forEach(file => {
        var command = require(process.cwd() + handler.path + "/" + file)
        if (command.name && command.category && command.description && command.usage && command.run) {
            handler.commands[command.name] = command
            handler.commands[command.name].filename = file
            for (alias in command.aliases) {
                handler.aliases[command.aliases[alias]] = command.name
            }
        }
    })
}

function getPrefix(id) {
    var prefix = this.prefix
    switch (typeof prefix) {
        case "object":
            if (prefix[id]) return prefix[id]
            else return prefix.default
        case "string":
            return prefix
    }
}