module.exports.chooseTemplateViaLength = function (number_of_options, min = 0, return_count = 1) {
    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    var return_array = []
    for (var i = 0; i <= return_count; i++) {
        return_array.push(randomNumber(min, number_of_options))
    }

    return return_array;
};



