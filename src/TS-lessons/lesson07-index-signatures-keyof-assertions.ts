//****** Index Signatures & keyof assertions */

//** INDEX SIGNATURES * /

interface TransactionObj1 {
    Pizza: number,
    Books: number,
    Job: number
}

//TS gillar denna för att den innehåller det TS förväntar sig i fårhållande till Interface
const todaysTransactions1: TransactionObj1 = {
    Pizza: -10,
    Books: -5,
    Job: 50,
}

// Men vad händer om vi inte vet vilka properties som kommer ingå i TransactionObj i förväg?
// Det är då index signatures kan komma väl tillpass, så vi kan jobba mer dynamiskt

//båda dessa loggar ut värdet -10
console.log(todaysTransactions1.Pizza)
console.log(todaysTransactions1['Pizza'])

//För att dynamiskt nå denna:

let prop: string = 'Pizza';
//TS gillar inte denna consolen
//console.log(todaysTransactions[prop])

const todaysNet1 = (transactions: TransactionObj1): number => {
    let total = 0
    // Här loopar vi objektet för att dynamiskt nå värdet.
    // Det är såhär vi skulle göra i vanlig vanilla JS, men TS gillar inte detta
    for (const transaction in transactions) {
        total += transactions[transaction]
    }
    return total;
}

console.log(todaysNet1(todaysTransactions1));

// Hur gör vi då detta med index signatures?
interface TransactionObj2 {
    // ordet index kan bytas ut mot ordet key
    [index: string]: number // keys/index är ofta strängar, kan vara t ex number också, men aldrig en bool
    //readonly [index: string]: number om man istället kommenterar in denna kan inte värdet uppdateras så som det gör på rad 66
}

const todaysTransactions2: TransactionObj2 = {
    Pizza: -10,
    Books: -5,
    Job: 50,
}

const todaysNet2 = (transactions: TransactionObj2): number => {
    let total = 0
    // TS är nu gladare
    for (const transaction in transactions) {
        total += transactions[transaction]
    }
    return total;
}
console.log(todaysNet2(todaysTransactions2));

todaysTransactions2.Pizza = 40

// Nedan kommer vi visa ett problem som kan uppstå

// Detta kommer returnera undefined iom att Dave inte finns med i objektet.
// TS kommer inte gnälla på det dock eftersom TS inte vet att det är ett problem då vi satt dynamiska nycklar i TransactionObj2
// TS vet bara att todaysTransactions2 skall ta emot sträng och returnera number, och "Dave" är ju en sträng.
// Så den är inte helt fool proof.
console.log(todaysTransactions2['Dave'])

// Det går också bra att bygga en interface med BÅDE index signature OCH fasta objekt-nycklar.
// Kom ihåg dock att alla fasta nycklar blir required.
interface TransactionObj3 {
    [index: string]: number,
    Pizza: number,
    Books: number,
    Job: number
}

//****************** */

interface Student {
    // Kommentera in nedanstående för att lösa felet på rad 104 OCH rad 108. 
    // Då kommer TS tycka att test KAN vara en del av student(även om den i detta fall kommer returnera undefined)
    //[key: string]: string | number | number[] | undefined, 
    name: string,
    GPA: number,
    classes?: number[]
}

const student: Student = {
    name: 'Dough',
    GPA: 3.5,
    classes: [100, 200]
}

//TS gillar itne test eftersom det inte finns i interfacet
// Vi behöver lägga till en index signatur
//console.log(student.test)

// Även här gnäller TS om inte rad 90 kommenteras ut
// for (const key in student) {
//     console.log(`${key}: ${student[key]}`)
// }

//Nedan visas hur man kan lösa det utan att använda sig av index signaturer.
for (const key in student) {
    // genom att använda oss av as keyof Student skapar vi en union type
    console.log(`${key}: ${student[key as keyof Student]}`)
}

Object.keys(student).map(key => 
    // På dätta sätt kan vi itterera ut nycklarna även om vi inte vet typen på student-nycklarna
    // Märk väl att det är student-objektet och inte Student-interface som vi checkar.
    console.log(student[key as keyof typeof student])
)

// Ett annat sätt att använda sig av keyof för att slippa index signaturer i interfacet.
// Vi definierar alltså nyckeln som en string litteral som är gjord av de olika nyckel-namnen som finns i Student
const logStudentKey = (student: Student, key: keyof Student):void => {
    console.log(`Student ${key}: ${student[key]}`)
}

logStudentKey(student, 'GPA');

/**************************************************/
/************************ TYPE ********************/ 

interface Incomes1 {
    [key: string]: number
    //[key: 'salary'] // Detta funkar inte utan TS vill att vi gör som nedan på rad 141
}

// Hur gör vi detta på type då?

type Streams = 'salary' | 'bonus' | 'sidehustle'
// Man kan lägga in värdet av Streams precis som de är i angle brackets, men det blir mer läsbart om man delar upp dem
type Incomes2 = Record<Streams, number | string> // streams med värde av nummer eller string-typ

// Ovanstående sätt tillåter oss att använda string litteral types som union types, något Interfaces inte tillåter.
// Ovan kan också skapa problem:
// Vi kan t ex inte mer exakt typa utan type kommer alltid tro att alla nycklar är nummer ELLER sträng
// Medan i exemplen med Interfaces kan du mer specifikt speca att t ex salary skall vara ett nummer, sidehustle en sträng och bonus kan vara både och.

const monthlyIncomes: Incomes2 = {
    salary: 500,
    bonus: 100,
    sidehustle: 250
}

//Med ovan objekt, kan vi fortfarande loopa igenom med hjälp av Record utility-type?
for (const revenue in monthlyIncomes) {
    // TS har problem med denna
    // console.log(montlyIncomes[revenue])
    // Måste vara
    console.log(monthlyIncomes[revenue as keyof Incomes2])
}