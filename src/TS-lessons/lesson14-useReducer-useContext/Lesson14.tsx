import Counter from "./Counter";

const Lesson14 = () => {
  return (
    <>
      <Counter>{(num: number) => <>Current Count: {num}</>}</Counter>
    </>
  );
};

export default Lesson14;
