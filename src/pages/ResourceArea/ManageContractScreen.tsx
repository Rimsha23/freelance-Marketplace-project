import React, { useState, useRef } from "react";
import ButtonComp from "../../common-components/button";
import { FiEye } from "react-icons/fi";
import { Modals } from "../../common-components/modal";
import signatureGroupImage from "../../assets/SIgnatureGroup.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import TableComponent from "../../common-components/Table/table";
import { Link } from "react-router-dom";
import backIconButton from "../../assets/BackArrowBtn.png";

const ManageContractsPage: React.FC = () => {
  // {ContractPdf}
  const [contractModalOpen, setContractModalOpen] = useState<boolean>(false);

  const pdfRef = useRef(null);

  const downloadpdf = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfwidth = pdf.internal.pageSize.getWidth();
      const pdfheight = pdf.internal.pageSize.getHeight();
      const imgwidth = canvas.width;
      const imgheight = canvas.height;
      const paddingX = 20; 
      const paddingY = 20; 
      const ratio = Math.min((pdfwidth - 2 * paddingX) / imgwidth, (pdfheight - 2 * paddingY) / imgheight);
      const imgx = paddingX + (pdfwidth - 2 * paddingX - imgwidth * ratio) / 2;
      const imgy = paddingY;
  
      pdf.addImage(
        imgData,
        "PNG",
        imgx,
        imgy,
        imgwidth * ratio,
        imgheight * ratio
      );
      pdf.save("AgreementPDF.pdf");
    });
  };

  // {Table}
  const columns = [
    {
      title: 'AgreementTitle',
      dataIndex: 'agreementTitle',
      key: 'agreementTitle', 
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
    },
  ];

