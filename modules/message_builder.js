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

function buildMenuQuestionMessage(program_list) {

    // Get longest program name and make fixed line length out of it
    program_list_longest = 0;
    program_list.forEach(program_name => {
        if (program_name.length > program_list_longest) {
            program_list_longest = program_name.length;
        }
    });
    const line_length = 2 + 3 + program_list_longest + 2;

    // Spacechar
    const border_horizontal = "═";
    const border_vertical = "║";
    const border_edge_tl = "╔";
    const border_edge_tr = "╗";
    const border_edge_bl = "╚";
    const border_edge_br = "╝";

    // Add the header
    var message = "";
    message += "Please choose the program you want to download/install";
    message += "\n";

    // Add the top border
    message += border_edge_tl;
    for (let k = 0; k < line_length - 2; k++) {
        message += border_horizontal;
    }
    message += border_edge_tr;

    // Add the programs
    var i = 0;
    program_list.forEach(program => {
        i++;
        message += "\n";
        message += border_vertical + " ";
        message += i + "> ";
        message += program;
        var empty_spaces_needed = line_length - (1 + 3 + 2) - program.length;
        for (let j = 0; j < empty_spaces_needed; j++) {
            message += " ";
        }
        message += border_vertical

    });

    // Add the bottom border
    message += "\n"
    message += border_edge_bl;
    for (let k = 0; k < line_length - 2; k++) {
        message += border_horizontal;
    }
    message += border_edge_br;

    // Add the question input
    message += "\n";
    message += "1-" + program_list.length + "> "

    return message;
}

module.exports = {
    buildIntro: buildIntroMessage,
    sendIntro: sendIntroMessage,
    buildMenu: buildMenuQuestionMessage
}