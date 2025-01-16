import React, { useState } from "react";
import Titre from "../components/Titre";
import Bouton from "../components/Bouton";
import { IoMdAdd } from "react-icons/io";
// import { summary } from "../assets/data";
import { getInitials } from "../utils";
import clsx from "clsx";
import AjouterUtilisateur from "../components/AjouterUtilisateur";
import ConfirmationDialog, { UserAction } from "../components/DialogsViewList";
import { useGetEquipeListeQuery, useSupprimerUtilisateurMutation, useUserActionMutation,  } from "../redux/slices/api/userApiSlice";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Users = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [selected, setSelected] = useState(null);
  const [supprimerUtilisateur] = useSupprimerUtilisateurMutation();
  const [userAction] = useUserActionMutation();
  const { data, refetch } = useGetEquipeListeQuery();

  


  const userActionHandler = async() => {
    try {
      const resultat = await userAction({
        isActive: !selected?.isActive,
        id: selected?._id
      });
      setOpenAction(false);
      toast.success(resultat.data.message);
      refetch();
      setSelected(null);
      
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.message);
    }
  };
  const deleteHandler = async () => {
    try {
      const resultat = await supprimerUtilisateur(selected);
      refetch();
      toast.success(resultat?.data?.message);
      setSelected(null);
      setTimeout(() => {
        setOpenDialog(false);
      },500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error)       
    }
  };
  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };
  const editClick = (el) => {
    setSelected(el);
    setOpen(true);
  };
  const userStatusClick = async (el) => {
    setSelected(el);
    setOpenAction(true);

  }

  const TableEntete = () => (
    <thead className="border-b border-gray-300">
      <tr className="text-black text-left">
        <th className="py-2">Nom Complet</th>
        <th className="py-2">Titre</th>
        <th className="py-2">Email</th>
        <th className="py-2">Rôle</th>
        <th className="py-2">Active</th>
      </tr>
    </thead>
  );

  const TableLigne = ({ utilisateur }) => (
    
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
      <td className="py-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-blue-700">
            <span className="text-xs md:text-sm text-center">
              {getInitials(utilisateur.nom)}
            </span>
          </div>
          <Link to={`/user-tasks/${utilisateur._id}`} className="text-blue-700 hover:text-blue-500">
             {utilisateur.nom}
          </Link>
           {/* {utilisateur.nom} */}
        </div>
      </td>
      <td className="-py-2">{utilisateur.titre}</td>
      <td className="-py-2">{utilisateur.email || "utilisateur.email.com"}</td>
      <td className="-py-2">{utilisateur.role}</td>
      <td>
        <button
          onClick={() => userStatusClick(utilisateur)}
          className={clsx(
            "w-fit px-4 py-1 rounded-full",
            utilisateur?.isActive ? "bg-slate-200" : "bg-yellow-100"
          )}
        >
          {utilisateur?.isActive ? "Actif" : "Inactif"}
        </button>
      </td>
      <td className="p-2 flex gap-4 justify-end">
        <Bouton
          className="text-blue-700 hover:text-blue-500 font-semibold sm:px-0"
          label="Modifier"
          type="button"
          onClick={() => editClick(utilisateur)}
        />
        <Bouton
          className="text-red-700 hover:text-red-500 font-semibold sm:px-0"
          label="Supprimer"
          type="button"
          onClick={() => deleteClick(utilisateur?._id)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className="w-full md:px-1 px-0 mb-6">
        <div className="flex items-center justify-between mb-8">
          <Titre title="Les membres d'équipe" />
          <Bouton
            label="Ajouter un utilisateur"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md 2xl:py-2.5"
            onClick={() => setOpen(true)}
          />
        </div>
        <div className="bg-white px-2 md:px-4 py-4 shadow-md rounded">
          <div className="overflow-x-auto">
            <table className="w-full mb-5">
              <TableEntete />
              <tbody>
                {data?.map((utilisateur, index) => (
                  <TableLigne key={index} utilisateur={utilisateur} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <AjouterUtilisateur
        open={open}
        setOpen={setOpen}
        userData={selected}
        key={new Date().getTime().toString()}
      />
      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
      <UserAction
        open={openAction}
        setOpen={setOpenAction}
        onClick={userActionHandler}
      />
    </>
  )
};

export default Users;
