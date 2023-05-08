//@ts-nocheck

// Classes

class Coder {
  //properties och methods i klasser mallas för members
  // name: string;
  // music: string;
  // age: number;
  // lang: string;

  // Utan denna constructor gnäller TS över ovan deklarering.
  // Detta är BAS-STRUKTUREN.
  // Detta är inte så DRY som föreläsaren önskar, och som tur är finns det sätt att fixa detta.
  // constructor(
  //     name:string,
  //     music: string,
  //     age: number,
  //     lang: string
  // ){
  //     this.name = name;
  //     this.music = music;
  //     this.age = age;
  //     this.lang = lang;
  // }

  // Inget som rekommenderas för nybörjare Men man KAN göra såhär. Det betyder att vi vet vad vi gör, men inte kommer initializea det på en gång
  secondLang!: string;

  //Vi kan istället använda oss av visibility modifiers(eller members) / access modifiers / data modifiers
  constructor(
    public readonly name: string, // kan vara två saker, när namnet väl är provided kan det inte ändras
    public music: string,
    private age: number, // Den kan bara nås inuti klassen
    protected lang: string = "Typescript" // Det sista är ett sätt att göra en parameter optional genom default value // skillnaden på private och protected?
  ) // protected kan fortfarande nås utanför klassen i så kallade "derived classes", i t ex sub-klasser
  //private kan ENBART nås inuti classen.

  {
    this.name = name;
    this.music = music;
    this.age = age;
    this.lang = lang;
  }

  public getAge() {
    // age nås här pga i samma klass, denna funktionen nås dock utanför klassen.
    return `Hello, I'm ${this.age} years old`;
  }
}

const Dave = new Coder("Dave", "Rock", 42);

class WebDev extends Coder {
  constructor(
    public computer: string,
    name: string,
    music: string,
    age: number
  ) {
    //super MÅSTE kallas överst, så de tar emot värden från Coder INNAN deklarationerna under
    super(name, music, age);
    this.computer = computer;
  }

  public getLang() {
    return `I write ${this.lang}`; //Denna funktionen funkar pga lang har ett defaultvärde i huvudklassen Coder.
  }
}

const Sara = new WebDev("Mac", "Sara", "Lofi", 25);
console.log(Sara.getLang()); //funkar
console.log(Sara.age); //funkar itne pga är private
console.log(Sara.lang); //funkar inte pga protected, måste använda public funktionen för att komma åt den.

//*******************************/
//*** INTERFACES */

interface Musician {
  name: string;
  instrument: string;
  play(action: string): string;
}

class Guitarists implements Musician {
  name: string; //typerna här måste stämma mot huvudklassen
  instrument: string;

  constructor(name: string, instrument: string) {
    this.name = name;
    this.instrument = instrument;
  }

  play(action: string) {
    return `${this.name} ${action} the ${this.instrument}`;
  }
}

const Page = new Guitarists("Jimmy", "guitar");
console.log(Page.play("strums"));

//*****************/
//*********  */

class Peeps {
  //static keyword innebär att t ex count doesn't applys inte till någon instans av klassen, bara klassen i sig.
  //Detta gör att vi istället för this. kallar på Peeps.
  //I exemplet nedan ser vi t ex att peeps count bara sköts i peeps trots att den räknar antal extended klasser som instanserats.
  static count: number = 0;

  static getCount(): number {
    return Peeps.count;
  }

  public id: number;

  constructor(public name: string) {
    this.name = name;
    this.id = ++Peeps.count; //plussen innan säkrar upp att vi redan vid första instansiering lägger på en på count.
  }
}

const John = new Peeps("John");
const Amy = new Peeps("Amy");

console.log(Peeps.count);
console.log(Amy.id);

//********** */
//***** GETTERS AND SETTERS */

class Bands {
  private dataState: string[];

  constructor() {
    this.dataState = [];
  }

  //Get är ett special-keyword som vi kan använda för att hämta data (inte bara för TS utan för JS generellt)
  public get data(): string[] {
    return this.dataState;
  }

  public set data(value: string[]) {
    //Kollar om valye är en array och OM den är det kollar vi om alla värden i arrayen är strängar.
    if (Array.isArray(value) && value.every((el) => typeof el === "string")) {
      this.dataState = value;
      //return this.dataState = value; // denna funkar itne, för en getter kan inte returnera ett värde.
      return;
    } else throw new Error("Param is not an array of strings");
  }
}

const MyBands = new Bands();
MyBands.data = ["The White Stripes", "Fall Out Boy", "Black Pink"];

console.log(MyBands.data); // Loggar ut ovanstående

MyBands.data = [...MyBands.data, "Big Bang"];
console.log(MyBands.data); // Loggar ut ovanstående
//MyBands.data = 'Red Hot Chili Peppers' // TS säger nej till strängar iom att den förävtar sig en ARRAY av STRÄNGAR
MyBands.data = ["Red Hot Chili Peppers"]; // Detta är okej

export default {};
