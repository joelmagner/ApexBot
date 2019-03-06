export default class BotChannel {

    get(guild: any): string {
        return guild.botChannel;
    }

    set(guild: any, name: string) {
        return guild.botChannel = name;
    }
}