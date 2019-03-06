import MoveMessage from "./../helpers/move.helper";
import { Message } from "discord.js";

export default class QuoteCommand {
    constructor(client: any, msg: Message, guild: any) {
        new MoveMessage(client, msg, this.randomQuote(msg), guild);
    }

    randomQuote(msg: Message) {
        const min = 1, max = 9;
        let random = Math.floor(Math.random() * (max-min+1)+min);
        switch (random) {
            case 1:
                return "Hookkens paug e du?";
            case 2:
                return "Ökke öl du åme pöjkvask";
            case 3:
                return "Ä du gla ve å släppa te? (beswaras barra au fruntemma)";
            case 4:
                return "Stoaleg pau dina håsor?";
            case 6:
                return "Haur du planerad å stanna längre än va som e nödvänned?";
            case 7:
                return "\n||Namn: "+msg.author+"\nYrke: Ålahue||\nHarrmid forrsäkrar jau po hidder ou samvede att ifyllda oppgiftorr e helt riktia ou sanna";
            case 8:
                return "Åsse markera me kryss ditt ålahue [||X||]";
            case 9:
                return "Jau forrsäkrarsom rättrogen skåning att den häer personen e o lida po, e saj sel nock, passligt hialös ou darforr lempli.";
            default:
                return "nu blidde nå gaulet...";
        }
    }

}