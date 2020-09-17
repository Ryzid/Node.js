const Discord = require("discord.js");

const client = new Discord.Client();

const config = require("./config.json");

var fs = require('fs');

var mysql = require('mysql');

const path = require('path');


client.on("ready", () => {
  console.log("Whitelist bot v1.0.2 Running..."); 
  client.user.setActivity('scripts', { type: 'Breaking' });
});

var db_config = {
	host: "server235.web-hosting.com",
	user: "u515566236_disc",
	password: "b9IvuCwbTuJe",
	database: "data",
};
var con;

function handleDisconnect() {
	con = mysql.createConnection(db_config);

	con.connect(function(err) {
		if (err) {
			console.log('error when connecting to db:',err);
			setTimeout(handleDisconnect,2000);
		}
	});
	con.on('error',function(err) {
		if(err.code == "PROTOCOL_CONNECTION_LOST") {
			handleDisconnect();
		} else {
			throw err;
		}
	});
};
handleDisconnect();
client.on("message", async message => {
	var guild = client.guilds.get("591106493940629514");
	if(message.author.bot) return;
  	if(!message.guild) {
		if (guild.member(message.author)) {
			if (message.content.substring(0,4).toLowerCase() == "!add") {
				var res = message.content.split(" ");
				var A = res[1];
				var B = res[2];
				
				con.query("UPDATE `Users` SET `Username` = '"+A+"', `Password` = '"+B+"' WHERE `Users`.`DISCORD` = '"+message.author.id+"';",function(err,results) {
					if (err) throw err;
					message.reply("Added: `Username: "+A+" Password: "+B+"`");
				});
			};
		};
		return;
	}
	if (message.content.toLowerCase() == "!script") { 
		if (message.channel.name != "bot-chat"){
			message.reply('Please use this command in #bot-chat');
			return;
		}
		//message.reply('Script has been sent to your DMs');
			con.query("SELECT * FROM Users", function (err, result, fields) {
				if (err) throw err;
				result.forEach(function(User) {
					var usr_dc = User.DISCORD;
					var usr_key = User.SKEY;
					if (usr_dc == message.author.id) {
						message.author.send("Key:  " + usr_key)
						.then()
						.catch(console.error);
						if (message.guild.name == "Meta Gay") {
						message.author.sendCode("lua",`_G.key='KeyHere'
	loadstring(game:HttpGet("https://basehosting.xyz/sCrIpT1"))()`)
						.then()
						.catch(console.error);
						message.channel.send('Script Sent');
						};
					};
				});
			});
	} else if (message.channel.name == 'whitelist') {
		if (message.content.substring(0,3).toLowerCase() == "!wl") {
			//message.author.send("Verifying whitelist. Once this process is complete, you will automatically get the Buyer role");
				con.query("SELECT * FROM `Keys`", function (err, result, fields) {
					if (err) throw err;
					result.forEach(function(Key) {
						//console.log(Key.Code);
						var key = Key.Code;
						if (message.content.substring(4) == key) {
                            var query = "DELETE FROM `Keys` WHERE `Keys`.`Code` = \'"+message.content.substring(4)+"\'";
							con.query(query.toString(), function(err) {
								if (err) throw err;
								con.query("INSERT INTO `Users` (`DISCORD`, `SKEY`, `IP`) VALUES ('"+message.author.id+"', '"+message.content.substring(4)+"', '');", function(err) {
									if (err) throw err;
									console.log('Whitelisted: '+message.author.username+"#"+message.author.discriminator);
									message.member.addRole('591147368716697601')
									//.then(message.reply('Whitelisted Succesfully'))
									.catch(console.error);
									return;
								});
							});
						};
					});
					
				});
		};
		message.delete()
		.catch(console.error);
	} else if (message.content.substring(0,10).toLowerCase() == "!blacklist") {
		if (message.author.username == "Eski") {
			var member = message.mentions.members;
			member.forEach(function(user) {
				var User = user.user.id
				con.query("UPDATE `Users` SET `BLACKLISTED` = '1' WHERE `Users`.`DISCORD` = '"+User+"';",function(err, result) {
					if (err) throw err;
					message.reply('User blacklisted.');
				});
			});
		};
	} else if (message.content.toLowerCase() == "!verify") {
		if (message.channel.name == "verify") {
			message.member.addRole("591157630022713373")
			.catch(console.error);
			message.delete()
			.catch(console.error);
		};
	} else if (message.content.toLowerCase() == "!giveme") {
		
	} else if (message.content.toLowerCase() == "!resetip") {
		con.query("UPDATE `Users` SET `IP` = '' WHERE `Users`.`DISCORD` = '"+message.author.id+"';",function(err, result) {
			if (err) throw err;
			message.reply('Your IP has been reset.');
		});
	};

});
client.login(config.token);