// Twitch Chat Listener using tmi.js

let messageCallback;

export function connectTwitchChat(channel, onMessageCallback) {
    messageCallback = onMessageCallback;

    const client = new window.tmi.Client({
        channels: [channel]
    });

    client.connect();

    client.on('message', (channel, tags, message, self) => {
        if (self) return;
        if (messageCallback) {
            messageCallback(message, tags['display-name']);
        }
    });
}
