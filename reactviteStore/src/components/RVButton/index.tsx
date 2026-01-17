import { Button } from "./style";

const Index = (props: ButtonLinkProps) => {
  return <Button onClick={() => props.onClick()}>{props.content}</Button>;
};

type ButtonLinkProps = {
  content: string;
  onClick: () => void;
};

export default Index;
