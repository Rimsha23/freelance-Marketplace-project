import React from "react";
import { Upload } from "antd";
import ButtonComp from "../button";
import { file_icon } from "../../utils/constants";

const UploadComponent: React.FC<{
  name: string;
  text: string;
  size: string;
  className: string;
}> = ({ name, text, size, className }) => {
  switch (name) {
    case "resume":
      return (
        <Upload>
          <ButtonComp
            text={text}
            size={size}
            variant="purple_transparent"
            shape="default"
            className={className}
          />
        </Upload>
      );
    case "image":
      return (
        <Upload>
          <ButtonComp
            text={text}
            size={size}
            variant="cyan"
            className={className}
          />
        </Upload>
      );
    default:
      return (
        <Upload>
          <ButtonComp
            text={text}
            size={size}
            variant="gray"
            shape="default"
            icon={<img src={file_icon} className="pr-2" />}
            className={className}
          />
        </Upload>
      );
  }
};

export default UploadComponent;
