import { fontSize, primary, radius, secondary } from "../../theme/variables";
import styled from "styled-components";

export const Button = styled.button`
  width: auto;
  height: 31px;
  padding: 0 20px;
  border-radius: ${radius};
  text-align: center;
  font-size: ${fontSize};
  line-height: 31px;
  color: #ffffff;
  border: none;
  font-weight: 500;
  background-color: ${primary};

  &:hover {
    background-color: ${secondary};
  }
  &:active,
  &:focus {
    border: none;
    outline: none;
  }
`;

export const Icon = styled.i`
  display: block;
  float: left;
  width: 21px;
  height: 21px;
  margin: 5px;
  backgroud: grey;
`;

interface TextProps {
  lineHeight?: number;
}

export const Text = styled.div<TextProps>`
  line-height: ${({ lineHeight }) => (lineHeight ? `${lineHeight}px` : "31px")};
`;
