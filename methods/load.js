var fs = require("fs")
function load(handler) {
    fs.readdirSync(process.cwd() + handler.path).forEach(file => {
        var command = require(process.cwd() + handler.path + "/" + file);
        if (command.name && command.category && command.description && command.usage && command.run) {
            handler.commands[command.name] = command;
            handler.commands[command.name].filename = file;
            for (alias in command.aliases) {
                handler.aliases[command.aliases[alias]] = command.name;
            }
        }
    });
}
exports.load = load
