require("dotenv/config");
if (!process.env.TOKEN) throw new Error("Please supply a Guilded API token in your .env file.");

const guilded = require("guilded.js");
const client = new guilded.Client({ token: process.env.TOKEN });
const prefix = process.env.PREFIX;

client.on("messageCreated", async (m) => {
    if (!m.content.startsWith(prefix)) return;
    const [commandName, ...args] = m.content.slice(prefix.length).split(" ");
    switch (commandName) {
        case "echo": {
            await m.delete();
            await m.send(args.join(" "));
            break;
        }
      case 'bootself': {
        await m.delete()
        await client.roles.removeRoleFromMember("GjkqQz2l", m.member.id, 33263816)
        break;
      }
      case 'boot': {
        if (!()) {}
        await m.delete()
        if (!m.mentions) {
          await m.send("Error: You must mention somebody to boot or ping everyone")
          break
        }
        let targetedMembers = [];
        if (m.mentions.everyone) {
          targetedMembers.append(await client.members.fetchMany("GjkqQz2l").map(async (member) => {await member.fetch()}))
        } else if (!(m.mentions.users)) {
          targetedMembers.append(m.mentions.users.map(async (user) => {await client.members.fetch("GjkqQz2l", user.id)}))
        } else {
          await m.send("Error: FOR THE LOVE OF GOD JUST MENTION SOMEONE")
          break;
        }
        targetedMembers.foreach((member) => {
          client.roles.removeRoleFromMember("GjkqQz2l", member.id, 33263816)
        })
        
      }
    }
});

client.on("debug", console.log);
client.on("error", console.log);
client.once("ready", () => console.log("I'm in."));
client.on("exit", () => console.log("Disconnected!"));

client.login();
