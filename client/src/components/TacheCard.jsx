import React, { useState } from "react";
import {
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdKeyboardDoubleArrowUp,
  MdAttachFile,
} from "react-icons/md";
import { BiMessageAltDetail } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  dateFormater,
  stylesprioritetaches,
  tache_type,
  backgrounds,
} from "../utils";
import DialogueTache from "./Tache/DialogueTache";
import InfosUtilisateurs from "./InfosUtilisateurs";
import AjouterSousTache from "./Tache/AjouterSousTache";

const icones = {
  elevée: <MdKeyboardDoubleArrowUp />,
  moyenne: <MdKeyboardArrowUp />,
  faible: <MdKeyboardArrowDown />,
};

const TacheCard = ({ tache }) => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const equipes = tache?.equipe;
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCardClick = () => {
    navigate(`/tache/${tache._id}`); // Redirect to task details page using the task ID
  };

  const handleAddSousTacheClick = (event) => {
    event.stopPropagation(); // Stop the click event from propagating to the parent div
    setOpen(true); // Open the "Ajouter Sous Tache" modal
  };

  return (
    <div onClick={handleCardClick} className="w-full h-fit bg-white shadow-md p-4 rounded cursor-pointer"> {/* Make the card clickable */}
      <div className="w-full flex justify-between">
        <div
          className={clsx(
            "flex flex-1 gap-1 items-center text-sm font-medium",
            stylesprioritetaches[tache?.priorite]
          )}
        >
          <span className="text-lg">{icones[tache?.priorite]}</span>
          <span className="text-capitalize">{tache?.priorite}</span>
        </div>
        {user?.isAdmin && <DialogueTache task={tache} />}
      </div>
      <div className="flex items-center gap-2">
        <div
          className={clsx("w-4 h-4 rounded-full", tache_type[tache?.phase])}
        />
        <h4 className="line-clamp-1 text-black">{tache?.titre}</h4>
      </div>
      <span className="text-sm text-gray-600">
        {dateFormater(new Date(tache?.date))}
      </span>
      <p>
        Description: {tache?.description?.length > 100 ? `${tache.description.substring(0, 100)}...` : tache?.description || "No description provided"}
      </p>

      <div className="w-full border-t border-gray-200 my-2" />
      <div className="flex items-center justify-between mb-2">
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
            <span>{tache?.sousTaches?.length}</span>
          </div>
        </div>
        <div className="flex flex-row-reverse">
          {tache?.equipe?.map((membre, index) => (
            <div
              key={membre._id || index}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                backgrounds[index % backgrounds?.length]
              )}
            >
              <InfosUtilisateurs user={membre} />
            </div>
          ))}
        </div>
      </div>

      {/* Description sous-tâche */}
      {tache?.sousTaches?.length > 0 ? (
        <div className="py-4 border-t border-gray-200">
          <h5 className="text-base line-clamp-1 text-black">
            {tache?.sousTaches[0].titre}
          </h5>

          <div className="p-4 space-x-8">
            <span className="text-sm text-gray-600">
              {dateFormater(new Date(tache?.sousTaches[0]?.date))}
            </span>
            <span className="bg-blue-600/10 px-3 py-1 rounded-full text-blue-700 font-medium">
              {tache?.sousTaches[0].tag}
            </span>
          </div>
        </div>
      ) : (
        <div className="py-4 border-t border-gray-200">
          <span className="text-gray-500">Aucune sous tâche</span>
        </div>
      )}
      <div className="w-full pb-2">
        {
          user?.isAdmin ? (
            <button
              onClick={handleAddSousTacheClick} // Attach the click handler for the button
              disabled={user.isAdmin ? false : true}
              className="w-full flex gap-4 items-center text-sm text-gray-500 font-semibold disabled:cursor-not-allowed disabled::text-gray-300"
            >
              <IoMdAdd className="text-lg" />
              <span>Ajouter une sous-tâche</span>
            </button>
          ) : 
          <div></div>
        }
      </div>
      <AjouterSousTache open={open} setOpen={setOpen} id={tache._id} equipe={equipes} />
    </div>
  );
};

export default TacheCard;
