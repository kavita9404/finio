import AccountsIcon from "../assets/icons/AccountsIcon";
import CreditCardsIcon from "../assets/icons/CreditCardsIcon";
import DashboardIcon from "../assets/icons/DashboardIcon";
import InvestmentsIcon from "../assets/icons/InvestmentsIcon";
import LoansIcon from "../assets/icons/LoansIcon";
import PrivilegesIcon from "../assets/icons/PrivilegesIcon";
import ServicesIcon from "../assets/icons/ServicesIcon";
import SettingsIcon from "../assets/icons/SettingsIcon";
import TransactionsIcon from "../assets/icons/TransactionsIcon";
import InsightsIcon from "../assets/icons/InsightsIcon";
import { updateMenu } from "../store/slices/menuSlice";
import { RootState } from "../store/store";
import { cloneElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export const menus = [
  {
    title: "Dashboard",
    link: "dashboard",
    icon: <DashboardIcon />,
    isActive: true,
  },
  {
    title: "Transactions",
    link: "transactions",
    icon: <TransactionsIcon />,
    isActive: false,
  },
  {
    title: "Insights",
    link: "insights",
    icon: <InsightsIcon />,
    isActive: false,
  },
  {
    title: "Accounts",
    link: "accounts",
    icon: <AccountsIcon />,
    isActive: false,
  },
  {
    title: "Investments",
    link: "investments",
    icon: <InvestmentsIcon />,
    isActive: false,
  },
  {
    title: "Credit Cards",
    link: "creditcards",
    icon: <CreditCardsIcon />,
    isActive: false,
  },
  {
    title: "Loans",
    link: "loans",
    icon: <LoansIcon />,
    isActive: false,
  },
  {
    title: "Services",
    link: "services",
    icon: <ServicesIcon />,
    isActive: false,
  },
  {
    title: "Privileges",
    link: "privileges",
    icon: <PrivilegesIcon />,
    isActive: false,
  },
  {
    title: "Settings",
    link: "settings",
    icon: <SettingsIcon />,
    isActive: false,
  },
];

const SideMenu = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const activeSideMenu = useSelector<RootState>((state) => state.menu);

  const { menu }: any = activeSideMenu;

  const handleSideMenuClick = (sidemenu: number) => {
    dispatch(updateMenu(sidemenu));
  };

  useEffect(() => {
    const pathName = location.pathname
      .split("/")
      .filter((element) => element !== "");
    const pathTitle = pathName[0];
    const sideMenuTitle = menus.find(
      (sidemenu) => sidemenu.link === pathTitle
    )?.title;

    if (sideMenuTitle && sideMenuTitle !== activeSideMenu) {
      handleSideMenuClick(
        menus.findIndex((sidemenu) => sidemenu.title === sideMenuTitle)
      );
    }
  }, [location.pathname, menus, activeSideMenu, dispatch]);

  return (
    <div className="flex flex-col gap-1 h-full">
      <div className="flex items-center h-[6.25rem] py-3 px-[2.5rem] mb-4 gap-4">
        <img src="/assets/icons/soar-logo.svg" alt="Logo" />
        <p className="self-center text-black whitespace-nowrap text-xl md:text-2xl font-extrabold">
          Finio
        </p>
      </div>
      {menus.map(({ title, link, icon }, index) => (
        <Link to={`/${link}`} key={index}>
          <button
            className={`relative w-full py-4 px-[2.5rem] gap-6 flex items-center focus:outline-none`}
          >
            {menu === index && (
              <div className="absolute top-0 left-0 h-full w-[0.375rem] bg-black rounded-r-[0.375rem]" />
            )}
            {cloneElement(icon, { isActive: menu === index })}
            <span className={`text-black text-center text-lg font-medium`}>
              {title}
            </span>
          </button>
        </Link>
      ))}
    </div>
  );
};

export default SideMenu;
