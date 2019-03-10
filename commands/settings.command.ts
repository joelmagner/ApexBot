import Metadata from '../helpers/metadata.helper';
import Bot from '../bot.component';
export default class SettingsCommand {
    constructor(msg: any, guild: any) {
        const divider: string = "\n===================================";
        const meta = new Metadata();
        const p = meta.getPrefix(guild);
        const bot = new Bot();
        const message = "```markdown"+
        `\n🤖Apex Bot [v${meta.getAppVersion()}] by ${meta.getAuthor()} 🤖`+
        divider+
        "\nChannel Settings"+
        divider+
        "\n[BotChannel]: #"+ meta.getBotChannel(guild)+
        "\n[BotRole]: "+ meta.getBotRole(guild)+
        "\n[AdminRole]: "+ meta.getAdminRole(guild)+
        "\n[Prefix]: "+ p +
        divider+
        "\n\n[This Message will erase itself in 60 seconds]"+
        "\n```";
        bot.message(msg, message, 60000);
    }
}