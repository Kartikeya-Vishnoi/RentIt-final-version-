import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
import { logError, logInfo } from "../util/logging.js";
import validateAllowedFields from "../util/validateAllowedFields.js";
import { Category } from "./Category.js";

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  imageURL: { type: String, required: true },
  price: { type: Number, default: 0 },
  deposit: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  renter_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    required: true,
  },
});

const Item = mongoose.model("items", itemSchema);

// find category id based on category name
const getCategoryIdByName = async (categoryName) => {
  try {
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      throw new Error(`Category not found for name: ${categoryName}`);
    }
    return category._id;
  } catch (error) {
    logError(error);
    throw error;
  }
};

// map category-id to each item in our itemData
const updateItemDataWithCategories = async (itemsData) => {
  for (const item of itemsData) {
    try {
      const categoryId = await getCategoryIdByName(item.category);
      if (categoryId) {
        item.category_id = categoryId;
      } else {
        logError(`Category not found for item with category ${item.category}`);
      }
    } catch (error) {
      logError(
        `Error updating item data for category ${item.category}: ${error}`
      );
    }
  }
};

// Sample data for seeding
const itemsData = [];

const initializeItems = async () => {
  try {
    const count = await Item.countDocuments({});
    if (count === 0) {
      await updateItemDataWithCategories(itemsData);
      await Item.insertMany(itemsData);
      logInfo("Initial items inserted successfully");
    } else {
      logInfo("items already exist");
    }
  } catch (error) {
    logError(error);
  }
};

export const validateItem = (itemObject) => {
  const errorList = [];
  const allowedKeys = [
    "title",
    "description",
    "category",
    "imageURL",
    "price",
    "deposit",
    "renter_id",
    "category_id",
  ];

  const validatedKeysMessage = validateAllowedFields(itemObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (itemObject.title == null) {
    errorList.push("title is a required field");
  }

  if (itemObject.category == null) {
    errorList.push("category is a required field");
  }

  if (itemObject.imageURL == null) {
    errorList.push("imageURL is a required field");
  }

  if (itemObject.price == null && itemObject.deposit == null) {
    errorList.push("Either price or deposit is required");
  }

  if (itemObject.renter_id == null) {
    errorList.push("renter_id is a required field");
  }

  if (itemObject.category_id == null) {
    errorList.push("category_id is a required field");
  }

  return errorList;
};

export { Item, initializeItems };
