import clsx from "clsx";
import React, { useState } from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import {
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdKeyboardDoubleArrowUp,
  MdAttachFile,
} from "react-icons/md";
import { toast } from "sonner";
import {
  tache_type,
  stylesprioritetaches,
  dateFormater,
  backgrounds,
} from "../../utils";
import InfosUtilisateurs from "../InfosUtilisateurs";
import AjouterTache from "./AjouterTache";
import Bouton from "../Bouton";
import ConfirmationDialog from "../DialogsViewList";
import { useTachesSupprimeesMutation } from "../../redux/slices/api/tacheApiSlice";
const icones = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Table = ({ taches }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [tachesSupprimees] = useTachesSupprimeesMutation();

  const deleteClicks = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editTaskHandler = (el) => {
    setSelected(el);
    setOpenEdit(true);
  };

  const deleteHandler = async () => {
    try {
      const result = await tachesSupprimees({
        id: selected,
        isTrash: "trash",
      }).unwrap();
      toast.success(result?.message);
      setTimeout(() => {
        serOpenDialog(false);
        window.location.reload();
      }, 500);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || err.error);
    }
  };

  const TableEntete = () => (
    <thead className="w-full border-b border-gray-300">
      <tr className="w-full text-black text-left">
        <th className="py-2">Titre de tâche</th>
        <th className="py-2">Priorité</th>
        <th className="py-2">Créée le</th>
        <th className="py-2">Atouts</th>
        <th className="py-2">Equipe</th>
      </tr>
    </thead>
  );

  const TableLigne = ({ tache }) => (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-300/10">
      <td className="py-2">
        <div className="flex items-center gap-2">
          <div
            className={clsx("w-4 h-4 rounded-full", tache_type[tache.phase])}
          />
          <p className="w-full line-clamp-2 text-base text-black">
            {tache?.titre}
          </p>
        </div>
      </td>
      <td className="py-2">
        <div className="flex gap-1 items-center">
          <span
            className={clsx("text-lg", stylesprioritetaches[tache?.priorite])}
          >
            {icones[tache?.priorite]}
          </span>
          <span className="capitalize line-clamp-1">
            Priorité {tache?.priorite}
          </span>
        </div>
      </td>
      <td className="py-2">
        <span className="text-sm text-gray-600">
          {dateFormater(new Date(tache?.date))}
        </span>
      </td>
      <td className="py-2">
        <div className="flex items-center gap-3">
          <div className="flex gap-1 items-center text-sm text-gray-600">
            <BiMessageAltDetail />
            <span>{tache?.activites?.length}</span>
          </div>
          <div className="flex gap-1 items-center text-sm text-gray-600">
            <MdAttachFile />
            <span>{tache?.atouts?.length}</span>
          </div>
          <div className="flex gap-1 items-center text-sm text-gray-600">
            <FaList />
            <span>0/{tache?.atouts?.length}</span>
          </div>
        </div>
      </td>
      <td className="py-2">
        <div className="flex">
          {tache?.equipe?.map((membre, index) => (
            <div
              key={membre._id}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                backgrounds[index % backgrounds?.length]
              )}
            >
              <InfosUtilisateurs user={membre} />
            </div>
          ))}
        </div>
      </td>
      <td className="py-2 flex gap-2 md:gap-4 justify-end">
        <Bouton
          className="text-blue-600 hover:text-blue-500 sm:px-0 text-sm md:text-base"
          label="Modifier"
          type="button"
          onClick={() => editTaskHandler(tache)}
        />
        <Bouton
          className="text-red-700 hover:text-red-500 sm:px-0 text-sm md:text-base"
          label="Supprimer"
          type="button"
          onClick={() => deleteClicks(tache._id)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className="bg-white px-2 md:px-4 pt-4 pb-9 shadow-md rounded">
        <div className="overflow-x-auto">
          <table className="w-full">
            <TableEntete />
            <tbody>
              {taches.map((tache, index) => (
                <TableLigne key={index} tache={tache} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
      <AjouterTache
        open={openEdit}
        setOpen={setOpenEdit}
        tache={selected}
        key={new Date().getTime()}
      />
    </>
  );
};

export default Table;
