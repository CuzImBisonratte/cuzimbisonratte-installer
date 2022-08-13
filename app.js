// Import modules
const readline = require('readline');
const gh_links = require("./modules/github_link_creation.js");
const file_download = require("./modules/download_file.js");
const messages = require("./modules/message_builder.js");
const validate = require("./modules/validate_input.js");
const get_url = require("./modules/get_url.js");

// Read the packets file
const packet_list = require("./packets.json");
const github_link_creation = require('./modules/github_link_creation.js');
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
        messages.sendTypeError("number");
        process.exit();
    }

    // Get the program
    const program = programs[program_list[program_num - 1]];

    // Clear console
    console.clear();

    // Check requirements
    if (program.requires.includes("webserver")) {
        messages.sendRequirementWarning("webserver");
    }

    // Ask for install path
    rl.question(messages.buildPathQuestion(program_list[program_num - 1]), (path) => {

        // Summary
        rl.question(messages.buildSummary(program_list[program_num - 1], program.use_tag, path, program.src), (confirm) => {

            // Verify the confirmation
            if (!validate.bool(confirm)) {
                messages.sendInstallAbort();
                process.exit();
            }

            // Get the link
            get_url.getUrl(program).then((url) => {

                // Download the file
                file_download.download(url, "tmp.zip").then(

                );
            });

            // Close readline interface
            rl.close();

        });

    });
    rl.write(process.cwd());
});