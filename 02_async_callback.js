const fs = require("fs");

/*
simple example of a typical asynchronous Node function that’s written with
a callback style
*/

const readFileAsArray = (file, cb) => {
    fs.readFile(file, (err, data) => {
        if (err) {
            return cb(err);
        }

        const lines = data.toString().trim().split("\n");

        cb(null, lines);
    });
}

// Usage Example
readFileAsArray("numbers.txt", (err, lines) => {
    if (err) {
        throw err;
    }

    const numbers = lines.map(Number);
    const oddNumbers = numbers.filter(n => n % 2 === 1);

    console.log("Odd numbers count: ", oddNumbers.length);
});