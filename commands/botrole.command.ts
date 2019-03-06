export default class BotRole{

    get(guild: any): string{
        return guild.botRole;
    }

    set(guild:any, name: string){
        return guild.botRole = name;
    }
}