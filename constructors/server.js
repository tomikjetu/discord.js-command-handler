var server = function (id, handler) {
    this.id = id;
    this.handler = handler;

    //check if server exists
    if (!this.handler.client.guilds.get(this.id)) throw "Unknown server"

    this.guild = this.handler.client.guilds.get(this.id)

    //functions
    this.getId = () => { return this.id }
    this.getName = () => { return this.guild.name }
    var defaultUserCountOptions = {
        "users": true,
        "bots": true,
        "onlineOnly": false
    }
    this.getUserCount = (options = defaultUserCountOptions) => {
        var count = 0
        if (!options.onlineOnly) {
            if (options.users) count += this.guild.members.filter(member => !member.user.bot).size;
            if (options.bots) count += this.guild.members.filter(member => member.user.bot).size;
        } else {
            if (options.users) count += this.guild.members.filter(member => !member.user.bot).filter(member => member.presence.status == "online").size
            if (options.bots) count += this.guild.members.filter(member => member.user.bot).filter(member => member.presence.status == "online").size
        }
        return count
    }
}
exports.server = server
