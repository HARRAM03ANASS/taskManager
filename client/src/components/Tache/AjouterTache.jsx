// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import TextField from "../TextField";
// import { useForm } from "react-hook-form";
// import ListeUtilisateur from "./ListeUtilisateur";
// import ListeSelection from "../ListeSelection";
// import { BiImages } from "react-icons/bi";
// import { toast } from "sonner";
// import Bouton from "../Bouton";
// import {
//   useCreerTacheMutation,
//   useModifierTacheMutation,
// } from "../../redux/slices/api/tacheApiSlice";
// import { uploadFiles } from "../../utils/supabaseClient";

// const liste = ["À faire", "En cours", "Terminée"];
// const priorite = ["Elevée", "Moyenne", "Normale", "Faible"];

// const AjouterTache = ({ tache }) => {
//   const navigate = useNavigate();
  
//   const defaultValues = {
//     titre: tache?.titre || "",
//     description: tache?.description || "voir maintenant",
//     date: tache?.date ? new Date(tache.date).toISOString().split("T")[0] : "",
//     equipe: tache?.equipe || [],
//     phase: "",
//     priorite: "",
//     atouts: [],
//   };

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ defaultValues });

//   const [equipe, setTeam] = useState(tache?.equipe || []);
//   const [phase, setStage] = useState(tache?.phase || liste[0]);
//   const [priority, setPriorite] = useState(tache?.priorite || priorite[2]);
//   const [description, setDescription] = useState(tache?.description || "Merci de saisir la description de la tâche");
//   const [files, setFiles] = useState(tache?.atouts || []);
//   const [uploading, setUploading] = useState(false);

//   const [creerTache] = useCreerTacheMutation();
//   const [modifierTache] = useModifierTacheMutation();

//   const handleFileChange = async (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     const newFiles = selectedFiles.map(file => ({
//       file,
//       name: file.name,
//       preview: URL.createObjectURL(file)
//     }));
    
//     setFiles(prevFiles => [...prevFiles, ...newFiles]);
//   };

//   const removeFile = (fileToRemove) => {
//     setFiles(prevFiles => 
//       prevFiles.filter(f => 
//         f.file ? f.file !== fileToRemove.file : f.url !== fileToRemove.url
//       )
//     );
//   };

//   const submitHandler = async (data) => {
//     try {
//       setUploading(true);
      
//       const newFilesToUpload = files.filter(f => f.file);
//       const existingFiles = files.filter(f => f.url);

//       let uploadedFiles = [];
//       if (newFilesToUpload.length > 0) {
//         uploadedFiles = await uploadFiles(newFilesToUpload.map(f => f.file));
//       }

//       const allFiles = [...existingFiles, ...uploadedFiles];

//       const newData = {
//         ...data,
//         description,
//         equipe,
//         phase,
//         priorite: priority,
//         atouts: allFiles,
//       };

//       const res = tache?._id
//         ? await modifierTache({ ...newData, _id: tache._id }).unwrap()
//         : await creerTache(newData).unwrap();

//       toast.success(res.message);
//       navigate(-1); // Retourne à la page précédente
//     } catch (error) {
//       console.error(error);
//       toast.error(error?.data?.message || error.error || "Erreur lors de la création de la tâche");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <form onSubmit={handleSubmit(submitHandler)} className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
//         <h2 className="text-2xl font-bold text-gray-900 mb-6">
//           {tache ? "Modifier la tâche" : "Ajouter une tâche"}
//         </h2>
        
//         <div className="space-y-6">
//           <TextField
//             placeholder="Nom de la tâche"
//             type="text"
//             name="titre"
//             label="Tâche"
//             className="w-full rounded"
//             register={register("titre", {
//               required: "Nom de la tâche obligatoire",
//             })}
//             error={errors.titre ? errors.titre.message : ""}
//           />
          
//           <ListeUtilisateur setTeam={setTeam} team={equipe} />

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Description:
//             </label>
//             <textarea
//               name="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full p-2 border rounded"
//               rows={4}
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <ListeSelection
//               label="Étape de la tâche"
//               lists={liste}
//               selected={phase}
//               setSelected={setStage}
//             />
//             <div>
//               <TextField
//                 placeholder="Date de début"
//                 type="date"
//                 name="date"
//                 label="Date de la tâche"
//                 className="w-full rounded"
//                 register={register("date", {
//                   required: "La date de la tâche est obligatoire",
//                 })}
//                 error={errors.date ? errors.date.message : ""}
//               />
//             </div>
//           </div>

