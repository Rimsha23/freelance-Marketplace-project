import React from "react";
import Modal from "antd/es/modal/Modal";


type PropsElements = {
  open?: boolean; 
  width?: string;
  height?: string;
  onClose?: ()=> void;
  title?: string;
  className?:string;
  children?: React.ReactNode;
};

export const Modals: React.FC<PropsElements> = ({ open, width, height, onClose, title,className,children }) => {
  

  return (
    <>
      <div className="p-10 flex justify-center w-full">
        <Modal
          open={open}
          onCancel={onClose}
          footer={null}
          width={width}
          style={{ height }} 
          closeIcon={<span style={{ color: "black", fontWeight: "bold", fontSize: "30px" }}>&times;</span>}
        className={`${className}`}
        >
          <div className="font-bold opacity-50 flex justify-between ">
          <h1 className="text-gray-500 text-[22px]">{title}</h1>
          </div>
          {children}
        </Modal>
      </div>
    </>
  );
};
