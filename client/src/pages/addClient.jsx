import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateClientMutation } from "../redux/slices/api/clientApiSlice";
import { useSelector } from "react-redux";

const AddClient = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Récupérer l'utilisateur depuis le state Redux
  const { user } = useSelector((state) => state.auth);
  
  const defaultValues = {
    nom: ""
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const [createClient] = useCreateClientMutation();

  // Vérifier si l'utilisateur a les droits admin
  if (!user?.isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl text-red-600">
            Accès non autorisé. Vous devez être administrateur pour créer un client.
          </h2>
        </div>
      </div>
    );
  }

  const submitHandler = async (data) => {
    try {
      setLoading(true);
      const res = await createClient(data).unwrap();
      toast.success(res.message || "Client ajouté avec succès");
      navigate(-1);
    } catch (error) {
      console.error(error);
      
      // Gérer les différents types d'erreurs
      if (error.status === 401) {
        toast.error("Session expirée. Veuillez vous reconnecter.");
        // Rediriger vers la page de connexion si nécessaire
        navigate('/log-in');
      } else if (error.status === 403) {
        toast.error("Vous n'avez pas les permissions nécessaires.");
      } else if (error?.data?.message?.includes('duplicate')) {
        toast.error("Un client avec ce nom existe déjà");
      } else {
        toast.error(error?.data?.message || "Erreur lors de la création du client");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit(submitHandler)} className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Ajouter un nouveau client
        </h2>
        
        <div className="space-y-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom du client
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Entrez le nom du client"
              {...register("nom", {
                required: "Le nom du client est obligatoire",
                minLength: {
                  value: 2,
                  message: "Le nom doit contenir au moins 2 caractères"
                }
              })}
            />
            {errors.nom && (
              <p className="mt-1 text-sm text-red-600">{errors.nom.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              className="bg-gray-100 px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 rounded-md"
              onClick={() => navigate(-1)}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-600 px-8 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-blue-300 rounded-md
                ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Envoi en cours...' : 'Envoyer'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddClient;