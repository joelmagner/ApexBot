import MoveMessage from "./../helpers/move.helper";

export default class QuoteCommand {
    constructor(client: any, msg: any) {
        new MoveMessage(client, msg, this.randomQuote());
    }

    randomQuote() {
        const min = 0, max = 10;
        let random = Math.floor(Math.random() * (max - min + 1)) + min;
        switch (random) {
            case 1:
                return "Hookkens paug e du?";
            case 2:
                return "Ökke öl du åme pöjkvask";
            case 3:
                return "Ä du gla ve å släppa te? (beswaras barra au fruntemma)";
            case 4:
                return "Stoaleg pau dina håsor?";
            case 5:
                return "Hå breiaislad ä du?";
            case 6:
                return "Haur du planerad å stanna längre än va som e nödvänned?";
            case 7:
                return "Harrmid forrsäkrar jau po hidder ou samved att ovan ifyllda oppgiftorr e helt riktia ou sanna";
            case 8:
                return "Åsse markera me kryss ditt ålahue";
            case 9:
                return "Jau forrsäkrarsom rättrogen skåning att dinne harade personen ovan e o litt po, e saj sel nock, passligt hialös ou darforr lempli.";
            default:
                return "nu gick de gaulet tii... **Joel lös det... fattaru?!**";
        }
    }

}