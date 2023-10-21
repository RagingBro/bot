require("dotenv/config");
if (!process.env.TOKEN) throw new Error("Please supply a Guilded API token in your .env file.");

const { Client, Embed } = require("guilded.js");
const client = new Client({ token: process.env.TOKEN });
const prefix = process.env.PREFIX;

client.on("messageCreated", async (m) => {
    if (m.createdByBotId || !m.content.startsWith(prefix)) return;
    const [commandName, ...args] = m.content.slice(prefix.length).split(" ");
    switch (commandName) {
        case "test": {
            await m.send("TESTING!");
            break;
        }
        case "echo": {
            await m.send(args.join(" "));
            break;
        }
        case "help": {
            await m.send(`Hello, ${m.member.displayName}!\nMy prefix is "hb!".\nMy commands are:\nhelp - You're here right now!\ntest - Test if bot works.\necho [message] - Bot will repeat the message.`)
        }
    }
});

// client.on("debug", console.log);
client.on("error", console.log);
client.once("ready", () => console.log("Guilded bot is ready!"));
client.on("exit", () => console.log("Disconnected!"));

client.login();
