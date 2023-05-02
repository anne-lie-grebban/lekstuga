/****** UTILITY TYPES */


//** Partial */

interface Assignment {
    studentId: string,
    title: string, 
    grade: number,
    verified?: boolean
}

// Partial här menar att vi bara skall uppdatera selar av assignment. Vi får speca vilka det gäller
// Partial tillåter oss att returnera, inte alla props nödvändigtvis, men några av de som tillhör Assignment
const updateAssignment = (assign: Assignment, propsToUpdate: Partial<Assignment>): Assignment => {
    return {...assign, ...propsToUpdate}
}

const assign1: Assignment = {
    studentId: 'compsi123',
    title: 'Final Project',
    grade: 0
}

// prop 1 objekt att uppdatera, prop 2 vilken property i objektet som skall uppdateras
console.log(updateAssignment(assign1, { grade: 95 }))

// Tack vare Partial tillåts man alltså skicka in en prop som bara innehåller en prop av Assignment-interfacet
const assignGraded: Assignment = updateAssignment(assign1, { grade: 95 })

//******** Required and readonly ************/

// Required innebär att alla delar av Assignment-interfacet måste vara med.
const recordAssignment = (assign: Required<Assignment>): Assignment => {
    //send to database etc
    return assign;
}

// Här skickar vi in en extra prop som inte finns i interfacet
// Readonly gör att när ett värde väl är satt kan vi inte ändra det igen.
const assignVerified: Readonly<Assignment> = { ...assignGraded, verified: true }

// TS blir ledsen för vi har redan satt värde på objektet tillsammans med readonly. 
// Om vi tar bort Readonly och angle brackets slutar TS gnälla på det nedanför.
assignVerified.grade = 88
// Vi kan heller inte göra såhär för Required kräver exakt likhet med interface och verified finns inte med där i.
recordAssignment(assignGraded)

// Detta går pga den har alla props och verified blir inte längre optional.
recordAssignment({...assignGraded, verified: true})