//           <ListeSelection
//             label="Niveau de priorité"
//             lists={priorite}
//             selected={priority}
//             setSelected={setPriorite}
//           />

//           <div className="flex items-center justify-center">
//             <label
//               className="flex items-center gap-1 text-base text-gray-600 hover:text-gray-800 cursor-pointer"
//               htmlFor="fileUpload"
//             >
//               <input
//                 type="file"
//                 className="hidden"
//                 id="fileUpload"
//                 accept=".jpg, .png, .jpeg, .gif, .pdf, .docx, .doc, .xlsx, .ppt, .pptx, .sql, .json, .csv, .zip, .rar, .txt, .js, .css, .html, .xml, .java, .php, .jsx, .py, .r"
//                 onChange={handleFileChange}
//                 multiple
//               />
//               <BiImages className="text-xl" />
//               <span>Ajouter des fichiers</span>
//             </label>
//           </div>

//           {files.length > 0 && (
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//               {files.map((file, index) => (
//                 <div key={index} className="relative">
//                   <button
//                     type="button"
//                     onClick={() => removeFile(file)}
//                     className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
//                   >
//                     ×
//                   </button>
//                   <img 
//                     src={file.preview || file.url} 
//                     alt={file.name} 
//                     className="w-full h-24 object-cover rounded"
//                   />
//                   <p className="text-xs mt-1 truncate">{file.name}</p>
//                 </div>
//               ))}
//             </div>
//           )}

//           <div className="flex justify-end gap-4 pt-6">
//             <Bouton
//               type="button"
//               className="bg-gray-100 px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200"
//               onClick={() => navigate(-1)}
//               label="Annuler"
//             />
//             <Bouton
//               label={uploading ? "Envoi en cours..." : "Envoyer"}
//               type="submit"
//               disabled={uploading}
//               className="bg-blue-600 px-8 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-blue-300"
//             />
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AjouterTache;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import TextField from "../TextField";
// import { useForm } from "react-hook-form";
// import ListeUtilisateur from "./ListeUtilisateur";
// import ListeSelection from "../ListeSelection";
// import { BiImages } from "react-icons/bi";
// import { toast } from "sonner";
// import Bouton from "../Bouton";
// import {
//   useCreerTacheMutation,
//   useModifierTacheMutation,
// } from "../../redux/slices/api/tacheApiSlice";
// import { uploadFiles } from "../../utils/supabaseClient";
// import ClientSelectionDialog from './ClientSelectionDialog';

// const liste = ["À faire", "En cours", "Terminée"];
// const priorite = ["Elevée", "Moyenne", "Normale", "Faible"];


// const AjouterTache = ({ tache }) => {
//   const navigate = useNavigate();
  
//   const defaultValues = {
//     titre: tache?.titre || "",
//     description: tache?.description || "voir maintenant",
//     date: tache?.date ? new Date(tache.date).toISOString().split("T")[0] : "",
//     equipe: tache?.equipe || [],
//     phase: "",
//     priorite: "",
//     atouts: [],
//     client: tache?.client || null, 
//   };

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ defaultValues });

//   const [equipe, setTeam] = useState(tache?.equipe || []);
//   const [phase, setStage] = useState(tache?.phase || liste[0]);
//   const [priority, setPriorite] = useState(tache?.priorite || priorite[2]);
//   const [description, setDescription] = useState(tache?.description || "Merci de saisir la description de la tâche");
//   const [files, setFiles] = useState(tache?.atouts || []);
//   const [uploading, setUploading] = useState(false);
//   const [selectedClient, setSelectedClient] = useState(tache?.client || null);

//   const [creerTache] = useCreerTacheMutation();
//   const [modifierTache] = useModifierTacheMutation();

//   const handleFileChange = async (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     const newFiles = selectedFiles.map(file => ({
//       file,
//       name: file.name,
//       preview: URL.createObjectURL(file)
//     }));
    
//     setFiles(prevFiles => [...prevFiles, ...newFiles]);
//   };

//   const removeFile = (fileToRemove) => {
//     setFiles(prevFiles => 
//       prevFiles.filter(f => 
//         f.file ? f.file !== fileToRemove.file : f.url !== fileToRemove.url
//       )
//     );
//   };

//   const handleClientSelect = (client) => {
//     setSelectedClient(client);
//   };

//   const submitHandler = async (data) => {
//     try {
//       setUploading(true);
      
