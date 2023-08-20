console.log("\n");
console.log('\x1b[31m%s\x1b[0m', ' ▄▄▄     ▓██   ██▓ ██░ ██  █    ██      ██████  ███▄    █  ██▓ ██▓███  ▓█████  ██▀███  ');
console.log('\x1b[31m%s\x1b[0m', '▒████▄    ▒██  ██▒▓██░ ██▒ ██  ▓██▒   ▒██    ▒  ██ ▀█   █ ▓██▒▓██░  ██▒▓█   ▀ ▓██ ▒ ██▒');
console.log('\x1b[31m%s\x1b[0m', '▒██  ▀█▄   ▒██ ██░▒██▀▀██░▓██  ▒██░   ░ ▓██▄   ▓██  ▀█ ██▒▒██▒▓██░ ██▓▒▒███   ▓██ ░▄█ ▒');
console.log('\x1b[31m%s\x1b[0m', '░██▄▄▄▄██  ░ ▐██▓░░▓█ ░██ ▓▓█  ░██░     ▒   ██▒▓██▒  ▐▌██▒░██░▒██▄█▓▒ ▒▒▓█  ▄ ▒██▀▀█▄  ');
console.log('\x1b[31m%s\x1b[0m', ' ▓█   ▓██▒ ░ ██▒▓░░▓█▒░██▓▒▒█████▓    ▒██████▒▒▒██░   ▓██░░██░▒██▒ ░  ░░▒████▒░██▓ ▒██▒');
console.log('\x1b[31m%s\x1b[0m', ' ▒▒   ▓▒█░  ██▒▒▒  ▒ ░░▒░▒░▒▓▒ ▒ ▒    ▒ ▒▓▒ ▒ ░░ ▒░   ▒ ▒ ░▓  ▒▓▒░ ░  ░░░ ▒░ ░░ ▒▓ ░▒▓░');
console.log('\x1b[31m%s\x1b[0m', '  ▒   ▒▒ ░▓██ ░▒░  ▒ ░▒░ ░░░▒░ ░ ░    ░ ░▒  ░ ░░ ░░   ░ ▒░ ▒ ░░▒ ░      ░ ░  ░  ░▒ ░ ▒░');
console.log('\x1b[31m%s\x1b[0m', '  ░   ▒   ▒ ▒ ░░   ░  ░░ ░ ░░░ ░ ░    ░  ░  ░     ░   ░ ░  ▒ ░░░          ░     ░░   ░ ');
console.log('\x1b[31m%s\x1b[0m', '      ░  ░░                                                                            ');
console.log('\x1b[31m%s\x1b[0m', '                               > ayhu                                            \n');
console.log('\x1b[31m%s\x1b[0m', '                               > https://github.com/Ayhuuu                             \n');

// revised by z


const logsEnabled = false // whether or not you want the sniper to be slient

const vanityUrl = '' // the invite after discord.gg/
const webhook = '' // webhook to notify you that u sniped the vanity
const token = '' // your user token that requires manage server in the server you can changing the vanity in
const guildId = '' // guild id of the server with 14 boosts you are sniping the vanity in

if (!vanityUrl || !webhook || !token || !guildId) {
  console.log('Please fill out the config in index.js!')
  process.exit(0)
}

const request = require("request");
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

if (logsEnabled) {
       const headers = {
          "authorization": token,
          "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"
        };

        async function checkVanity() {
          while (true) {
            try {
              if (vanityUrl === "") {
                console.log('\x1b[36m%s\x1b[0m',"> Vanity URL is empty, waiting for a new URL...");
              } else {
                request.get({
                  url: `https://discord.com/api/v9/invites/${vanityUrl}?with_counts=true&with_expiration=true`,
                  headers: headers
                }, (error, response, body) => {
                  if (response && response.statusCode == 404) {
                    console.log('\x1b[36m%s\x1b[0m',`> Changing Vanity URL: ${vanityUrl}`);
                    changeVanity();
                  } else {
                    console.log('\x1b[36m%s\x1b[0m',`> Vanity URL still active: ${vanityUrl}`);
                  }
                });
              }
              await delay(200);
            } catch (error) {
              console.log('\x1b[31m%s\x1b[0m', "> Rate limited :(");//ofya
              await delay(5000);
            }
          }
        }

        function changeVanity() {
          const payload = { "code": vanityUrl };
          request.patch({
            url: `https://discord.com/api/v10/guilds/${guildId}/vanity-url`,
            headers: headers,
            json: payload
          }, (error, response, body) => {
            if (response.statusCode == 200) {
              console.log('\x1b[36m%s\x1b[0m',`> URL changed: ${vanityUrl}`);
              const data = {
                content: `@everyone discord.gg/${vanityUrl} yours now!`,
                username: "Ayhu",
                avatar_url: "https://i.imgur.com/oKzncfw.png"
              };      
              request.post({
                url: webhookUrl,
                json: data
              }, () => {
                process.exit(); 
              });
            } else {
              console.log('\x1b[36m%s\x1b[0m',`> Vanity URL could not be changed, error code: ${response.statusCode}`);
            }
          });
        }

        checkVanity();
} else {

     const headers = {
          "authorization": token,
          "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"
        };

        async function checkVanity() {
          while (true) {
            try {
              if (vanityUrl === "") {
              } else {
                request.get({
                  url: `https://discord.com/api/v9/invites/${vanityUrl}?with_counts=true&with_expiration=true`,
                  headers: headers
                }, (error, response, body) => {
                  if (response && response.statusCode == 404) {
                    changeVanity();
                  } else {
                  }
                });
              }
              await delay(200);
            } catch (error) {
              console.log('\x1b[31m%s\x1b[0m', "> Rate limited :(");//ofya
              await delay(5000);
            }
          }
        }

        function changeVanity() {
          const payload = { "code": vanityUrl };
          request.patch({
            url: `https://discord.com/api/v10/guilds/${guildId}/vanity-url`,
            headers: headers,
            json: payload
          }, (error, response, body) => {
            if (response.statusCode == 200) {
              console.log('\x1b[36m%s\x1b[0m',`> URL changed: ${vanityUrl}`);
              const data = {
                content: `@everyone discord.gg/${vanityUrl} yours now!`,
                username: "Ayhu",
                avatar_url: "https://i.imgur.com/oKzncfw.png"
              };      
              request.post({
                url: webhookUrl,
                json: data
              }, () => {
                process.exit(); 
              });
            } else {
            }
          });
        }

        checkVanity();
}

//31
//62
//Ayhu 
// (z was here)
