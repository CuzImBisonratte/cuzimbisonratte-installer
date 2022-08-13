// Import modules
const readline = require('readline');
const gh_links = require("./modules/github_link_creation.js");
const file_download = require("./modules/download_file.js");
const messages = require("./modules/message_builder.js");

// Read the packets file
const packet_list = require("./packets.json");
const program_list = Object.keys(packet_list.packets);

// Create the readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Send intro message
messages.sendIntro();

// Question menu (program)
rl.question(messages.buildMenu(program_list), (answer) => {


    // Close readline interface
    rl.close();
});