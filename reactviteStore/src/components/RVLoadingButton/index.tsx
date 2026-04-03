import type { ButtonProps } from "./types";
import { Button, ButtonWrapper, Icon, Text } from "./styles";

const Index = (props: ButtonProps) => {
  const { className, disabled, fluid, icon, content, loading, type, lineHeight, onClick } = props;

  return (
    <ButtonWrapper>
      {loading && icon && <Icon loading={loading} />}
      <Button content={content} type={type} disabled={disabled} className={className} inline-style={{ width: fluid ? "100%" : "auto" }} onClick={onClick}>
        {content ?? <Text lineHeight={lineHeight}>{loading ? "Loading..." : content}</Text>}
      </Button>
    </ButtonWrapper>
  );
};

export default Index;
