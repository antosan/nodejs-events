/*
If the asynFunc supported promises as well (it doesn't), we could use the
async/await feature to do the same.

Use `util.promisify()` to return a promise
*/

const EventEmitter = require("events");
const { promisify } = require("util");
const readFile = promisify(require("fs").readFile);

class WithTime extends EventEmitter {
    async execute(asyncFunc, ...args) {
        this.emit("begin");

        try {
            console.time("execute");
            const data = await asyncFunc(...args);

            this.emit("data", data);
            console.timeEnd("execute");
            this.emit("end");
        } catch (err) {
            this.emit("error", err);
        }
    }
}

const withTime = new WithTime();

withTime.on("begin", () => console.log("About to execute"));
withTime.on("end", () => console.log("Done with execute"));

/*
In our callback-based example, if we don’t handle the error event with a
listener, the node process will actually crash and exit. The second execute
call will be affected by this crash and will potentially not get executed
at all.

If we register a listener for the special error event, the behavior of the
node process will change, the error from the first execute call will be
reported but the node process will not crash and exit. The other execute call
will finish normally.

Note that Node currently behaves differently with promise-based functions and
just outputs a warning, but that will eventually change.
*/

withTime.on("error", err => {
    // Do something with err, e.g. log it somewhere
    console.log(err);
});

/*
If we register multiple listeners for the same event, the invocation of those
listeners will be in order. The first listener that we register is the first
listener that gets invoked.

If you need to define a new listener, but have that listener invoked first,
you can use the prependListener method.

And finally, if you need to remove a listener, you can use the removeListener
method.
*/

withTime.on("data", data => {
    // Do something with data
    console.log(`Length: ${data.length}`);
});

withTime.prependListener("data", data => {
    // Do something else with data
    console.log(`Characters: ${data.toString().length}`);
});

withTime.execute(readFile, ""); // BAD CALL - to throw error
withTime.execute(readFile, __filename);
