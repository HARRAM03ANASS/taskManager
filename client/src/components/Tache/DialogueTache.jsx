// import React, { Fragment, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AiTwotoneFolderOpen } from "react-icons/ai";
// import { MdAdd, MdOutlineEdit } from "react-icons/md";
// import { HiDuplicate } from "react-icons/hi";
// import { Menu, Transition } from "@headlessui/react";
// import { BsThreeDots } from "react-icons/bs";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import AjouterTache from "./AjouterTache";
// import ConfirmationDialog from "../DialogsViewList";
// import {
//   useDupliquerTacheMutation,
//   useTachesSupprimeesMutation,
// } from "../../redux/slices/api/tacheApiSlice";
// import { toast } from "sonner";
// const handleMenuClick = (e, onClick) => {
//   e.stopPropagation(); // Prevents the parent onClick from being triggered
//   onClick(); // Execute the provided onClick function
// };
// const DialogueTache = ({ task = {} }) => {
//   const [open, setOpen] = useState(false);
//   const [openEdit, setOpenEdit] = useState(false);
//   const [openDialog, setOpenDialog] = useState(false);
//   const navigate = useNavigate();
//   const [tachesSupprimees] = useTachesSupprimeesMutation();
//   const [dupliquerTache] = useDupliquerTacheMutation();
//   const duplicateHandler = async () => {
//     try {
//       const res = await dupliquerTache(task._id).unwrap();
//       toast.success(res?.message);
//       setTimeout(() => {
//         setOpenDialog(false);
//         window.location.reload();
//       }, 500);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const deleteClicks = () => {
    
//     setOpenDialog(true);
//   };
//   const deleteHandler = async () => {
//     try {
//       const res = await tachesSupprimees({id:task._id}).unwrap();
      
//       toast.success(res?.message);
//       setTimeout(() => {
//         setOpenDialog(false);
//         window.location.reload();
//       }, 500);
//     } catch (error) {
//       console.log(error);
//       toast.error(error?.data?.message || error.error);
//     }
//   };

//   const items = [
//     {
//       label: "Ouvrir la tâche",
//       icon: <AiTwotoneFolderOpen className="mr-2 h-5 w-5" aria-hidden="true" />,
//       onClick: () => navigate(`/tache/${task._id}`),
//     },

//     {
//       label: "Modifier",
//       icon: <MdOutlineEdit className="mr-2 h-5 w-5" aria-hidden="true" />,
//       onClick: () => setOpenEdit(true),
//     },
//     {
//       label: "Dupliquer",
//       icon: <HiDuplicate className="mr-2 h-5 w-5" aria-hidden="true" />,
//       onClick: () => duplicateHandler(),
//     },
//   ];

//   return (
//     <>
//       <div>
//         <Menu as="div" className="relative inline-block text-left">
//           <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-600"
//           onClick={(e) => e.stopPropagation()}>
//             <BsThreeDots />
//           </Menu.Button>
//           <Transition
//             as={Fragment}
//             enter="transition ease-out duration-100"
//             enterFrom="transform opacity-0 scal-95"
//             enterTo="transform opacity-100 scale-100"
//             leave="transition ease-in duration-75"
//             leaveFrom="transform opacity-100 scale-100"
//             leaveTo="transform opacity-0 scale-95"
//           >
//             <Menu.Items className="absolute p-4 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
//               <div className="px-1 py-1 space-y-2">
//                 {items.map((el) => (
//                   <Menu.Item key={el.label}>
//                     {({ active }) => (
//                       <button
//                         onClick={(e)=>handleMenuClick(e,el?.onClick)}
//                         className={`${
//                           active ? "bg-blue-500 text-white" : "text-gray-900"
//                         } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                       >
//                         {el.icon}
//                         {el.label}
//                       </button>
//                     )}
//                   </Menu.Item>
//                 ))}
//               </div>
//               <div className="px-1 py-1">
//               <Menu.Item>
//                 {({ active }) => (
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation(); // Stop the click event propagation
//                       deleteClicks();
//                     }}
//                     className={`${
//                       active ? "bg-blue-500 text-white" : "text-red-900"
//                     } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                   >
//                     <RiDeleteBin6Line
//                       className="mr-2 h-5 w-5 text-red-400"
//                       aria-hidden="true"
//                     />
//                     Supprimer
//                   </button>
//                 )}
//               </Menu.Item>

//               </div>
//             </Menu.Items>
//           </Transition>
//         </Menu>
//       </div>
//       <AjouterTache
//         open={openEdit}
//         setOpen={setOpenEdit}
//         tache={task}
//         key={new Date().getTime()}
//       />
//       <ConfirmationDialog
//         open={openDialog}
//         setOpen={setOpenDialog}
//         onClick={deleteHandler}
//       />
//     </>
//   );
// };

// export default DialogueTache;
import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import { HiDuplicate } from "react-icons/hi";
import { Menu, Transition } from "@headlessui/react";
import { BsThreeDots } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmationDialog from "../DialogsViewList";
import {
  useDupliquerTacheMutation,
  useTachesSupprimeesMutation,
} from "../../redux/slices/api/tacheApiSlice";
import { toast } from "sonner";

const handleMenuClick = (e, onClick) => {
  e.stopPropagation();
  onClick();
};

const DialogueTache = ({ task = {} }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const [tachesSupprimees] = useTachesSupprimeesMutation();
  const [dupliquerTache] = useDupliquerTacheMutation();

  const duplicateHandler = async () => {
    try {
      const res = await dupliquerTache(task._id).unwrap();
      toast.success(res?.message);
      setTimeout(() => {
        setOpenDialog(false);
        window.location.reload();
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteClicks = () => {
    setOpenDialog(true);
  };

  const deleteHandler = async () => {
    try {
      const res = await tachesSupprimees({id: task._id}).unwrap();
      toast.success(res?.message);
      setTimeout(() => {
        setOpenDialog(false);
        window.location.reload();
      }, 500);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  const items = [
    {
      label: "Ouvrir la tâche",
      icon: <AiTwotoneFolderOpen className="mr-2 h-5 w-5" aria-hidden="true" />,
      onClick: () => navigate(`/tache/${task._id}`),
    },
    {
      label: "Modifier",
      icon: <MdOutlineEdit className="mr-2 h-5 w-5" aria-hidden="true" />,
      onClick: () => navigate(`/modifier-tache/${task._id}`), 
    },
    {
      label: "Dupliquer",
      icon: <HiDuplicate className="mr-2 h-5 w-5" aria-hidden="true" />,
      onClick: () => duplicateHandler(),
    },
  ];

  return (
    <>
      <div>
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button 
            className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-600"
            onClick={(e) => e.stopPropagation()}
          >
            <BsThreeDots />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute p-4 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="px-1 py-1 space-y-2">
                {items.map((el) => (
                  <Menu.Item key={el.label}>
                    {({ active }) => (
                      <button
                        onClick={(e) => handleMenuClick(e, el?.onClick)}
                        className={`${
                          active ? "bg-blue-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {el.icon}
                        {el.label}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteClicks();
                      }}
                      className={`${
                        active ? "bg-blue-500 text-white" : "text-red-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <RiDeleteBin6Line
                        className="mr-2 h-5 w-5 text-red-400"
                        aria-hidden="true"
                      />
                      Supprimer
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
    </>
  );
};

export default DialogueTache;