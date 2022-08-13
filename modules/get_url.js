github_link_creation = require("./github_link_creation.js");

async function getLink(program) {
    var link = "";
    if (program.src == "github") {
        if (program.use_file == "sourcecode") {
            if (program.use_tag == "latest") {
                link = await github_link_creation.sourceCodeLatest(program.github_repo);
                return link;
            } else {
                link = await github_link_creation.sourceCodeSpecific(program.github_repo, program.use_tag);
                return link;
            }
        } else {
            link = github_link_creation.releaseFileSpecific(program.github_repo, program.use_tag, program.use_file);
            return link;
        }
    }
    if (program.src == "url") {
        link = program.zip_url;
    }
}

module.exports = {
    getUrl: getLink
}