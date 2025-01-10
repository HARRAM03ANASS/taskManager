import clsx from "clsx";
import moment from "moment";
import React, { useState } from "react";
import { FaBug, FaTasks, FaThumbsUp, FaUser } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineDoneAll,
  MdOutlineMessage,
  MdTaskAlt,
} from "react-icons/md";
import { RxActivityLog } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { tasks } from "../assets/data";
import Tableaux from "../components/Tableaux";
import { tache_type, stylesprioritetaches, getInitials } from "../utils";
import Loading from "../components/Loader";
import Bouton from "../components/Bouton";
import { use } from "react";
import { useGetSingleTaskQuery } from "../redux/slices/api/tacheApiSlice";

const atouts = [
  "https://images.pexels.com/photos/2418664/pexels-photo-2418664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/8797307/pexels-photo-8797307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/2534523/pexels-photo-2534523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/804049/pexels-photo-804049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

const ICONS = {
  eleve: <MdKeyboardDoubleArrowUp />,
  moyenne: <MdKeyboardArrowUp />,
  faible: <MdKeyboardArrowDown />,
};

const bgColor = {
  eleve: "bg-red-200",
  moyenne: "bg-yellow-200",
  faible: "bg-blue-200",
};

const TABS = [
  { title: "Détails de la tâche", icon: <FaTasks /> },
  { title: "Activités / Calendrier", icon: <RxActivityLog /> },
];

const TASKTYPEICON = {
  commented: (
    <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white">
      <MdOutlineMessage />,
    </div>
  ),
  started: (
    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
      <FaThumbsUp size={20} />
    </div>
  ),
  assigned: (
    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white">
      <FaUser size={14} />
    </div>
  ),
  bug: (
    <div className="text-red-600">
      <FaBug size={24} />
    </div>
  ),
  termine: (
    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white">
      <MdOutlineDoneAll size={24} />
    </div>
  ),
  "in progress": (
    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-violet-600 text-white">
      <GrInProgress size={16} />
    </div>
  ),
};

const act_types = [
  "Affectée",
  "Commencée",
  "En cours",
  "Bug",
  "Terminée",
  "Commentée",
];

const DetailsTaches = () => {
  const { id } = useParams();
  const [selected, setSelected] = useState(0);
  const { data, isLoading } = useGetSingleTaskQuery(id);
  console.log(data);
  console.log(data?.tache?.atouts);

  const tache = data?.tache;

  return (
    <div className="w-full flex flex-col gap-3 mb-4 overflow-y-hidden">
      <h1 className="text-2xl text-gray-600 font-bold">{tache?.titre}</h1>
      <Tableaux tableaux={TABS} setSelected={setSelected}>
        {/* Pass the content for each tab */}
        {[
          <div className="w-full flex flex-col md:flex-row gap-5 2xl:gap-8 bg-white shadow-md p-8 overflow-y-auto">
            {/* Gauche */}
            <div className="w-full md:w-1/2 space-y-8">
              <div className="flex items-center gap-5">
                <div
                  className={clsx(
                    "flex gap-1 items-center text-base font-semibold px-3 py-1 rounded-full",
                    stylesprioritetaches[tache?.priorite],
                    bgColor[tache?.priorite]
                  )}
                >
                  <span className="text-lg">{ICONS[tache?.priorite]}</span>
                  <span className="uppercase">Priorité {tache?.priorite}</span>
                </div>
                <div className={clsx("flex items-center gap-2")}>
                  <div
                    className={clsx(
                      "w-4 h-4 rounded-full",
                      // tache_type[tache.titre]
                    )}
                  />
                  <span className="text-black uppercase">{tache?.titre}</span>
                </div>
              </div>
              <p className="text-gray-500">
                Créée le : {new Date(tache?.date).toDateString()}
              </p>
              <div className="flex items-center gap-8 p-4 border-y border-gray-200">
                <div className="space-x-2">
                  <span className="font-semibold">Atouts :</span>
                  <span>{tache?.atouts?.length}</span>
                </div>
                <span className="text-gray-400">|</span>
                <div className="space-x-2">
                  <span className="font-semibold">Sous-tâches :</span>
                  <span>{tache?.sousTaches?.length}</span>
                </div>
              </div>
              <div className="space-y-4 py-6">
                <p className="text-gray-600 font-semibold text-sm">
                  Equipe de la tâche
                </p>
                <div className="space-y-3">
                  {tache?.equipe?.map((membre, index) => (
                    <div
                      key={index}
                      className="flex gap-4 py-2 items-center border-t border-gray-200"
                    >
                      <div
                        className={
                          "w-10 h-10 rounded-full text-white flex items-center justify-center text-sm -mr-1 bg-blue-600"
                        }
                      >
                        <span className="text-center">
                          {getInitials(membre?.nom)}
                        </span>
                      </div>
                      <div>
                        <p className="text-lg font-semibold">{membre?.nom}</p>
                        <span className="text-gray-500">{membre?.titre}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4 py-6">
                <p className="text-gray-500 font-semibold text-sm">
                  Sous tâches
                </p>
                <div className="space-y-8">
                  {tache?.sousTaches?.map((element, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-violet-50">
                        <MdTaskAlt className="text-violet-600" size={26} />
                      </div>
                      <div className="space-y-1">
                        <div className="flex gap-2 items-center">
                          <span className="text-sm text-gray-500">
                            {new Date(element?.date).toDateString()}
                          </span>
                          <span className="px-2 py-0.5 text-center text-sm rounded-full bg-violet-100 text-violet-700 font-semibold">
                            {element?.tag}
                          </span>
                        </div>
                        <p className="text-gray-700">{element?.titre}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Droite */}
            <div className="w-full md:w-1/2 space-y-8">
              <p className="text-lg font-semibold">Atouts</p>
              <div className="w-full grid grid-cols-2 gap-4">
                {tache?.atouts?.map((element, index) => (
                  <img
                    key={index}
                    src={element}
                    alt={tache?.titre}
                    className="w-full rounded h-28 md:h-36 2xl:h-52 cursor-pointer transition-all duration-700 hover:scale-125 hover:z-50"
                  />
                ))}
              </div>
            </div>
          </div>,
          <Activites activite={tache?.activites} id={id} />,
        ]}
      </Tableaux>
    </div>
  );
};

const Activites = ({ activite, id }) => {
  const [selected, setSelected] = useState(act_types[0]);
  const [text, setText] = useState("");
  const isLoading = false;
  const handleSubmit = async () => {};

  const Card = ({ item }) => {
    return (
      <div className="flex space-x-4">
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="w-10 h-10 flex items-center justify-center">
            {TASKTYPEICON[item?.type]}
          </div>
          <div className="w-full flex items-center">
            <div className="w-0.5 bg-gray-300 h-full" />
          </div>
        </div>

        <div className="flex flex-col gap-y-1 mb-8">
          <p className="font-semibold">{item?.by?.name}</p>
          <div className="text-gray-500 space-y-2">
            <span className="capitalize">{item?.type}</span>
            <span className="text-sm">{moment(item?.date).fromNow()}</span>
          </div>
          <div className="text-gray-700">{item?.activity}</div>
        </div>
      </div>
    );
  };
  return (
    <div className="w-full flex gap-10 2xl:gap-20 min-h-screen px-10 py-8 bg-white shadow rounded-md justify-between overflow-y-auto">
      <div className="w-full md:w-1/2">
        <h4 className="text-gray-600 font-semibold text-lg mb-5">Activités</h4>
        <div className="w-full">
          {activite?.map((element, index) => (
            <Card
              key={index}
              item={element}
              isConnected={index < activite.length - 1}
            />
          ))}
        </div>
      </div>
      <div className="w-full md:w-1/3">
        <h4 className="text-gray-600 font-semibold text-lg mb-5">
          Ajouter une activité
        </h4>
        <div className="w-full flex flex-wrap gap-5">
          {act_types.map((item, index) => (
            <div key={item} className="flex gap-2 items-center">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={selected === item ? true : false}
                onChange={(e) => setSelected(item)}
              />
              <p>{item}</p>
            </div>
          ))}
          <textarea
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Décrire votre tâche ici ..."
            className="bg-white w-full mt-10 border border-gray-300 outline-none p-4 rounded-md focus:ring-2 ring-blue-500"
          ></textarea>
          {isLoading ? (
            <Loading />
          ) : (
            <Bouton
              type="button"
              label="Envoyer"
              onClick={handleSubmit}
              className="bg-blue-500 text-white rounded"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsTaches;
