import Discord from 'discord.js';
import moment from 'moment';
import path from 'path';
import Debug from 'debug';
const debug = Debug('queue_bot');
const debugv = Debug('queue_bot:verbose');
const debugd = Debug('queue_bot:debug');

const token = process.env.DISCORD_APP_AUTH_TOKEN;
const youtube_api_key = process.env.YOUTUBE_API_KEY;
const client = new Discord.Client({ intents: ['GUILD_VOICE_STATES', 'GUILDS'] });

// const bot_in_voice_only_commands = ['skip', 'loop', 'clear', 'remove', 'seek', 'disconnect', 'volume', 'vol', 'np', 'now_playing', 'shuffle', 'queue'];
// const voice_only_commands = ['p', 'play', 'seek', 'summon', 'join', ...bot_in_voice_only_commands];

const strings = {
    need_to_be_in_voice: ':x: **You have to be in a voice channel to use this command.**',
    no_permission_to_connect: ':no_good: **No permission to connect to** ',
    searching_for: '<:youtube:519902612976304145> **Searching** :mag_right: ',
    no_matches: ':x: **No matches**',
    joined: ':thumbsup: **Joined** ',
    not_connected: ':x: **I am not connected to a voice channel**, Use the summon command to get me in one',
    skipped: ':fast_forward: ***Skipped*** :thumbsup:',
    nothing_playing: ':x: **Nothing playing in this server**',
    cleared: ':boom: ***Cleared...*** :stop_button:',
    loop_enabled: ':repeat_one: **Enabled!**',
    loop_disabled: ':repeat_one: **Disabled!**',
    disconnected: ':mailbox_with_no_mail: **Successfully disconnected**',
    volume_set: ':sound:  **Set to** ',
    invalid_seek_format: ':x: **Invalid format**, Example formats:\n\n`0:30` `1:30` `2:15` `5:20`',
    invalid_vol_format: ':x: **Invalid format**, Example formats:\n\n\t`1`\t `2`\t `0.5`',
    seek_too_long: ':x: **Time cannot be longer than the song**',
    invalid_command: '**This command is invalid! Please use a valid one.**',
    removed: ':white_check_mark: **Removed** ',
    out_of_range: ':x: **Out of range**',
    shuffled: '**Shuffled queue** :ok_hand:',
    invalid_queue_tab: ':x: **Invalid queue tab, must be a number between** '
};

function login() {
    // const customytdlBinaryPath = path.resolve('/usr/local/bin/youtube-dl')
    // youtubedl.setYtdlBinary(customytdlBinaryPath)
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

    // if (message.content[0] == '!') {
    //     var regex_content = /^![a-zA-Z]* (.*)/;
    //     var content = null;
    //     var command = message.content.match(/^!([a-zA-Z]*)/)[1];
    //     if (!message.channel.permissionsFor(message.guild.me)
    //         .has('SEND_MESSAGES')) {
    //         return;
    //     }
    //     if (!message.member.voice.channel) {
    //         if (voice_only_commands.includes(command)) {
    //             message.channel.send(strings.need_to_be_in_voice);
    //         }
    //         return;
    //     }
    //     if (regex_content.test(message.content)) {
    //         content = message.content.match(regex_content)[1];
    //     }
    //     var guild_id = message.guild.id;
    //     var player = players[guild_id];
    //     if (!player) {
    //         player = players[guild_id] = new Player(message.member.voice.channel.id);
    //     }

    //     debugv('Command: ' + message.content);
    // }
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
