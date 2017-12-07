const fs = require("fs");

/*
It’s important to understand that callbacks do not indicate an asynchronous
call in the code. A function can call the callback both synchronously and
asynchronously.

Note that this is a bad practice that leads to unexpected errors. Design host
functions to consume callback either always synchronously or always
asynchronously.
*/

function fileSize(fileName, cb) {
    if (typeof fileName !== "string") {
        return cb(new TypeError("Argument should be a string")); // Sync
    }

    fs.stat(fileName, (err, stats) => {
        if (err) {
            return cb(err); // Async
        }

        cb(null, stats.size); // Async
    });
}

// Usage Example
fileSize("numbers.txt", (err, stats) => {
    if (err) {
        console.error(err);
    }

    console.log(stats);
});