//       const newFilesToUpload = files.filter(f => f.file);
//       const existingFiles = files.filter(f => f.url);

//       let uploadedFiles = [];
//       if (newFilesToUpload.length > 0) {
//         uploadedFiles = await uploadFiles(newFilesToUpload.map(f => f.file));
//       }

//       const allFiles = [...existingFiles, ...uploadedFiles];

//       const newData = {
//         ...data,
//         description,
//         equipe,
//         phase,
//         priorite: priority,
//         atouts: allFiles,
//         client: selectedClient?._id, // Ajout de l'ID du client
//       };

//       const res = tache?._id
//         ? await modifierTache({ ...newData, _id: tache._id }).unwrap()
//         : await creerTache(newData).unwrap();

//       toast.success(res.message);
//       navigate(-1);
//     } catch (error) {
//       console.error(error);
//       toast.error(error?.data?.message || error.error || "Erreur lors de la création de la tâche");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <form onSubmit={handleSubmit(submitHandler)} className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
//         <h2 className="text-2xl font-bold text-gray-900 mb-6">
//           {tache ? "Modifier la tâche" : "Ajouter une tâche"}
//         </h2>
        
//         <div className="space-y-6">
//           <TextField
//             placeholder="Nom de la tâche"
//             type="text"
//             name="titre"
//             label="Tâche"
//             className="w-full rounded"
//             register={register("titre", {
//               required: "Nom de la tâche obligatoire",
//             })}
//             error={errors.titre ? errors.titre.message : ""}
//           />
//            <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Client
//             </label>
//             <ClientSelectionDialog
//               onClientSelect={handleClientSelect}
//             />
//             {selectedClient && (
//               <p className="mt-2 text-sm text-gray-600">
//                 Client sélectionné : {selectedClient.nom}
//               </p>
//             )}
//           </div>
          
//           <ListeUtilisateur setTeam={setTeam} team={equipe} />

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Description:
//             </label>
//             <textarea
//               name="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full p-2 border rounded"
//               rows={4}
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <ListeSelection
//               label="Étape de la tâche"
//               lists={liste}
//               selected={phase}
//               setSelected={setStage}
//             />
//             <div>
//               <TextField
//                 placeholder="Date de début"
//                 type="date"
//                 name="date"
//                 label="Date de la tâche"
//                 className="w-full rounded"
//                 register={register("date", {
//                   required: "La date de la tâche est obligatoire",
//                 })}
//                 error={errors.date ? errors.date.message : ""}
//               />
//             </div>
//           </div>

//           <ListeSelection
//             label="Niveau de priorité"
//             lists={priorite}
//             selected={priority}
//             setSelected={setPriorite}
//           />

//           <div className="flex items-center justify-center">
//             <label
//               className="flex items-center gap-1 text-base text-gray-600 hover:text-gray-800 cursor-pointer"
//               htmlFor="fileUpload"
//             >
//               <input
//                 type="file"
//                 className="hidden"
//                 id="fileUpload"
//                 accept=".jpg, .png, .jpeg, .gif, .pdf, .docx, .doc, .xlsx, .ppt, .pptx, .sql, .json, .csv, .zip, .rar, .txt, .js, .css, .html, .xml, .java, .php, .jsx, .py, .r"
//                 onChange={handleFileChange}
//                 multiple
//               />
//               <BiImages className="text-xl" />
//               <span>Ajouter des fichiers</span>
//             </label>
//           </div>

//           {files.length > 0 && (
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//               {files.map((file, index) => (
//                 <div key={index} className="relative">
//                   <button
//                     type="button"
//                     onClick={() => removeFile(file)}
//                     className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
//                   >
//                     ×
//                   </button>
//                   <img 
//                     src={file.preview || file.url} 
//                     alt={file.name} 
//                     className="w-full h-24 object-cover rounded"
//                   />
//                   <p className="text-xs mt-1 truncate">{file.name}</p>
//                 </div>
//               ))}
//             </div>
//           )}

