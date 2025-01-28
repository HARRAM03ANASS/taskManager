// import express from "express";
// import multer from "multer";
// import Tache from "../models/tache.js";
// const router = express.Router();

// // Multer storage configuration
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // File upload route
// router.post("/upload", upload.single("file"), async (req, res) => {
//     try {
//         const file = req.file;

//         if (!file) {
//             return res.status(400).json({ message: "No file uploaded" });
//         }

//         const { data, error } = await supabase.storage
//             .from("task-files")
//             .upload(`tasks/${Date.now()}_${file.originalname}`, file.buffer, {
//                 contentType: file.mimetype,
//             });

//         if (error) {
//             return res.status(500).json({ message: error.message });
//         }

//         const fileUrl = supabase.storage.from("task-files").getPublicUrl(data.path).publicURL;

//         const tacheId = req.body.tacheId;

//         const updatedTache = await Tache.findByIdAndUpdate(
//             tacheId,
//             { $push: { atouts: { id: data.path, url: fileUrl } } },
//             { new: true }
//         );

//         if (!updatedTache) {
//             return res.status(404).json({ message: "Tache not found" });
//         }

//         res.status(200).json({
//             message: "File uploaded and Tache updated successfully",
//             fileUrl,
//             updatedTache,
//         });
//     } catch (error) {
//         console.error("Error uploading file:", error);
//         res.status(500).json({ message: "File upload failed" });
//     }
// });

// export default router;



// import express from "express";
// import multer from "multer";
// import { createClient } from '@supabase/supabase-js';
// import Tache from "../models/tache.js";

// // Initialize Supabase client
// const supabase = createClient(
//     process.env.SUPABASE_URL,
//     process.env.SUPABASE_ANON_KEY
// );

// const router = express.Router();

// // Multer storage configuration
// const storage = multer.memoryStorage();
// const upload = multer({ 
//     storage,
//     limits: {
//         fileSize: 5 * 1024 * 1024, // 5MB limit
//     }
// });

// // File upload route
// router.post("/upload", upload.single("file"), async (req, res) => {
//     try {
//         const file = req.file;
//         const tacheId = req.body.tacheId;

//         // Validate file
//         if (!file) {
//             return res.status(400).json({ message: "No file uploaded" });
//         }

//         // Validate tacheId
//         if (!tacheId) {
//             return res.status(400).json({ message: "Task ID is required" });
//         }

//         // Generate safe filename
//         const timestamp = Date.now();
//         const safeFileName = `${timestamp}_${file.originalname.replace(/[^a-zA-Z0-9.]/g, '_')}`;
//         const filePath = `tasks/${safeFileName}`;

//         // Upload to Supabase
//         const { data, error: uploadError } = await supabase.storage
//             .from("task-files")
//             .upload(filePath, file.buffer, {
//                 contentType: file.mimetype,
//                 cacheControl: "3600",
//                 upsert: false
//             });

//         if (uploadError) {
//             console.error("Supabase upload error:", uploadError);
//             return res.status(500).json({ message: "File upload to storage failed" });
//         }

//         // Get public URL
//         const { data: { publicUrl } } = supabase.storage
//             .from("task-files")
//             .getPublicUrl(filePath);

//         // Update task document
//         const updatedTache = await Tache.findByIdAndUpdate(
//             tacheId,
//             { 
//                 $push: { 
//                     atouts: { 
//                         id: filePath,
//                         url: publicUrl,
//                         name: file.originalname,
//                         type: file.mimetype,
//                         size: file.size,
//                         uploadedAt: new Date()
//                     } 
//                 } 
//             },
//             { new: true }
//         );

//         if (!updatedTache) {
//             // If task not found, delete the uploaded file
//             await supabase.storage
//                 .from("task-files")
//                 .remove([filePath]);
//             return res.status(404).json({ message: "Task not found" });
//         }

//         res.status(200).json({
//             message: "File uploaded and task updated successfully",
//             file: {
//                 url: publicUrl,
//                 name: file.originalname,
//                 type: file.mimetype,
//                 size: file.size
//             },
//             task: updatedTache
//         });

//     } catch (error) {
//         console.error("Error in file upload:", error);
//         res.status(500).json({ 
//             message: "File upload failed",
//             error: error.message 
//         });
//     }
// });

// // Delete file route
// router.delete("/files/:taskId/:fileId", async (req, res) => {
//     try {
//         const { taskId, fileId } = req.params;

//         // Delete from Supabase storage
//         const { error: deleteError } = await supabase.storage
//             .from("task-files")
//             .remove([fileId]);

//         if (deleteError) {
//             return res.status(500).json({ message: "Failed to delete file from storage" });
//         }

//         // Update task document
//         const updatedTache = await Tache.findByIdAndUpdate(
//             taskId,
//             { $pull: { atouts: { id: fileId } } },
//             { new: true }
//         );

//         if (!updatedTache) {
//             return res.status(404).json({ message: "Task not found" });
//         }

//         res.status(200).json({
//             message: "File deleted successfully",
//             task: updatedTache
//         });

//     } catch (error) {
//         console.error("Error deleting file:", error);
//         res.status(500).json({ 
//             message: "File deletion failed",
//             error: error.message 
//         });
//     }
// });

// export default router;




