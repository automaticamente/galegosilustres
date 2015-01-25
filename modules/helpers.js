var helpers = {
    /**
    * Returns a random array element
    * @param {Array} array - An array
    */
    choice: function(array) {

        if(!Array.isArray(array)){
            throw new Error('Argument must be array');
        }

        return array[Math.floor(array.length * Math.random())];

    },
    /**
    * Returns a random element and removes it from the array
    * @param {Array} array - An array
    */
    choiceRemove: function(array) {

        if(!Array.isArray(array)){
            throw new Error('Argument must be array');
        }

        var index = array[Math.floor(array.length * Math.random())];

        return array.splice(index,1)[0];

    },
    /**
    * Returns a random number between two numbers
    * @param {Number} a - The min number, if b is not defined the min number will be 0 and this will be the max number
    * @param {Number} [b] - The max number
    */
    randint: function(a, b) {
        if(!b) {
            b = a;
            a = 0;
        }

        if(typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('Arguments mus be numbers');
        }

        return Math.floor(Math.random() * (b - a + 1) + a);
    }
};

module.exports = helpers;