const discord = require("discord.js");
const client = new discord.Client();
const ytdl = require("ytdl-core");
const request = require("request");
const fs = require("fs");
const getYouTubeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");
// länk för att ansluta till server
// https://discordapp.com/oauth2/authorize?client_id=550368724851490816&scope=bot&permissions=8

// init configs from settings file
var config = JSON.parse(fs.readFileSync("./settings.json", "utf-8"));
const yt_api_key = config.yt_api_key;
const yt_uri = config.yt_uri;
const yt_generic = config.yt_generic;
const bot_controller = config.bot_controller;
const prefix = config.prefix;
const discord_token = config.discord_token;
var guilds = {};
var guild;
client.login(discord_token);

client.on("message", async (msg) => {
    const member = msg.member;
    const mess = msg.content.toLowerCase();
    const args = msg.content.split(' ').slice(1).join(" ");
    let cont = msg.content.slice(prefix.length).split(" "); // This variable slices off the prefix, then puts the rest in an array based off the spaces
    let arg = cont.slice(1);

    if (!guilds[msg.guild.id]) {
        guild = guilds[msg.guild.id] = {
            queue: [], // holds the ID values of the youtube-videos.
            queueNames: [],
            isPlaying: false,
            dispatcher: null,
            voiceChannel: null,
            skipRequest: 0,
            skipList: []
        }
    }

    if (mess.startsWith(prefix + "spela") || mess.startsWith(prefix + "play")) { // play song
        if (member.voiceChannel || guild.voiceChannel != null) {
            guild.voiceChannel = member.voiceChannel;
            if (guild.queue.length > 0 || guild.isPlaying) {
                getID(args, (url) => {
                    addToQueue(url, msg);
                    fetchVideoInfo(url, (err, videoInfo) => {
                        if (err) throw new Error(err);
                        guild.queueNames.push(videoInfo.title);
                        moveBotMessage(" lägger till **" + videoInfo.title + "** i kön");
                    });
                });
                msg.delete();
            } else {
                guild.isPlaying = true;
                getID(args, (url) => {
                    guild.queue.push(url);
                    playMusic(url, msg);
                    addToQueue(url, msg);
                    fetchVideoInfo(url, (err, videoInfo) => {
                        if (err) throw new Error(err);
                        guild.queueNames.push(videoInfo.title);
                        moveBotMessage("🎵 **" + videoInfo.title + "**");
                    });
                });
                msg.delete();
            }
        } else {
            msg.reply(" du behöver va i en röstkanal din mupp").then(del => del.delete(5000));
        }
    } else if (mess.startsWith(prefix + "skippa") || mess.startsWith(prefix + "skip")) { // skippa låt
        msg.delete();
        const skip = msg.author.id;
        if (guild.skipList.indexOf(skip === -1)) {
            guild.skipList.push(skip);
            guild.skipRequest++;
            var calc = Math.ceil(((guild.voiceChannel.members.size - 1) / 2));
            if (guild.skipRequest >= calc == undefined ? 1 : calc) {
                skipSong(msg);
                msg.reply(" daulig laud som var pau, nu byder vi!").then(del => del.delete(5000));
            } else {
                msg.reply(" ikke uppskattad låt. Du behöver lide fler fölk för o [skippa] låten **" +
                    Math.ceil((guild.voiceChannel.members.size - 1) / 2) - guild.skipRequest + "**").then(del => del.delete(5000));
            }
        } else {
            msg.reply(" sluda nu ron, du haer jue redan rööstat").then(del => del.delete(5000));
        }
    } else if (mess.startsWith(prefix + "stick") || mess.startsWith(prefix + "leave")) { // leave
        msg.reply(" haaaa deee").then(del => del.delete(5000));
        leaveChannel();
    } else if (mess.startsWith(prefix + "citat") || mess.startsWith(prefix + "quote")) { //citat
        msg.delete();
        moveBotMessage(randomQuote());
    } else if (mess.startsWith(prefix + ("hjälp")) || mess.startsWith(prefix + ("help")) || mess.startsWith(prefix + ("info"))) {
        msg.reply(`\`\`\`markdown\n\t\t🤖Joels Bot v0.1🤖\n=================================\nPrefix: § (knappen till vänster om 1)\n=================================
        \n[📻\t§play / §spela](§play never gonna give you up / §play https://www.youtube.com/watch?v=dQw4w9WgXcQ)\n[❌\t§skip / §skippa](skippa en låt)\n[📖\t§quote / §citat](lär dig skånska)\n[🏃‍\t§leave / §stick](botten lämnar.. (BETA) )\n[🗑️\t§clear / §rensa](§clear <antal>)\n[📇️\t§queue\t\t](§queue)\n\nAllmänt: Skapa en kanal som heter [#botspam]. Botten kommer lägga alla botmeddelanden där!\n=================================
        \`\`\``);
    } else if (mess.startsWith(prefix + "queue")) {
        msg.delete();
        var songInfo = "```";
        for (var i = 0; i < guild.queueNames.length; i++) {
            var temp = (i + 1) + ": " + guild.queueNames[i] + (i === 0 ? " 🔊 (Nuvarande låt)" : "") + "\n";
            if ((songInfo + temp).length <= 2000 - 3) {
                songInfo += temp;
            } else {
                songInfo += "```";
                msg.channel.send(songInfo).then(del => del.delete(10000));
                songInfo = "```";
            }
        }
        songInfo += "```";
        songInfo != "``````" ? msg.channel.send(songInfo).then(del => del.delete(10000)) : "";
    } else if (mess.startsWith(prefix + "clear")) {

        async function purge() {
            msg.delete(); // deleting the command message itself so that it doesnt interfere.
            if (!msg.member.roles.find("name", "BOT")) {
                msg.channel.send('You need the \`BOT\` role to use this command.').then(del => del.delete(5000));
                return;
            }
            if (isNaN(arg[0])) {
                msg.channel.send('\n Usage: ' + prefix + 'clear <antal>');
                return;
            }

            const fetched = await msg.channel.fetchMessages({ limit: arg[0] });

            // Deleting the msgs
            msg.channel.bulkDelete(fetched)
                .catch(error => msg.channel.send(`Error: ${error}`));
        }
        purge();

    } else if (mess.startsWith(prefix + "move")) {
        if (msg.channel.name !== "botspam") {
            msg.delete();
            msg.reply("Skicka bara botmeddelande i botkanalen!").then(reply => reply.delete(5000));
            client.guilds.forEach(guil => {
                let botChannel = guil.channels.find(channel => channel.type == "text" && channel.name == "botspam");
                client.channels.get(botChannel.id).send(mess);
            });
        }
    }

    function moveBotMessage() {
        if (msg.channel.name !== "botspam") {
            msg.delete();
            msg.reply("Skicka bara botmeddelande i botkanalen!").then(reply => reply.delete(5000));
            client.guilds.forEach(guil => {
                let botChannel = guil.channels.find(channel => channel.type == "text" && channel.name == "botspam");
                client.channels.get(botChannel.id).send(mess);
            });
        }
    }
    function moveBotMessage(cmsg) {
        if (msg.channel.name !== "botspam") {
            msg.delete();
            msg.reply("Skicka bara botmeddelande i botkanalen!").then(reply => reply.delete(5000));
            client.guilds.forEach(guil => {
                let botChannel = guil.channels.find(channel => channel.type == "text" && channel.name == "botspam");
                let mention = "";
                msg.member.roles.find("name", "BOT") ? mention = msg.author.username : mention = msg.author;
                client.channels.get(botChannel.id).send(`${mention} ${cmsg}`);
            });
        }
    }
    function findBotUser() {
        msg.guild.members.find(activeUser => {
            if (activeUser.user.bot) {
                return activeUser;
            }
            console.log("NO BOT FOUND!");
        });
    }

    function leaveChannel() {
        manualDisconnect = true;
        // guild.dispatcher.end();
        guild.queue = [];
        guild.voiceChannel.leave();
    }
});