const data = [
  {
    agreementTitle: 'Agreement tile goes here...',
    actions: [
      <ButtonComp
    variant="white"
    text="View Details"
    icon={<FiEye className="mt-1 mr-2"/>}
    className="w-[150px] h-[35px]"
    onClick={() => setContractModalOpen(true)}
  />
    ]
  },
  {
    agreementTitle: 'Agreement tile goes here...',
    actions: [
      <ButtonComp
    variant="white"
    text="View Details"
    icon={<FiEye className="mt-1 mr-2"/>}
    className="w-[150px] h-[35px]"
    onClick={() => setContractModalOpen(true)}
  />
    ]
  },
  {
    agreementTitle: 'Agreement tile goes here...',
    actions: [
      <ButtonComp
    variant="white"
    text="View Details"
    icon={<FiEye className="mt-1 mr-2"/>}
    className="w-[150px] h-[35px]"
    onClick={() => setContractModalOpen(true)}
  />
    ]
  },
  {
    agreementTitle: 'Agreement tile goes here...',
    actions: [
      <ButtonComp
    variant="white"
    text="View Details"
    icon={<FiEye className="mt-1 mr-2"/>}
    className="w-[150px] h-[35px]"
    onClick={() => setContractModalOpen(true)}
  />
    ]
  },
  {
    agreementTitle: 'Agreement tile goes here...',
    actions: [
      <ButtonComp
    variant="white"
    text="View Details"
    icon={<FiEye className="mt-1 mr-2"/>}
    className="w-[150px] h-[35px]"
    onClick={() => setContractModalOpen(true)}
  />
    ]
  },
  {
    agreementTitle: 'Agreement tile goes here...',
    actions: [
      <ButtonComp
    variant="white"
    text="View Details"
    icon={<FiEye className="mt-1 mr-2"/>}
    className="w-[150px] h-[35px]"
    onClick={() => setContractModalOpen(true)}
  />
    ]
  },
  {
    agreementTitle: 'Agreement tile goes here...',
    actions: [
      <ButtonComp
    variant="white"
    text="View Details"
    icon={<FiEye className="mt-1 mr-2"/>}
    className="w-[150px] h-[35px]"
    onClick={() => setContractModalOpen(true)}
  />
    ]
  },
  {
    agreementTitle: 'Agreement tile goes here...',
    actions: [
      <ButtonComp
    variant="white"
    text="View Details"
    icon={<FiEye className="mt-1 mr-2"/>}
    className="w-[150px] h-[35px]"
    onClick={() => setContractModalOpen(true)}
  />
    ]
  },
  {
    agreementTitle: 'Agreement tile goes here...',
    actions: [
      <ButtonComp
    variant="white"
    text="View Details"
    icon={<FiEye className="mt-1 mr-2"/>}
    className="w-[150px] h-[35px]"
    onClick={() => setContractModalOpen(true)}
  />
    ]
  },
  {
    agreementTitle: 'Agreement tile goes here...',
    actions: [
      <ButtonComp
    variant="white"
    text="View Details"
    icon={<FiEye className="mt-1 mr-2"/>}
    className="w-[150px] h-[35px]"
    onClick={() => setContractModalOpen(true)}
  />
    ]
  },
  {
    agreementTitle: 'Agreement tile goes here...',
    actions: [
      <ButtonComp
    variant="white"
    text="View Details"
    icon={<FiEye className="mt-1 mr-2"/>}
    className="w-[150px] h-[35px]"
    onClick={() => setContractModalOpen(true)}
  />
    ]
  },
  {
    agreementTitle: 'Agreement tile goes here...',
    actions: [
      <ButtonComp
    variant="white"
    text="View Details"
    icon={<FiEye className="mt-1 mr-2"/>}
    className="w-[150px] h-[35px]"
    onClick={() => setContractModalOpen(true)}
  />
    ]
  },
  {
    agreementTitle: 'Agreement tile goes here...',
    actions: [
      <ButtonComp
    variant="white"
    text="View Details"
    icon={<FiEye className="mt-1 mr-2"/>}
    className="w-[150px] h-[35px]"
    onClick={() => setContractModalOpen(true)}
  />
    ]
  },
  {
    agreementTitle: 'Agreement tile goes here...',
    actions: [
      <ButtonComp
    variant="white"
    text="View Details"
    icon={<FiEye className="mt-1 mr-2"/>}
    className="w-[150px] h-[35px]"
    onClick={() => setContractModalOpen(true)}
  />
    ]
  },
  {
    agreementTitle: 'Agreement tile goes here...',
    actions: [
      <ButtonComp
    variant="white"
    text="View Details"
    icon={<FiEye className="mt-1 mr-2"/>}
    className="w-[150px] h-[35px]"
    onClick={() => setContractModalOpen(true)}
  />
    ]
  },
  {
    agreementTitle: 'Agreement tile goes here...',
    actions: [
      <ButtonComp
    variant="white"
    text="View Details"
    icon={<FiEye className="mt-1 mr-2"/>}
    className="w-[150px] h-[35px]"
    onClick={() => setContractModalOpen(true)}
  />
    ]
  },
  {
    agreementTitle: 'Agreement tile goes here...',
    actions: [
      <ButtonComp
    variant="white"
    text="View Details"
    icon={<FiEye className="mt-1 mr-2"/>}
    className="w-[150px] h-[35px]"
    onClick={() => setContractModalOpen(true)}
  />
    ]
  },
  {
    agreementTitle: 'Agreement tile goes here...',
    actions: [
      <ButtonComp
    variant="white"
    text="View Details"
    icon={<FiEye className="mt-1 mr-2"/>}
    className="w-[150px] h-[35px]"
    onClick={() => setContractModalOpen(true)}
  />
    ]
  },
  {
    agreementTitle: 'Agreement tile goes here...',
    actions: [
      <ButtonComp
    variant="white"
    text="View Details"
    icon={<FiEye className="mt-1 mr-2"/>}
    className="w-[150px] h-[35px]"
    onClick={() => setContractModalOpen(true)}
  />
    ]
  },
  {
    agreementTitle: 'Agreement tile goes here...',
    actions: [
      <ButtonComp
    variant="white"
    text="View Details"
    icon={<FiEye className="mt-1 mr-2"/>}
    className="w-[150px] h-[35px]"
    onClick={() => setContractModalOpen(true)}
  />
    ]
  },
];

  return (
    <>
      <div className="flex w-full min-h-screen">
            <div className="w-full pl-[45px] pt-[39px] pr-[49px]">
                <div className="flex text-[22px] font-khula font-bold text-[#CACACA] mb-[33px]">
                  <Link to="/resource">
                    <ButtonComp size="small" variant="violet" className="mr-[19px] w-[40px h-[40px]" text={<img src={backIconButton} alt=""/>}/>
                    Manage Contracts
                    </Link>
                    </div> 
                    <div className="pr-[68px] pl-[24px] lg:flex  md:flex justify-between text-[#808080] pb-[16px] text-[14px] font-khula font-semibold">
                      <div className="">Agreement Title</div>
                      </div> 
      <TableComponent columns={columns} data={data}/>
      <Modals 
    open={contractModalOpen}
    onClose={()=> setContractModalOpen(false)}
    width="994px"
    height="760px"
    title="Agreement Detail"
    
    >
        <div className="text-[14px] font-khula text-gray-400 font-semibold break-words mt-[35px]" ref={pdfRef}>
        <div className=" h-[49px] rounded-lg mt-[7px]">
            <input className="w-full pt-[13px] pb-[11px] pl-[27px] bg-gray-100 rounded-lg  text-[15px] text-black font-khula font-normal placeholder:text-black" placeholder="Engagement title goes here.."/>
        </div>
        <div className="mt-[25px] text-[14px] font-khula font-semibold break-words">
        Agreement Content
        <div className="w-full  bg-gray-200 rounded-lg mt-[7px]">
            <div className="w-full  pl-[21px] pr-[18px] pt-[15px] pb-[18px] text-black text-[15px] font-khula font-normal break-words">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.
              Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis eleifend. Sed nec ante dictum sem condimentum ullamcorper quis venenatis nisi. Proin vitae facilisis nisi, ac posuere leo.
              Nam pulvinar blandit velit, id condimentum diam faucibus at. Aliquam lacus nisi, sollicitudin at nisi nec, fermentum congue felis. Quisque mauris dolor, fringilla sed tincidunt ac, finibus non odio. Sed vitae mauris nec ante pretium finibus. Donec nisl neque, pharetra ac elit eu, faucibus aliquam ligula. Nullam dictum, tellus tincidunt tempor laoreet, nibh elit sollicitudin felis, eget feugiat sapien diam nec nisl. Aenean gravida turpis nisi, consequat dictum risus dapibus a. Duis felis ante, varius in neque eu, tempor suscipit sem. 
            </div>
        </div>
        <div className="text-[14px] font-khula font-semibold break-words mt-[25px]">
        Signature
        <div className="w-full md:w-[391px] h-[94px] mt-7 md:flex md:justify-center  bg-gray-100 rounded-lg pt-[14.31px] pb-[14.75px] pl-[129.96px] pr-[136px]">
  <img className="w-full h-full" src={signatureGroupImage} alt=""/>
</div>
        </div>
        <div className="flex justify-start mt-[25px]">
          <ButtonComp
          className="px-3 font-khula font-semibold pt-1.5"
          variant="cyan"
          text="Download Contract PDF"
          onClick={downloadpdf}
          />
        </div>

        </div>
        </div>
    </Modals>
    </div>
   
    </div>
    </>
  );
};
export default ManageContractsPage;
