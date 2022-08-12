// Import modules
const readline = require('readline');
const gh_links = require("./modules/github_link_creation.js");
const file_download = require("./modules/download_file.js");
const messages = require("./modules/message_builder.js");

// Create the readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Send intro message
messages.sendIntro();

// Close readline interface
rl.close();