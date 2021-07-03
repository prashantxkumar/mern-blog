
const formidable = require('formidable');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const Post = require('../models/Post');
const CommentSchema = require('../models/Comment');
const {body, validationResult} = require('express-validator');

module.exports.createPost = (req, res)=>{
    const form = formidable({multiples: true});
    form.parse(req, async (error, fields, files)=>{
        const errors =[];
        const {title, body, description, slug, id, name}=fields;
        
        if(title === ''){
            errors.push({msg: "Title is required"});
        }
        if(body === ''){
            errors.push({msg: "Body is required"});
        }
        if(description === ''){
            errors.push({msg: "Description is required"});
        }
        if(slug === ''){
            errors.push({msg: "Slug is required"});
        }
        if(Object.keys(files).length === 0){
            errors.push({msg: "Image is required"});
        }else{
            const { type } = files.image;
            const split = type.split('/');
            const extension = split[1].toLowerCase();

            if(extension !=='jpg' && extension !=='jpeg' && extension !=='png'){
                errors.push({msg: `${extension} is not a valid extension`})
            }else{
                files.image.name = uuidv4() + '.'+extension;
            }

        }

        const checkSlug = await Post.findOne({slug});
        
        if(checkSlug){
            errors.push({msg: 'Please choose a unique URL'});
        }

        if(errors.length !== 0){ 
            
            return res.status(400).json({errors, files});
        
        }else{

            const newPath = __dirname + `/../client/build/images/${files.image.name}`;

            fs.copyFile(files.image.path, newPath, async (error)=>{
                if(!error){
                    try{
                        const response = await Post.create({
                            title,
                            body,
                            image: files.image.name,
                            description,
                            slug,
                            userName: name,
                            userId: id,
                        });
                        
                        return res.status(200).json({msg: 'You post has been created successfully', response});

                    }catch(error){
                        return res.status(500).json({errors: error, msg: error.message});
                    }
                }
            });

        }
    })
};

module.exports.fetchPosts = async (req, res)=>{
    const id = req.params.id;
    const page = req.params.page;
    const perPage = 3;
    const skip = (page - 1) * perPage;
    try {

        const count = await Post.find({userId: id}).countDocuments(); 

        const response = await Post.find({userId: id}).skip(skip).limit(perPage).sort({updatedAt: -1});

        return res.status(200).json({response: response, count, perPage});
    
    } catch (error) {
    
        return res.status(500).json({errors: error, msg: error.message});
    
    }
}

module.exports.fetchPost = async (req, res) => {
	const id = req.params.id;

	try {
		const post = await Post.findOne({ _id: id });
		return res.status(200).json({ post });
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ errors: error, msg: error.message });
	}
};

module.exports.updateValidations = [
	body('title').notEmpty().trim().withMessage('Title is required'),
	body('body').notEmpty().trim().withMessage('Body is required'),
	body('description').notEmpty().trim().withMessage('Description is required'),
];
module.exports.updatePost = async (req, res) => {
	const { title, body, description, id } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	} else {
		try {
			const response = await Post.findByIdAndUpdate(id, {
				title,
				body,
				description,
			});
			return res.status(200).json({ msg: 'Your post has been updated' });
		} catch (error) {
			return res.status(500).json({ errors: error, msg: error.message });
		}
	}
};

module.exports.updateImage = (req, res)=>{
    const form = formidable({multiples: true});
    form.parse(req, (errors, fields, files)=>{
        const imageErrors = [];
        const {id}=fields;
        if(Object.keys(files).length === 0){
            imageErrors.push({msg : 'Please choose image'});
        }else{
            const {type} = files.image;
            const split = type.split('/');
            const extension = split[1].toLowerCase();
            if(extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png'){
                imageErrors.push({msg : `${extension} is not a valid extension`});
            }else{
                files.image.name = uuidv4() + '.'+extension;
            }
        }
        if(imageErrors.length !== 0 ){
            return res.status(400).json({errors: imageErrors});
        }else{
            const newPath = __dirname + `/../client/build/images/${files.image.name}`;
            fs.copyFile(files.image.path, newPath, async(error)=>{
                if(!error){
                    try {
                        const response = await Post.findByIdAndUpdate(id, {image: files.image.name});
                        return res.status(200).json({msg: 'Your image has been updated successfuly'});
                    } catch (error) {
                        return res.status(500).json({errors: error, msg: error.message});
                    }
                }
            })           
        }
    })
}

module.exports.deletePost = async (req, res)=>{
    const id = req.params.id;
    
    try {
        const esponse = await Post.findByIdAndRemove(id);
        return res.status(200).json({msg: "Your post has been deleted successfully"})
    } catch (error) {
        return res.status(500).json({errors: error, msg: error.message});

    }
    
}

module.exports.home = async (req, res)=>{
    const page = req.params.page;
    const perPage = 6;

    const skip = (page - 1)* perPage;
    try {
        const count = await Post.find({}).countDocuments();
        const posts = await Post.find({}).skip(skip).limit(perPage).sort({updatedAt: -1});
        return res.status(200).json({response: posts, count, perPage});
    } catch (error) {
        return res.status(500).json({errors: error, msg: error.message});
    }

};

module.exports.postDetails = async (req, res) => {
	const id = req.params.id;
	try {
		const post = await Post.findOne({ slug: id });
		const comments = await CommentSchema.find({ postId: post._id }).sort({
			updatedAt: -1,
		});
		return res.status(200).json({ post, comments });
        
	} catch (error) {
		return res.status(500).json({ errors: error, msg: error.message });
	}
};

module.exports.postComment = async (req, res) => {
	const { id, comment, userName } = req.body;


	try {
		const response = await CommentSchema.create({
			postId: id,
			comment,
			userName,
		});
		return res.status(200).json({ msg: 'Your comment has been posted' });
	} catch (error) {
		return res.status(500).json({ errors: error, msg: error.message });
	}
};