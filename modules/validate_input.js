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

module.exports = {
    number: validateNumbers
}