export default class Prefix {

    get(guild: any){
        return guild.prefix;
    }
    set(guild: any, prefix: string){
        if(prefix.length > 1 || prefix.length < 1){
            prefix = "§";
        }
        return guild.prefix = prefix;
    }
}