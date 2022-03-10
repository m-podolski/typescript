/* Generics */

function identity<Type>(arg: Type): Type {
  console.log(arg.length);
  return arg;
}

let output = identity<string>("myString");
let output2 = identity("myString");

let myIdentity: <Type>(arg: Type) => Type = identity;
let myIdentity2: <Input>(arg: Input) => Input = identity;
let myIdentity3: { <Type>(arg: Type): Type } = identity;

interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}
let myIdentity4: GenericIdentityFn = identity;

interface GenericIdentityFn2<Type> {
  (arg: Type): Type;
}
let myIdentity5: GenericIdentityFn2<number> = identity;

class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

interface Lengthwise {
  length: number;
}

function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}
loggingIdentity(3);

function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a");
getProperty(x, "m");

function create<Type>(c: { new (): Type }): Type {
  return new c();
}

class BeeKeeper {
  hasMask: boolean = true;
}
class ZooKeeper {
  nametag: string = "Mikle";
}
class Animal {
  numLegs: number = 4;
}
class Bee extends Animal {
  keeper: BeeKeeper = new BeeKeeper();
}
class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;

/* Keyof Type Operator */

type Point3 = { x: number; y: number };
type P = keyof Point;
// same as
type P2 = "x" | "y";

type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;

type Mapish = { [k: string]: boolean };
type M = keyof Mapish;

/* Typeof Type Operator */

let s2 = "hello";
let n2: typeof s2;

type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;

function f() {
  return { x: 10, y: 3 };
}
type P3 = ReturnType<typeof f>;

/* Indexed Access Types */

type Person2 = { age: number; name: string; alive: boolean };
type Age = Person["age"];

type I1 = Person["age" | "name"];
type I2 = Person[keyof Person];
type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName];

const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];

type Person3 = typeof MyArray[number];

type Age3 = typeof MyArray[number]["age"];

type Age4 = Person3["age"];

type key = "age";
type Age5 = Person3[key];

/* Conditional Types */

interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}

type Example1 = Dog extends Animal ? number : string;
type Example2 = RegExp extends Animal ? number : string;

interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}

// combinatorial explosion:
function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  throw "unimplemented";
}

// instead
type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;

function createLabel2<T extends number | string>(idOrName: T): NameOrId<T> {
  throw "unimplemented";
}

let a2 = createLabel("typescript");
let b2 = createLabel(2.8);
let c2 = createLabel(Math.random() ? "hello" : 42);

type MessageOf<T> = T["message"];
type MessageOf2<T extends { message: unknown }> = T["message"];

interface Email {
  message: string;
}
type EmailMessageContents = MessageOf2<Email>;

type MessageOf3<T> = T extends { message: unknown } ? T["message"] : never;

interface Dog {
  bark(): void;
}
type EmailMessageContents2 = MessageOf3<Email>;
type DogMessageContents = MessageOf3<Dog>;

type Flatten<T> = T extends any[] ? T[number] : T;

// Extracts out the element type.
type Str = Flatten<string[]>;
// Leaves the type alone.
type Num = Flatten<number>;

type Flatten2<T> = T extends Array<infer Item> ? Item : T;

type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
  ? Return
  : never;

type Num2 = GetReturnType<() => number>;
type Str2 = GetReturnType<(x: string) => string>;
type Str3 = GetReturnType<(x: string[]) => string>;
type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>;

declare function stringOrNum(x: string): number;
declare function stringOrNum(x: number): string;
declare function stringOrNum(x: string | number): string | number;

type T1 = ReturnType<typeof stringOrNum>;

type ToArray<Type> = Type extends any ? Type[] : never;
type StrArrOrNumArr = ToArray<string | number>;

type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;
// 'StrArrOrNumArr' is no longer a union.
type StrArrOrNumArr2 = ToArrayNonDist<string | number>;

/* Mapped Types */

type OnlyBoolsAndHorses = {
  [key: string]: boolean | Horse;
};

const conforms: OnlyBoolsAndHorses = {
  del: true,
  rodney: false,
};

type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

type FeatureFlags = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type FeatureOptions = OptionsFlags<FeatureFlags>;

// Removes 'readonly' attributes from a type's properties
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type LockedAccount = {
  readonly id: string;
  readonly name: string;
};
type UnlockedAccount = CreateMutable<LockedAccount>;

// Removes 'optional' attributes from a type's properties
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

type MaybeUser = {
  id: string;
  name?: string;
  age?: number;
};

type User = Concrete<MaybeUser>;

type MappedTypeWithNewProperties<Type> = {
  [Properties in keyof Type as NewKeyType]: Type[Properties];
};

type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<
    string & Property
  >}`]: () => Type[Property];
};

interface Person {
  name: string;
  age: number;
  location: string;
}
type LazyPerson = Getters<Person>;

// Remove the 'kind' property
type RemoveKindField<Type> = {
  [Property in keyof Type as Exclude<Property, "kind">]: Type[Property];
};

interface Circle {
  kind: "circle";
  radius: number;
}
type KindlessCircle = RemoveKindField<Circle>;

type EventConfig<Events extends { kind: string }> = {
  [E in Events as E["kind"]]: (event: E) => void;
};

type SquareEvent = { kind: "square"; x: number; y: number };
type CircleEvent = { kind: "circle"; radius: number };

type Config = EventConfig<SquareEvent | CircleEvent>;

type ExtractPI<Type> = {
  [Property in keyof Type]: Type[Property] extends { pi: true } ? true : false;
};

type DBFields = {
  id: { format: "incrementing" };
  name: { type: string; pi: true };
};
type ObjectsNeedingGDPRDeletion = ExtractPI<DBFields>;

/* Template Literal Types */

type World = "world";
type Greeting = `hello ${World}`;

type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;

type AllLocaleIDs2 = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
type Lang = "en" | "ja" | "pt";

type LocaleMessageIDs = `${Lang}_${AllLocaleIDs2}`;

const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
});

// makeWatchedObject has added `on` to the anonymous Object

// person.on("firstNameChanged", (newValue) => {
//   console.log(`firstName was changed to ${newValue}!`);
// });

// type PropEventSource<Type> = {
//   on(
//     eventName: `${string & keyof Type}Changed`,
//     callback: (newValue: any) => void
//   ): void;
// };

// Create a "watched object" with an 'on' method
// so that you can watch for changes to properties.
// declare function makeWatchedObject<Type>(
//   obj: Type
// ): Type & PropEventSource<Type>;

type PropEventSource2<Type> = {
  on<Key extends string & keyof Type>(
    eventName: `${Key}Changed`,
    callback: (newValue: Type[Key]) => void
  ): void;
};

declare function makeWatchedObject<Type>(
  obj: Type
): Type & PropEventSource2<Type>;

person.on("firstNameChanged", (newName) => {
  console.log(`new name is ${newName.toUpperCase()}`);
});

person.on("ageChanged", (newAge) => {
  if (newAge < 0) {
    console.warn("warning! negative age");
  }
});

type Greeting2 = "Hello, world";
type ShoutyGreeting = Uppercase<Greeting2>;

type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`;
type MainID = ASCIICacheKey<"my_app">;
