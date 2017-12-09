/*
To emit an event after an asynchronous function is done, we’ll need to combine
callbacks (or promises) with this event-based communication.
*/

const fs = require("fs");
const EventEmitter = require("events");

class WithTime extends EventEmitter {
    execute(asyncFunc, ...args) {
        this.emit("begin");
        console.time("execute");
        asyncFunc(...args, (err, data) => {
            if (err) {
                return this.emit("error", err);
            }

            this.emit("data", data);
            console.timeEnd("execute");
            this.emit("end");
        });
    }
}

const withTime = new WithTime();

withTime.on("begin", () => console.log("About to execute"));
withTime.on("end", () => console.log("Done with execute"));

withTime.execute(fs.readFile, __filename);
