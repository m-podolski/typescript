/* Functions; */
// This is an industrial-grade general-purpose greeter function:
function greet(person, date) {
    console.log("Hello ".concat(person, ", today is ").concat(date.toDateString(), "!"));
}
greet("Brendan", new Date());
var msg = "hello there!";
function getFavoriteNumber() {
    return 26;
}
function printCoord(pt) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
function printName(obj) {
    // ...
}
// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });
function printId(id) {
    if (typeof id === "string") {
        // In this branch, id is of type 'string'
        console.log(id.toUpperCase());
    }
    else {
        // Here, id is of type 'number'
        console.log(id);
    }
}
// OK
printId(101);
// OK
printId("202");
// Exactly the same as the earlier example
function printCoord2(pt) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}
printCoord2({ x: 100, y: 100 });
/* Assertions */
var myCanvas = document.getElementById("main_canvas");
var myCanvas2 = document.getElementById("main_canvas");
// const a = expr as any as T;
/* Literal Types */
function printText(s, alignment) {
    // ...
}
printText("Hello, world", "left");
function configure(x) {
    // ...
}
configure({ width: 100 });
configure("auto");
// configure("automatic");
// const req = { url: "https://example.com", method: "GET" };
// handleRequest(req.url, req.method);
// Change 1:
// const req = { url: "https://example.com", method: "GET" as "GET" };
// Change 2
// handleRequest(req.url, req.method as "GET");
var req = { url: "https://example.com", method: "GET" };
// handleRequest(req.url, req.method);
// strictNullChecks on
function doSomething(x) {
    if (x === null) {
        // do nothing
    }
    else {
        console.log("Hello, " + x.toUpperCase());
    }
}
function liveDangerously(x) {
    // No error
    console.log(x.toFixed());
}
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