client.on("ready", () => {
    console.log("Ready to connect...");
});

function randomQuote() {
    const min = 0, max = 10;
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    switch (random) {
        case 1:
            return "Hookkens paug e du?";
        case 2:
            return "Ökke öl du åme pöjkvask";
        case 3:
            return "Ä du gla ve å släppa te? (beswaras barra au fruntemma)";
        case 4:
            return "Stoaleg pau dina håsor?";
        case 5:
            return "Hå breiaislad ä du?";
        case 6:
            return "Haur du planerad å stanna längre än va som e nödvänned?";
        case 7:
            return "Harrmid forrsäkrar jau po hidder ou samved att ovan ifyllda oppgiftorr e helt riktia ou sanna";
        case 8:
            return "Åsse markera me kryss ditt ålahue";
        case 9:
            return "Jau forrsäkrarsom rättrogen skåning att dinne harade personen ovan e o litt po, e saj sel nock, passligt hialös ou darforr lempli.";
        default:
            return "nu gick de gaulet tii... **Joel lös det... fattaru?!**";
    }
}

function skipSong(message) {
    guild.dispatcher.end();
    if (guild.queue.length > 0) {
        playMusic(guild.queue[0], message);
    }
}

function playMusic(url, message) {
    guild.voiceChannel = message.member.voiceChannel;
    guild.voiceChannel.join().then((connect) => {
        audioStream = ytdl(yt_generic + url, {
            filter: "audioonly",
            volume: 0.02
        });
        guild.skipRequest = 0;
        guild.skipList = []; //allow users to skip new song
        guild.dispatcher = connect.playStream(audioStream);
        guild.dispatcher.setVolume(0.03); // set volume
        guild.dispatcher.on("end", () => {
            guild.skipRequest = 0;
            guild.skipList = [];
            guild.queue.shift();
            guild.queueNames.shift();
            if (guild.queue.length === 0) {
                guild.queue = [];
                guild.queueNames = [];
                guild.isPlaying = false;
            } else {
                setTimeout(() => {
                    playMusic(guild.queue[0], message);
                }, 900);
            }
        });
    });
}

function getID(url, callback) {
    if (isYoutube(url)) {
        callback(getYouTubeID(url));
    } else {
        searchVideo(url, (id) => {
            callback(id);
        });
    }
}

function addToQueue(url, message) {
    isYoutube(url) ? guild.queue.push(getYouTubeID(url)) : guild.queue.push(url);
}

function searchVideo(query, callback) {
    request(yt_uri + encodeURIComponent(query) + "&key=" + yt_api_key, function (error, response, body) {
        var json = JSON.parse(body);
        console.log(json);
        if (!json.items[0]) {
            callback("3_-a9nVZYjk");
        }
        else {
            callback(json.items[0].id.videoId);
        }
    });
}

function isYoutube(str) {
    return str.toLowerCase().indexOf("youtube.com") > -1;
}