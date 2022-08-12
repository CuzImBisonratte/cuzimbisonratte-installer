function buildIntroMessage() {
    const white_space_char = "▓";
    const intro_message_text = "CuzImBisonratte-Installer";
    const intro_message_width = 3 + intro_message_text.length + 3;
    var full_block_line = "";
    for (let i = 0; i < intro_message_width; i++) {
        full_block_line += white_space_char;
    }
    var block_space_line = white_space_char + white_space_char;
    for (let i = 0; i < intro_message_width - 4; i++) {
        block_space_line += " ";
    }
    block_space_line += white_space_char + white_space_char;
    var text_line = white_space_char + white_space_char + " " + intro_message_text + " " + white_space_char + white_space_char;
    var intro_message = full_block_line + "\n";
    intro_message += block_space_line + "\n";
    intro_message += text_line + "\n";
    intro_message += block_space_line + "\n";
    intro_message += full_block_line + "\n";
    return intro_message;
}

function sendIntroMessage() {
    console.clear();
    console.log(buildIntroMessage());
}

module.exports = {
    buildIntro: buildIntroMessage,
    sendIntro: sendIntroMessage
}