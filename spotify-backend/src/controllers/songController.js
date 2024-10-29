import {v2 as cloudinary} from 'cloudinary';
import songModel from '../models/songModel.js';

const addSong = async(req, res)=>{
    try {
        const { name, desc, album, user } = req.body;
        if (!req.files || !req.files.audio || !req.files.audio[0] || !req.files.image || !req.files.image[0]) {
            return res.json({ success: false, message: "Audio and image files are required." });
        }
        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, {resource_type: "video"});
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"});
        const duration = `${Math.floor(audioUpload.duration/60)}:${Math.floor(audioUpload.duration%60)}`;
        
        const songData = {
            name, desc, album,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration,
            user
        };
        
        const song = songModel(songData);
        await song.save();
        res.json({success: true, message: "Song Added"});
    } catch (error) {
        res.json({success: false, message: `${error}`});
    }
};

const listSong = async(req, res)=>{
    try {
        const allSongs = await songModel.find({ user: req.user._id });
        res.json({success: true, songs: allSongs});
    } catch (error) {
        res.json({success: false});
    }
};

const removeSong = async(req,res)=>{
    try {
        await songModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Song removed"});
    } catch (error) {
        res.json({success: false});
    }
}

export {addSong, listSong, removeSong}