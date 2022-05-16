import PostMessage from "../models/postMessage";
import mongoose from "mongoose";
import User from "../models/user";

export const getPosts = async (req: any, res: any) => {
  const { page } = req.query;

  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await PostMessage.countDocuments({});

    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const searchPosts = async (req: any, res: any) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");
    const post = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.status(200).json({ data: post });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req: any, res: any) => {
  const {
    params: { id },
  } = req;

  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPosts = async (req: any, res: any) => {
  const { body, userId } = req;

  try {
    const user = await User.findById(userId);
    const newPost = new PostMessage({
      ...body,
      creator: user.name,
      createdAt: new Date().toISOString(),
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePosts = async (req: any, res: any) => {
  const {
    params: { id },
    body,
  } = req;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "No post with that id" });

  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(id, body, {
      new: true,
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePosts = async (req: any, res: any) => {
  const {
    params: { id },
    userId,
  } = req;

  if (!userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "No post with that id" });

  try {
    await PostMessage.findByIdAndDelete(id);

    res.status(200).json({ message: "Post Deleted!" });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const likePosts = async (req: any, res: any) => {
  const {
    params: { id },
    userId,
  } = req;

  if (!userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "No post with that id" });

  try {
    const post = await PostMessage.findById(id);

    const postId = post.likes.findIndex((id) => id === userId);

    if (post.likes.includes(userId)) {
      post.likes.splice(postId, 1);
    } else {
      post.likes.push(userId);
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const postComments = async (req: any, res: any) => {
  const {
    params: { id },
    body: { comment },
  } = req;

  try {
    const post = await PostMessage.findById(id);
    post.comments.push(comment);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
