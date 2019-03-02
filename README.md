# Apex Bot
*A non intrusive Discord bot that cleans up after itself and others*

# Prefix: §

# Commands 
- **§play** | Plays audio from Youtube via search query or url.
- **§skip** | Skip to next song in queue (becomes vote if more than 2 people in channel)
- **§queue** | Checks current songqueue.
- **§quotes** | Random quotes
- **§clear** | Usage: §clear `amount` | Removes **x** amount of messages in channel.
- **§clearbot** | Usage: §clearbot `amount` | **Only** removes messages from `BOT`-users.
- **§help** | Displays avaliable commands.
- **§leave** | Bot leaves the current channel | Requires `BOT`-role. 
# Features
<h3>Organising</h3>

* Moves all `BOT`-related messages to a text-channel called `botspam`.
* Usermessages triggering `BOT`-commands are removed shortly after.
<h3>Cleanup</h3>

* `BOT`-messages will be posted in channel `botspam` instead.
* Certain BOT-responses will be kept in current channel, but will be removed shortly after.
<h3>Moderation</h3>

* Users needs role `BOT` to perform certain commands like `§clear` & `§botclear`.
* Users who have the role `BOT` will not be @mentioned in `BOT`-response message.
* You must be in a voicechannel to fetch the bot. 
# Dependencies
<h3>NPM</h3>

* Discord.js
* Ytdl-core
* Request
* Fs
* Get-youtube-id
* Youtube-info
<h3>API</h3>

* Youtube
* Discord
# Run

> `node app.js`
