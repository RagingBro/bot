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
        case "embed": {
            await m.send(
                new Embed()
                    .setTitle("This is a test title!")
                    .setDescription("This is a test description")
                    .setColor("BLUE")
                    .setTimestamp()
                    .setAuthor("Test author")
                    .addFields([
                        { name: "Test field 1", value: "This is a test field", inline: true },
                        { name: "Test field 2", value: "This is a test field", inline: true },
                        { name: "Test field 3", value: "This is a test field", inline: false },
                    ]),
            );
            break;
        }
        case "help": {
            await m.send(
                new Embed()
                    .setTitle("HackerBot Help")
                    .setDescription(`Hello, <@${m.member.id}>! My prefix is "hb!".`)
                    .setColor("BLUE")
                    .addFields([
                        { name: "hb!help", value: "Show this help.", inline: false},
                        { name: "hb!test", value: "Simple test command..", inline: false},
                        { name: "hb!echo [message]", value: "Bot will say the message. Has a funny use.", inline: false},
                    ])
            )
            break
        }
      case "deletedMessageTest": {
        await m.send("The command should delete now...")
        await m.delete()
        break
      }
    }
});

// client.on("debug", console.log);
client.on("error", console.log);
client.once("ready", () => console.log("Guilded bot is ready!"));
client.on("exit", () => console.log("Disconnected!"));

client.login();
