import jwt from 'jsonwebtoken';
import { google } from 'googleapis';
import userModel from '../models/userModel.js';

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'postmessage'
);

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

export const googleAuth = async (req, res) => {
    try {
        const { code } = req.query;
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
        const { data } = await oauth2.userinfo.get();

        let user = await userModel.findOne({ email: data.email });
        if (!user) {
            user = await userModel.create({
                name: data.name,
                email: data.email,
                image: data.picture
            });
        }

        const token = createToken(user._id);

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        res.json({
            success: true,
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const validateToken = async (req, res) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
        
        // Find the user by ID
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        res.status(200).json({
            success: true,
            message: 'Token is valid',
            userId: decoded.id,
            user: { // Include user information in the response
                name: user.name,
                email: user.email,
                image: user.image,
            }
        });
    });
};