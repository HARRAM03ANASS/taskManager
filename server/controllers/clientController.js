import Client from "../models/client.js";

// Créer un nouveau client
export const creerClient = async (req, res) => {
    try {
        const { nom } = req.body;
        
        if (!nom) {
            return res.status(400).json({ 
                status: false, 
                message: "Le nom du client est requis" 
            });
        }

        // Vérifier si le client existe déjà
        const clientExiste = await Client.findOne({ nom });
        if (clientExiste) {
            return res.status(400).json({ 
                status: false, 
                message: "Un client avec ce nom existe déjà" 
            });
        }

        // Créer le nouveau client
        const client = await Client.create({ nom });

        res.status(201).json({
            status: true,
            message: "Client créé avec succès",
            client
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            status: false, 
            message: error.message || "Erreur lors de la création du client" 
        });
    }
};

// Récupérer tous les clients
export const recupererClients = async (req, res) => {
    try {
        const clients = await Client.find()
            .sort({ nom: 1 }); // Tri par nom

        res.status(200).json({
            status: true,
            clients
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            status: false, 
            message: "Erreur lors de la récupération des clients" 
        });
    }
};

// Modifier un client
export const modifierClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom } = req.body;

        if (!nom) {
            return res.status(400).json({ 
                status: false, 
                message: "Le nom du client est requis" 
            });
        }

        const client = await Client.findByIdAndUpdate(
            id,
            { nom },
            { new: true }
        );

        if (!client) {
            return res.status(404).json({ 
                status: false, 
                message: "Client non trouvé" 
            });
        }

        res.status(200).json({
            status: true,
            message: "Client modifié avec succès",
            client
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            status: false, 
            message: "Erreur lors de la modification du client" 
        });
    }
};

// Supprimer un client
export const supprimerClient = async (req, res) => {
    try {
        const { id } = req.params;

        const client = await Client.findByIdAndDelete(id);

        if (!client) {
            return res.status(404).json({ 
                status: false, 
                message: "Client non trouvé" 
            });
        }

        res.status(200).json({
            status: true,
            message: "Client supprimé avec succès"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            status: false, 
            message: "Erreur lors de la suppression du client" 
        });
    }
};
