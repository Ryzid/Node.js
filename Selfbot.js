const Discord = require("discord.js");

const client = new Discord.Client();

const config = require("./config.json");

var fs = require('fs');


var mysql = require('mysql');

const path = require('path');

let request = require(`request`);

function download(url,name){
    request.get(url)
        .on('error', console.error)
        .pipe(fs.createWriteStream(name));
}
function randomstr(){
	return str =Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
client.on("ready", () => {
	console.clear()
	console.log( 'Whitelist bot v1.0.Z Running...');
	console.log("Current User: "+client.user.username+"#"+client.user.discriminator);
	client.user.setPresence({
		game: { 
			name: ' a', 
			type:'WATCHING', 
			url: 'https://www.google.com' }, 
		status: 'online' 
	})
	.catch(console.error);
});

client.on("message", async message => {
	if(message.guild) return;
	if(!message.author.username == 'Eski') {
		if (!message.attachments <= 0) {
		message.attachments.forEach(function(Attachment) {
			//console.log(Attachment.url);
			download(Attachment.url,randomstr() + '.png');
			console.log('Image Attachment saved from: '+message.author.username);
		});} else {
			console.log('no attachment');
		};
		if (message.content == '.snip') {
			if (message.channel.type == 'dm') {
				message.edit('This is a DM');
			}
			console.log('anti snip');
		};
	} else { 
	if (message.content.substring(0,4).toLowerCase() == ".set") {
			client.user.setPresence({
				game: { 
					name: message.content.substring(5).toLowerCase(), 
					type:'WATCHING', 
					url: 'https://www.google.com' }, 
					status: 'online' 
			})
			.catch(console.error);
			console.log('Activity set to: '+message.content.substring(5).toLowerCase());
		};
	};
});

client.login(config.token);
