import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaBug,
  FaTasks,
  FaThumbsUp,
  FaQuestionCircle,
  FaReact,
} from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineDoneAll,
  MdOutlineMessage,
  MdMail,
} from "react-icons/md";
import { TbFileTypeXml } from "react-icons/tb";
import {
  FaFilePdf,
  FaFileCsv,
  FaFileArchive,
  FaFileAlt,
  FaDatabase,
  FaJs,
  FaCss3Alt,
  FaHtml5,
  FaRProject
} from "react-icons/fa";
import { GiElephant } from "react-icons/gi";
import {
  PiMicrosoftPowerpointLogoFill,
  PiMicrosoftExcelLogoFill,
  PiMicrosoftWordLogoFill,
} from "react-icons/pi";
import { FaJava } from "react-icons/fa";
import { RxActivityLog } from "react-icons/rx";
import { toast } from "sonner";
import clsx from "clsx";
import { LuFileJson } from "react-icons/lu";
import {
  useGetSingleTaskQuery,
  usePostActivityMutation,
} from "../redux/slices/api/tacheApiSlice";
import Tableaux from "../components/Tableaux";
import { stylesprioritetaches, getInitials } from "../utils";
import { TbBrandPython } from "react-icons/tb";
import { uploadFiles } from "../utils/supabaseClient";

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

// Correction principale : Changer la définition des icônes pour les rendre directement rendables
const TASK_TYPE_ICONS = {
  "Affectée": (
    <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white">
      <FaQuestionCircle size={24} />
    </div>
  ),
  "Commencée": (
    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
      <FaThumbsUp size={20} />
    </div>
  ),
  "En cours": (
    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-violet-600 text-white">
      <GrInProgress size={16} />
    </div>
  ),
  "Bug": (
    <div className="text-red-600">
      <FaBug size={24} />
    </div>
  ),
  "Terminée": (
    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white">
      <MdOutlineDoneAll size={24} />
    </div>
  ),
  "Commentée": (
    <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white">
      <MdOutlineMessage size={24} />
    </div>
  ),
};

const FileTypeIcons = {
  pdf: <FaFilePdf className="text-red-600" size={24} />,
  doc: <PiMicrosoftWordLogoFill className="text-blue-600" size={24} />,
  docx: <PiMicrosoftWordLogoFill className="text-blue-600" size={24} />,
  xls: <PiMicrosoftExcelLogoFill className="text-green-600" size={24} />,
  xlsx: <PiMicrosoftExcelLogoFill className="text-green-600" size={24} />,
  ppt: <PiMicrosoftPowerpointLogoFill className="text-orange-600" size={24} />,
  pptx: <PiMicrosoftPowerpointLogoFill className="text-orange-600" size={24} />,
  sql: <FaDatabase className="text-red-400" size={24} />,
  json: <LuFileJson className="text-yellow-300" size={24} />,
  csv: <FaFileCsv className="text-green-600" size={24} />,
  html: <FaHtml5 className="text-orange-600" size={24} />,
  css: <FaCss3Alt className="text-blue-600" size={26} />,
  js: <FaJs className="text-yellow-300 border-none" size={26} />,
  xml: <TbFileTypeXml className="text-orange-300 border-none" size={26} />,
  java: <FaJava className="text-red-600 border-none" size={26} />,
  php: <GiElephant className="text-purple-600 border-none" size={26} />,
  jsx: <FaReact className="text-blue-400 border-none" size={26} />,
  py: <TbBrandPython className="text-blue-500 border-none" size={26} />,
  r: <FaRProject className="text-blue-500 border-none" size={26} />,
  zip: <FaFileArchive className="text-yellow-600" size={24} />,
  rar: <FaFileArchive className="text-yellow-600" size={24} />,
  "7z": <FaFileArchive className="text-yellow-600" size={24} />,
  default: <FaFileAlt className="text-gray-500" size={24} />,
};

