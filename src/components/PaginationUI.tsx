import type { PaginationData } from "../types/pagination";
import Pagination from "@mui/material/Pagination";

interface PaginationUIProps {
  paginationData: PaginationData;
  onPageChange: (page: number) => void;
}

function PaginationUI({ paginationData, onPageChange }: PaginationUIProps) {
  return (
    <Pagination
      className="mt-3 mb-3 flex justify-center"
      count={Math.min(
        paginationData.currentPage + 5,
        paginationData.totalPages
      )}
      page={paginationData.currentPage}
      onChange={(_, page) => onPageChange(page)}
      variant="outlined"
      shape="rounded"
      sx={{
        "& .MuiPaginationItem-root": {
          color: "#a1a1aa",
          borderColor: "#3f3f46",
          fontSize: "1rem",
          fontWeight: 600,
          minWidth: "44px",
          height: "44px",
          borderRadius: "10px",
          margin: "0 4px",
          backgroundColor: "#18181b",
        },

        "& .MuiPaginationItem-root:hover": {
          backgroundColor: "#27272a",
          color: "#fff",
          borderColor: "#71717a",
        },

        "& .MuiPaginationItem-root.Mui-selected": {
          backgroundColor: "#49c916",
          color: "#fff",
          borderColor: "#49c916",
        },

        "& .MuiPaginationItem-root.Mui-selected:hover": {
          backgroundColor: "#49c916",
          borderColor: "#49c916",
        },
      }}
    />
  );
}

export default PaginationUI;
