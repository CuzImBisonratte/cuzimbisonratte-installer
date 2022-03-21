// Get the needed modules
const fs = require("fs");
const readline = require("readline");
const http = require('http'),

// Create the readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Start message
console.log("Welcome to the CuzImBisonratte - Package installer");
console.log("With this you can download packages and if nessecary install them.");
console.log("What package do you want to download/install?");
console.log("1: Avatargenerator");
console.log("2. Stream Overlay");


// Ask which program should be installed
rl.question('Waiting for input... (1-2)', (package) => {

    

});