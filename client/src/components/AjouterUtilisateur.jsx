import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "@headlessui/react";
import TextField from "./TextField";
import Bouton from "./Bouton";
import ModalWrapper from "./ModalWrapper";
import Loading from "./Loader";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { useModifierUtilisateurMutation } from "../redux/slices/api/userApiSlice";
import { toast } from "sonner";

const AjouterUtilisateur = ({ open, setOpen, userData }) => {
  let defaultValues = userData ?? {};
  const { utilisateur } = useSelector((state) => state.auth);
  const isLoading = false;
  // isUpdating = false;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });
  const dispatch = useDispatch();
  const [ajouterNouveauUtilisateur] = useRegisterMutation();
  const [ModifierUtilisateur, { isUpdating }] =
    useModifierUtilisateurMutation();
  // const handleOnSubmit = async (donnees) => {
  //   try {
  //     if (userData) {
  //       const resultat = await ModifierUtilisateur({...donnees,_id:userData._id}).unwrap();
  //       toast.success(resultat?.message);
  //       setOpen(false);
  //         if (userData?._id === utilisateur?._id) {  
  //       dispatch(setCredentials({ ...resultat.utilisateur }));
  //       }
  //     } else {
  //       const resultat = await ajouterNouveauUtilisateur({
  //         ...donnees,
  //         motdepasse: donnees.email,
  //       }).unwrap();
  //       toast.success("Utilisateur ajouté avec succès");
  //     }
  //     setTimeout(() => {
  //       setOpen(false);
  //     }, 1500);
  //   } catch (error) {
  //     toast.error("Une erreur s'est produite");
  //     console.log(error);
  //   }
  // };
  const handleOnSubmit = async (donnees) => {
    try {
      if (userData) {
        const resultat = await ModifierUtilisateur({...donnees, _id:userData._id}).unwrap();
        toast.success("Profil modifié avec succès");
        setOpen(false);
        
        if (userData?._id === utilisateur?._id) {  
          dispatch(setCredentials({ ...resultat.utilisateur }));
        }
      } else {
        const resultat = await ajouterNouveauUtilisateur({
          ...donnees,
          motdepasse: donnees.email,
        }).unwrap();
        toast.success("Utilisateur ajouté avec succès");
      }
    } catch (error) {
      toast.error("Une erreur s'est produite");
      console.log(error);
    }
  };
  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <Dialog.Title
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            {userData ? "Modifier le profil" : "Ajouter un nouveau utilisateur"}
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-6">
            <TextField
              placeholder="Nom complet"
              type="text"
              name="nom"
              label="Nom complet"
              className="w-full rounded"
              register={register("nom", {
                required: "Veuillez saisir le nom complet",
              })}
              error={errors.nom ? errors.nom.message : ""}
            />
            <TextField
              placeholder="Titre"
              type="text"
              name="titre"
              label="Titre"
              className="w-full rounded"
              register={register("titre", {
                required: "Veuillez saisir le titre",
              })}
              error={errors.titre ? errors.titre.message : ""}
            />
            <TextField
              placeholder="Email"
              type="email"
              name="email"
              label="Email"
              className="w-full rounded"
              register={register("email", {
                required: "Veuillez saisir l'adresse email",
              })}
              error={errors.email ? errors.email.message : ""}
            />
            <TextField
              placeholder="Rôle"
              type="text"
              name="role"
              label="Rôle"
              className="w-full rounded"
              register={register("role", {
                required: "Veuillez saisir le rôle",
              })}
              error={errors.role ? errors.role.message : ""}
            />
          </div>
          {isLoading || isUpdating ? (
            <div className="py-5">
              <Loading />
            </div>
          ) : (
            <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
              <Bouton
                type="submit"
                className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto"
                label="Sauvegarder"
              />
              <Bouton
                type="button"
                className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                onClick={() => setOpen(false)}
                label="Annuler"
              />
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default AjouterUtilisateur;