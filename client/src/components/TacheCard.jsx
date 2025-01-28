import React from "react";
import {
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdKeyboardDoubleArrowUp,
  MdAttachFile,
} from "react-icons/md";
import { FaList } from "react-icons/fa";
import { BsCircle, BsCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  dateFormater,
} from "../utils";
import DialogueTache from "./Tache/DialogueTache";

const icones = {
  elevée: <MdKeyboardDoubleArrowUp />,
  moyenne: <MdKeyboardArrowUp />,
  faible: <MdKeyboardArrowDown />,
};

const getPriorityClass = (priorite) => {
  return priorite.toLowerCase() === 'elevée'
    ? 'bg-red-100 text-red-800'
    : (priorite.toLowerCase() === 'faible'
      ? 'bg-green-100 text-green-800'
      : 'bg-orange-100 text-orange-800');
};

const TacheCard = ({ tache }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/tache/${tache._id}`);
  };
  const renderPhaseCircles = () => {
    const phases = ['à faire', 'en cours', 'terminée'];
    const currentPhase = tache?.phase?.toLowerCase();
  
    const getPhaseColor = (phase) => {
      switch(phase) {
        case 'à faire':
          return 'text-blue-500';
        case 'en cours':
          return 'text-orange-500';
        case 'terminée':
          return 'text-green-500';
        default:
          return 'text-gray-400';
      }
    };
  
    return phases.map((phase, index) => (
      <div key={phase} className="flex items-center">
        {phase === currentPhase ? (
          <BsCircleFill className={`${getPhaseColor(currentPhase)} w-3 h-3`} />
        ) : (
          <BsCircle className="text-gray-400 w-3 h-3" />
        )}
        {index < phases.length - 1 && (
          <div className="w-4 h-0.5 bg-gray-300" />
        )}
      </div>
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 cursor-pointer" onClick={handleCardClick}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <span className={`px-2 py-1 rounded-full text-sm flex items-center gap-1 ${getPriorityClass(tache?.priorite)}`}>
            {icones[tache?.priorite.toLowerCase()]}
            {tache?.priorite}
          </span>
          <div className="flex items-center">
            {renderPhaseCircles()}
          </div>
        </div>
        <DialogueTache task={tache} />
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">{tache?.titre}</h3>
        <p className="text-sm text-gray-600 mb-2">
          {dateFormater(new Date(tache?.date))}
        </p>
        <p className="text-md text-gray-700">
          Description: {tache?.description?.length > 100 ? `${tache.description.substring(0, 100)}...` : tache?.description || "No description provided"}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <FaList />
            <span>{tache?.activitees?.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <MdAttachFile />
            <span>{tache?.atouts?.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TacheCard;