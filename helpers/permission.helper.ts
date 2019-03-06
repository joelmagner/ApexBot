import Metadata from "./metadata.helper";

export default class Permission {
    get(msg: any, arg: any, guild: any):boolean {
        if(this.validRequest(msg, arg)){
            const metadata = new Metadata();
            let findBot: boolean = false;
            msg.member.roles.forEach((role: any) => {
                findBot = role.name.toLowerCase() == metadata.getRoleName(guild).toLowerCase() ? true : false;
            });
            return findBot;
        } else {
            return false;
        }
    }
    denied(msg: any, guild: any, metadata: Metadata){
        msg.channel.send(`You need the \`${metadata.getRoleName(guild)}\` role to use this command.`).then((del: any) => del.delete(5000));
    }
    validRequest(msg: any, arg: any): boolean{
        if (!arg[0]) {
            msg.channel.send('\n `Incorrect usage!` Please specify a value').then((del: any) => del.delete(5000));
            return false;
        }
        return true;
    }
}