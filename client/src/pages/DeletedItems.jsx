import React, { useState } from "react";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdDelete,
  MdOutlineRestore,
} from "react-icons/md";
import clsx from "clsx";
import Titre from "../components/Titre";
import Bouton from "../components/Bouton";
import { tasks } from "../assets/data";
import { tache_type, stylesprioritetaches } from "../utils";
import AjouterUtilisateur from "../components/AjouterUtilisateur";
import ConfirmationDialog from "../components/DialogsViewList";

const icones = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const DeletedItems = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState("delete");
  const [selected, setSelected] = useState("");

  const deleteAllClick = () => {
    setType("deleteAll");
    setMsg("Voulez-vous supprimer tous les éléments de façon permanente?");
    setOpenDialog(true);
  };

  const restoreAllClick = () => {
    setType("restoreAll");
    setMsg("Voulez-vous restaurer tous les éléments dans la corbeille?");
    setOpenDialog(true);
  };

  const deleteClick = (id) => {
    setType("delete");
    setSelected(id);
    setOpenDialog(true);
  };

  const restoreClick = (id) => {
    setSelected(id);
    setType("restore");
    setMsg("Voulez-vous restaurer l’élément sélectionné?");
    setOpenDialog(true);
  };

  const TableEntete = () => (
    <thead className="border-b border-gray-300">
      <tr className="text-black text-left">
        <th className="py-2">Titre de tâche</th>
        <th className="py-2">Priorité</th>
        <th className="py-2">Stage</th>
        <th className="py-2 line-clamp-1">Modifiée le</th>
      </tr>
    </thead>
  );

  const TableLigne = ({ item }) => (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
      <td className="py-2">
        <div className="flex items-center gap-2">
          <div
            className={clsx("w-4 h-4 rounded-full", tache_type[item.stage])}
          />
          <p className="w-full line-clamp-2 text-base text-black">
            {item?.title}
          </p>
        </div>
      </td>
      <td className="py-2 capitalize">
        <div className={"flex gap-1 items-center"}>
          <span
            className={clsx("text-lg", stylesprioritetaches[item?.priority])}
          >
            {icones[item?.priority]}
          </span>
          <span className="">{item?.priority}</span>
        </div>
      </td>
      <td className="py-2 capitalize text-center md:text-start">
        {item?.stage}
      </td>
      <td className="py-2 text-sm">{new Date(item?.date).toDateString()}</td>
      <td className="py-2 flex gap-1 justify-end">
        <Bouton
          icon={
            <MdOutlineRestore
              className="text-xl text-gray-500"
              onClick={() => restoreClick(item._id)}
            />
          }
        />
        <Bouton
          icon={<MdDelete className="text-xl text-red-600" />}
          onClick={() => deleteClick(item._id)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className="w-full md:px-1 px-0 mb-6">
        <div className="flex items-center justify-between mb-8">
          <Titre title="Tâches supprimées" />
          <div className="flex gap-2 md:gap-4 items-center">
            <Bouton
              label="Restorer tous"
              icon={<MdOutlineRestore className="text-lg hidden md:flex" />}
              className="flex flex-row-reverse gap-1 items-center text-black text-sm md:text-base rounded-md 2xl:py-2.5"
              onClick={() => restoreAllClick()}
            />
            <Bouton
              label="Supprimer tous"
              icon={<MdDelete className="text-lg hidden md:flex" />}
              className="flex flex-row-reverse gap-1 items-center text-red-600 text-sm md:text-base rounded-md 2xl:py-2.5"
              onClick={() => deleteAllClick()}
            />
          </div>
        </div>
        <div className="bg-white px-2 md:px-6 py-4 shadow-md rounded">
          <div className="overflow-x-auto">
            <table className="w-full mb-5">
              <TableEntete />
              <tbody>
                {tasks?.map((tk, id) => (
                  <TableLigne key={id} item={tk} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <AjouterUtilisateur open={open} setOpen={setOpen} /> */}
      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        msg={msg}
        setMsg={setMsg}
        type={type}
        setType={setType}
        onClick={() => deleteRestoreHandler()}
      />
    </>
  );
};

export default DeletedItems;
