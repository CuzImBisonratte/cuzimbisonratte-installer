const { type } = require("os");

const style = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",
    text: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m"
    },
    bg: {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m"
    }
};

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

function buildTypeErrorMessage(type_error) {
    var message = style.blink + style.bright + style.text.red + "That is not a valid " + type_error + "!" + style.reset;
    return message;
}

function sendTypeErrorMessage(type_error) {
    console.error(buildTypeErrorMessage(type_error));
}

function buildRequirementWarningMessage(requirement) {
    var message = ""
    if (requirement == "webserver") {
        message += style.underscore + style.text.yellow;
        message += "Warning: This program needs a webserver to run!\n";
        message += "Please install it to your webservers served directory";
        message += style.reset;
    }

    return message;
}

function sendRequirementWarningMessage(requirement) {
    console.error(buildRequirementWarningMessage(requirement));
}

function buildPathQuestionMessage(program_name) {
    var message = "\n";
    message += "Where should " + program_name + " be installed to?\n";
    message += "Please change the path to where you want to install it:\n"
    message += "Path> "
    return message;
}

function buildSummaryQuestion(program, version, path, src) {
    message = "Are you sure you want to install the following:\n";
    message += style.dim;
    message += "Program: " + program + "\n";
    message += "Version: " + version + "\n";
    message += "Install-Path: " + path + "\n";
    message += "Code-Source: " + src + "\n";
    message += style.reset;
    message += "Y/N> "
    return message;
}

function sendSummaryQuestion(program, version, path, src) {
    console.clear();
    console.log(buildSummaryQuestion(program, version, path, src));
}

module.exports = {
    buildIntro: buildIntroMessage,
    sendIntro: sendIntroMessage,
    buildMenu: buildMenuQuestionMessage,
    buildTypeError: buildTypeErrorMessage,
    sendTypeError: sendTypeErrorMessage,
    buildRequirementWarning: buildRequirementWarningMessage,
    sendRequirementWarning: sendRequirementWarningMessage,
    buildSummary: buildSummaryQuestion,
    sendSummary: sendSummaryQuestion,
    buildPathQuestion: buildPathQuestionMessage
}