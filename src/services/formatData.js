module.exports.formatForStorage = (data) => {
    data.trim().split(' ').join(' ');
    return data.toLowerCase();
}