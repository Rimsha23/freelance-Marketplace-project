import { Pagination } from "@mui/material";

type PaginationProps = {
  currentPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  totalPages: number;
};

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  totalPages,
}) => {
  return (
    <div className="p-4">
      <Pagination
        siblingCount={0}
        boundaryCount={1}
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        sx={{
          "& .MuiPaginationItem-page.Mui-selected": {
            color: "#FFFFFF",
            backgroundColor: "#3A0F7D",
            borderColor: "transparent",
          },
          "& .MuiPaginationItem-icon": {
            color: "#3A0F7D",
          },
          "& .MuiPaginationItem-root": {
            color: "#3A0F7D",
            border: "1.5px solid #3A0F7D",
            padding: "5px",
          },
        }}
      />
    </div>
  );
};

export default PaginationComponent;
