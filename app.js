// Import modules
const fs = require('fs');

// Function to get Latest Github Sourcecode
async function getLatestGithubSourcecodeLink(repo) {
    var github_api_link = "https://api.github.com/repos/" + repo + "/releases/latest";
    var response = await fetch(github_api_link);
    var body = await response.json();
    var SourceCodeLink = "https://github.com/" + repo + "/archive/refs/tags/" + body.tag_name + ".zip";
    return SourceCodeLink;
}

// Function to get Github Sourcecode from a specific tag
function getGithubSourcecodeLink(repo, tag) {
    var SourceCodeLink = "https://github.com/" + repo + "/archive/refs/tags/" + tag + ".zip";
    return SourceCodeLink;
}
