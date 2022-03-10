/* Functions; */

// This is an industrial-grade general-purpose greeter function:
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

greet("Brendan2", new Date());

let msg = "hello there!";

function getFavoriteNumber(): number {
  return 26;
}

function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });

function printName(obj: { first: string; last?: string }) {
  // ...
}
// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });

function printId(id: number | string) {
  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}
// OK
printId(101);
// OK
printId("202");
// Error
// printId({ myID: 22342 });

/* Types and Interfaces */

type Point = {
  x: number;
  y: number;
};

interface Point2 {
  x: number;
  y: number;
}

// Exactly the same as the earlier example
function printCoord2(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord2({ x: 100, y: 100 });

type ID = number | string;

// Extending an interface
interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

// Extending a type via intersections
type AnimalType = {
  name: string;
};

type BearType = AnimalType & {
  honey: boolean;
};

// Adding new fields to an existing interface
interface Window {
  title: string;
}

interface Window {
  // ts: TypeScriptAPI;
}

/* Assertions */

const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
const myCanvas2 = <HTMLCanvasElement>document.getElementById("main_canvas");

// const a = expr as any as T;

/* Literal Types */

function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
// printText("G'day, mate", "centre");

interface Options {
  width: number;
}
function configure(x: Options | "auto") {
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

const req = { url: "https://example.com", method: "GET" } as const;
// handleRequest(req.url, req.method);

// strictNullChecks on
function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}

function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}
