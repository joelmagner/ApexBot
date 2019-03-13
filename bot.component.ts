import * as discord from "discord.js";
import Metadata from "./helpers/metadata.helper";
export default class Bot {
    
    public reply(msg: any, number:number, deleteTime:number) {
        let message = "";
        switch (number) {
            case -1: 
                message = ":lion_face: Something went wrong. Please try again...";
            case 0:
                message = ":lion_face: Sorry, not sure what that command is.";
                break;
            case 1:
                message = ":lion_face: Ålahue, Skicka bara botmeddelande i botkanalen!";
                break;
            case 2:
                message = ":lion_face: Skipping song.";
                break;
            case 3:
                message = ":lion_face: You've already voted.";
                break;
            case 4:
                message = ":lion_face: You have to be in a voicechannel.";
                break;
            case 5:                         
                break;
            case 6:
                message = ":lion_face: Successfully disconnected! :wave:";
            default:
                break;
        }
        return msg.reply(message).then((x: any) => x.delete(deleteTime)).catch((ex:any) => console.log("Error reply(): ", ex));
    }
    
    public async replyWith(msg: any, message: any, deleteTime: number){
        try {
            const x = await msg.reply(message);
            return x.delete(deleteTime);
        }
        catch (ex) {
            return console.log("Error replyTo(): ", ex);
        }
    }

    public async message(msg: any, message: any, deleteTime: number){
        try {
            const x = await msg.channel.send(message);
            return x.delete(deleteTime);
        }
        catch (ex) {
            return console.log("Error message(): ", ex);
        }
    }

    public async delete(msg: any, number: number) {
        try {
            return msg.delete(number);
        }
        catch (ex) {
            return console.log("Error delete(): ", ex);
        }
    }
}