const express =require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

router.get("/", postsController.getAllPosts);
router.get("/create-post", postsController.createNewPostGet)
router.post("/create-post", postsController.createNewPostPost)
module.exports = router;
