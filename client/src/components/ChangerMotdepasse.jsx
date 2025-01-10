import React from "react";
import { Button, Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import Bouton from "./Bouton";
import ModalWrapper from "./ModalWrapper";
import TextField from "./TextField";
import { useChangerMotdepasseMutation } from "../redux/slices/api/userApiSlice";
import { toast } from "sonner";

// const ChangerMotdepasse = ({ open, setOpen }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const [changerMotdepasseUtilisateur] = useChangerMotdepasseMutation();
//   const handleOnSubmit = async (data) => {
//     if (data.motdepasse !== data.confirmpass) {
//       toast.warning("Les mots de passe ne correspondent pas");
//       return;
//     }
//     try {
//       const res = await changerMotdepasseUtilisateur(data).unwrap();
//       toast.success("Nouveau utilisateur ajouté avec succès");
//       setTimeout(() => {
//         setOpen(false);
//       }, 1500);
//     } catch (error) {
//       console.log(error);
//       toast.error(error?.data?.message || err.error);
//     }
//   };
//   return (
//     <>
//       <ModalWrapper open={open} setOpen={setOpen}>
//         <form onSubmit={handleSubmit(handleOnSubmit)} className="">
//           <Dialog.Title
//             as="h2"
//             className="text-base font-bold leading-6 text-gray-900 mb-4"
//           >
//             Changer mot de passe
//           </Dialog.Title>
//           <div className="mt-2 flex flex-col gap-6">
//             <TextField
//               placeholder="Nouveau mot de passe"
//               type="password"
//               name="motdepasse"
//               className="w-full rounded"
//               register={register("motdepasse", {
//                 required: "Nouveau mot de passe obligatoire",
//               })}
//               error={errors.motdepasse ? errors.motdepasse.message : ""}
//             />
//             <TextField
//               placeholder="Confirmer le nouveau mot de passe"
//               type="password"
//               name="confirmpass"
//               label="Confirmer le mot de passe"
//               className="w-full rounded"
//               register={register("confirmpass", {
//                 required: "La confirmation du mot de passe est obligatoire",
//               })}
//               error={errors.confirmpass ? errors.confirmpass.message : ""}
//             />
//             <div className="py-3 mt-4 sm:flex-row-reverse">
//               <Bouton
//                 type="submit"
//                 className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700"
//                 label="Sauvegarder"
//               />
//               <button
//                 type="button"
//                 className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
//                 onClick={() => setOpen(false)}
//               >
//                 Annuler
//               </button>
//             </div>
//           </div>
//         </form>
//       </ModalWrapper>
//     </>
//   );
// };
const ChangerMotdepasse = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  
  const [changerMotdepasseUtilisateur] = useChangerMotdepasseMutation();
  
  const handleOnSubmit = async (data) => {
    if (data.motdepasse !== data.confirmpass) {
      toast.warning("Les mots de passe ne correspondent pas");
      return;
    }
    
    try {
      const res = await changerMotdepasseUtilisateur({
        motdepasseActuel: data.motdepasseActuel,
        motdepasse: data.motdepasse
      }).unwrap();
      
      toast.success("Mot de passe changé avec succès");
      reset(); // Réinitialiser le formulaire
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "Erreur lors du changement de mot de passe");
    }
  };
  
  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className="">
        <Dialog.Title
          as="h2"
          className="text-base font-bold leading-6 text-gray-900 mb-4"
        >
          Changer mot de passe
        </Dialog.Title>
        <div className="mt-2 flex flex-col gap-6">
          <TextField
            placeholder="Mot de passe actuel"
            type="password"
            name="motdepasseActuel"
            className="w-full rounded"
            register={register("motdepasseActuel", {
              required: "Mot de passe actuel obligatoire",
            })}
            error={errors.motdepasseActuel ? errors.motdepasseActuel.message : ""}
          />
          <TextField
            placeholder="Nouveau mot de passe"
            type="password"
            name="motdepasse"
            className="w-full rounded"
            register={register("motdepasse", {
              required: "Nouveau mot de passe obligatoire",
              minLength: {
                value: 6,
                message: "Le mot de passe doit contenir au moins 6 caractères"
              }
            })}
            error={errors.motdepasse ? errors.motdepasse.message : ""}
          />
          <TextField
            placeholder="Confirmer le nouveau mot de passe"
            type="password"
            name="confirmpass"
            className="w-full rounded"
            register={register("confirmpass", {
              required: "La confirmation du mot de passe est obligatoire",
            })}
            error={errors.confirmpass ? errors.confirmpass.message : ""}
          />
          <div className="py-3 mt-4 sm:flex-row-reverse">
            <Bouton
              type="submit"
              className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700"
              label="Sauvegarder"
            />
            <button
              type="button"
              className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
              onClick={() => setOpen(false)}
            >
              Annuler
            </button>
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
};
export default ChangerMotdepasse;
