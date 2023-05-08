//@ts-nocheck

/********* GENERICS */
// Idén med TS är att skapa en miljö med strikta typer. För att kunna göra detta försöker vi vara så detaljerad i våra typninga som möjligt.
// Men ibland vet vi inte vad det är för typ vi har att handskas med. Vi vet inte vilken typ som passas in till funktioner, interfaces etc.
// Då är det bra att TS tillåter generics, en placeholder/type variabel.

//Nedan kan bara hantera strängar, men tänk om vi vill kunna hantera annat/vad som helst
const stringEcho = (arg: string): string => arg;

// Men hur kan vi göra så denna funktion funkar med alla typer?
//Vi kan använda oss av en så kallad type-parameter/type-variabel
// Representeras som T nedanför (egentligen kan man använda sig av vad som som inte redan är en typ, men T är standard)
// Detta gör typen GENERISK.
const echo = <T>(arg: T): T => arg;

// Detta kan vara användbart i t ex assertion-funktioner
// Funktionen nedanför checkar om ett argument är ett objekt.
//Eftersom typeof visar objekt även vid array och null behöver vi kolla dessa också för att säkerställa att ett arg faktiskt ÄR ett objekt.
const isObj = <T>(arg: T): boolean => {
  return typeof arg === "object" && !Array.isArray(arg) && arg !== null;
};

// Man kan också använda sig av typ-variabler i interface
interface BoolCheck<T> {
  value: T;
  is: boolean;
}

// Ett annat exempel på en utility-funktion som typiskt är bra att använda generics för
// Ibland behöver din funktion tänka lite för att veta vad den skall returnera.
//Vi tar en string/number/boolean och returnerar in boolean
//const isTrue = <T>(arg: T): { arg: T, is: boolean } => {
const checkBoolValue = <T>(arg: T): BoolCheck<T> => {
  // samma som ovan men använder sig av interface
  // Checkar array
  if (Array.isArray(arg) && !arg.length) {
    return { arg, is: false };
  }
  // Checkar objekt
  if (isObj(arg) && !Object.keys(arg as keyof T).length) {
    return { arg, is: false };
  }
  return { arg, is: !!arg };
};

interface HasID {
  id: number;
}

//Enligt nedan parametrar måste parametern som denna funktion tar emot ha ett id av typrn nummer, i övrigt inget krav på typ.
const processUser = <T extends HasID>(user: T): T => {
  //process the user with logic here
  return user;
};

console.log(processUser({ id: 1, age: 34, username: "Linda" }));
console.log(processUser({ age: 34, username: "Linda" }));

//Don't know why this doesn't work. Den är helt avskriven från tutorial (ca 3:15:00 in)
// const getUsersProperty = <T extends HasID, K extends keyof T> (users: T[], key: K) T[K][] => {
//     return users.map(user => user[key])
// }

//****** GENERICS I KLASSER */

class StateObject<T> {
  private data: T;
  constructor(value: T) {
    this.data = value;
  }

  get state(): T {
    return this.data;
  }

  set state(value: T) {
    this.data = value;
  }
}

const store = new StateObject("John");

console.log("store.state", store.state);
store.state = "Dave";
// TS gillar inte att vi passar in ett nummer. Detta beror på att vi redan assignat en sträng som T-typ
// dvs TS hade inte inferat vad det var för typ än så den var öppen för allt. Nu tror den dock att det ska vara en string pga första värdet som skickades in var det.
store.state(12);

// Men med t ex nedan deklaration deklarerar man istället när man kallar på funktionen.
// TS är ok så länge vi passar in en array som innehåller nummer, sträng eller bool.
const myState = new StateObject<(string | number | boolean)[]>([15]);
// TS is ok with this
myState.state = ["Dave", true, 42];

export default {};
