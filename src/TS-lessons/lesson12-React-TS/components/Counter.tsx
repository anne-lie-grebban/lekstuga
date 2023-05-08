import { ReactNode } from "react";

//Här har vi types som vi har petat till för att påvisa hur det kan se ut om vi passar ner state istället
type CounterProps = {
  setCount: React.Dispatch<React.SetStateAction<number>>;
  children: ReactNode;
};

const Counter = ({ setCount, children }: CounterProps) => {
  // Inom anglebrackets kan du placera vilken typ ett state skall vara
  // Iom att vi sätter ett default-värde redan nu vet vi att värdet inte kommer/skall vara null
  // Annars hade det varit en bra idé att göra det till en union-type istället.
  // I detta fall behöver vi egentligen inte ens typa upp det eftersom TS redan vet att detta är ett nummer,
  // men om man vill vara extra noga kan man göra det

  // Detta state skall vi försöka att använda och passa ner från en förälder istället.
  // Inget vi nödvändigtvis gör, utan
  //const [count, setCount] = useState<number>(1);

  return (
    <>
      <h1>{children}</h1>
      <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      <button onClick={() => setCount((prev) => prev - 1)}>-</button>
    </>
  );
};

export default Counter;
