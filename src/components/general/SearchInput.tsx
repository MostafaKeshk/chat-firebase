import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { TextField } from "@mui/material";

type IProps = {
  searchValue: string;
  handleSearch: any;
  fullWidth?: boolean;
  placeholder?: string;
};

const SearchInput: React.FC<IProps> = ({
  searchValue,
  handleSearch,
  fullWidth = false,
  placeholder = "Search...",
}) => {
  return (
    <TextField
      size="small"
      fullWidth={fullWidth}
      variant="outlined"
      value={searchValue}
      placeholder={placeholder}
      onChange={(e: any) => handleSearch(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchInput;
