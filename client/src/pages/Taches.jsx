import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../redux/slices/paginationSlice";

import Loading from "../components/Loader";
import Titre from "../components/Titre";
import Bouton from "../components/Bouton";
import Tableaux from "../components/Tableaux";
import TitreTache from "../components/TitreTache";
import VoirTableau from "../components/VoirTableau";
import { useGetAllTasksQuery } from "../redux/slices/api/tacheApiSlice";
import Table from "../components/Tache/Table";

import { IoMdCloudUpload } from "react-icons/io";
// import ImportModal  from "../components/ImportModal";

// const [isImportModalOpen, setIsImportModalOpen] = useState(false);
// const handleImportTasks = async (tasks) => {
//   try {
//     // Here you would call your API to bulk create tasks
//     // Example: await createBulkTasks(tasks);
//     toast.success(`${tasks.length} tâches importées avec succès`);
//     // Refetch your tasks or update local state
//   } catch (error) {
//     toast.error('Erreur lors de l\'importation des tâches');
//     console.error('Import error:', error);
//   }
// };


const tableaux = [
  { title: "Voir le tableau", icon: <MdGridView /> },
  { title: "Voir la liste", icon: <FaList /> },
];

const type_taches = {
  "À faire": "bg-blue-600",
  "En cours": "bg-yellow-600",
  "Terminée": "bg-green-600",
};

const liens_taches = {
  "À faire": "/a-faire/À faire",
  "En cours": "/en-cours/En cours",
  "Terminée": "/termine/Terminée"
};

const TitreTacheAvecLien = ({ label, className }) => (
  <Link to={liens_taches[label]}>
    <TitreTache label={label} className={className} />
  </Link>
);

