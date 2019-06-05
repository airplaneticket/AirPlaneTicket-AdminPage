module.exports.formatForStorage = (data) => {
    data.trim().split(' ').join(' ');
    console.log(data);
    return data.toLowerCase();
}