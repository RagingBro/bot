require("dotenv/config");
if (!process.env.TOKEN) throw new Error("Please supply a Guilded API token in your .env file.");

const guilded = require("guilded.js");
const client = new guilded.Client({ token: process.env.TOKEN });
const prefix = process.env.PREFIX;
let allowedMap = new Map();
allowedMap.set("409Rrjyd", true)

client.on("messageCreated", async (m) => {
    if (m.createdByBotId || !m.content.startsWith(prefix)) return;
    const [commandName, ...args] = m.content.slice(prefix.length).split(" ");
    switch (commandName) {
        case "echo": {
            // args.foreach()
            if (!allowedMap.get(m.member.id)) {break;}
            await m.delete();
            await m.send(args.join(" "));
            break;
        }
        case "toggle": {
            if (m.member.id != "409Rrjyd") {break;}
            await m.delete()
            if (!args) {
              await m.send("Must supply a user ID");
            }
              const userID = args[0];
              let fart_club = m.server.id;
              console.log(fart_club);
              const user = await client.members.fetch(fart_club, userID);
              allowedMap.set(userID, allowedMap.get(userID));
              await m.send(`Toggled ${user.displayName}'s access to ${allowedMap.get(userID)}`);
              await m.send("Invalid user :(");
            break;
        }
    }
});

// client.on("debug", console.log);
client.on("error", console.log);
client.once("ready", () => console.log("I'm in."));
client.on("exit", () => console.log("Disconnected!"));

client.login();
