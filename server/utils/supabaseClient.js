import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://kliopkuljioqbqzahspe.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsaW9wa3VsamlvcWJxemFoc3BlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0NDkzNjUsImV4cCI6MjA1MzAyNTM2NX0.PcZ5q04Q0U14SJoRc2Av4QBPfKM3ue6SOqBbSbvRc-o'
);

export const uploadFiles = async (files) => {
  try {
    if (!files || files.length === 0) {
      return [];
    }
    const uploadedFiles = [];
    
    for (const file of files) {
      // Create a unique file name to avoid conflicts
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `tasks/${fileName}`;

      // Upload the file
      const { data, error: uploadError } = await supabase.storage
        .from('task-attachments')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Error uploading file:', uploadError);
        throw new Error(`Failed to upload ${file.name}: ${uploadError.message}`);
      }

      // Get the public URL
      const { data: { publicUrl }, error: urlError } = supabase.storage
        .from('task-attachments')
        .getPublicUrl(filePath);

      if (urlError) {
        console.error('Error getting public URL:', urlError);
        throw new Error(`Failed to get URL for ${file.name}: ${urlError.message}`);
      }

      uploadedFiles.push({
        id: data.path,
        url: publicUrl
      });
    }

    return uploadedFiles;
  } catch (error) {
    console.error('Error in uploadFiles:', error);
    throw error;
  }
};
export default supabase;