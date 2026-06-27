import { Outlet } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

import { Navbar } from "../../../Common";
import { SearchProvider } from "../../data/providers";
import { useSearchController } from "../controllers/useSearchController";

const SearchNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { query, actions } = useSearchController();

  const handleSearchChange = (value: string) => {
    actions.setQuery(value);

    if (value.trim() && location.pathname !== "/search") {
      navigate("/search");
    }
  };

  return (
    <Navbar searchValue={query} onSearchChange={handleSearchChange} />
  );
};

const SearchShellContent = () => (
  <>
    <SearchNavbar />
    <Outlet />
  </>
);

export const SearchShellLayout = () => (
  <SearchProvider>
    <SearchShellContent />
  </SearchProvider>
);