//           <div className="flex justify-end gap-4 pt-6">
//             <Bouton
//               type="button"
//               className="bg-gray-100 px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200"
//               onClick={() => navigate(-1)}
//               label="Annuler"
//             />
//             <Bouton
//               label={uploading ? "Envoi en cours..." : "Envoyer"}
//               type="submit"
//               disabled={uploading}
//               className="bg-blue-600 px-8 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-blue-300"
//             />
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// // export default AjouterTache;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import TextField from "../TextField";
// import { useForm } from "react-hook-form";
// import ListeUtilisateur from "./ListeUtilisateur";
// import ListeSelection from "../ListeSelection";
// import { BiImages } from "react-icons/bi";
// import { toast } from "sonner";
// import Bouton from "../Bouton";
// import {
//   useCreerTacheMutation,
//   useModifierTacheMutation,
// } from "../../redux/slices/api/tacheApiSlice";
// import { uploadFiles } from "../../utils/supabaseClient";
// import ClientSelectionDialog from './ClientSelectionDialog';

// const liste = ["À faire", "En cours", "Terminée"];
// const priorite = ["Elevée", "Moyenne", "Normale", "Faible"];


// const AjouterTache = ({ tache }) => {
//   const navigate = useNavigate();
  
//   const defaultValues = {
//     titre: tache?.titre || "",
//     description: tache?.description || "voir maintenant",
//     date: tache?.date ? new Date(tache.date).toISOString().split("T")[0] : "",
//     equipe: tache?.equipe || [],
//     phase: "",
//     priorite: "",
//     atouts: [],
//     // client: tache?.client || null, 
//   };

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ defaultValues });

//   const [equipe, setTeam] = useState(tache?.equipe || []);
//   const [phase, setStage] = useState(tache?.phase || liste[0]);
//   const [priority, setPriorite] = useState(tache?.priorite || priorite[2]);
//   const [description, setDescription] = useState(tache?.description || "Merci de saisir la description de la tâche");
//   const [files, setFiles] = useState(tache?.atouts || []);
//   const [uploading, setUploading] = useState(false);
//   const [selectedClient, setSelectedClient] = useState(tache?.client || null);

//   const [creerTache] = useCreerTacheMutation();
//   const [modifierTache] = useModifierTacheMutation();

//   const handleFileChange = async (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     const newFiles = selectedFiles.map(file => ({
//       file,
//       name: file.name,
//       preview: URL.createObjectURL(file)
//     }));
    
//     setFiles(prevFiles => [...prevFiles, ...newFiles]);
//   };

//   const removeFile = (fileToRemove) => {
//     setFiles(prevFiles => 
//       prevFiles.filter(f => 
//         f.file ? f.file !== fileToRemove.file : f.url !== fileToRemove.url
//       )
//     );
//   };

//   const handleClientSelect = (client) => {
//     setSelectedClient(client);
//   };

//   const submitHandler = async (data) => {
//     try {

//       if (!selectedClient?._id) {
//         toast.error("Veuillez sélectionner un client");
//         return;
//       }
//       setUploading(true);
      
//       const newFilesToUpload = files.filter(f => f.file);
//       const existingFiles = files.filter(f => f.url);

//       let uploadedFiles = [];
//       if (newFilesToUpload.length > 0) {
//         uploadedFiles = await uploadFiles(newFilesToUpload.map(f => f.file));
//       }

//       const allFiles = [...existingFiles, ...uploadedFiles];

//       const newData = {
//         ...data,
//         description,
//         equipe,
//         phase,
//         priorite: priority,
//         atouts: allFiles,
//         client: selectedClient._id, // Ajout de l'ID du client
//       };

//       const res = tache?._id
//         ? await modifierTache({ ...newData, _id: tache._id }).unwrap()
//         : await creerTache(newData).unwrap();

//       toast.success(res.message);
//       navigate(-1);
//     } catch (error) {
//       console.error(error);
//       toast.error(error?.data?.message || error.error || "Erreur lors de la création de la tâche");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <form onSubmit={handleSubmit(submitHandler)} className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
//         <h2 className="text-2xl font-bold text-gray-900 mb-6">
//           {tache ? "Modifier la tâche" : "Ajouter une tâche"}
//         </h2>
        
//         <div className="space-y-6">
//           <TextField
//             placeholder="Nom de la tâche"
//             type="text"
//             name="titre"
//             label="Tâche"
//             className="w-full rounded"
//             register={register("titre", {
//               required: "Nom de la tâche obligatoire",
//             })}
//             error={errors.titre ? errors.titre.message : ""}
//           />
// <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Client *
//         </label>
//         <ClientSelectionDialog
//           onClientSelect={setSelectedClient}
//           selectedClient={selectedClient}
//         />
//         {!selectedClient && (
//           <p className="mt-1 text-sm text-red-600">
//             La sélection d'un client est obligatoire
//           </p>
//         )}
//       </div>
          
