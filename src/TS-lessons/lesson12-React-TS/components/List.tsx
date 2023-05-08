import { ReactNode } from "react";

// T står generic. Kan egentligen vara vilken bokstav som helst, men T är standard
interface ListProps<T> {
  // items kan bestå av en array av vilken typ som helst
  items: T[];
  render: (item: T) => ReactNode;
}

// Ibland har TS problem att känna igen generics
// Då kan man t ex göra en  <T extends {}> men man kan också göra som nedan <T,>
const List = <T,>({ items, render }: ListProps<T>) => {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={i}>{render(item)}</li>
      ))}
    </ul>
  );
};

export default List;
