import React from "react";
import { Button, ConfigProvider, Space } from "antd";
type ButtonProps = {
  className?: string;
  variant?: string;
  size?: string;
  shape?: "circle" | "default" | "round" | undefined;
  text?: string;
  icon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  type?: "primary" | "dashed" | "link" | "text" | "default";
  disabled?: boolean;
  htmlType?: "button" | "submit" | "reset" | undefined;
};

const variants: { [key: string]: string } = {
  white:
    "bg-white text-center text-[#3A0F7D]   border-2 border-[#3A0F7D] shadow-md shadow-gray-400 font-bold khula-text",
  violet:
    "bg-[#3A0F7D] text-center text-white  shadow-md shadow-violet-400 font-bold khula-text",
  cyan: "bg-[#6EF5C3] text-center text-[#3A0F7D]  shadow-md shadow-gray-400  font-bold khula-text",
  danger:
    "bg-[#EB5E4A] text-center text-white shadow-md shadow-gray-300  font-extrabold khula-text",
  icon: "bg-transparent text-gray-900  outline-none  font-bold khula-text",
  transparent:
    "bg-transparent text-[#3A0F7D]   outline-none  font-bold khula-text",
  purple_transparent: "border-[1px] border-[#6434AD] text-[#3A0F7D] rounded-[4px] bg-[#d2b4e0] border-dashed font-semibold text-[14px] text-center pr-4text-center khula-text font-bold",
  gray: "bg-[#3A0F7D4D] rounded-[4px] text-[#020617] text-[15px] font-normal leading-normal khula-text"
};

const sizes: { [key: string]: string } = {
  smaller: "h-[28px] text-[13px] ",
  small: " h-[32px]  text-[14px] ",
  medium: "h-[40px] text-[14px]",
  large: " h-[60px] text-[15px]",
  larger: "w-[40%] h-[68px] ",
  largeRound: "h-[45px] w-[4.5vh] text-md ",
  smallRound: "h-[60px] w-[3vh] text-md",
};

const ButtonComp: React.FC<ButtonProps> = ({
  className,
  variant = "white",
  size = "medium",
  text,
  icon,
  htmlType,
  shape = "round",
  type = 'primary',
  onClick,
  ...props
}) => {
  const shouldApplyPadding =
    !(shape === 'circle' || size === 'smallRound' || size === 'small' || size === 'smaller' || size === 'largeRound' || variant === 'transparent' || variant === 'gray' || type === 'text' || variant === 'purple_transparent' || size === 'smaller');

  const buttonStyle = {
    paddingLeft: shouldApplyPadding ? '50px' : undefined,
    paddingRight: shouldApplyPadding ? '50px' : undefined,
  };
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#7339cc",
        },
      }}
    >
      <Space>
        <Button
          htmlType={htmlType}
          shape={shape}
          style={buttonStyle}
          className={`${className} ${variants[variant]} ${sizes[size]}`}
          type={type}
          onClick={onClick}
          {...props}
        >
          <div className="flex flex-row justify-center">
            {" "}
            <span>{icon}</span> {text}
          </div>
        </Button>
      </Space>
    </ConfigProvider>
  );
};

export default ButtonComp;
