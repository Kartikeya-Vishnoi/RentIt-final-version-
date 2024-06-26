import Message from "../models/Message.js";
import { logError } from "../util/logging.js";
import CryptoJS from 'crypto-js';
import dotnev from 'dotenv'
dotnev.config();

const secretKey = process.env.secretKey

// Function to encrypt a message
const encryptMessage = (message) => {
  return CryptoJS.AES.encrypt(message, secretKey).toString();
};

// Function to decrypt a message
const decryptMessage = (encryptedMessage) => {
  const bytes = CryptoJS.AES.decrypt(encryptedMessage, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};


// Controller function to create a new message
export const createMessage = async (message) => {
  try {
    const { userName, text, pic, room, time } = message;

    // Encrypt the message text using AES
    const encryptedText = encryptMessage(text);

    // Create a new Message instance with the encrypted text
    const newMessage = new Message({ userName, text: encryptedText, pic, room, time });

    // Save the new message
    const savedMessage = await newMessage.save();

    return savedMessage;
  } catch (error) {
    logError(error);
    throw new Error("Error saving message");
  }
};

// Controller function to get all messages for a room
export const getMessagesByRoom = async (room) => {
  try {
    const messages = await Message.find({ room });

    // Decrypt the text of each message
    const messagesWithDecryptedText = messages.map(message => ({
      ...message.toObject(),
      text: decryptMessage(message.text)
    }));

    return messagesWithDecryptedText;
  } catch (error) {
    logError("Error retrieving messages:", error);
    return []; // Return an empty array or handle the error as needed
  }
};

export const deleteAllmessages = async (req, res) => {
  try {
    // Delete all documents from the Message collection
    await Message.deleteMany({});
    res.status(200).json({ message: "Collection cleared successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
