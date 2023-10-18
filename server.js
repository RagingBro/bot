const WebSocket = require('ws');
const fetch = require('node-fetch');
// config
const token = 'YOUR_BOT_ACCESS_TOKEN';
const socket = new WebSocket('wss://www.guilded.gg/websocket/v1', {
  headers: {
    Authorization: `Bearer ${token}`
  },
});
socket.on('open', function() {
  console.log('connected to Guilded!');
});
socket.on('message', function incoming(data) {
  const json = JSON.parse(data);
  const {t: eventType, d: eventData} = json;
  console.log({eventType, eventData});
  if (eventType === 'ChatMessageCreated' || eventType === 'ChatMessageUpdated') {
    const {message: {id: messageId, content, channelId}} = eventData;
    if (content.indexOf('bad word') >= 0) {
      // delete message containing 'bad word'
      fetch(`https://www.guilded.gg/api/v1/channels/${channelId}/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  } else if (eventType === 'BotServerMembershipCreated') {
    const {server: {defaultChannelId}} = eventData;
    // posts welcome message
    fetch(`https://www.guilded.gg/api/v1/channels/${defaultChannelId}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        embeds: [{
          title: "Hello!",
          description: `If you would like to know more use the \`/help\` command.

 **Links**
[Support Server](https://www.guilded.gg/API-Official)`,
        }]
      }),
    });
  }
});