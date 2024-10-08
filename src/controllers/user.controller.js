const User = require("../models/user.model");

module.exports = {
  addNew: async (req, res, next) => {
    try {
      let user = await User.create(req.body);
      if (!user) {
        return res.status(400).json({ message: "data error" });
      }
      return res.status(201).json({ message: "success" });
    } catch (error) {
      return res.status(400).json({ message: error.toString() });
    }
  },

  getAll: async (req, res, next) => {
    try {
      const docs = await User.findAll({});

      return res.status(200).json(docs || []);
    } catch (error) {
      return res.status(400).json({ message: error.toString() });
    }
  },

  getOne: async (req, res, next) => {
    try {
      const doc = await User.findByPk(req.params?.id);
      if (!doc) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(doc);
    } catch (error) {
      return res.status(400).json({ message: error.toString() });
    }
  },

  updateOne: async (req, res, next) => {
    try {
      const doc = await User.findByPk(req.params?.id);
      if (!doc) {
        return res.status(404).json({ message: "User not found" });
      }
      const result = await User.update(req.body, {
        where: { id: req.params?.id },
      });
      if (!result) {
        return res.status(400).json({ message: "Error from data" });
      }
      return res.status(200).json({ message: "success" });
    } catch (error) {
      return res.status(400).json({ message: error.toString() });
    }
  },

  deleteOne: async (req, res, next) => {
    try {
      const doc = await User.destroy({ where: { id: req.params?.id } });
      if (!doc) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ message: "success" });
    } catch (error) {
      return res.status(400).json({ message: error.toString() });
    }
  },
};
