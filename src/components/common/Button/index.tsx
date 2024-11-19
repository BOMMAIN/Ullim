import React from "react";
import styled from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  padding?: string;
  fontSize?: string;
  bgColor?: string;
  radius?: string;
  color?: string;
}

const Button = ({
  onClick,
  children,
  bgColor = "#E87C6C",
  padding = "5px 25px",
  radius = "50px",
  color = "#fff",
  fontSize = "18px",
  ...rest
}: ButtonProps) => {
  return (
    <CustomButton
      onClick={onClick}
      bgColor={bgColor}
      padding={padding}
      radius={radius}
      color={color}
      fontSize={fontSize}
      {...rest}
    >
      {children}
    </CustomButton>
  );
};

export default Button;

const CustomButton = styled.button<{
  bgColor: string;
  radius: string;
  padding: string;
  color: string;
  fontSize: string;
}>`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  border-radius: ${(props) => props.radius};
  padding: ${(props) => props.padding};
  font-size: ${(props) => props.fontSize};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: opacity 0.3s ease;
  box-shadow: 1px 4px 4px #aaa;
  font-weight: bold;
  &:hover {
    opacity: 0.8;
  }
`;
