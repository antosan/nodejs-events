const EventEmitter = require("events");

/*
Events !== Asynchrony
*/

class WithLog extends EventEmitter {
    execute(taskFunc) {
        console.log("Before executing");
        this.emit("begin");
        taskFunc();
        this.emit("end");
        console.log("After executing");
    }
}

const withLog = new WithLog();

withLog.on("begin", () => console.log("About to execute"));
withLog.on("end", () => console.log("Done with execute"));

/*
Notice the output above is that it all happens synchronously.
There is nothing asynchronous about this code.
*/

withLog.execute(() => console.log("*** Executing task ***"));

/*
If we pass an asynchronous taskFunc to execute, the events emitted will no
longer be accurate.
*/

withLog.execute(() => {
    setImmediate(() => {
        console.log("*** Executing task ***");
    });
});
