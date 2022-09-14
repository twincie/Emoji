module.exports = (temp, emoji) => {
    let output = temp.replace(/{%EMOJINAME%}/g, emoji.emojiName);
    output = output.replace(/{%ID%}/g,emoji.id);
    output = output.replace(/{%IMAGE%}/g,emoji.image);
    output = output.replace(/{%DESCRIPTION%}/g,emoji.description);
    output = output.replace(/{%AKA%}/g,emoji.AlsoKnownAs);
    output = output.replace(/{%CODEPOINT%}/g,emoji.codepoints);
    return output;
};