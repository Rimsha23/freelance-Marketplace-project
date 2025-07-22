import React, { ReactElement, SVGProps } from "react";
interface Path {
  d: string;
  fill: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  fillOpacity?: number;
}
interface SVGIconProps extends SVGProps<SVGSVGElement> {
  icon: Path | Path[];
  width?: number | string;
  height?: number | string;
  viewBox?: string;
  hoverColor?: string;
  className?: string;
}
const SVGIcon: React.FC<SVGIconProps> = ({
  icon,
  width = 24,
  height = 24,
  hoverColor,
  viewBox,
  className,
  ...restProps
}: SVGIconProps): ReactElement => {
  const defaultStyle: React.CSSProperties = {
    width,
    height,
    fill: hoverColor ? "currentColor" : "none",
    cursor: hoverColor ? "pointer" : "inherit",
  };
  const paths = Array.isArray(icon) ? icon : [icon];
  const [hover, setHover] = React.useState(false);
  const onMouseShowColor = () => {
    setHover(true);
  };

  const onMouseLeaveColor = () => {
    setHover(false);
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      style={defaultStyle}
      className={className}
      onMouseEnter={onMouseShowColor}
      onMouseLeave={onMouseLeaveColor}
      {...restProps}
    >
      {paths.map(
        (
          {
            d,
            fill,
            className,
            fillOpacity,
          },
          index
        ) => (
          <path
            key={index}
            d={d}
            fillOpacity={fillOpacity || 1}
            className={className}
            fill={hover && hoverColor ? hoverColor : fill}           
          />
        )
      )}
    </svg>
  );
};

export default SVGIcon;