const FileDisplay = ({ file }) => {
  const isImage = (url) => {
    const extensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];
    return extensions.some((ext) => url.toLowerCase().endsWith(ext));
  };

  const getFileExtension = (url) => {
    try {
      const fileName = url.split("/").pop();
      const cleanFileName = fileName.split("-").slice(1).join("-");
      const extension = cleanFileName.split(".").pop().toLowerCase();
      return extension;
    } catch (error) {
      return "default";
    }
  };

  const getFileName = (url) => {
    try {
      const fileName = url.split("/").pop();
      const cleanFileName = fileName.split("-").slice(1).join("-");
      return cleanFileName.length > 30
        ? cleanFileName.substring(0, 30) + "..."
        : cleanFileName;
    } catch (error) {
      return "File";
    }
  };

  if (!file?.url) {
    return null;
  }
  const fileExtension = getFileExtension(file.url);
  const FileIcon = FileTypeIcons[fileExtension] || FileTypeIcons["default"];

  if (isImage(file.url)) {
    return (
      <a
        href={file.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
        style={{ height: "75px" }}
      >
        <div className="flex items-center gap-3">
          <img
            src={file.url}
            alt={getFileName(file.url)}
            className="w-12 h-12 object-cover rounded"
          />
          <div>
            <p className="font-medium text-gray-900">{getFileName(file.url)}</p>
            <p className="text-sm text-gray-500">Cliquez pour afficher</p>
          </div>
        </div>
      </a>
    );
  } else {
    return (
      <a
        href={file.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
        style={{ height: "75px" }}
      >
        <div className="flex items-center gap-3">
          <div className="bg-gray-50 p-2 rounded">{FileIcon}</div>
          <div>
            <p className="font-medium text-gray-900">{getFileName(file.url)}</p>
            <p className="text-sm text-gray-500">Click to download</p>
          </div>
        </div>
      </a>
    );
  }
};

const ActivityCard = ({ activity }) => {
  const getTypeColor = (type) => {
    const colors = {
      Affectée: "bg-blue-100 text-blue-800",
      Commencée: "bg-yellow-100 text-yellow-800",
      "En cours": "bg-purple-100 text-purple-800",
      Bug: "bg-red-100 text-red-800",
      Terminée: "bg-green-100 text-green-800",
      Commentée: "bg-gray-100 text-gray-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  const typeIcon = TASK_TYPE_ICONS[activity.type];

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2">
          {typeIcon && <div className="flex-shrink-0">{typeIcon}</div>}
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(
              activity.type
            )}`}
          >
            {activity.type}
          </span>
          <span className="text-gray-500 text-sm">
            {activity.date && new Date(activity.date).toLocaleDateString("fr-FR")}
          </span>
        </div>
      </div>

      <p className="text-gray-700 whitespace-pre-wrap">{activity.activite}</p>

      {activity.atouts && activity.atouts.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Fichiers joints :
          </p>
          <div className="grid grid-cols-2 gap-4">
            {activity.atouts.map((atout, index) => (
              <FileDisplay key={index} file={atout} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Activites = ({ activite = [], id, refetchActivities }) => {
  const [selected, setSelected] = useState("Affectée");
  const [text, setText] = useState("");
  const [activities, setActivities] = useState([]);
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [postActivity, { isLoading }] = usePostActivityMutation();

  useEffect(() => {
    if (activite?.length) {
      setActivities(activite);
    }
  }, [activite]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleSubmit = async () => {
    if (!text.trim()) {
      toast.error("Veuillez entrer une description de l'activité");
      return;
    }

    setIsUploading(true);
    try {
      let uploadedFiles = [];
      if (files.length > 0) {
        uploadedFiles = await uploadFiles(files);
      }

      const result = await postActivity({
        id,
        activity: {
          type: selected,
          activite: text.trim(),
          atouts: uploadedFiles,
        },
      }).unwrap();

      if (result?.newActivity) {
        setActivities((prev) => [...prev, result.newActivity]);
        setText("");
        setFiles([]);
        toast.success("Activité ajoutée avec succès!");

        if (refetchActivities) {
          refetchActivities();
        }
      }
    } catch (error) {
      console.error("Error details:", error);
      toast.error(error?.data?.message || "Échec de l'ajout de l'activité");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full flex gap-10 2xl:gap-20 min-h-screen px-10 py-8 bg-white shadow rounded-md justify-between overflow-y-auto">
      <div className="w-2/3 space-y-6">
        {activities.length > 0 ? (
          activities.map((item, index) => (
            <ActivityCard key={index} activity={item} />
          ))
        ) : (
          <p className="text-gray-500">
            Aucune activité n'a été trouvée pour cette tâche
          </p>
        )}
      </div>

      <div className="w-1/3 bg-gray-100 p-6 rounded-md shadow space-y-6">
        <h3 className="text-lg font-semibold">Ajouter une activité</h3>
        <div className="flex flex-col space-y-4">
          <select
            className="p-2 border rounded focus:outline-none"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {Object.keys(TASK_TYPE_ICONS).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <textarea
            className="p-2 border rounded focus:outline-none min-h-[100px]"
            placeholder="Décrire cette activité..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="space-y-2">
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full p-2 border rounded focus:outline-none"
            />
            {files.length > 0 && (
              <div className="text-sm text-gray-600">
                {files.length} fichier(s) sélectionné(s)
              </div>
            )}
          </div>
          <button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            onClick={handleSubmit}
            disabled={isLoading || isUploading || !text.trim()}
          >
            {isLoading || isUploading
              ? "Ajout en cours..."
              : "Ajouter une activité"}
          </button>
        </div>
      </div>
    </div>
  );
};

const DetailsTaches = () => {
  const { id } = useParams();
  const [selected, setSelected] = useState(0);
  const { data, isLoading, refetch } = useGetSingleTaskQuery(id);
  const tache = data?.tache;

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
      <div className="border-b border-gray-200 p-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            {tache?.titre}
          </h1>
          <div
            className={clsx(
              "px-3 py-1 rounded-full text-sm",
              stylesprioritetaches[tache?.priorite],
              bgColor[tache?.priorite]
            )}
          >
            {ICONS[tache?.priorite]} Priorité {tache?.priorite}
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
            <MdMail />
          </div>
          <div>
            <div className="text-sm text-gray-600">
              Créée le {new Date(tache?.date).toLocaleDateString("fr-FR")}
            </div>
            <div className="text-sm flex text-gray-500">
              {tache?.equipe
                ?.map((membre) => membre?.nom)
                .filter(Boolean)
                .join(", ")}
            </div>
          </div>
        </div>
      </div>

      <Tableaux tableaux={TABS} setSelected={setSelected}>
        {[
          <div className="p-6" />,
          <Activites
            activite={tache?.activitees}
            id={id}
            refetchActivities={refetch}
          />,
        ]}
      </Tableaux>

      <div className="p-6 -mt-20">
        {tache?.atouts?.length > 0 && (
          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {tache?.atouts?.map((atout, index) => (
                <FileDisplay
                  key={index}
                  file={atout}
                />
              ))}
            </div>
          </div>
        )}
        {tache?.atouts?.length > 0 && (
          <div className="border-b pb-6 border-gray-200 flex items-center gap-2 text-blue-600 text-sm mb-10 mt-3">
            <span className="text-base">📎</span>
            <span>{tache?.atouts?.length} pièces jointes</span>
          </div>
        )}
        
        <div className="mb-8 text-gray-700 text-justify">
          {tache?.description}
        </div>

        <div className="border-t border-gray-200 mt-8 pt-4">
          <h3 className="text-sm font-semibold mb-4">Équipe</h3>
          <div className="grid gap-4">
            {tache?.equipe?.map((membre, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
                  {getInitials(membre?.nom)}
                </div>
                <div>
                  <div className="font-medium">{membre?.nom}</div>
                  <div className="text-sm text-gray-500">{membre?.titre}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsTaches;