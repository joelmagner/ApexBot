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
                break;
            case 6:
                message = "Vi höres, haa dee!";
            default:
                break;
        }
        return deleteTime ? msg.reply(message).then((x: any) => x.delete(deleteTime)).catch((ex:any) => console.log("Error reply(): ", ex)) : msg.reply(message).catch((err:any) => console.log("err reply:", err));
    }
    
    public replyWith(msg: discord.Message, message: string, deleteTime?: number){
        return deleteTime ? msg.reply(message).then((x: any) => x.delete(deleteTime)).catch((ex:any) => console.log("Error replyTo(): ", ex)) : msg.reply(message).catch((err:any) => console.log("err reply:", err));
    }

    public message(msg: discord.Message, message: string, deleteTime?: number){
        return deleteTime ? msg.channel.send(message).then((x: any) => x.delete(deleteTime)).catch((ex:any) => console.log("Error message(): ", ex)) : msg.reply(message).catch((err:any) => console.log("err reply:", err));
    }

    public delete(msg: discord.Message, number?: number) {
        return number ? msg.delete(number).catch(ex => console.log("Error delete(): ", ex)) : msg.delete();
    }
}