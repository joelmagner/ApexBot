import * as discord from "discord.js";
import Metadata from "./helpers/metadata.helper";
export default class Bot {
    public reply(msg: any, number:number, deleteTime?:number) {
        let message = "";
        switch (number) {
            case -1: 
                message = "Something went wrong. Please try again...";
            case 0:
                message = "Sorry, not sure what that command is.";
                break;
            case 1:
                message = "Ålahue, Skicka bara botmeddelande i botkanalen!";
                break;
            case 2:
                message = "Skipping song.";
                break;
            case 3:
                message = "You've already voted.";
                break;
            case 4:
                message = "You have to be in a voicechannel.";
                break;
            case 5:
                const version = new Metadata().getAppVersion();
                message = `\`\`\`markdown\n\t\t🤖Apex Bot v${version} 🤖\n=================================\nPrefix: § (knappen till vänster om 1)\n=================================
                \n[📻\t§play / §spela](§play never gonna give you up / §play https://www.youtube.com/watch?v=dQw4w9WgXcQ)\n[❌\t§skip / §skippa](skippa en låt)\n[📖\t§quote / §citat](lär dig skånska)\n[🏃‍\t§leave / §stick](botten lämnar.. (BETA) )\n[🗑️\t§clear / §rensa](§clear <antal>)\n[🗑️\t\t§deleteBot](rensar ALLA botmeddelande)\n[📇️\t§queue\t\t](§queue)\n\nAllmänt: Skapa en kanal som heter [#botspam]. Botten kommer lägga alla botmeddelanden där!\n=================================\nDetta meddelande försvinner om 20sekunder.
                \`\`\``;
                break;
            case 6:
                message = "Vi höres, haa dee!";
            default:
                break;
        }
        return deleteTime ? msg.reply(message).then((x: any) => x.delete(deleteTime)).catch((ex:any) => console.log("Error Replying: ", ex)) : msg.reply(message).catch((err:any) => console.log("err reply:", err));
    }

    public delete(msg: discord.Message, number?: number) {
        return number ? msg.delete(number).catch(ex => console.log("Error Deleting: ", ex)) : msg.delete();
    }
}