export default class FindBot{
    constructor(msg: any){
        msg.guild.members.forEach((isBot:any) => {
            if (isBot.user.bot) {
                return isBot;
            }
        });
        console.log("NO BOT FOUND!");
    }
}