export default class ClearCommand {
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
            const fetched = await msg.channel.fetchMessages({ limit: arg[0] });
            //111 const fetched = await msg.channel.fetchMessages({ limit: arg[0] });

            // Deleting the msgs
            msg.channel.bulkDelete(fetched)
                .catch((error: any) => msg.channel.send(`Error: ${error}`));
        }
        purge();
    }
}