// Create all needed variables
var init_failed = false;

// Get the needed modules
const fs = require("fs");
const readline = require("readline");
const https = require('https');
const unzipper = require('unzipper');

// Create the readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Download links
const links = {
    1: "https://codeload.github.com/CuzImBisonratte/avatargenerator/zip/refs/tags/v1.0.0",
    2: "https://codeload.github.com/CuzImBisonratte/stream-overlay/zip/refs/tags/v1.1.0",
}

// Functions
function download(link) {
    https.get(link, (res) => {

        // Unzip the file and save
        res.pipe(unzipper.Extract({ path: "./temp" }));
    });
}

// 
// Main
//

// Initialize
console.log("Please wait while the program initializes...");
console.log("");

// Check if temp folder exists
console.log("Checking if temp folder exists...");
if (!fs.existsSync("temp")) {
    // If not, create it
    console.log("Temp folder does not exist, creating it...");
    fs.mkdirSync("temp");
}

// Check if settings file exists
console.log("Checking if settings file exists...");
if (!fs.existsSync("settings.json")) {
    // If not, create it
    console.log("Settings file does not exist, creating it...");
    fs.writeFileSync("settings.json", "{}");
    // Status message
    console.log("Settings file created!");
    // Setting all values to default
    console.log("Setting all values to default...");
    let settings = JSON.parse(fs.readFileSync("settings.json"));
    settings.webserver = "";
    settings.language = "en";
    // Status message
    console.log("All values set to default!");
    // Save the settings
    console.log("Saving the settings...");
    fs.writeFileSync("settings.json", JSON.stringify(settings));
    // Status message
    console.log("\nPlease restart the program.");
    // Exit
    process.exit();
} else {
    // Check if all properties exist in the settings file (webserver, language)
    console.log("Checking if all settings properties exist...");
    // Get the settings file
    let settings = JSON.parse(fs.readFileSync("settings.json"));
    // Check if the webserver property exists
    if (!settings.webserver) {
        // If not, create it
        console.log("Webserver property does not exist, creating it...");
        settings.webserver = "";
        // Set init_failed to true
        init_failed = true;
    }
    // Check if the language property exists
    if (!settings.language) {
        // If not, create it
        console.log("Language property does not exist, creating it...");
        settings.language = "en";
        // Set init_failed to true
        init_failed = true;
    }
    // Check if init_failed is true
    if (init_failed) {
        // If it is, write the settings file
        console.log("Writing settings file...");
        fs.writeFileSync("settings.json", JSON.stringify(settings));
        // Status message
        console.log("Settings file rewritten!");
        // Warning message (print out in red)
        console.log("\x1b[31mWARNING: THE SETTINGS HAVE BEEN RESTORED, PLEASE CHECK IF THEY ARE RIGHT!\x1b[0m");
        // Please restart the program
        console.log("Please restart the program.");
    }

}


// Clear the console
console.clear();

// Start message
console.log("Welcome to the CuzImBisonratte - Package installer");
console.log("With this you can download packages and if nessecary install them.");

// Log a minus line
console.log("-".repeat(Math.min(process.stdout.columns, 65)));

// Ask what to do
console.log("What do you want to do?");
console.log("1: Download a package");
console.log("2: Settings");
rl.question("Waiting for input... (1-2)\n> ", (todo) => {

    // Switch the todo
    switch (todo) {

        // Case 1: Download a package
        case "1":

            // Clear the console
            console.clear();

            // Ask which program should be installed
            console.log("What package do you want to download/install?");
            console.log("1: Avatargenerator");
            console.log("2: Stream Overlay");
            rl.question('Waiting for input... (1-2)\n> ', (package) => {

                // Check if the package if the chosen package number is valid (var links)
                if (package in links) {

                    // Status message
                    console.log("Downloading package...");

                    // Download the package
                    download(links[package]);

                    // Status message
                    console.log("Download complete!");
                    console.log("Installing package...");

                    // Close the readline interface
                    rl.close();
                } else {

                    // If the package is not valid
                    console.log("Invalid package!");
                    console.log("Please try again!");
                    rl.close();
                    // Restart the program
                    process.exit(0);
                }

                // Close the readline interface
                rl.close();
            });

            // Break the switch
            break;

            // Case 2: Settings
        case "2":

            // Clear the console
            console.clear();

            // Ask what should be done
            console.log("What do you want to do?");
            console.log("1: Change the settings");
            console.log("2: Reset the settings");
            console.log("3: Show the settings");
            console.log("4: Update the cuzimbisonratte-installer (this)");

            // Ask for the input
            rl.question('Waiting for input... (1-4)\n> ', (settings_todo) => {

                // Switch the settings_todo
                switch (settings_todo) {

                    // Case 1: Change the settings
                    case "1":

                        // Clear the console
                        console.clear();

                        // Ask what should be changed
                        console.log("What do you want to change?");
                        console.log("1: Language of this installer");
                        console.log("2: The webserver path");


                        // Ask for the input
                        rl.question('Waiting for input... (1-2)\n> ', (settings_change) => {

                            // switch the settings_change
                            switch (settings_change) {

                                // Case 1: Change the language
                                case "1":

                                    // Clear the console
                                    console.clear();

                                    // Language list
                                    console.log("1: English");
                                    console.log("2: German");

                                    // Ask for the input
                                    rl.question('Waiting for input... (1-2)\n> ', (language) => {

                                        // Check if the language is valid
                                        if (language in ["1", "2"]) {

                                            // English: en | German: de
                                            let lang = language == "1" ? "en" : "de";

                                            // Get the settings
                                            let settings = JSON.parse(fs.readFileSync("settings.json"));

                                            // Set the language
                                            settings.language = language;

                                            // Write the settings
                                            fs.writeFileSync("settings.json", JSON.stringify(settings));

                                            // Status message
                                            console.log("Language changed!");
                                        } else {

                                            // If the language is not valid
                                            console.log("Invalid language!");
                                            console.log("Please try again!");
                                        }

                                        // Close the readline interface
                                        rl.close();
                                    });

                                    // Break the switch
                                    break;

                            }

                        });

                        // break the switch
                        break;

                        // Case 2: Reset the settings
                    case "2":

                        // Clear the console
                        console.clear();

                        // Break the switch
                        break;

                        // Case 3: Show the settings
                    case "3":

                        // Clear the console
                        console.clear();

                        // Show the settings
                        console.log("The current settings are:");

                        // Get the settings from the file
                        let settings = JSON.parse(fs.readFileSync("settings.json"));

                        // Show the value to every setting
                        for (let setting in settings) {

                            // Show the setting
                            console.log(`${setting}: ${settings[setting]}`);
                        };

                        // Break the switch
                        break;

                        // Case 4: Update the cuzimbisonratte-installer (this)
                    case "4":

                        // Clear the console
                        console.clear();

                        // Status message
                        console.log("Coming soon!");

                        // Break the switch
                        break;
                }

            });

            // Break the switch
            break;
    }
});