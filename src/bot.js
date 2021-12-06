import Discord from 'discord.js';
import Debug from 'debug';
const debug = Debug('queue_bot');
const debugv = Debug('queue_bot:verbose');
const debugd = Debug('queue_bot:debug');

const token = process.env.DISCORD_APP_AUTH_TOKEN;
const client = new Discord.Client({ intents: ['GUILD_VOICE_STATES', 'GUILDS'] });

function login() {
    try {
        client.login(token);
    } catch (err) {
        debug(err);
        login();
    }
}
login();

client.on('ready', () => {
    debug('I am ready!');
});

client.on('message', async message => {
    if (!message.guild || message.author.bot) {
        return;
    }
});

client.on('voiceStateUpdate', async (oldState, newState) => {
    if (newState) {
        let newChannel = newState.channel;

        if (newChannel && newChannel.id == "519991574294167582") {
            var randTime = (Math.random() * 6 + 3) * 1000;
            setTimeout(moveMember, randTime, newState);
        }
    }
});

client.on('error', error => {
    debug(error);
});

client.on('warn', warning => {
    debug(warning);
});

function moveMember(voiceState) {
    if (voiceState) {
        voiceState.setChannel("519946686580260866")
    }
}
