const Discord = require('discord.js');
const client = new Discord.Client({ 	intents: [ 	Discord.GatewayIntentBits.Guilds, 		Discord.GatewayIntentBits.GuildMessages, 	Discord.GatewayIntentBits.MessageContent, Discord.GatewayIntentBits.GuildMembers, 	], 
});
const config = require('./config.json')
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "COLOCA SUA KEY DO OPEN AI AQUI",
});
const openai = new OpenAIApi(configuration);

client.on('ready', () => {
  console.log(`[i] Estou Online em ${client.user.tag}`)
});

client.on('messageCreate', async (message) => {
    if(message.author.bot){
        return
    }  
    if(message.channel.id === config.channel_id){ 
    
    const start = Date.now();
    const resposta = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: message.content,
        temperature: 0.5,
        max_tokens: 4000,
        echo: true
      });

      var res = resposta.data.choices[0].text

      var complemento = res.split('\n')[0]
      res = res.replace(complemento, '');
      
          
      const embed = new Discord.EmbedBuilder()
  .setColor('#00ff00')
  .setTitle(complemento)
  .setDescription(`${res}`)

return message.reply({ embeds: [embed] })

  
    }

})

client.login(config.token);