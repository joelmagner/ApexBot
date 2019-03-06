import Metadata from '../helpers/metadata.helper';
export default class CleanupCommand {
    constructor(msg: any, arg: any, guild: any) {
        const metadata = new Metadata();
        async function purge() {
            msg.delete(); // deleting the command message itself so that it doesnt interfere.
            let findBot: boolean = false;
            msg.member.roles.forEach((role: any) => {
                role.name.toLowerCase() == metadata.getRoleName(guild).toLowerCase() ? findBot = true : false;
            });
            if (!findBot) {
                msg.channel.send(`You need the \`${metadata.getRoleName(guild)}\` role to use this command.`).then((del: any) => del.delete(5000));
                return;
            }
            if (isNaN(arg[0])) {
                msg.channel.send('\n Usage: §clear <antal>');
                return;
            }
            if (msg.channel.type == "text") {
                msg.channel.fetchMessages({ limit: arg[0] }).then((messages: any) => {
                    const botMessages = messages.filter((msgFilter: any) => msgFilter.author.bot);
                    const deletedMessages = botMessages.array().length; // number of messages deleted
                    // Deleting the msgs
                    msg.channel.bulkDelete(botMessages)
                        .catch((error: any) => msg.channel.send(`Error: ${error}`));
                    msg.channel.send(`Deleted \`${deletedMessages}\` messages from \`BOT\` users`).then((x: any) => x.delete(5000));
                });
            }
        }
        purge();
    }
}