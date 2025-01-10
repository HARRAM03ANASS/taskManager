import React from "react";
import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import { FaQuestion } from "react-icons/fa";
import  Bouton  from "./Bouton";
import ModalWrapper from "./ModalWrapper";

export default function ConfirmationDialog({
  open,
  setOpen,
  msg,
  onClick = () => {},
  type = "delete",
  setMsg = () => {},
  setType = () => {},
}) {
  const closeDialog = () => {
    setType("delete");
    setMsg(null);
    setOpen(false);
    event.stopPropagation();
  };
  return (
    <>
      <ModalWrapper open={open} setOpen={closeDialog} onClick={() => setOpen(false)}>
        <div className="py-4 w-full flex flex-col gap-4 items-center justify-center">
          <Dialog.Title as="h3" className="">
            <p
              className={clsx(
                "p-3 rounded-full",
                type === "restore" || type === "restoreAll"
                  ? "text-yellow-600 bg-yellow-100"
                  : "text-red-600 bg-red-200"
              )}
            >
              <FaQuestion size={60} />
            </p>
          </Dialog.Title>
          <p className="text-center text-gray-500">
            {msg ?? "Êtes-vous sûr de vouloir supprimer cet élément ?"}
          </p>
          <div className="bg-gray-50 py-3 sm:flex sm:flex-row-reverse gap-4">
            <Bouton
              type="button"
              className={clsx(
                "px-8 text-sm font-semibold text-white sm:w-auto",
                type === "restore" || type === "restoreAll"
                  ? "bg-yellow-600"
                  : "bg-red-600 hover:bg-red-500"
              )}
              onClick={onClick}
              label={type === "restore" ? "Restorer" : "Supprimer"}
            />
            <Bouton
              type="button"
              className="bg-white px-8 text-sm font-semibold text-gray-900 sm:w-auto border"
              onClick={()=>closeDialog()}
              label="Annuler"
            />
          </div>
        </div>
      </ModalWrapper>
    </>
  );
}

export function UserAction({ open, setOpen, onClick = () => {} }) {
  const closeDialog = () => {
    setOpen(false);
  };
  return (
    <>
      <ModalWrapper open={open} setOpen={closeDialog}>
        <div className="py-4 w-full flex flex-col gap-4 items-center justify-center">
          <Dialog.Title as="h3" className="">
            <p className={clsx("p-3 rounded-full", "text-red-600 bg-red-200")}>
              <FaQuestion size={60} />
            </p>
          </Dialog.Title>
          <p className="text-center text-gray-500">
            {"Êtes-vous sûr de vouloir modifier l'état de ce compte ?"}
          </p>
          <div className="bg-gray-50 py-3 sm:flex sm:flex-row-reverse gap-4">
            <Bouton
              type="button"
              className={clsx(
                "px-8 text-sm font-semibold text-white sm:w-auto",
                "bg-red-600 hover:bg-red-500"
              )}
              onClick={onClick}
              label={"Oui"}
            />
            <Bouton
              type="button"
              className="bg-white px-8 text-sm font-semibold text-gray-900 sm:w-auto border"
              onClick={() => closeDialog()}
              label="Non"
            />
          </div>
        </div>
      </ModalWrapper>
    </>
  );
}

