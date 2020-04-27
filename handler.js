const { reloadCommands } = require("./methods/reloadCommands")
const { handleCommand } = require("./methods/handleCommand")
const { loadCommands } = require("./methods/loadCommands")
const { getPrefix } = require("./methods/getPrefix")
const { server } = require("./constructors/server")

var handler = function (client, path, prefix) {
    //user variables
    this.client = client
    this.path = path
    this.prefix = prefix

    //memory variables
    this.commands = {}
    this.aliases = {}
    this.startTime = Date.now()

    //modifly client
    client.startTime = Date.now()
    client.handler = this

    //Load commands
    loadCommands(this)
}
module.exports = handler

//load
handler.prototype.onMention = function (func) { this.mentionFunction = func }

//modify client
handler.prototype.updatePrefix = function (prefix) { this.prefix = prefix }

//tools
handler.prototype.getServer = function (id) { return new server(id, this) }

//methods
handler.prototype.handleCommand = handleCommand
handler.prototype.reloadCommands = reloadCommands
handler.prototype.getPrefix = getPrefix