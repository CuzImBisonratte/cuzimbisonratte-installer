// Import modules
const fs = require('fs');
const gh_links = require("./modules/github_link_creation.js")

// Function to download a file from a given url to a specific file name
async function downloadFile(link, filename = "download") {
    const response = await fetch(link);
    const body = await response.body;
    const filepath = "./" + filename;
    const download_write_stream = fs.createWriteStream(filepath);
    const stream = new WritableStream({
        write(chunk) {
            download_write_stream.write(chunk);
        },
    });
    await body.pipeTo(stream);
}