const PaginationButton = ({ onClick, disabled, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      p-3 rounded-full
      transition-all duration-200
      ${disabled 
        ? 'opacity-30 cursor-not-allowed' 
        : 'hover:bg-gray-100 active:bg-gray-200 cursor-pointer'}
      bg-white/10 backdrop-blur-sm
      border border-gray-200/20
      shadow-sm
    `}
  >
    {children}
  </button>
);

const Taches = () => {
  const { status } = useParams();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();


  // Récupérer la page actuelle depuis Redux
  const currentPage = useSelector(state => 
    state.pagination.currentPages[status || 'all'] || 1
  );

  const tasksPerPage = 4;
   
  const { data, isLoading } = useGetAllTasksQuery({
    strQuery: status || "",
    isTrashed: "",
    search: "",
  });

  const totalTasks = data?.taches.length || 0;
  const totalPages = Math.ceil(totalTasks / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const currentTasks = data?.taches.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      dispatch(setCurrentPage({ 
        status: status || 'all', 
        page 
      }));
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
            onClick={() => navigate("/ajouter-tache")}
            label="Créer une tâche"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
          />
        )}
      </div>
      {/* // Update your buttons section in the JSX:
<div className="flex items-center justify-between mb-4">
  <Titre title={status ? `Tâches ${status}` : "Tâches"} />
  {!status && (
    <div className="flex gap-2">
      <Bouton
        onClick={() => setIsImportModalOpen(true)}
        label="Importer"
        icon={<IoMdCloudUpload className="text-lg" />}
        className="flex flex-row-reverse gap-1 items-center bg-gray-600 text-white rounded-md py-2 2xl:py-2.5"
      />
      <Bouton
        onClick={() => navigate("/ajouter-tache")}
        label="Créer une tâche"
        icon={<IoMdAdd className="text-lg" />}
        className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
      />
    </div>
  )}
</div> */}
{/* <ImportModal
  isOpen={isImportModalOpen}
  onClose={() => setIsImportModalOpen(false)}
  onImport={handleImportTasks}
/> */}

      <Tableaux tableaux={tableaux} setSelected={setSelected}>
        <div>
          <VoirTableau taches={currentTasks} />
        </div>
        <div>
          {!status && (
            <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
              <TitreTacheAvecLien label="À faire" className={type_taches["À faire"]} />
              <TitreTacheAvecLien label="En cours" className={type_taches["En cours"]} />
              <TitreTacheAvecLien label="Terminée" className={type_taches["Terminée"]} />
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

      {totalTasks > tasksPerPage && (
        <div className="flex items-center justify-center gap-8 mt-2">
          <PaginationButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </PaginationButton>

          <span className="text-sm text-gray-600 font-medium">
            Page {currentPage} sur {totalPages}
          </span>

          <PaginationButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </PaginationButton>
        </div>
      )}
    </div>
  );
};

export default Taches;







// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaList } from "react-icons/fa";
// import { MdGridView } from "react-icons/md";
// import { IoMdAdd, IoMdCloudUpload } from "react-icons/io";
// import { useParams } from "react-router-dom";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { useSelector, useDispatch } from "react-redux";
// import { setCurrentPage } from "../redux/slices/paginationSlice";

// import Loading from "../components/Loader";
// import Titre from "../components/Titre";
// import Bouton from "../components/Bouton";
// import Tableaux from "../components/Tableaux";
// import TitreTache from "../components/TitreTache";
// import VoirTableau from "../components/VoirTableau";
// import { useGetAllTasksQuery } from "../redux/slices/api/tacheApiSlice";
// import Table from "../components/Tache/Table";

// // Moved constants outside the component
// const tableaux = [
//   { title: "Voir le tableau", icon: <MdGridView /> },
//   { title: "Voir la liste", icon: <FaList /> },
// ];

// const type_taches = {
//   "À faire": "bg-blue-600",
//   "En cours": "bg-yellow-600",
//   "Terminée": "bg-green-600",
// };

// const liens_taches = {
//   "À faire": "/a-faire/À faire",
//   "En cours": "/en-cours/En cours",
//   "Terminée": "/termine/Terminée"
// };

// // Separate component for title with link
// const TitreTacheAvecLien = ({ label, className }) => (
//   <Link to={liens_taches[label]}>
//     <TitreTache label={label} className={className} />
//   </Link>
// );

// // Separate component for pagination button
// const PaginationButton = ({ onClick, disabled, children }) => (
//   <button
//     onClick={onClick}
//     disabled={disabled}
//     className={`
//       p-3 rounded-full
//       transition-all duration-200
//       ${disabled 
//         ? 'opacity-30 cursor-not-allowed' 
//         : 'hover:bg-gray-100 active:bg-gray-200 cursor-pointer'}
//       bg-white/10 backdrop-blur-sm
//       border border-gray-200/20
//       shadow-sm
//     `}
//   >
//     {children}
//   </button>
// );

// // Import Modal Component
// const ImportModal = ({ isOpen, onClose, onImport }) => {
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState([]);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleFileChange = async (e) => {
//     const selectedFile = e.target.files[0];
//     if (!selectedFile) return;

//     const fileExt = selectedFile.name.split('.').pop().toLowerCase();
//     if (!['csv', 'xlsx'].includes(fileExt)) {
//       setError('Format de fichier non supporté. Utilisez CSV ou XLSX.');
//       return;
//     }

//     setFile(selectedFile);
//     setError('');
//   };

//   const handleImport = async () => {
//     if (!file) return;
//     setIsLoading(true);
//     // Here you would implement the actual import logic
//     setIsLoading(false);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg w-full max-w-2xl">
//         <div className="p-6 border-b">
//           <h2 className="text-xl font-semibold">Importer des tâches</h2>
//         </div>

//         <div className="p-6">
//           <input
//             type="file"
//             accept=".csv,.xlsx"
//             onChange={handleFileChange}
//             className="w-full p-2 border rounded"
//           />
//           {error && <p className="text-red-500 mt-2">{error}</p>}
//         </div>

//         <div className="flex justify-end gap-3 p-6 border-t">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
//           >
//             Annuler
//           </button>
//           <button
//             onClick={handleImport}
//             disabled={!file || isLoading}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
//           >
//             {isLoading ? 'Importation...' : 'Importer'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main Taches component
// const Taches = () => {
//   const { status } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [selected, setSelected] = useState(0);
//   const [isImportModalOpen, setIsImportModalOpen] = useState(false);

//   const currentPage = useSelector(state => 
//     state.pagination.currentPages[status || 'all'] || 1
//   );

//   const tasksPerPage = 4;
   
//   const { data, isLoading } = useGetAllTasksQuery({
//     strQuery: status || "",
//     isTrashed: "",
//     search: "",
//   });

//   const totalTasks = data?.taches.length || 0;
//   const totalPages = Math.ceil(totalTasks / tasksPerPage);
//   const startIndex = (currentPage - 1) * tasksPerPage;
//   const endIndex = startIndex + tasksPerPage;
//   const currentTasks = data?.taches.slice(startIndex, endIndex);

//   const handlePageChange = (page) => {
//     if (page > 0 && page <= totalPages) {
//       dispatch(setCurrentPage({ 
//         status: status || 'all', 
//         page 
//       }));
//     }
//   };

//   const handleImportTasks = (tasks) => {
//     // Implement your import logic here
//     console.log('Importing tasks:', tasks);
//   };

//   if (isLoading) {
//     return (
//       <div className="py-10">
//         <Loading />
//       </div>
//     );
//   }

//   return (
//     <div className="w-full">
//       <div className="flex items-center justify-between mb-4">
//         <Titre title={status ? `Tâches ${status}` : "Tâches"} />
//         {!status && (
//           <div className="flex gap-2">
//             <Bouton
//               onClick={() => setIsImportModalOpen(true)}
//               label="Importer"
//               icon={<IoMdCloudUpload className="text-lg" />}
//               className="flex flex-row-reverse gap-1 items-center bg-gray-600 text-white rounded-md py-2 2xl:py-2.5"
//             />
//             <Bouton
//               onClick={() => navigate("/ajouter-tache")}
//               label="Créer une tâche"
//               icon={<IoMdAdd className="text-lg" />}
//               className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
//             />
//           </div>
//         )}
//       </div>

//       <Tableaux tableaux={tableaux} setSelected={setSelected}>
//         {[
//           <div key="tableau">
//             <VoirTableau taches={currentTasks} />
//           </div>,
//           <div key="liste">
//             {!status && (
//               <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
//                 <TitreTacheAvecLien label="À faire" className={type_taches["À faire"]} />
//                 <TitreTacheAvecLien label="En cours" className={type_taches["En cours"]} />
//                 <TitreTacheAvecLien label="Terminée" className={type_taches["Terminée"]} />
//               </div>
//             )}
//             {selected !== 1 ? (
//               <VoirTableau taches={currentTasks} />
//             ) : (
//               <div className="w-full">
//                 <Table taches={currentTasks} />
//               </div>
//             )}
//           </div>
//         ]}
//       </Tableaux>

//       {totalTasks > tasksPerPage && (
//         <div className="flex items-center justify-center gap-8 mt-2">
//           <PaginationButton
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//           >
//             <ChevronLeft className="w-5 h-5 text-gray-600" />
//           </PaginationButton>

//           <span className="text-sm text-gray-600 font-medium">
//             Page {currentPage} sur {totalPages}
//           </span>

//           <PaginationButton
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//           >
//             <ChevronRight className="w-5 h-5 text-gray-600" />
//           </PaginationButton>
//         </div>
//       )}

//       <ImportModal
//         isOpen={isImportModalOpen}
//         onClose={() => setIsImportModalOpen(false)}
//         onImport={handleImportTasks}
//       />
//     </div>
//   );
// };

// export default Taches;