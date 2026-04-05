import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link, useNavigate } from "react-router-dom";
import { menus } from "./SideMenu";
import RoleSwitcher from "./RoleSwitcher";
import ThemeToggle from "./ThemeToggle";
import { selectAllTransactions } from "../store/selectors/transactionSelectors";
import { Transaction } from "../store/slices/transactionsSlice";

const AuthNavBar = () => {
  const activeSideMenu = useSelector<RootState>((state) => state.menu);
  const { menu }: any = activeSideMenu;
  const allTransactions = useSelector(selectAllTransactions);
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Transaction[]>([]);
  const [showResults, setShowResults] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  // Close mobile menu on outside click
  const closeDropdown = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  // Close search results on outside click
  const closeSearch = (e: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
      setShowResults(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    document.addEventListener("mousedown", closeSearch);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
      document.removeEventListener("mousedown", closeSearch);
    };
  }, []);

  // Live search across transactions
  useEffect(() => {
    const q = searchTerm.trim().toLowerCase();
    if (q.length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    const results = allTransactions
      .filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.type.toLowerCase().includes(q)
      )
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 6);
    setSearchResults(results);
    setShowResults(true);
  }, [searchTerm, allTransactions]);

  const handleResultClick = () => {
    setSearchTerm("");
    setShowResults(false);
    navigate("/transactions");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      setShowResults(false);
      navigate("/transactions");
    }
    if (e.key === "Escape") {
      setSearchTerm("");
      setShowResults(false);
    }
  };

  const fmt = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const currentTitle = menus[menu]?.title || "";

  const SearchDropdown = () => (
    showResults && searchResults.length > 0 ? (
      <div className="absolute top-full left-0 mt-2 w-full min-w-[20rem] bg-white rounded-[1rem] shadow-lg border border-[#DFEAF2] z-50 overflow-hidden">
        <div className="px-4 py-2 border-b border-[#F5F7FA]">
          <p className="text-xs text-[#718EBF] font-medium">{searchResults.length} result{searchResults.length !== 1 ? "s" : ""} for "{searchTerm}"</p>
        </div>
        {searchResults.map((t) => (
          <button
            key={t.id}
            onClick={handleResultClick}
            className="w-full flex justify-between items-center px-4 py-3 hover:bg-[#F5F7FA] transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <img src={t.icon || "/assets/icons/cash-icon.svg"} alt="" className="w-7 h-7 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-[#343C6A]">{t.description}</p>
                <p className="text-xs text-[#718EBF]">{t.category} · {new Date(t.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</p>
              </div>
            </div>
            <span className={`text-sm font-semibold ml-4 flex-shrink-0 ${t.type === "income" ? "text-[#41D4A8]" : "text-[#FF4B4A]"}`}>
              {t.type === "income" ? "+" : "-"}{fmt(t.amount)}
            </span>
          </button>
        ))}
        <button
          onClick={handleResultClick}
          className="w-full px-4 py-3 text-xs text-[#343C6A] font-medium text-center bg-[#F5F7FA] hover:bg-[#DFEAF2] transition-colors border-t border-[#DFEAF2]"
        >
          View all transactions →
        </button>
      </div>
    ) : showResults && searchTerm.trim().length >= 2 ? (
      <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-[1rem] shadow-lg border border-[#DFEAF2] z-50 px-4 py-4 text-center">
        <p className="text-sm text-[#718EBF]">No transactions found for "{searchTerm}"</p>
      </div>
    ) : null
  );

  return (
    <div className="px-4 lg:px-8 w-full lg:w-[calc(100%-15.625rem)] bg-white lg:border-b-[1px] border-[#DFEAF2] z-10 top-0 fixed">

      {/* Desktop navbar */}
      <div className="h-[6.25rem] hidden lg:flex justify-between items-center">
        <div className="font-semibold text-[1.75rem] text-custom-primary-1 leading-8">
          {currentTitle === "Dashboard" ? "Overview" : currentTitle}
        </div>
        <div className="flex justify-center items-center gap-5">

          {/* Search with live results */}
          <div className="relative w-full md:w-[15.9375rem]" ref={searchRef}>
            <div className="absolute inset-y-0 left-0 pr-2 sm:pr-6 pl-4 flex items-center pointer-events-none">
              <img src="/assets/icons/search-icon.svg" alt="search icon" className="w-auto h-5" />
            </div>
            <input
              className="px-4 py-4 w-full h-12 pl-12 flex shadow-none text-sm bg-custom-primary-3 rounded-full self-stretch gap-2 items-center focus:outline-none text-[#8BA3CB]"
              placeholder="Search for something"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => searchTerm.trim().length >= 2 && setShowResults(true)}
            />
            <SearchDropdown />
          </div>

          <ThemeToggle />

          <div className="flex justify-center items-center bg-custom-primary-3 rounded-full w-[3.125rem] h-[3.125rem] flex-shrink-0">
            <img src="/assets/icons/settings1-icon.svg" alt="Settings" />
          </div>
          <div className="flex justify-center items-center bg-custom-primary-3 rounded-full w-[3.125rem] h-[3.125rem] flex-shrink-0">
            <img src="/assets/icons/notification-icon.svg" alt="Notification" />
          </div>
          <img
            src="/assets/images/avatar-cartoon.svg"
            alt="User Profile"
            className="w-[3.75rem] h-[3.75rem] rounded-full object-cover flex-shrink-0 ring-2 ring-[#DFEAF2]"
          />
          <RoleSwitcher />
        </div>
      </div>

      {/* Mobile navbar */}
      <div className="h-[10rem] py-6 flex flex-col lg:hidden w-full gap-6">
        <div className="flex items-center justify-between w-full">
          <div className="relative flex items-center" ref={dropdownRef}>
            <div
              className="flex gap-2 w-[2.1875rem] h-[2.1875rem] text-[#343C6A] items-center md:gap-3 cursor-pointer"
              onClick={toggleDropdown}
            >
              <svg className="w-[0.875rem] h-[1.125rem]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </div>
            {isDropdownOpen && (
              <div className="absolute z-10 left-0 top-6 mt-2 w-48 bg-white shadow-md rounded-md">
                <div className="p-3 space-y-2">
                  {menus.map(({ title, link }, index) => (
                    <Link key={index} to={`/${link}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      {title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="font-semibold text-[1.25rem] text-custom-primary-1 leading-6">
            {currentTitle === "Dashboard" ? "Overview" : currentTitle}
          </div>

          <img
            src="/assets/images/avatar-cartoon.svg"
            alt="User Profile"
            className="w-[2.1875rem] h-[2.1875rem] rounded-full object-cover ring-2 ring-[#DFEAF2]"
          />
        </div>

        <div className="flex justify-center items-center gap-3">
          {/* Mobile search with results */}
          <div className="relative flex-1" ref={searchRef}>
            <div className="absolute inset-y-0 left-0 pr-2 sm:pr-6 pl-4 flex items-center pointer-events-none">
              <img src="/assets/icons/search-icon.svg" alt="search icon" className="w-auto h-[0.9375rem]" />
            </div>
            <input
              className="px-4 py-4 w-full h-12 pl-12 flex shadow-none text-[0.8125rem] bg-custom-primary-3 rounded-full self-stretch gap-2 items-center focus:outline-none text-[#8BA3CB]"
              placeholder="Search for something"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => searchTerm.trim().length >= 2 && setShowResults(true)}
            />
            <SearchDropdown />
          </div>
          <ThemeToggle />
          <RoleSwitcher />
        </div>
      </div>
    </div>
  );
};

export default AuthNavBar;
