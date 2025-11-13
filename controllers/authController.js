
import { ObjectId } from "mongodb";
import { getDb } from "../config/db.js";
import bcrypt from "bcrypt";
import path from "path";
import fs from "fs";

const login = async (req, res) => {

    try {            
        const { email, password } = req.body;
        const db = getDb();
        const user = await db.collection("Users").findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email" });
        }
        const equals = await bcrypt.compare(password, user.password);
        if (!user || !equals) {
            return res.status(401).json({ message: "Invalid password" });
        }
        res.status(201).json({ message: "Login successful" });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

const signup = async (req, res) => {
    try {
      const { email, password } = req.body;
      const profilePicture = req.file;
  
      const db = getDb();
      const existingUser = await db.collection("Users").findOne({ email });
  
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = {
        email,
        password: hashedPassword,
        profilePicture: 'uploads/default.png',
        createAt: new Date(),
        preferences: {
          language: "it",
          theme: "light",
        }
      };
  
      const result = await db.collection("Users").insertOne(newUser);
      const userId = result.insertedId;
  
      if (profilePicture) {
        const extension = path.extname(profilePicture.originalname);
        const filename = `${userId}${extension}`;
        const filePath = path.join('uploads', filename);
  
        fs.writeFile(filePath, profilePicture.buffer, async (err) => {
          if (err) {
            console.error("Errore salvataggio file:", err);
            return res.status(500).json({ message: "Error uploading file" });
          }

          await db.collection("Users").updateOne(
            { _id: new ObjectId(userId) },
            { $set: { profilePicture: filePath } }
          );
  
          res.status(201).json({ message: "User created successfully", userId });
        });
      } else {
        res.status(201).json({ message: "User created successfully", userId });
      }
  
    } catch (err) {
      res.status(500).json({ message: "Internal server error", error: err.message });
    }
  };

export { login, signup }

