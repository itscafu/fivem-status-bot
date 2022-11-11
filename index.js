
const {token, url, serverip, serverport, servermaxplayers, servermap, appport} = require('./config')
const express = require('express');
const axios = require('axios')
const app = express();
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const client = new Client({intents:[GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent],})


async function fivemdata(){
	const resp = await axios.get(`http://${serverip}:${serverport}/players.json`)
	const data = resp.data
	const players = data.length
	 var playersfinal = players + "/" + servermaxplayers +" (" + servermap + ")"
	 return playersfinal
}

app.get('/', async (req, res) => {
		return  res.send(await fivemdata()) 
});

function startBot() {
	axios.get(`http://localhost:${appport}`)
     .then(async (res) => {
		 var finalinfo = res.data
		client.user.setPresence({
			activities: [{ name: `${finalinfo}`, type: ActivityType.Playing }],
			status: '',
		  });
		})
	
};

setInterval(startBot, 5 * 1000);

client.on('ready', () =>{
	console.log(`\n* Session started on ${client.user.tag} *\n`);
	startBot();

})
client.login(token)
app.listen(appport)