//           <ListeUtilisateur setTeam={setTeam} team={equipe} />

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Description:
//             </label>
//             <textarea
//               name="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full p-2 border rounded"
//               rows={4}
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <ListeSelection
//               label="Étape de la tâche"
//               lists={liste}
//               selected={phase}
//               setSelected={setStage}
//             />
//             <div>
//               <TextField
//                 placeholder="Date de début"
//                 type="date"
//                 name="date"
//                 label="Date de la tâche"
//                 className="w-full rounded"
//                 register={register("date", {
//                   required: "La date de la tâche est obligatoire",
//                 })}
//                 error={errors.date ? errors.date.message : ""}
//               />
//             </div>
//           </div>

//           <ListeSelection
//             label="Niveau de priorité"
//             lists={priorite}
//             selected={priority}
//             setSelected={setPriorite}
//           />

//           <div className="flex items-center justify-center">
//             <label
//               className="flex items-center gap-1 text-base text-gray-600 hover:text-gray-800 cursor-pointer"
//               htmlFor="fileUpload"
//             >
//               <input
//                 type="file"
//                 className="hidden"
//                 id="fileUpload"
//                 accept=".jpg, .png, .jpeg, .gif, .pdf, .docx, .doc, .xlsx, .ppt, .pptx, .sql, .json, .csv, .zip, .rar, .txt, .js, .css, .html, .xml, .java, .php, .jsx, .py, .r"
//                 onChange={handleFileChange}
//                 multiple
//               />
//               <BiImages className="text-xl" />
//               <span>Ajouter des fichiers</span>
//             </label>
//           </div>

//           {files.length > 0 && (
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//               {files.map((file, index) => (
//                 <div key={index} className="relative">
//                   <button
//                     type="button"
//                     onClick={() => removeFile(file)}
//                     className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
//                   >
//                     ×
//                   </button>
//                   <img 
//                     src={file.preview || file.url} 
//                     alt={file.name} 
//                     className="w-full h-24 object-cover rounded"
//                   />
//                   <p className="text-xs mt-1 truncate">{file.name}</p>
//                 </div>
//               ))}
//             </div>
//           )}

//           <div className="flex justify-end gap-4 pt-6">
//             <Bouton
//               type="button"
//               className="bg-gray-100 px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200"
//               onClick={() => navigate(-1)}
//               label="Annuler"
//             />
//             <Bouton
//               label={uploading ? "Envoi en cours..." : "Envoyer"}
//               type="submit"
//               disabled={uploading}
//               className="bg-blue-600 px-8 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-blue-300"
//             />
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AjouterTache;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "../TextField";
import { useForm } from "react-hook-form";
import ListeUtilisateur from "./ListeUtilisateur";
import ListeSelection from "../ListeSelection";
import { BiImages } from "react-icons/bi";
import { toast } from "sonner";
import Bouton from "../Bouton";
import {
  useCreerTacheMutation,
  useModifierTacheMutation,
} from "../../redux/slices/api/tacheApiSlice";
import { uploadFiles } from "../../utils/supabaseClient";
import ClientSelectionDialog from './ClientSelectionDialog';

const liste = ["À faire", "En cours", "Terminée"];
const priorite = ["Elevée", "Moyenne", "Normale", "Faible"];

