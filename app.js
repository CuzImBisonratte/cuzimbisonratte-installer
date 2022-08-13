// Import modules
const readline = require('readline');
const gh_links = require("./modules/github_link_creation.js");
const file_download = require("./modules/download_file.js");
const messages = require("./modules/message_builder.js");
const validate = require("./modules/validate_input.js");
const style = require("./modules/style_output.js");



// Read the packets file
const packet_list = require("./packets.json");
const program_list = Object.keys(packet_list.packets);
const programs = packet_list.packets;


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
        console.error(style.blink, style.bright, style.fg.red, "That is not a valid number", style.reset);
        process.exit();
    }

    // Get the program
    const program = programs[program_list[program_num - 1]];

    // Check requirements
    if (program.requires.includes("webserver")) {
        console.log(style.underscore + style.fg.yellow + "Warning: This program needs a webserver to run!");
        console.log("Please install it to your webservers served directory" + style.reset);
    }

    // Close readline interface
    rl.close();
});