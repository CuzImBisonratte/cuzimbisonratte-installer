// Import modules
const readline = require('readline');
const gh_links = require("./modules/github_link_creation.js");
const file_download = require("./modules/download_file.js");
const messages = require("./modules/message_builder.js");
const validate = require("./modules/validate_input.js");


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
rl.question(messages.buildMenu(program_list), (program_num) => {

    // Validate the input
    if (!validate.number(program_num, 1, program_list.length)) {
        console.error("\x1b[5m\x1b[1m\x1b[31mThat is not a valid number");
        console.log("\x1b[0m")
        process.exit("That is not a valid number")
    }

    // Close readline interface
    rl.close();
});