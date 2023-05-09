// I denna lektion skall vi refaktorisera en komponent så den använder sig av udeReducer istället för useState.
//Hovra över useReducer för att se att den är ett alternativ till useState som är bättre lämpad för viss komplex state-logik
import { ChangeEvent, ReactNode, useReducer } from "react";

// Oftast använder vi useState av gammal vana och för att det är enkelt att använda
// useReducer är dock bra att kunna om du t ex skall förstå reducerfunktioner och skall jobba med globala states som t ex context/redux

// Låt oss börja med att deklarera ett default state
const initState = { count: 0, text: "" };

// Nu gör vi något som vissa anser lite kontroversiellt. Vi skall deklarera en enum.
// Man måste inte göra det, utan man kan göra det till en litteral string istället med ett object {INCREMENT: "increment", DECREMENT: "decrement"}
const enum REDUCER_ACTION_TYPE {
  INCREMENT,
  DECREMENT,
  NEW_INPUT,
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: string;
};

type ChildrenType = {
  children: (num: number) => ReactNode;
};

const reducer = (
  state: typeof initState,
  action: ReducerAction
): typeof initState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.INCREMENT:
      return { ...state, count: state.count + 1 };

    case REDUCER_ACTION_TYPE.DECREMENT:
      return { ...state, count: state.count - 1 };
    case REDUCER_ACTION_TYPE.NEW_INPUT:
      // Här räcker det inte att specifiera action.payload för payload kan vara undefined.
      // Vi kan åtgärda detta genom att lägga till en null-coalescing operator för att kolla om värdet är null/undefined sätt nästa
      return { ...state, text: action.payload ?? "" };

    default:
      throw new Error();
  }
};

const Counter = ({ children }: ChildrenType) => {
  // Här skall vi byta ut useState till en useReducer
  //const [count, setCount] = useState<number>(1);

  // en useReducer har en reducer och en dispatch. Den tar emot en reducer och intiStatet som vi deklarerat högre upp.
  const [state, dispatch] = useReducer(reducer, initState);

  // Nedan byter vi ut våra funktioner till dispatched istället
  //   const increment = () => setCount((prev) => prev + 1);
  //   const decrement = () => setCount((prev) => prev - 1);

  const increment = () => dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT });
  const decrement = () => dispatch({ type: REDUCER_ACTION_TYPE.DECREMENT });
  const handleTextInput = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.NEW_INPUT,
      payload: e.target.value,
    });
  };

  return (
    <>
      {/* Här måste vi updatera från {count} till {state.count} */}
      <h1>{children(state.count)}</h1>{" "}
      <div className='tutorial-counter'>
        <button onClick={increment}> + </button>
        <button onClick={decrement}> - </button>
      </div>
      <div className='center flex-column'>
        <input type='text' onChange={handleTextInput} />
        {state.text}
      </div>
    </>
  );
};

export default Counter;
