export default class CleanupCommand {
    constructor(msg: any, arg: any) {
        async function purge() {
            msg.delete(); // deleting the command message itself so that it doesnt interfere.
            let findBot: boolean = false;
            msg.member.roles.forEach((role: any) => {
                role.name == "BOT" ? findBot = true : false;
            });

            if (!findBot) {
                msg.channel.send('You need the \`BOT\` role to use this command.').then((del: any) => del.delete(5000));
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
                    msg.channel.send(" Raderade: ***" + deletedMessages + "*** meddelande från \`BOT\` användare").then((x: any) => x.delete(5000));
                });
            }
        }
        purge();
    }
}