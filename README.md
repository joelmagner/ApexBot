# Mufasa Bot

<img src="https://i.imgur.com/9otS8GZ.png" height="200" width="200" />

*A Discord bot that cleans up after users and itself*
* Mufasa bot is now hosted on Google Cloud. Click [here](https://discordapp.com/oauth2/authorize?client_id=550368724851490816&scope=bot&permissions=8) to invite to your server
# Prefix: §

# Commands 
- **§play** | Plays audio from Youtube via search query or url.
- **§skip** | Skips to next song in queue (becomes vote if more than 2 people in channel)
- **§queue** | Checks current songqueue.
- **§quotes** | Random quotes
- **§clear** | Usage: ***§clear `amount`*** | Removes **x** amount of messages in channel.
- **§clearbot** | Usage: ***§clearbot `amount`*** | **Only** removes messages from `BOT`-users.
- **§help** | Displays avaliable commands and channel-related information.
- **§leave** | Bot leaves the current channel | Requires `BOT`-role. 
- **§setprefix** | Usage: ***§setprefix `char`*** | Sets custom prefix for the channel. 
- **§setbotrole** | Usage: ***§setbotrole `name`*** | Sets custom botrole for the channel. 
- **§setbotchannel** | Usage: ***§setbotchannel `channel`*** | Sets custom message channel where `BOT`-messages will be placed. 

# Features
<h3>Organising</h3>

* Moves all `BOT`-related messages to a text-channel called `botspam`.
* Usermessages triggering `BOT`-commands are removed shortly after.
<h3>Cleanup</h3>

* `BOT`-messages will be posted in channel `botspam` instead. (**Configurable** >= v 1.0.4)
* Certain `BOT`-responses will be kept in current channel, but will be removed shortly after.
<h3>Moderation</h3>

* Users needs role `BOT` to perform certain commands like `§clear` & `§botclear`. (**Configurable** >= v 1.0.4)
* Users who have the role `BOT` will not be @mentioned in `BOT`-response message.
* You must be in a voicechannel to fetch the bot. 
# Dependencies
<h3>NPM</h3>

* Discord.js
* Ytdl-core
* Ytdl-info
* Request
* Fs
* Youtube-info
<h3>API(s)</h3>

* Youtube
* Discord
# Run

> `node app.js`

---

<img src="https://i.imgur.com/Q4QzSEb.png" />
