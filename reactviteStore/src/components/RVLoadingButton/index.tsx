import type { ButtonProps } from "./types";
import { Button, Icon, Text } from "./styles";

const Index = (props: ButtonProps) => {
  const { className, disabled, fluid, icon, content, loading, type, lineHeight, onClick } = props;

  return (
    <Button content={content} type={type} disabled={disabled} className={className} inline-style={fluid ? { width: "100%" } : { width: "auto" }} onClick={onClick}>
      {icon && <Icon />}
      {loading && <Icon />}
      {content && <Text lineHeight={lineHeight}>{content}</Text>}
    </Button>
  );
};

export default Index;
