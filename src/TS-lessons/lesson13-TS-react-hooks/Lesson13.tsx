import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  KeyboardEvent,
  MouseEvent,
} from "react";

interface User {
  id: number;
  username: string;
}

// om useCallback memoizes en function så memoizear useMemo ett value.
// Vi kan använda den för "en dyr" uträkning. Något som tar ett tag att kalkulera men som komponenten är beroende av innan den kan rendera ordentligt.
// Fibbonacci-sekvensen kan vara ett bra exempel.
type fibFunc = (n: number) => number;
// Detta räknas till en dyr kalkulering
const fib: fibFunc = (n) => {
  if (n < 2) return n;
  return fib(n - 1) + fib(n - 2);
};

const myNum: number = 37;

const Lesson13 = () => {
  // Nedan deklaration är lätt för TS att infere, men om vi vill (och för tränings skull) kan vi vara mer explicit och typa ändå
  // I detta fall räcker det att typa till number eftersom vi har ett defaultvärde som matchar den typen,
  const [count, setCount] = useState<number>(0);

  // men om man t ex startar med ett tomt värde eller dyl kan det vara en bra idé att göra det till en union type number|null
  // const [count, setCount] = useState<number | null>(null);

  // Andra exempel på typningar (array of Users)
  // const [count, setCount] = useState<User[]>([]);

  // Ibland kan man se detta som exemple också, ett objekt med en assertion.
  // Men teknisk sätt ljuger vi för kompileraren då att vi redan vid start kommer ha ett objekt av typen User här.
  // BÖR ENDAST göras om du vet att du fyller statet väldigt fort/har defaultvärden på proparna i objektet, annars kan errors uppstå.
  //const [count, setCount] = useState<User>({} as User);

  const [users, setUsers] = useState<User[] | null>(null);

  // Varför specifierar vi denna som ett input-element och inte en union type men startar med null-värde?
  // Det finns några saker vi kan göra för att hantera detta på ett bra sätt.
  // const inputRef = useRef<HTMLInputElement>(null);

  // Vi kan t ex använda oss av non null assertion
  // const inputRef = useRef<HTMLInputElement>(!null);

  // Vi kan också lägga till en type guard check
  const inputRef = useRef<HTMLInputElement>(null);
  // Här type/null-checkar vi genom optional chaining
  console.log(inputRef?.current);
  console.log(inputRef?.current?.value);

  // useEffect returnerar egentligen inte något utan hanterar mer side effects. (samma sak med layout effect)
  // En side effect är när t ex ett state ändras så påverkar den rendering. Med useEffect kan vi styr vilka sideffects som skall påverka renderingen av komponenten.
  useEffect(() => {
    // Något som är nytt för React 18 som inte alla vet kring useEffect är att:
    // När du använder Strict Mode kommer den mounta en gång, sen avmounta, sen mounta igen. Dvs kommer denna console.log logga två gånger.
    console.log("mounting");
    console.log("users: ", users);

    // useEffect kan returnera en clean upp function
    // denna visas en gång pga det som nämns ovan, att den mountar, unmountar sen mountar igen (sen visas den igen när komponenten unmountas "på riktigt").
    return () => {
      console.log("unmounting");
    };
  }, [users]);

  // useCallback memoize a FUNCTION så att den inte alltid recreateas.
  // UseCallback är typ som en vanlig funktion, men den har en dependency array.
  // Det innebär att allt som funtionen är beroende kan passas in.
  // Nu behövs inte detta för react känner igen det och behöver aldrig recreateas (öööh, kolla upp useCallback)
  // Denna behöver man inte heller egentligen i detta fall typa upp, men vill du vara explicit kan du göta det ändå.
  const addTwo = useCallback(
    // GLÖM INTE IMPORTERA event-typningarna från react.
    // Egentligen behöver vi inte ens typa upp den här funktionen utan vi gör det för att visa hur det kan se ut när man typar.
    (
      e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
    ): void => setCount((prev) => prev + 2),
    []
  );
  //const addTwo = useCallback(() => setCount((prev) => prev + 1), []);

  // nu kommer enbart fib-uträkningen ske när myNum har ändrats.
  // Denna funktionen behöver egentligen inte heller typas upp, TS vet allt den behöver, men vi typar upp för att visa hur det kan se ut.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const result = useMemo<number>(() => fib(myNum), [myNum]);

  return (
    <>
      <h1>{count}</h1>
      <button onClick={addTwo}>Add</button>
      <h2>{result}</h2>
      <input ref={inputRef} type='text' />
    </>
  );
};

export default Lesson13;
