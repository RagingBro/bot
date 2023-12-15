require("dotenv/config");
if (!process.env.TOKEN) throw new Error("Please supply a Guilded API token in your .env file.");

const guilded = require("guilded.js");
const client = new guilded.Client({ token: process.env.TOKEN });
const prefix = process.env.PREFIX;

client.on("messageCreated", async (m) => {
    if (m.createdByBotId || !m.content.startsWith(prefix)) return;
    const [commandName, ...args] = m.content.slice(prefix.length).split(" ");
    switch (commandName) {
        case "echo": {
            if (m.member.displayName != "T") {break;}
            await m.delete();
            await m.send(args.join(" "));
            break;
        }
    }
});
client.on("memberJoined", async (member) => {
          await (await client.channels.fetch("85cef5b9-4483-4236-9d89-9b6ca7b49c5a")).send(`Welcome to the HackStation server, ${member.displayName}!`)
})

// client.on("debug", console.log);
client.on("error", console.log);
client.once("ready", () => console.log("I'm in."));
client.on("exit", () => console.log("Disconnected!"));

client.login();
