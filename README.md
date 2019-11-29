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
var prefix = "!" //same for every server
/*var prefix = { //define for each server
    "default": "!" //if server hasn't
    "6166856194426361379": "?" //prefix for server with id
    "6166856194426361380": "$" //prefix for server with id
}*/ 
var cmdhandler = new handler(client, "/commands", prefix)

//handle command on message event
client.on("message", (message) => {
    cmdhandler.handleCommand(message)
})
```

### Command files
Example commands on [Github](https://github.com/TGamingStudio/discord.js-command-handler/tree/master/example-commands)
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
```javascript
new handler(client, path, prefix)
``` 
- **Client** - Discord.js Client
- **Path** - path to commands folder (All folders inside will be loaded)
- **prefix** - string (every guild has same prefix) / object, with default and server prefixes
##### About
- Creates new handler
- Adds variables to client object *(startTime, handler)*
---
```javascript
handler.handleCommand(message)
```
- **Message** - message input from user
##### About
- Handles commands, runs commands *run* function
---
```javascript
handler.handleMention(function)
```
- **Function** - function ran on client mention

<details>
  <summary>Example</summary>

  ```javascript
  function func(bot, message){
      message.reply("I got pinged.")
  }
  cmdhandler.handleMention(func)
  ```

</details>

##### About
- When bot is mentioned, runs *function* with parameters *client, message*
---
```javascript
handler.reloadCommands(handler)
```
- **Handler** - Handler to reload commands withour restarting server
- [Example Reload Command](https://github.com/TGamingStudio/discord.js-command-handler/blob/master/example-commands/reload.js)
---
```javascript
handler.getPrefix(id)
```
- **Id** - Id of guild to get prefix for guild
---
```javascript
handler.updatePrefix(prefix)
```
- **Prefix** - string (every guild has same prefix) / object, with default and server prefixes
---
##### Command object
- **name**: Command name which will be searched for: !example
- **aliases**: Aliases for command which will be searched for: !e
- **run**: Async function ran when command was found:
```javascript 
run: async function (client, command, args, message) {
        message.channel.send("Hello")
}
```
- **Bot** - client passed on initialization 
- **Command** - command passed by user (Name of command)
- **Args** - arguments passed by user
- **Message** - message passed by user