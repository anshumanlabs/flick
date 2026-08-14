import type { PaginationData } from "../types/pagination";
import Pagination from "@mui/material/Pagination";

interface PaginationUIProps {
  paginationData: PaginationData;
  onPageChange: (page: number) => void;
}

function PaginationUI({ paginationData, onPageChange }: PaginationUIProps) {
  console.log("Pagination Data:", paginationData);
  return (
    <Pagination
      className="mt-3 mb-3 flex justify-center"
      count={paginationData.totalPages}
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
          backgroundColor: "#ef4444",
          color: "#fff",
          borderColor: "#ef4444",
        },

        "& .MuiPaginationItem-root.Mui-selected:hover": {
          backgroundColor: "#dc2626",
          borderColor: "#dc2626",
        },
      }}
    />
  );
}

export default PaginationUI;