const AjouterTache = ({ tache }) => {
  const navigate = useNavigate();
  
  const defaultValues = {
    titre: tache?.titre || "",
    description: tache?.description || "voir maintenant",
    date: tache?.date ? new Date(tache.date).toISOString().split("T")[0] : "",
    equipe: tache?.equipe || [],
    phase: tache?.phase || liste[0],
    priorite: tache?.priorite || priorite[2],
    atouts: tache?.atouts || [],
    client: tache?.client || null,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues });

  const [equipe, setTeam] = useState(tache?.equipe || []);
  const [phase, setStage] = useState(tache?.phase || liste[0]);
  const [priority, setPriorite] = useState(tache?.priorite || priorite[2]);
  const [description, setDescription] = useState(tache?.description || "Merci de saisir la description de la tâche");
  const [files, setFiles] = useState(tache?.atouts || []);
  const [uploading, setUploading] = useState(false);
  const [selectedClient, setSelectedClient] = useState(tache?.client || null);
  const [clientError, setClientError] = useState("");

  const [creerTache] = useCreerTacheMutation();
  const [modifierTache] = useModifierTacheMutation();

  const handleClientSelect = (client) => {
    setSelectedClient(client);
    setValue('client', client._id); // Important: Met à jour la valeur dans le formulaire
    setClientError("");
  };

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newFiles = selectedFiles.map(file => ({
      file,
      name: file.name,
      preview: URL.createObjectURL(file)
    }));
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  const removeFile = (fileToRemove) => {
    setFiles(prevFiles => 
      prevFiles.filter(f => 
        f.file ? f.file !== fileToRemove.file : f.url !== fileToRemove.url
      )
    );
  };

  const submitHandler = async (data) => {
    try {
      if (!selectedClient?._id) {
        setClientError("Veuillez sélectionner un client");
        return;
      }

      setUploading(true);
      
      const newFilesToUpload = files.filter(f => f.file);
      const existingFiles = files.filter(f => f.url);

      let uploadedFiles = [];
      if (newFilesToUpload.length > 0) {
        uploadedFiles = await uploadFiles(newFilesToUpload.map(f => f.file));
      }

      const allFiles = [...existingFiles, ...uploadedFiles];

      const newData = {
        ...data,
        description,
        equipe,
        phase,
        priorite: priority,
        atouts: allFiles,
        client: selectedClient._id,
      };

      const res = tache?._id
        ? await modifierTache({ ...newData, _id: tache._id }).unwrap()
        : await creerTache(newData).unwrap();

      toast.success(res.message);
      navigate(-1);
    } catch (error) {
      console.error("Erreur détaillée:", error);
      toast.error(error?.data?.message || error.error || "Erreur lors de la création de la tâche");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit(submitHandler)} className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {tache ? "Modifier la tâche" : "Ajouter une tâche"}
        </h2>
        
        <div className="space-y-6">
          <TextField
            placeholder="Nom de la tâche"
            type="text"
            name="titre"
            label="Tâche"
            className="w-full rounded"
            register={register("titre", {
              required: "Nom de la tâche obligatoire",
            })}
            error={errors.titre ? errors.titre.message : ""}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client *
            </label>
            <ClientSelectionDialog
              onClientSelect={handleClientSelect}
              selectedClient={selectedClient}
            />
            {clientError && (
              <p className="mt-1 text-sm text-red-600">
                {clientError}
              </p>
            )}
          </div>
          
          {/* Rest of the form remains the same */}
          <ListeUtilisateur setTeam={setTeam} team={equipe} />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description:
            </label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ListeSelection
              label="Étape de la tâche"
              lists={liste}
              selected={phase}
              setSelected={setStage}
            />
            <div>
              <TextField
                placeholder="Date de début"
                type="date"
                name="date"
                label="Date de la tâche"
                className="w-full rounded"
                register={register("date", {
                  required: "La date de la tâche est obligatoire",
                })}
                error={errors.date ? errors.date.message : ""}
              />
            </div>
          </div>

          <ListeSelection
            label="Niveau de priorité"
            lists={priorite}
            selected={priority}
            setSelected={setPriorite}
          />

          <div className="flex items-center justify-center">
            <label
              className="flex items-center gap-1 text-base text-gray-600 hover:text-gray-800 cursor-pointer"
              htmlFor="fileUpload"
            >
              <input
                type="file"
                className="hidden"
                id="fileUpload"
                accept=".jpg, .png, .jpeg, .gif, .pdf, .docx, .doc, .xlsx, .ppt, .pptx, .sql, .json, .csv, .zip, .rar, .txt, .js, .css, .html, .xml, .java, .php, .jsx, .py, .r"
                onChange={handleFileChange}
                multiple
              />
              <BiImages className="text-xl" />
              <span>Ajouter des fichiers</span>
            </label>
          </div>

          {files.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {files.map((file, index) => (
                <div key={index} className="relative">
                  <button
                    type="button"
                    onClick={() => removeFile(file)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                  >
                    ×
                  </button>
                  <img 
                    src={file.preview || file.url} 
                    alt={file.name} 
                    className="w-full h-24 object-cover rounded"
                  />
                  <p className="text-xs mt-1 truncate">{file.name}</p>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-4 pt-6">
            <Bouton
              type="button"
              className="bg-gray-100 px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200"
              onClick={() => navigate(-1)}
              label="Annuler"
            />
            <Bouton
              label={uploading ? "Envoi en cours..." : "Envoyer"}
              type="submit"
              disabled={uploading}
              className="bg-blue-600 px-8 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-blue-300"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AjouterTache;