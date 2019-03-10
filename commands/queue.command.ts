export default class QueueCommand {
    constructor(guild: any, msg: any) {
        var songInfo = "```";
        for (var i = 0; i < guild.queueNames.length; i++) {
            var temp = (i + 1) + ": " + guild.queueNames[i] + (i === 0 ? " 🔊 (Nuvarande låt)" : "") + "\n";
            if ((songInfo + temp).length <= 2000 - 3) {
                songInfo += temp;
            } else {
                songInfo += "```";
                // msg.channel.send(songInfo).then((del: any) => del.delete(10000));
                songInfo = "```";
            }
        }
        songInfo += "```";
        songInfo != "``````" ? msg.channel.send(songInfo).then((del: any) => del.delete(10000)) : "";
    }
}