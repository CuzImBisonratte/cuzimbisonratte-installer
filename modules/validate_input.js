function validateNumbers(validation, valid_min, valid_max) {
    if (isNaN(validation)) return false;
    if (!isNaN(valid_min)) {
        if (validation < valid_min) return false;
    }
    if (!isNaN(valid_max)) {
        if (validation > valid_max) return false;
    }
    return true;
}

function validateBoolean(validation) {
    if (validation == "") return false;
    if (validation == 0) return false;
    if (validation.toLowerCase().charAt(0) == "n") return false;
    return true;
}

module.exports = {
    number: validateNumbers,
    bool: validateBoolean
}