// import React, { useState } from "react";
// import ModalWrapper from "../ModalWrapper";
// import TextField from "../TextField";
// import { Dialog } from "@headlessui/react";
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
// import { supabase } from "../../utils/supabase"; // Import Supabase client
// import { dateFormater } from "../../utils";

// const liste = ["À faire", "En cours", "Terminée"];
// const priorite = ["Elevée", "Moyenne", "Normale", "Faible"];
// const fichierImporteURLs = [];

// const AjouterTache = ({ open, setOpen, tache }) => {
//   const defaultValues = {
//     titre: tache?.titre || "",
//     // date: dateFormater(tache?.date || new Date()),
//     // equipe: [],

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
//   const [atouts, setAtouts] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [creerTache, { isLoading }] = useCreerTacheMutation();
//   const [modifierTache, { isLoading: isUpdating }] = useModifierTacheMutation();
//   const URLs = tache?.atouts ? [...tache.atouts] : [];

//   const uploadFile = async (file) => {
//     const fileName = new Date().getTime() + "_" + file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
//     const filePath = `tache-assets/${fileName}`;

//     try {
//       const { error } = await supabase.storage
//         .from("gestion_des_taches")
//         .upload(filePath, file, {
//           cacheControl: "3600",
//           upsert: false,
//         });

//       if (error) {
//         throw new Error(error.message);
//       }

//       const { data: publicUrlData } = supabase.storage
//         .from("gestion_des_taches")
//         .getPublicUrl(filePath);

//       fichierImporteURLs.push(publicUrlData.publicUrl);
//     } catch (error) {
//       console.error("Erreur lors du chargement de fichier : ", error.message);
//       throw error;
//     }
//   };

//   // **Form Submission**
//   // const uploadFile = async (file) => {
//   //   const fileName =
//   //     new Date().getTime() + "_" + file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
//   //   const filePath = `tache-assets/${fileName}`;

//   //   try {
//   //     const { error } = await supabase.storage
//   //       .from("gestion_des_taches")
//   //       .upload(filePath, file, {
//   //         cacheControl: "3600",
//   //         upsert: false,
//   //       });

//   //     if (error) {
//   //       throw new Error(error.message);
//   //     }

//   //     const { data: publicUrlData } = supabase.storage
//   //       .from("gestion_des_taches")
//   //       .getPublicUrl(filePath);

//   //     const nouvelAttoutId = fichierImporteURLs.length + 1;
//   //     fichierImporteURLs.push(nouvelAttoutId);
//   //   } catch (error) {
//   //     console.error("Erreur lors du chargement de fichier : ", error.message);
//   //     throw error;
//   //   }
//   // };
//   const submitHandler = async (data) => {
//     for (const file of atouts) {
//       setUploading(true);
//       try {
//         await uploadFile(file);
//       } catch (error) {
//         console.error("Erreur lors du chargement de fichier : ", error.message);
//         return;
//       } finally {
//         setUploading(false);
//       }
//     }
//     try {
//       const newData = {
//         ...data,
//         atouts: [...URLs, ...fichierImporteURLs],
//         equipe,
//         phase,
//         priorite: priority,
//       };
//       const res = tache?._id
//         ? await modifierTache({ ...newData, _id: tache._id }).unwrap()
//         : await creerTache(newData).unwrap();
//       toast.success(res.message);
//       setTimeout(() => {
//         setOpen(false);
//       }, 500);
//     } catch (error) {
//       console.log(error);
//       toast.error(error?.data?.message || error.error);
//     }
//   };

//   const handleSelect = (e) => {
//     setAtouts(e.target.files);
//   };

//   return (
//     <>
//       <ModalWrapper open={open} setOpen={setOpen}>
//         <form onSubmit={handleSubmit(submitHandler)}>
//           <Dialog.Title
//             as="h2"
//             className="text-base font-bold leading-6 text-gray-900 mb-4"
//           >
//             {tache ? "Modifier une tâche" : "Ajouter une tâche"}
//           </Dialog.Title>
//           <div className="mt-2 flex flex-col gap-6">
//             <TextField
//               placeholder="Nom de la tâche"
//               type="text"
//               name="titre"
//               label="Tâche"
//               className="w-full rounded"
//               register={register("titre", {
//                 required: "Nom de la tâche obligatoire",
//               })}
//               error={errors.titre ? errors.titre.message : ""}
//             />
//             <ListeUtilisateur setTeam={setTeam} team={equipe} />
//             <div className="flex gap-4">
//               <ListeSelection
//                 label="Étape de la tâche"
//                 lists={liste}
//                 selected={phase}
//                 setSelected={setStage}
//               />
//               <div className="w-full">
//                 <TextField
//                   placeholder="Date de début"
//                   type="date"
//                   name="date"
//                   label="Date de la tâche"
//                   className="w-full rounded"
//                   register={register("date", {
//                     required: "La date de la tâche est obligatoire",
//                   })}
//                   error={errors.date ? errors.date.message : ""}
//                 />
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <ListeSelection
//                 label="Niveau de priorité"
//                 lists={priorite}
//                 selected={priority}
//                 setSelected={setPriorite}
//               />
//               <div className="w-full flex items-center justify-center mt-4">
//                 <label
//                   className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4"
//                   htmlFor="imgUpload"
//                 >
//                   <input
//                     type="file"
//                     className="hidden"
//                     id="imgUpload"
//                     onChange={(e) => handleSelect(e)}
//                     accept=".jpg, .png, .jpeg"
//                     multiple={true}
//                   />
//                   <BiImages />
//                   <span>Ajouter des atouts</span>
//                 </label>
//               </div>
//             </div>
//             <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
//               {uploading ? (
//                 <span className="text-sm py-2 text-red-500">
//                   Charger les atouts
//                 </span>
//               ) : (
//                 <Bouton
//                   label="Envoyer"
//                   type="submit"
//                   className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"
//                 />
//               )}
//               <Bouton
//                 type="button"
//                 className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
//                 onClick={() => setOpen(false)}
//                 label="Annuler"
//               />
//             </div>
//           </div>
//         </form>
//       </ModalWrapper>
//     </>
//   );
// };

