import { ReactElement } from "react";

type HeadingProps = { title: string };

//Om vi bara returnerar ett element kan vi vara mer specifika
const Heading = ({ title }: HeadingProps): ReactElement => {
  return <h1>{title}</h1>;
};

export default Heading;
