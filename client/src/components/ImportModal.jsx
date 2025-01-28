// import React, { useState } from 'react';
// import { X, Upload, FileSpreadsheet, AlertCircle } from 'lucide-react';
// import { parseImportFile } from '../utils/filePareser'

// const ImportModal = ({ isOpen, onClose, onImport }) => {
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState([]);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

// //   const handleFileChange = async (e) => {
// //     const selectedFile = e.target.files[0];
// //     if (!selectedFile) return;


// const validateFile = async (selectedFile) => {
//     const ext = selectedFile.name.split('.').pop().toLowerCase();
//     if (!['csv', 'xlsx'].includes(ext)) {
//       setError('Format de fichier non supporté. Utilisez CSV ou XLSX.');
//       return false;
//     }
//     setError('');
//     return true;
//   };
// const handleFileChange = async (e) => {
//     const selectedFile = e.target.files[0];
//     if (!selectedFile) return;
  
//     if (await validateFile(selectedFile)) {
//       setFile(selectedFile);
//     }
//     const fileExt = selectedFile.name.split('.').pop().toLowerCase();
//     if (!['csv', 'xlsx'].includes(fileExt)) {
//       setError('Format de fichier non supporté. Utilisez CSV ou XLSX.');
//       return;
//     }

//     setFile(selectedFile);
//     setError('');
//     setIsLoading(true);

//     try {
//       const parsedData = await parseImportFile(selectedFile);
//       setPreview(parsedData.slice(0, 3)); // Show first 3 items as preview
//       setIsLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setIsLoading(false);
//     }
//   };

// //   const handleImport = async () => {
// //     if (!file) return;
    
// //     setIsLoading(true);
// //     try {
// //       const parsedData = await parseImportFile(file);
// //       onImport(parsedData);
// //       onClose();
// //     } catch (err) {
// //       setError(err.message);
// //     }
// //     setIsLoading(false);
// //   };



// const handleImport = async () => {
//     if (!file) return;
  
//     const formData = new FormData();
//     formData.append('file', file);
  
//     try {
//       setIsLoading(true);
//       const response = await fetch('/api/import-tasks', {
//         method: 'POST',
//         body: formData,
//       });
  
//       const data = await response.json();
//       if (!response.ok) {
//         setError(data.message || 'Failed to import tasks.');
//       } else {
//         setPreview([]); // Reset preview
//         setError('');
//         onClose(); // Close the modal
//         alert(data.message); // Notify the user
//       }
//     } catch (err) {
//       setError('An error occurred while importing.');
//     } finally {
//       setIsLoading(false);
//     }
//   };
  

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg w-full max-w-2xl">
//         <div className="flex justify-between items-center p-6 border-b">
//           <h2 className="text-xl font-semibold">Importer des tâches</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         <div className="p-6 space-y-4">
//           <div className="border-2 border-dashed rounded-lg p-8 text-center">
//             <FileSpreadsheet className="mx-auto h-12 w-12 text-gray-400" />
//             <p className="mt-2 text-sm text-gray-500">CSV ou XLSX uniquement</p>
//             <input
//               type="file"
//               accept=".csv,.xlsx"
//               onChange={handleFileChange}
//               className="mt-4"
//             />
//           </div>

//           {error && (
//             <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded">
//               <AlertCircle className="w-5 h-5" />
//               <p className="text-sm">{error}</p>
//             </div>
//           )}

//           {preview.length > 0 && (
//             <div className="space-y-2">
//               <h3 className="font-medium">Aperçu:</h3>
//               <div className="space-y-2">
//                 {preview.map((item, index) => (
//                   <div key={index} className="p-3 bg-gray-50 rounded">
//                     <p className="font-medium">{item.titre}</p>
//                     <p className="text-sm text-gray-600">{item.description}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="flex justify-end gap-3 p-6 border-t">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
//           >
//             Annuler
//           </button>
//           <button
//             onClick={handleImport}
//             disabled={!file || isLoading}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
//           >
//             {isLoading ? 'Importation...' : 'Importer'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImportModal;