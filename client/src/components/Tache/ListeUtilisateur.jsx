// // import React from "react";
// // import { summary } from "../../assets/data";
// // import { Listbox, Transition } from "@headlessui/react";
// // import { Fragment, useEffect, useState } from "react";
// // import { BsChevronExpand } from "react-icons/bs";
// // import { MdCheck } from "react-icons/md";
// // import clsx from "clsx";
// // import { getInitials } from "../../utils";
// // import {useGetEquipeListeQuery} from "../../redux/slices/api/userApiSlice"

// // const ListeUtilisateur = ({ setTeam, team }) => {
// //   /*const donnees = summary.users;*/
// //   const {donnees,isLoading, isError}=useGetEquipeListeQuery();
// //   const [utilisateursSelectionnes, setUtilisateursSelectionnes] = useState([]);
// //   const handleChange = (el) => {
// //     setUtilisateursSelectionnes(el);
// //     setTeam(el?.map((u) => u._id));
// //   };
// //   useEffect(() => {
// //     if (team?.length < 1) {
// //       donnees && setUtilisateursSelectionnes([donnees[0]]);
// //     } else {
// //       setUtilisateursSelectionnes(team);
// //     }
// //   },[]);
// //   return (
// //     <div>
// //       <p className="text-gray-700">Assigner la tâche à:</p>
// //       <Listbox
// //         value={utilisateursSelectionnes}
// //         onChange={(el) => handleChange(el)}
// //         multiple
// //       >
// //         <div className="relative mt-1">
// //           <Listbox.Button className="relative w-full cursor-default rounded bg-white pl-3 pr-10 text-left px-3 py-2.5 2xl:py-3 border border-gray-300 sm:text-sm">
// //             <span className="block truncate">
// //               {utilisateursSelectionnes?.map((user) => user.nom).join(", ")}
// //             </span>
// //             <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
// //               <BsChevronExpand
// //                 className="h-5 w-5 text-gray-400"
// //                 aria-hidden="true"
// //               />
// //             </span>
// //           </Listbox.Button>
// //           <Transition
// //             as={Fragment}
// //             leave="transition ease-in duration-100"
// //             leaveFrom="opacity-100"
// //             leaveTo="opacity-0"
// //           >
// //             <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black focus:outline-none sm:text-sm">
// //               {donnees?.map((user, index) => (
// //                 <Listbox.Option
// //                   key={index}
// //                   className={({ active }) =>
// //                     `relative cursor-default select-none py-2 pl-10 pr-4. ${
// //                       active ? "bg-amber-100 text-amber-900" : "text-gray-900"
// //                     }`
// //                   }
// //                   value={user}
// //                 >
// //                   {({ selected }) => (
// //                     <>
// //                       <div
// //                         className={clsx(
// //                           "flex items-center gap-2 truncate",
// //                           selected ? "font-medium" : "font-normal"
// //                         )}
// //                       >
// //                         <div className="w-6 h-6 rounded-full text-white flex items-center justify-center bg-violet-600">
// //                           <span className="text-center text-[10px]">
// //                             {getInitials(user.nom)}
// //                           </span>
// //                         </div>
// //                         <span>{user.nom}</span>
// //                       </div>
// //                       {selected ? (
// //                         <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
// //                           <MdCheck className="h-5 w-5" aria-hidden="true" />
// //                         </span>
// //                       ) : null}
// //                     </>
// //                   )}
// //                 </Listbox.Option>
// //               ))}
// //             </Listbox.Options>
// //           </Transition>
// //         </div>
// //       </Listbox>
// //     </div>
// //   );
// // };

// // export default ListeUtilisateur;
// import React from "react";
// import { summary } from "../../assets/data";
// import { Listbox, Transition } from "@headlessui/react";
// import { Fragment, useEffect, useState } from "react";
// import { BsChevronExpand } from "react-icons/bs";
// import { MdCheck } from "react-icons/md";
// import clsx from "clsx";
// import { getInitials } from "../../utils";
// import {useGetEquipeListeQuery} from "../../redux/slices/api/userApiSlice"

