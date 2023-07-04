const { default: mongoose } = require("mongoose");
const BlogModel = require("../models/blogModel");

const isValid = (value) => {
  if (typeof value === "string" && value.trim().length === 0) return false;
  if (typeof value === "undefined" || value === null) return false;
  return true;
};

const isValidObjectId = function (objId) {
  return mongoose.Types.ObjectId.isValid(objId);
};

const createBlog = async function (req, res) {
  try {
    let data = req.body;

    if (!isValid(data.title)) {
      return res
        .status(400)
        .send({ status: false, message: "title is required" });
    }
    if (!isValid(data.body)) {
      return res
        .status(400)
        .send({ status: false, message: "body is required" });
    }
    if (!isValid(data.category)) {
      return res
        .status(400)
        .send({ status: false, message: "category is required" });
    }
    let blogCreated = await BlogModel.create(data);
    return res.status(200).send({
      status: true,
      message: "Blog created successfully",
      data: blogCreated,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getAllBlogs = async function (req, res) {
  try {
    let data = req.query;
    //let { title, category } = data;
    let blogData = await BlogModel.find({ isDeleted: false, ...data }).sort({
      createdAt: 1,
    });
    if (blogData.length === 0) {
      return res.status(404).send({ status: false, message: "Blog not found" });
    }
    return res.status(200).send({ status: true, data: blogData });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
const getBlog = async function (req, res) {
  try {
    let blogId = req.params.id;

    if (!blogId) {
      return res
        .status(404)
        .send({ status: false, message: `blogId not found` });
    }
    if (!isValidObjectId(blogId)) {
      return res.status(400).send({ status: false, message: `invalid blogId` });
    }
    let blogData = await BlogModel.find({ isDeleted: false, _id: blogId });
    if (blogData.length === 0) {
      return res.status(404).send({ status: false, message: "Blog not found" });
    }
    return res.status(200).send({ status: true, data: blogData });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const updateBlog = async function (req, res) {
  try {
    let blogId = req.params.id;
    console.log(blogId);
    if (!blogId) {
      return res
        .status(404)
        .send({ status: false, message: `blogId not found` });
    }
    if (!isValidObjectId(blogId)) {
      return res.status(400).send({ status: false, message: `invalid blogId` });
    }
    let { title, category, body } = req.body;

    let updation = await BlogModel.findOneAndUpdate(
      { _id: blogId, isDeleted: false },
      { $set: { title: title, body: body, category: category } },
      { new: true }
    );
    if (!updation) {
      return res.status(404).send({ status: false, message: `blog not found` });
    }
    return res.status(200).send({ status: true, data: updation });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const deleteBlog = async function (req, res) {
  try {
    let blogId = req.params.id;
    if (!blogId) {
      return res
        .status(404)
        .send({ status: false, message: `BlogId not found` });
    }
    if (!isValidObjectId(blogId)) {
      return res.status(400).send({ status: false, message: `Invalid blogId` });
    }

    let deletion = await BlogModel.findOneAndUpdate(
      { _id: blogId, isDeleted: false },
      { $set: { isDeleted: true, deletedAt: new Date() } },
      { new: true }
    );
    console.log("hi ", deletion);
    if (!deletion) {
      return res.status(404).send({ status: false, message: `blog not found` });
    }
    return res.status(200).send({ status: true, message: `blog deleted` });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { createBlog, getAllBlogs, getBlog, updateBlog, deleteBlog };
