import * as discord from "discord.js";
import Settings from '../models/settings.model';

export default class Guild {
    constructor(guilds: any, msg: discord.Message, settings: Settings) {
        return guilds[msg.guild.id] = {
            queue: [],
            queueNames: [{}],
            songDuration: null,
            isPlaying: false,
            dispatcher: null,
            voiceChannel: null,
            skipRequest: 0,
            skipList: [],
            // TODO: add customization to: botchannel && prefix / guild && custom role.
            botChannel: settings.bot_channel || null,
            botRole: settings.bot_role || null,
            adminRole: settings.bot_role || null,
            prefix: settings.prefix || null,
            oldPrefix: null
        };
    }
}
