import Metadata from '../helpers/metadata.helper';
import Bot from '../bot.component';
export default class ClearCommand {
    constructor(msg: any, arg: any, guild: any) {
        const metadata = new Metadata();
        async function purge() {
            // msg.delete(); // deleting the command message itself so that it doesnt interfere.
            let findBot: boolean = false;
            msg.member.roles.forEach((role: any) => {
                role.name.toLowerCase() == metadata.getBotRole(guild).toLowerCase() ? findBot = true : false;
            });

            if (!findBot) {
                new Bot().replyWith(msg,`\nYou need the \`${metadata.getBotRole(guild)}\` role to use this command.`,5000);
                return;
            }
            if (isNaN(arg[0])) {
                new Bot().message(msg,`\nUsage: ${metadata.getPrefix(guild)}clear <amount>`,5000);
                return;
            }
            const fetched = await msg.channel.fetchMessages({ limit: arg[0] });
            msg.channel.bulkDelete(fetched)
                .catch((error: any) => msg.channel.send(`Error: ${error}`));
        }
        purge();
    }
}