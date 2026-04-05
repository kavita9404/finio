import { ReactNode } from "react";
import AuthNavBar from "./AuthNavBar";
import SideMenu from "./SideMenu";
import { useSelector } from "react-redux";
import { selectRole } from "../store/selectors/transactionSelectors";

interface LayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: LayoutProps) => {
  const role = useSelector(selectRole);
  const isViewer = role === "viewer";

  return (
    <div className="min-h-screen">
      <div
        className="transform translate-x-[-1000%] lg:transform-none fixed min-h-screen w-[15.625rem] z-20 transition-transform duration-300 overflow-y-visible bg-white border-r-[1px] border-[#DFEAF2]"
        id="side-menu"
      >
        <SideMenu />
      </div>

      <div className="flex flex-col w-full lg:w-[calc(100%-15.625rem)] min-h-screen bg-white md:bg-custom-primary-3 dark:bg-[#111827] overflow-x-auto ml-0 lg:ml-[15.625rem] pb-8">
        <AuthNavBar />

        {/* Viewer mode banner — shows on every page when role is Viewer */}
        {isViewer && (
          <div className="mt-[10rem] lg:mt-[6.25rem] px-4 lg:px-8 pt-4">
            <div className="flex items-center gap-3 bg-[#EDFAF6] border border-[#41D4A8] rounded-[0.9375rem] px-5 py-3">
              <span className="text-lg">👁</span>
              <div>
                <p className="text-sm font-semibold text-[#0F6E56]">Viewer Mode</p>
                <p className="text-xs text-[#718EBF]">
                  You are in read-only mode. Switch to <strong>Admin</strong> using the dropdown in the top-right to add, edit, or delete data.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className={`${isViewer ? "mt-4" : "mt-[10rem] lg:mt-[6.25rem]"} p-4 lg:p-8`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
