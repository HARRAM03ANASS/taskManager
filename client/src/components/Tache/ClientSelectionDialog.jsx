// import React, { useState } from 'react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
// import { useGetClientsQuery } from '../../redux/slices/api/clientApiSlice';
// import { Search } from 'lucide-react';

// const ClientSelectionDialog = ({ onClientSelect }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const { data, isLoading } = useGetClientsQuery();
  
//   // Ensure we're working with the correct data structure
//   const clients = Array.isArray(data) ? data : data?.clients || [];
  
//   const filteredClients = clients.filter(client =>
//     client?.nom?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Dialog>
//       <DialogTrigger className="w-full p-2 text-left border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
//         Sélectionner un client
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Sélectionner un client</DialogTitle>
//         </DialogHeader>
        
//         <div className="relative mt-4">
//           <input
//             type="text"
//             placeholder="Rechercher un client..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full p-2 pl-8 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//           />
//           <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
//         </div>

//         <div className="mt-4 max-h-[300px] overflow-y-auto">
//           {isLoading ? (
//             <div className="text-center py-4">Chargement...</div>
//           ) : filteredClients.length > 0 ? (
//             <div className="space-y-2">
//               {filteredClients.map((client) => (
//                 <button
//                   key={client._id}
//                   onClick={() => onClientSelect(client)}
//                   className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
//                 >
//                   {client.nom}
//                 </button>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-4 text-gray-500">
//               Aucun client trouvé
//             </div>
//           )}
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ClientSelectionDialog;
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { useGetClientsQuery } from '../../redux/slices/api/clientApiSlice';
import { Search } from 'lucide-react';

const ClientSelectionDialog = ({ onClientSelect, selectedClient }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading } = useGetClientsQuery();
  
  const clients = Array.isArray(data) ? data : data?.clients || [];
  
  const filteredClients = clients.filter(client =>
    client?.nom?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClientSelection = (client) => {
    // Ensure we're passing an object with _id
    const selectedClientData = {
      _id: client._id,
      nom: client.nom
    };
    onClientSelect(selectedClientData);
    
    // Close dialog
    const closeButton = document.querySelector('[data-dialog-close]');
    if (closeButton) closeButton.click();
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full p-2 text-left border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
      {selectedClient?.nom || "Sélectionner un client"}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sélectionner un client</DialogTitle>
        </DialogHeader>
        
        <div className="relative mt-4">
          <input
            type="text"
            placeholder="Rechercher un client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-8 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <div className="mt-4 max-h-[300px] overflow-y-auto">
          {isLoading ? (
            <div className="text-center py-4">Chargement...</div>
          ) : filteredClients.length > 0 ? (
            <div className="space-y-2">
              {filteredClients.map((client) => (
               <button
                  key={client._id}
                  onClick={() => handleClientSelection(client)}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md transition-colors ${
                    selectedClient?._id === client._id ? 'bg-blue-50' : ''
                  }`}
                >
                  {client.nom}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              Aucun client trouvé
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClientSelectionDialog;