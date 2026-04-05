import { useDispatch, useSelector } from "react-redux";
import { setRole, AppRole } from "../store/slices/transactionsSlice";
import { selectRole } from "../store/selectors/transactionSelectors";

const RoleSwitcher = () => {
  const dispatch = useDispatch();
  const role = useSelector(selectRole);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setRole(e.target.value as AppRole));
  };

  const isAdmin = role === "admin";

  return (
    <div className="flex items-center gap-2">
      {/* Coloured badge showing current role */}
      <span
        className={`hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
          isAdmin
            ? "bg-[#343C6A] text-white border-[#343C6A]"
            : "bg-[#41D4A8] text-white border-[#41D4A8]"
        }`}
      >
        {isAdmin ? "👑 Admin" : "👁 Viewer"}
      </span>

      {/* Dropdown to switch */}
      <select
        value={role}
        onChange={handleChange}
        className="text-[0.8125rem] text-[#343C6A] font-medium bg-[#F5F7FA] border border-[#DFEAF2] rounded-full px-3 py-1.5 focus:outline-none cursor-pointer"
        title="Switch Role"
      >
        <option value="admin">Admin</option>
        <option value="viewer">Viewer</option>
      </select>
    </div>
  );
};

export default RoleSwitcher;
