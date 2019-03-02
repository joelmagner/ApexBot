# Discord-Bot
Discord bot 

# Prefix: §

# Commands 
- **§play** | plays audio from Youtube via search query or url.
- **§skip** | skip to next song in queue (becomes vote if more than 2 people in channel)
- **§quotes** | random quotes
- **§clear** | usage: §clear <number> | removes **x** amount of messages in channel. 
- **§clearbot** | usage: §clearbot <number> | **only** removes messages from `BOT`-users.
# Features
  <h3>Organising</h3>
- Moves all `BOT`-related messages to a text-channel called `botspam`
- Messages targeting `BOT`-commands are removed shortly after.
  <h3>Cleanup</h3>
- `BOT`-messages will be posted in channel `botspam` instead.
- Certain messages will be kept in current channel, but removed shortly after.
  <h3>Moderation</h3>
- users needs role `BOT` to perform certain commands like `§clear` & `§botclear`.
- users who have the role `BOT` will not be @mentioned in `BOT`-response message.

# Dependencies

* discord.js
* ytdl-core
* request
* fs
* get-youtube-id
* youtube-info

# Run: 

- node app.js
