//import react from "react";
import { useState } from "react";
import Heading from "./components/Heading";
import { Section } from "./components/Section";
import Counter from "./components/Counter";
import List from "./components/List";

const Lesson12 = () => {
  const [count, setCount] = useState<number>(1);

  return (
    <div className='main-tutorial flex-column'>
      <div className=' tutorial-content-container'>
        <Heading title='Hello' />
        <Section title='Different title'>This is my section</Section>
        <Counter setCount={setCount}> Count is {count} </Counter>
        <List
          items={["coffe", "taco", "code"]}
          render={(item: string) => <span className='gold'>{item}</span>}
        />
      </div>
    </div>
  );
};

export default Lesson12;
