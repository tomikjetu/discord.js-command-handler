const { handleCommand } = require("./methods/handleCommand")
const { reloadCommands } = require("./methods/reloadCommands")
const { loadCommands } = require("./methods/loadCommands")
const { getPrefix } = require("./methods/getPrefix")

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
    this.updatePrefix = (prefix) => this.prefix = prefix
    this.onMention = (func) => this.mentionFunction = func
}
module.exports = handler

handler.prototype.handleCommand = handleCommand
handler.prototype.reloadCommands = reloadCommands
handler.prototype.getPrefix = getPrefix