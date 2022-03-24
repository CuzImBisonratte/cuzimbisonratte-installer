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

// Check if temp folder exists
if (!fs.existsSync("temp")) {

    // If not, create it
    fs.mkdirSync("temp");
}

// Check if settings file exists
if (!fs.existsSync("settings.json")) {

    // If not, create it
    fs.writeFileSync("settings.json", "{}");
}

// Clear the console
console.clear();

// Start message
console.log("Welcome to the CuzImBisonratte - Package installer");
console.log("With this you can download packages and if nessecary install them.");
console.log("What package do you want to download/install?");
console.log("1: Avatargenerator");
console.log("2: Stream Overlay");


// Ask which program should be installed
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