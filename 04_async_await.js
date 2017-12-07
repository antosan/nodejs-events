const fs = require("fs");

/*
readFileAsArray supports both a promise interface as well as the callback
interface
*/

const readFileAsArray = function (file, cb = () => {}) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                reject(err);
                return cb(err);
            }

            const lines = data.toString().trim().split("\n");

            resolve(lines);
            cb(null, lines);
        });
    });
}

/*
Usage Example

We can use the async/await feature with any function that supports a promise
interface. However, we can’t use it with callback-style async functions
(like setTimeout for example).
*/

async function countOdd() {
    try {
        const lines = await readFileAsArray("numbers.txt");
        const numbers = lines.map(Number);
        const oddNumbers = numbers.filter(n => n % 2 === 1);

        console.log("Odd numbers count: ", oddNumbers.length);
    } catch (err) {
        console.error(err);
    }
}

countOdd();