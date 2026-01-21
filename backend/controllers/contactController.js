import { Contact } from "../models/contactModel.js";
import { jsonResponse } from "../middleware/jsonResponse.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return jsonResponse(res, { error: "All fields are required" }, 400);
    }

    let contactEmail = email;
    let userId = null;

    if (req.userId) {
      const isValidEmail = await Contact.validateUserEmail(email, req.userId);
      if (!isValidEmail) {
        return jsonResponse(res, { error: "Email does not match logged-in user" }, 400);
      }
      userId = req.userId;
    }

    const contact = await Contact.create({
      name,
      email: contactEmail,
      phone,
      message,
      userId,
    });

    return jsonResponse(res, { message: "Message saved successfully", contact }, 201);
  } catch (error) {
    return jsonResponse(res, { error: error.message }, 500);
  }
};
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .populate("userId", "name email phone")
      .sort({ createdAt: -1 });
    return jsonResponse(res, contacts, 200);
  } catch (error) {
    return jsonResponse(res, { error: error.message }, 500);
  }
};

export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['New', 'Read', 'Replied'].includes(status)) {
      return jsonResponse(res, { error: "Invalid status" }, 400);
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("userId", "name email phone");

    if (!contact) {
      return jsonResponse(res, { error: "Message not found" }, 404);
    }

    return jsonResponse(res, contact, 200);
  } catch (error) {
    return jsonResponse(res, { error: error.message }, 500);
  }
};