import { Button } from "./style";

const Index = ({ content, onClick }: ButtonLinkProps) => {
  return <Button onClick={() => onClick()}>{content}</Button>;
};

type ButtonLinkProps = {
  content: string;
  onClick: () => void;
};

export default Index;
