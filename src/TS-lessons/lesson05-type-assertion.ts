//TYPE ASSERTION

// Kan även ibland kallas för type casting. 

// Sometimes you will have information about the type of a value that TypeScript can’t know about.

// Dvs du vet mer om vilken typ något ska vara än TS när den infers.
//  I TS kan man göra en x as w - syntax med typning, precis som vi kan göra med element (button as link)

type One = string;
type Two = string | number;
type Three = 'hello';

//convert to less specific
let a: One = 'hello'; 
let b = a as Two; //less specific
let c = a as Three // more specifiv

//d är av typen One (måste typa i type eller interface) med värdet “world”
let d = <One> 'world';
//let d = 'world' as One; //Eslint TS correct syntax
let e = <string | number> 'world';
//let e = 'world' as string | number; //Eslint TS correct syntax

// I vissa fall använder man inte angle brackets så mycket pga de kan inte användas i TSX-filer för att sedan användas i React (tror jag han menade?)

// en typ av Type assertion:

const addOrConcat = (a: number, b: number, c: 'add' | 'concat'): number | string => {
    if (c === 'add') return a + b
    return '' + a + b;
}

//Vi berättar att denna returnerar en sträng.
let myVal: string = addOrConcat(2, 2, 'concat') as string;

// Vi berättar att denna returnerar ett number. Måste ändras på båda ställen.
// Typescript kommer inte tycka att detta är ett problem, men det betyder inte att det inte är det.
// Som i detta fall när en sträng kommer bli returnerad hur som. (iom att vi valt "concat" som metod)
let nextVal: number = addOrConcat(2 ,2, 'concat') as number;

//Detta blir t ex fel, vi kan inte toString() genom ren typning.
10 as string

// Om vi VERKLIGEN vill göra 10 till en sträng kan vi setta den som en unknown-typ. unknown är en special type.
// unknown är lite som typen any, bara det att du inte kan använda den någonstans OM INTE du gör något likt det vi gör nedan
// Kallas "force casting" eller "double casting". 2 assertions.
// Man over rules TS.
// Rekommenderas INTE för nybörjare då den som sagt ovrridear typescript, men kan vara bra att veta.
(10 as unknown) as string;


//USEFULL ASSERTIONS

//The DOM

//Kika på nedan två deklareringar för att se vad TS infers.
// HTMLImageElement || Element || HTMLElement (eller null)
// Alla dessa är olika specifika
const img1 = document.querySelector('img') // as HTMLImageElement; // kommentera in för att lösa felet på rad 68
const img2 = document.querySelector('#myId')
const myImg = document.getElementById('#img')//! // as HTMLImageElement // kommentera in för att lösa problemen på rad 75
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const nextImg = <HTMLImageElement>document.getElementById('#img'); //Ytterligare ett sätt att typa, men linten gillar INTE

// Här nedan gnäller TS att img kan vara null, men i detta fall vet vi bättre än TS för vi har skapat siten.
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
img1.src;

// Här gnäller TS på både null OCH att src inte finns på HTMLElement-typen
// Vi vet att denna inte är null
// Då kan vi göra en så kallad "non null assertion" genom att lägga till ett ! i slutet av deklareringen.
//TS kommer fortsätta gnälla på att src inte finns i img. Asserta att den är en HTMLImageElement.
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
myImg.src;

// Med denna kunskap i bagaget skulle vi t ex på rad 60 bara kunna lägga till en ! i slutet eftersom det enda TS gnäller på är att den kan vara null.
// Medan på rad 62 kan vi bara deklarera rätt typ (eftersom TS inte kunte infer korrekt)
//Sällan behövs både ! och type assertion.

//*** Övning
//Typa upp koden
// const year = document.getElementById('year');
// const thisYear = new Date().getFullYear();
// year?.setAttribute('datetime', thisYear);
// year.textContent = thisYear;

//*** 1st variation

//När man börjar med TS är det lätt att lyssna på vad TS infers eftersom den VILL hjälpa dig.
//Så detta testar vi här. Detta är itne optimalt men är duglig kod/typning.
// let year: HTMLElement | null;
// year = document.getElementById('year');
// let thisYear: string;
// thisYear = new Date().getFullYear().toString();
// // type guard
// if(year){
//     year?.setAttribute('datetime', thisYear);
//     year.textContent = thisYear;
// }

//*** 2nd variation

//Denna gång skall vi använda oss mer av type assertion
//Denna föredras
const year  = document.getElementById('year') as HTMLSpanElement; // Vi vet att det är ett span-element vi target:at
const thisYear: string = new Date().getFullYear().toString();
year?.setAttribute('datetime', thisYear);
year.textContent = thisYear;

