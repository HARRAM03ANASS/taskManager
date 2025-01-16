import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useParams } from "react-router-dom";
import Loading from "../components/Loader";
import Titre from "../components/Titre";
import Bouton from "../components/Bouton";
import Tableaux from "../components/Tableaux";
import TitreTache from "../components/TitreTache";
import VoirTableau from "../components/VoirTableau";
import { useGetAllTasksQuery } from "../redux/slices/api/tacheApiSlice";
import Table from "../components/Tache/Table";
import AjouterTache from "../components/Tache/AjouterTache";

const tableaux = [
  { title: "Voir le tableau", icon: <MdGridView/>  },
  { title: "Voir la liste", icon: <FaList/> },
];

const type_taches = {
  "À faire": "bg-blue-600",
  "En cours": "bg-yellow-600",
  "Terminée": "bg-green-600",
};

const Taches = () => {
  const { status } = useParams(); // Fetch phase from URL (like "Terminée", "En cours", "À faire")
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 9;
   
  const { data, isLoading } = useGetAllTasksQuery({
    strQuery: status || "", // Default to an empty string if status is undefined
    isTrashed: "",
    search: "",
  });

  // Handle pagination only if data is available
  const totalTasks = data?.taches.length || 0;
  const totalPages = Math.ceil(totalTasks / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const currentTasks = data?.taches.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return isLoading ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Titre title={status ? `Tâches ${status}` : "Tâches"} />
        {!status && (
          <Bouton
            onClick={() => setOpen(true)}
            label="Créer une tâche"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
          />
        )}
      </div>

      <Tableaux tableaux={tableaux} setSelected={setSelected}>
        <div>
          {!status && (
            <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
              <TitreTache label="À faire" className={type_taches["À faire"]} />
              <TitreTache label="En cours" className={type_taches["En cours"]} />
              <TitreTache label="Terminée" className={type_taches["Terminée"]} />
            </div>
          )}
          <VoirTableau taches={currentTasks} />
        </div>
        <div>
          {!status && (
            <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
              <TitreTache label="À faire" className={type_taches["À faire"]} />
              <TitreTache label="En cours" className={type_taches["En cours"]} />
              <TitreTache label="Terminée" className={type_taches["Terminée"]} />
            </div>
          )}
          {selected !== 1 ? (
            <VoirTableau taches={currentTasks} />
          ) : (
            <div className="w-full">
              <Table taches={currentTasks} />
            </div>
          )}
        </div>
      </Tableaux>

      {/* Pagination Controls */}
      {totalTasks > tasksPerPage && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded-md mr-2"
          >
            Précédent
          </button>
          <span>
            Page {currentPage} sur {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded-md ml-2"
          >
            Suivant
          </button>
        </div>
      )}
      <AjouterTache open={open} setOpen={setOpen} />
    </div>
  );
};

export default Taches;
