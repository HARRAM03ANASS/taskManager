// src/utils/fileParser.js
import * as XLSX from 'xlsx';

export const parseImportFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const workbook = XLSX.read(e.target.result, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        // Validate and transform the data
        const transformedData = jsonData.map(row => ({
          titre: row.titre || row.title || '',
          description: row.description || '',
          priorite: row.priorite || row.priority || 'Normale',
          phase: row.phase || row.status || 'À faire',
        }));
        
        resolve(transformedData);
      } catch (error) {
        reject(new Error('Error parsing file: ' + error.message));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsBinaryString(file);
  });
};