// const ListeUtilisateur = ({ setTeam, team }) => {
//   /*const data = summary.users;*/
//   const {data,isLoading, isError}=useGetEquipeListeQuery();
//   const [utilisateursSelectionnes, setUtilisateursSelectionnes] = useState([]);
//   const handleChange = (el) => {
//     setUtilisateursSelectionnes(el);
//     setTeam(el?.map((u) => u._id));
//   };
//   useEffect(() => {
//     if (team?.length < 1) {
//       data && setUtilisateursSelectionnes([data[0]]);
//     } else {
//       setUtilisateursSelectionnes(team);
//     }
//   },[isLoading,data,team]);
//   return (
//     <div>
//       <p className="text-gray-700">Assigner la tâche à:</p>
//       <Listbox
//         value={utilisateursSelectionnes}
//         onChange={(el) => handleChange(el)}
//         multiple
//       >
//         <div className="relative mt-1">
//           <Listbox.Button className="relative w-full cursor-default rounded bg-white pl-3 pr-10 text-left px-3 py-2.5 2xl:py-3 border border-gray-300 sm:text-sm">
//             <span className="block truncate">
//               {utilisateursSelectionnes?.map((user) => user.nom).join(", ")}
//             </span>
//             <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
//               <BsChevronExpand
//                 className="h-5 w-5 text-gray-400"
//                 aria-hidden="true"
//               />
//             </span>
//           </Listbox.Button>
//           <Transition
//             as={Fragment}
//             leave="transition ease-in duration-100"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black focus:outline-none sm:text-sm">
//               {data?.map((user, index) => (
//                 <Listbox.Option
//                   key={index}
//                   className={({ active }) =>
//                     `relative cursor-default select-none py-2 pl-10 pr-4. ${
//                       active ? "bg-amber-100 text-amber-900" : "text-gray-900"
//                     }`
//                   }
//                   value={user}
//                 >
//                   {({ selected }) => (
//                     <>
//                       <div
//                         className={clsx(
//                           "flex items-center gap-2 truncate",
//                           selected ? "font-medium" : "font-normal"
//                         )}
//                       >
//                         <div className="w-6 h-6 rounded-full text-white flex items-center justify-center bg-violet-600">
//                           <span className="text-center text-[10px]">
//                             {getInitials(user.nom)}
//                           </span>
//                         </div>
//                         <span>{user.nom}</span>
//                       </div>
//                       {selected ? (
//                         <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
//                           <MdCheck className="h-5 w-5" aria-hidden="true" />
//                         </span>
//                       ) : null}
//                     </>
//                   )}
//                 </Listbox.Option>
//               ))}
//             </Listbox.Options>
//           </Transition>
//         </div>
//       </Listbox>
//     </div>
//   );
// };

// export default ListeUtilisateur;
import React from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { BsChevronExpand } from "react-icons/bs";
import { MdCheck } from "react-icons/md";
import clsx from "clsx";
import { getInitials } from "../../utils";
import { useGetEquipeListeQuery } from "../../redux/slices/api/userApiSlice";

const ListeUtilisateur = ({ setTeam, team }) => {
  const { data, isLoading, isError } = useGetEquipeListeQuery();
  const [utilisateursSelectionnes, setUtilisateursSelectionnes] = useState([]);

  const handleChange = (el) => {
    if (el) {
      setUtilisateursSelectionnes(el);
      setTeam(el.map((u) => u._id));
    }
  };

  useEffect(() => {
    if (data) {
      if (!team || team.length < 1) {
        setUtilisateursSelectionnes([data[0]]);
      } else {
        const selectedUsers = data.filter(user => team.includes(user._id));
        setUtilisateursSelectionnes(selectedUsers);
      }
    }
  }, [data, team]);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (isError) {
    return <div>Erreur lors du chargement des données</div>;
  }

  return (
    <div>
      <p className="text-gray-700">Assigner la tâche à:</p>
      <Listbox
        value={utilisateursSelectionnes}
        onChange={handleChange}
        multiple
      >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded bg-white pl-3 pr-10 text-left px-3 py-2.5 2xl:py-3 border border-gray-300 sm:text-sm">
            <span className="block truncate">
              {utilisateursSelectionnes?.length > 0
                ? utilisateursSelectionnes.map((user) => user?.nom).join(", ")
                : "Aucun utilisateur sélectionné"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <BsChevronExpand
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black focus:outline-none sm:text-sm">
              {data?.map((user, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={user}
                >
                  {({ selected }) => (
                    <>
                      <div
                        className={clsx(
                          "flex items-center gap-2 truncate",
                          selected ? "font-medium" : "font-normal"
                        )}
                      >
                        <div className="w-6 h-6 rounded-full text-white flex items-center justify-center bg-violet-600">
                          <span className="text-center text-[10px]">
                            {user?.nom ? getInitials(user.nom) : ""}
                          </span>
                        </div>
                        <span>{user?.nom}</span>
                      </div>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <MdCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default ListeUtilisateur;