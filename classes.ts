/* Class Members */

class OKGreeter {
  // Not initialized, but no error
  name!: string;
}

class Greeter {
  readonly name: string = "world";

  constructor(otherName?: string) {
    if (otherName !== undefined) {
      this.name = otherName;
    }
  }
  err() {
    this.name = "not ok";
  }
}

class Point2 {
  // Overloads
  constructor(x: number, y: string);
  constructor(s: string);
  constructor(xs: any, y?: any) {
    // TBD
  }
}

class MyClass {
  [s: string]: boolean | ((s: string) => boolean);

  check(s: string) {
    return this[s] as boolean;
  }
}

/* Class Inheritance */

interface Pingable {
  ping(): void;
}
class Sonar implements Pingable {
  ping() {
    console.log("ping!");
  }
}
class Ball implements Pingable {
  pong() {
    console.log("pong!");
  }
}

interface Checkable {
  check(name: string): boolean;
}
class NameChecker implements Checkable {
  check(s) {
    // Notice no error here
    return s.toLowercse() === "ok";
  }
}

class Base {
  greet() {
    console.log("Hello, world!");
  }
}
class Derived extends Base {
  greet(name?: string) {
    if (name === undefined) {
      super.greet();
    } else {
      console.log(`Hello, ${name.toUpperCase()}`);
    }
  }
}

const d = new Derived();
d.greet();
d.greet("reader");

// Alias the derived instance through a base class reference
const b3: Base = d;
// No problem
b.greet();

interface Animal {
  dateOfBirth: any;
}
interface Dog extends Animal {
  breed: any;
}
class AnimalHouse {
  resident: Animal;
  constructor(animal: Animal) {
    this.resident = animal;
  }
}
class DogHouse extends AnimalHouse {
  // Does not emit JavaScript code,
  // only ensures the types are correct
  declare resident: Dog;
  constructor(dog: Dog) {
    super(dog);
  }
}

/* Member Visibility */

class Greeter2 {
  public greet() {
    console.log("Hello, " + this.getName());
  }
  protected getName() {
    return "hi";
  }
}
class SpecialGreeter extends Greeter2 {
  public howdy() {
    // OK to access protected member here
    console.log("Howdy, " + this.getName());
  }
}
const g = new SpecialGreeter();
g.greet(); // OK
g.getName();

class Base2 {
  protected m = 10;
}
class Derived2 extends Base2 {
  // No modifier, so default is 'public'
  m = 15;
}
const d4 = new Derived2();
console.log(d4.m); // OK

class Base3 {
  protected x: number = 1;
}
class Derived3 extends Base3 {
  protected x: number = 5;
}
class Derived4 extends Base3 {
  f1(other: Derived4) {
    other.x = 10;
  }
  f2(other: Base3) {
    other.x = 10;
  }
}

class Base4 {
  private x = 0;
}
class Derived5 extends Base4 {
  showX() {
    // Can't access in subclasses
    console.log(this.x);
  }
}

class A2 {
  private x = 10;

  public sameAs(other: A2) {
    // No error
    return other.x === this.x;
  }
}

class MySafe {
  private secretKey = 12345;
}

const s3 = new MySafe();

// Not allowed during type checking
console.log(s3.secretKey);
// OK
console.log(s3["secretKey"]);

class MyClass2 {
  private static x = 0;
}
console.log(MyClass2.x);

class Foo {
  static #count = 0;

  get count() {
    return Foo.#count;
  }
  /* static Blocks in Classes */
  static {
    try {
      const lastInstances = loadLastInstances();
      Foo.#count += lastInstances.length;
    } catch {}
  }
}

/* Generic Classes */

class Box<Type> {
  contents: Type;
  constructor(value: Type) {
    this.contents = value;
  }
}
const b4 = new Box("hello!");

class Box3<Type> {
  static defaultValue: Type;
}

/* this at Runtime in Classes */

class MyClass3 {
  name = "MyClass";
  getName(this: MyClass3) {
    return this.name;
  }
}
const c3 = new MyClass3();
// OK
c3.getName();
// Error, would crash
const g3 = c3.getName;
console.log(g3());

/* this Types */

class Box4 {
  contents: string = "";
  set(value: string) {
    this.contents = value;
    return this;
  }
}

class ClearableBox extends Box4 {
  clear() {
    this.contents = "";
  }
}
const a4 = new ClearableBox();
const b5 = a4.set("hello");

class Box5 {
  content: string = "";
  sameAs(other: this) {
    return other.content === this.content;
  }
}
class DerivedBox extends Box5 {
  otherContent: string = "?";
}
const base = new Box5();
const derived = new DerivedBox();
derived.sameAs(base);

class FileSystemObject {
  isFile(): this is FileRep {
    return this instanceof FileRep;
  }
  isDirectory(): this is Directory {
    return this instanceof Directory;
  }
  isNetworked(): this is Networked & this {
    return this.networked;
  }
  constructor(public path: string, private networked: boolean) {}
}

class FileRep extends FileSystemObject {
  constructor(path: string, public content: string) {
    super(path, false);
  }
}
class Directory extends FileSystemObject {
  children!: FileSystemObject[];
}
interface Networked {
  host: string;
}
const fso: FileSystemObject = new FileRep("foo/bar.txt", "foo");

if (fso.isFile()) {
  fso.content;
} else if (fso.isDirectory()) {
  fso.children;
} else if (fso.isNetworked()) {
  fso.host;
}

// removes an undefined from the value held inside box when hasValue has been verified to be true
class Box6<T> {
  value?: T;
  hasValue(): this is { value: T } {
    return this.value !== undefined;
  }
}

const box2 = new Box6();
box2.value = "Gameboy";
box2.value;

if (box2.hasValue()) {
  box2.value;
}

/* Parameter Properties */

class Params {
  constructor(
    public readonly x: number,
    protected y: number,
    private z: number
  ) {
    // No body necessary
  }
}
const a3 = new Params(1, 2, 3);
console.log(a3.x);
console.log(a3.z);

/* abstract Classes and Members */

abstract class Base5 {
  abstract getName(): string;

  printName() {
    console.log("Hello, " + this.getName());
  }
}

const b5 = new Base5();

class Derived6 extends Base5 {
  getName() {
    return "world";
  }
}
const d5 = new Derived6();
d5.printName();

function greet(ctor: typeof Base5) {
  const instance = new ctor();
  instance.printName();
}
// Bad!
greet(Base5);

function greet2(ctor: new () => Base5) {
  const instance = new ctor();
  instance.printName();
}
greet2(Derived6);
greet2(Base5);

class Point4 {
  x = 0;
  y = 0;
}
class Point5 {
  x = 0;
  y = 0;
}
// OK
const p: Point4 = new Point5();

class PersonX {
  name: string;
  age: number;
}
class EmployeeX {
  name: string;
  age: number;
  salary: number;
}
// OK
const p2: PersonX = new EmployeeX();

// Don't
class Empty {}
function fn2(x: Empty) {
  // can't do anything with 'x', so I won't
}
// All OK!
fn2(window);
fn2({});
fn2(fn);
