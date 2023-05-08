// Här kommer vi gå igenom saker som har blivit föråldrade med react 18 men kan vara bra att veta
// pga att man kan stöta på det i andra projekt.

// gamla sättet
//import React from "react";

// Så här sog det ut förr. TS gillar itne det idag
// export const Section: React.FC<{ title: string }> = ({ children, title }) => {
//   return (
//     <section>
//       <h2>{title}</h2>
//       <p> {children}</p>
//     </section>
//   );
// };

// Såhär skriver man samma men i dagens standard
import { ReactNode } from "react";

type SectionProps = {
  title?: string;
  children: ReactNode;
};

export const Section = ({
  children,
  title = "My Subheading",
}: SectionProps) => {
  return (
    <section>
      <h2>{title}</h2>
      <p> {children}</p>
    </section>
  );
};
