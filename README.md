# Discord.js Command Handler

Easily manage commands.

## Install

```bash
npm i @tomdev/discord.js-command-handler
```

## Usage

### Main file

```javascript
//discord.js libary
var discord = require("discord.js")
var client = new discord.Client()

var handler = require("@tomdev/discord.js-command-handler")
//initialize handler, pass client, folder with command files, prefix
var cmdhandler = new handler(client, "./commands", "!")

//handle command on message event
client.on("message", (message) => {
    cmdhandler.handleCommand(message)
})
```

### Command files

```javascript
module.exports = {
    name: "example", //neded
    aliases: ["e", "exa"], //needed
    category: "Main",
    description: "This is an example command",
    usage: "!example",
    run: async function (client, command, args, message) { //needed
        message.channel.send("Hello World!")
    }
}
```

### Features and Description
`new handler(client, path, prefix)` 
**Client** - Discord.js Client
**Path** - path to commands folder
**prefix** - prefix for commands
- Creates new handler
- Adds variable to client object (startTime)

`handler.handleCommand(message)`
**Message** - message input from user
 - Handles commands, runs commands *run* function
##### Command object
**name**: Command name which will be searched for: !example
**aliases**: Aliases for command which will be searched for: !e
**run**: Async function ran when command was found:
```javascript 
run: async function (client, command, args, message) {
        message.channel.send("Hello")
}
```
**Bot** - client passed on initialization
**Command** - command passed by user (Name of command)
**Args** - arguments passed by user
**Message** - message passed by user