//@ts-nocheck

/****** UTILITY TYPES */

//** Partial */

interface Assignment {
  studentId: string;
  title: string;
  grade: number;
  verified?: boolean;
}

// Partial här menar att vi bara skall uppdatera selar av assignment. Vi får speca vilka det gäller
// Partial tillåter oss att returnera, inte alla props nödvändigtvis, men några av de som tillhör Assignment
const updateAssignment = (
  assign: Assignment,
  propsToUpdate: Partial<Assignment>
): Assignment => {
  return { ...assign, ...propsToUpdate };
};

const assign1: Assignment = {
  studentId: "compsi123",
  title: "Final Project",
  grade: 0,
};

// prop 1 objekt att uppdatera, prop 2 vilken property i objektet som skall uppdateras
console.log(updateAssignment(assign1, { grade: 95 }));

// Tack vare Partial tillåts man alltså skicka in en prop som bara innehåller en prop av Assignment-interfacet
const assignGraded: Assignment = updateAssignment(assign1, { grade: 95 });

//******** Required and readonly ************/

// Required innebär att alla delar av Assignment-interfacet måste vara med.
const recordAssignment = (assign: Required<Assignment>): Assignment => {
  //send to database etc
  return assign;
};

// Här skickar vi in en extra prop som inte finns i interfacet
// Readonly gör att när ett värde väl är satt kan vi inte ändra det igen.
const assignVerified: Readonly<Assignment> = {
  ...assignGraded,
  verified: true,
};

// TS blir ledsen för vi har redan satt värde på objektet tillsammans med readonly.
// Om vi tar bort Readonly och angle brackets slutar TS gnälla på det nedanför.
assignVerified.grade = 88;
// Vi kan heller inte göra såhär för Required kräver exakt likhet med interface och verified finns inte med där i.
recordAssignment(assignGraded);

// Detta går pga den har alla props och verified blir inte längre optional.
recordAssignment({ ...assignGraded, verified: true });

//**************** RECORD **************/

// Här berättar vi att objekt-nycklar OCH dess värden kommer vara strängar
const hexColorMap: Record<string, string> = {
  red: "FF0000",
  green: "00FF00",
  blue: "0000FF",
};

// String literal type
type Students = "Sara" | "Kelly";
type LetterGrades = "A" | "B" | "C" | "D" | "U";

//Nycklar kommer vara Students, värden kommer vara LetterGrades
const finalGrades: Record<Students, LetterGrades> = {
  Sara: "B",
  Kelly: "U",
};

interface Grades {
  assign1: number;
  assign2: number;
}

const gradeData: Record<Students, Grades> = {
  Sara: { assign1: 85, assign2: 93 },
  Kelly: { assign1: 23, assign2: 15 },
};

//********* PICK AND OMIT ************/

// Med Pick kan vi välja vilka delar av interfact/typningen vi vill använda i en type.
// Som här nedan där vi plockar ut grade och id från Assignment
type AssignResult = Pick<Assignment, "studentId" | "grade">;

const score: AssignResult = {
  studentId: "k123",
  grade: 85,
};

// Omit gör tvärt om, vi väljer ut vilka delar vi INTE vill ha med av ett interface
type AssignPreview = Omit<Assignment, "grade" | "verified">;

const preview: AssignPreview = {
  studentId: "k123",
  title: "Final thing",
};

//************* Exclude and Extract ********/

// SKILLNAD MELLAN OMIT OCH EXCLUDE
// Omit utility type works on object type or interfaces to omit one of the key-value pair.
// Exclude only works on union literal to exclude one of the property

// Exclude
type adjustedGrade = Exclude<LetterGrades, "U">;

// Extact
type highGrades = Extract<LetterGrades, "A" | "B">;

// Nonnullable

type AllPossibleGrades = "Dave" | "John" | null | undefined;
//Nedan kan vi se att alla nulls och undefined är borta
type NamesOnly = NonNullable<AllPossibleGrades>;

// Return type

//type newAssign = { title: string; points: number };

const createNewAssign = (title: string, points: number) => {
  return { title, points };
};

// ReturnType gör att det räcker med att uppdatera createNewAssign för att uppdatera returntypen.
// Det kan vara bra när du t ex använder dig av ett bibliotek etc där du inte riktigt vet om returtypen kommer ändras.
// På detta sätt vet du att typen alltid kommer vara uppdaterad
type NewAssign = ReturnType<typeof createNewAssign>;

const tsAssign: NewAssign = createNewAssign("Utility Types", 100);

console.log(tsAssign);

//********** Parameters *******//

// Om man hovrar över Assign Params så ser man att det nu är en tuple
// dvs måste värdena komma i korrekt ordning som de är skrivna i type/interfacen
type AssignParams = Parameters<typeof createNewAssign>;

const assignArgs: AssignParams = ["Generics", 100];
const tsAssign2: NewAssign = createNewAssign(...assignArgs);

console.log(tsAssign2);

//******** Awaited ********/
// Hjälper oss med retur-typen av ett Promise

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const fetchUsers = async (): Promise<User[]> => {
  const data = await fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      if (err instanceof Error) console.log(err.message);
    });
  return data;
};

// Om vi kollar på nedanstående deklaration så märker vi att TS säger att denna innehåller ett promise
// Men det vill vi inte, denna innehåller ju ett resultat/response.
type FetchUsersReturnType1 = ReturnType<typeof fetchUsers>;

// istället kan vi använda oss av Awaited för att typningen skall innehålla det vi egentligen vill
// Om vi gör på detta sätt ser vi att den istället returnerar en array av användare.
type FetchUsersReturnType2 = Awaited<ReturnType<typeof fetchUsers>>;

fetchUsers().then((users) => console.log(users));

export default {};
