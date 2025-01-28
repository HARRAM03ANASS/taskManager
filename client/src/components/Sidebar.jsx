// import React from "react";
// import { MdChevronLeft, MdChevronRight, MdMenu } from "react-icons/md";
// import { FaBuilding, FaTasks, FaTrashAlt, FaUsers, FaTachometerAlt } from "react-icons/fa";
// import { Link, useLocation } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { toggleSidebar } from "../redux/slices/authSlice";
// import clsx from "clsx";

// const linkData = [
//   { label: "Tableau de bord", link: "dashboard", icon: <FaTachometerAlt /> },
//   { label: "Tâches", link: "taches", icon: <FaTasks /> },
//   { label: "Clients", link: "client", icon: <FaBuilding /> },
//   { label: "Equipe", link: "equipe", icon: <FaUsers /> },
//   { label: "Supprimée", link: "supprime", icon: <FaTrashAlt /> },
// ];

// const Sidebar = () => {
//   const dispatch = useDispatch();
//   const { isExpanded } = useSelector((state) => state.auth);
//   const location = useLocation();
//   const path = location.pathname.split("/")[1];

//   const NavLink = ({ el }) => (
//     <Link
//       to={el.link}
//       className={clsx(
//         "w-full flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d] transition-all duration-200",
//         path === el.link.split("/")[0] ? "bg-blue-700 text-neutral-100" : "",
//         !isExpanded && "justify-center px-2"
//       )}
//     >
//       <span className="text-xl">{el.icon}</span>
//       {isExpanded && (
//         <span className="hover:text-[#2564ed] transition-all duration-200">
//           {el.label}
//         </span>
//       )}
//     </Link>
//   );

//   return (
//     <div
//       className={clsx(
//         "relative h-screen bg-white shadow-lg flex flex-col items-center justify-center transition-all duration-300",
//         isExpanded ? "w-64" : "w-16"
//       )}
//     >
//       {/* Toggle Button */}
//       <button
//         onClick={() => dispatch(toggleSidebar())}
//         className="absolute left-3 top-6 text-gray-600 p-1 hover:bg-gray-100 transition-all duration-200"
//       >
//         {isExpanded ? <MdMenu size={25} /> : <MdMenu size={25} />}
//       </button>

//       {/* Logo (géré avec une condition) */}
//       {isExpanded && (
//         <div className="mb-8">
//           <img
//             src="../../../public/logo.png"
//             alt="logoBAN"
//             className="transition-all duration-200 w-32  -mt-5"
//           />
//         </div>
//       )}

//       {/* Navigation Links */}
//       <div
//         className={clsx(
//           "flex flex-col gap-y-5",
//           isExpanded ? "mt-0" : "mt-10" // Ajustement des marges si le logo est supprimé
//         )}
//       >
//         {linkData.map((link) => (
//           <NavLink el={link} key={link.label} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import React from "react";
import { MdMenu } from "react-icons/md";
import { FaBuilding, FaTasks, FaTrashAlt, FaUsers, FaTachometerAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { toggleSidebar } from "../redux/slices/authSlice";
import clsx from "clsx";
import { useAuth } from "../redux/slices/authSlice";

const Sidebar = () => {
    const dispatch = useDispatch();
    const { isExpanded } = useSelector((state) => state.auth);
    const { isAdmin } = useAuth(); // Access user role
    const location = useLocation();
    const path = location.pathname.split("/")[1];

    const linkData = [
        { label: "Tableau de bord", link: "dashboard", icon: <FaTachometerAlt /> },
        { label: "Tâches", link: "taches", icon: <FaTasks /> },
        { label: "Clients", link: "client", icon: <FaBuilding /> },
        { label: "Supprimée", link: "supprime", icon: <FaTrashAlt /> },
        ...(isAdmin ? [{ label: "Equipe", link: "equipe", icon: <FaUsers /> }] : []),
    ];

    const NavLink = ({ el }) => (
        <Link
            to={el.link}
            className={clsx(
                "w-full flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d] transition-all duration-200",
                path === el.link.split("/")[0] ? "bg-blue-700 text-neutral-100" : "",
                !isExpanded && "justify-center px-2"
            )}
        >
            <span className="text-xl">{el.icon}</span>
            {isExpanded && (
                <span className="hover:text-[#2564ed] transition-all duration-200">
                    {el.label}
                </span>
                
            )}
        </Link>
    );

    return (
        <div
            className={clsx(
                "relative h-screen bg-white shadow-lg flex flex-col items-center justify-center transition-all duration-300",
                isExpanded ? "w-64" : "w-16"
            )}
        >
            {/* Toggle Button */}
         <img
            src="../../../public/logo.png"
            alt="logoBAN"
            className="transition-all duration-200 w-32  -mt-5"
          />
            <button
                onClick={() => dispatch(toggleSidebar())}
                className="absolute left-3 top-6 text-gray-600 p-1 hover:bg-gray-100 transition-all duration-200"
            >
                <MdMenu size={25} />
            </button>
            
            {/* Navigation Links */}
            <div className="flex flex-col gap-y-5 mt-10">
                {linkData.map((link) => (
                    <NavLink el={link} key={link.label} />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;