// export default AjouterTache;
import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import TextField from "../TextField";
import { Dialog } from "@headlessui/react";
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
import { supabase } from "../../utils/supabase";

const liste = ["À faire", "En cours", "Terminée"];
const priorite = ["Elevée", "Moyenne", "Normale", "Faible"];

const AjouterTache = ({ open, setOpen, tache }) => {
  const defaultValues = {
    titre: tache?.titre || "",
    description : "voir maintenant",
    date: tache?.date ? new Date(tache.date).toISOString().split("T")[0] : "",
    equipe: tache?.equipe || [],
    phase: "",
    priorite: "",
    atouts: [],
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });
  
  const [equipe, setTeam] = useState(tache?.equipe || []);
  const [phase, setStage] = useState(tache?.phase || liste[0]);
  const [priority, setPriorite] = useState(tache?.priorite || priorite[2]);
  const [atouts, setAtouts] = useState([]);
  const [uploading, setUploading] = useState(false);
  // const [uploadedUrls, setUploadedUrls] = useState(tache?.atouts || []);
  const [description, setDescription] = useState("Merci de saisir la description de la tâche");
  const [uploadedAtouts, setUploadedAtouts] = useState(tache?.atouts || []);
  
  const [creerTache] = useCreerTacheMutation();
  const [modifierTache] = useModifierTacheMutation();
// on ajoute ceci
const generateAtoutId = () => {
  return Date.now() + Math.floor(Math.random() * 1000);
};

  const uploadFile = async (file) => {
    const fileName = new Date().getTime() + "_" + file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const filePath = `tache-assets/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from("gestion_des_taches")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("gestion_des_taches")
        .getPublicUrl(filePath);

    //   return publicUrlData.publicUrl;
    // } catch (error) {
    //   console.error("Erreur lors du chargement de fichier : ", error.message);
    //   throw error;
    // }
    return {
      id: generateAtoutId(),
      url: publicUrlData.publicUrl
    };
  } catch (error) {
    console.error("Erreur lors du chargement de fichier : ", error.message);
    throw error;
  }
  };

  const submitHandler = async (data) => {
    setUploading(true);
    try {
      // Upload all files and collect their URLs
      const uploadPromises = Array.from(atouts).map(file => uploadFile(file));
      const newAtouts = await Promise.all(uploadPromises);
      
      const atoutIds = [...uploadedAtouts, ...newAtouts.map(a => a.id)];
      const atoutUrls = newAtouts.map(a => a.url);
  
      // Include description in the new data
      const newData = {
        ...data,
        description, // Add description here
        atouts: atoutIds, 
        equipe,
        phase,
        priorite: priority,
      };
  
      const res = tache?._id
        ? await modifierTache({ ...newData, _id: tache._id }).unwrap()
        : await creerTache(newData).unwrap();
      
      toast.success(res.message);
      setTimeout(() => setOpen(false), 500);
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || error.error || "Erreur lors de la création de la tâche");
    } finally {
      setUploading(false);
    }
  };
  

  const handleSelect = (e) => {
    setAtouts(e.target.files);
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen} onClick={() => setOpen(false)}>
      <form onClick={(e) => e.stopPropagation()} // Prevent click event from propagating to ModalWrapper
    onSubmit={handleSubmit(submitHandler)} >
        <Dialog.Title
          as="h2"
          className="text-base font-bold leading-6 text-gray-900 mb-4"
        >
          {tache ? "Modifier une tâche" : "Ajouter une tâche"}
        </Dialog.Title>
        <div className="mt-2 flex flex-col gap-6">
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
          <ListeUtilisateur setTeam={setTeam} team={equipe} />

            <div>
          <label htmlFor="">Description:</label>

          <textarea name="description" value={description}
          onChange={(e)=> setDescription(e.target.value)}
          className="w-full p-2 border rounded">
            
          </textarea>
          </div>
          <div className="flex gap-4">
            <ListeSelection
              label="Étape de la tâche"
              lists={liste}
              selected={phase}
              setSelected={setStage}
            />
            <div className="w-full">
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
          <div className="flex gap-4">
            
            <ListeSelection
              label="Niveau de priorité"
              lists={priorite}
              selected={priority}
              setSelected={setPriorite}
            />
            <div className="w-full flex items-center justify-center mt-4">
              <label
                className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4"
                htmlFor="imgUpload"
              >
                <input
                  type="file"
                  className="hidden"
                  id="imgUpload"  
                  onChange={handleSelect}
                  accept=".jpg, .png, .jpeg"
                  multiple
                />
                <BiImages />
                <span>Ajouter des atouts</span>
              </label>
            </div>
          </div>
          <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
            <Bouton
              label={uploading ? "Chargement..." : "Envoyer"}
              type="submit"
              disabled={uploading}
              className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-blue-300 sm:w-auto"
            />
            <Bouton
              type="button"
              className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
              onClick={() => setOpen(false)}
              label="Annuler"
            />
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AjouterTache;