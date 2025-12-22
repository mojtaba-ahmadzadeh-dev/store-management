import multer from "multer";
import path from "path";
import fs from "fs";

// تابع عمومی برای ساخت storage با مسیر مشخص
const createStorage = (folderName) => {
    const uploadPath = path.join("public", "uploads", folderName);

    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

    return multer.diskStorage({
        destination: (req, file, cb) => cb(null, uploadPath),
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path.extname(file.originalname));
        }
    });
};

// Middleware برای product
export const uploadProductImage = multer({ storage: createStorage("products") });

// Middleware برای blog
export const uploadBlogImage = multer({ storage: createStorage("blog") });