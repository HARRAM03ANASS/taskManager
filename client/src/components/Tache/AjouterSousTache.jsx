import React from "react";
import { useForm } from "react-hook-form";
import { Dialog } from "@headlessui/react";
import Bouton from "../Bouton";
import ModalWrapper from "../ModalWrapper";
import TextField from "../TextField";
import { useCreerSousTacheMutation } from "../../redux/slices/api/tacheApiSlice";
import { toast } from "sonner";

const AjouterSousTache = ({ open, setOpen, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [ajouterSsTache] = useCreerSousTacheMutation();
  // console.log(id);
  const handleOnSubmit = async (data) => {
    try {
      // console.log("Données envoyées :", { data, id });
        const res = await ajouterSsTache({ data, id }).unwrap();
        toast.success(res.message);
        setTimeout(() => {
          setOpen(false);
        }, 500);
    } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || err.error);
    }
  };
  // const handleOnSubmit = async (data) => {
  //   try {
  //     console.log("Données envoyées :", { data, id });
  //     const res = await ajouterSsTache({
  //       titre: data.titre,
  //       date: data.date,
  //       tag: data.tag,
  //       id,
  //     }).unwrap();
  //     toast.success(res.message);
  //     setTimeout(() => {
  //       setOpen(false);
  //     }, 500);
  //   } catch (err) {
  //     console.log(err);
  //     toast.error(err?.data?.message || err.error);
  //   }
  // };
  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen} onClick={() => setOpen(false)}>
        <form onClick={(e) => e.stopPropagation()} // Prevent click event from propagating to ModalWrapper
              onSubmit={handleSubmit(handleOnSubmit)}>
          <Dialog.Title
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            Ajouter une sous-tâche
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-6">
            <TextField
              placeholder="Titre de la sous-tâche"
              type="text"
              name="titre"
              className="w-full rounded"
              register={register("titre", {
                required: "Le titre est obligatoire !",
              })}
              error={errors.titre ? errors.titre.message : ""}
            />
            <div className="flex items-center gap-4">
              <TextField
                placeholder="Date"
                type="date"
                name="date"
                label="La date de la tâche"
                className="w-full rounded"
                register={register("date", {
                  required: "La date est obligatoire !",
                })}
                error={errors.date ? errors.date.message : ""}
              />
              <TextField
                placeholder="Tag"
                type="text"
                name="tag"
                label="Tag"
                className="w-full rounded"
                register={register("tag", {
                  required: "Le tag est obligatoire",
                })}
                error={errors.tag ? errors.tag.message : ""}
              />
            </div>
          </div>
          <div className="py-3 mt-4 flex sm:flex-row-reverse gap-4">
            <Bouton
              type="submit"
              className="bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 sm:ml-3 sm:w-auto"
              label="Ajouter la tâche"
            />
            <Bouton
              type="button"
              className="bg-white border text-sm font-semibold text-gray-900 sm:w-auto"
              onClick={() => setOpen(false)}
              label="Annuler"
            />
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AjouterSousTache;