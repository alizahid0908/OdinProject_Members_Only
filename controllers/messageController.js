import { Message, User } from '../models/index.js';

export const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.findAll({
            include: [{
                model: User,
                as: 'author',
                attributes: ['firstName', 'lastName', 'isAdmin']
            }],
            order: [['createdAt', 'DESC']]
        });

        res.render('index', {
            messages,
            isMember: req.user?.membershipStatus === 'member',
            isAdmin: req.user?.isAdmin,
            user: req.user
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.render('index', { 
            messages: [], 
            error: 'Error loading messages',
            isMember: false,
            isAdmin: false,
            user: null 
        });
    }
};

export const getNewMessage = (req, res) => {
    res.render('new-message');
};

export const createMessage = async (req, res) => {
    try {
        const { title, content } = req.body;
        
        await Message.create({
            title,
            content,
            authorId: req.user.id
        });

        res.redirect('/');
    } catch (error) {
        console.error('Message creation error:', error);
        res.render('new-message', { error: 'Error creating message' });
    }
};

export const deleteMessage = async (req, res) => {
    try {
        const messageId = req.params.id;
        
        // Check if the user is an admin
        if (!req.user || !req.user.isAdmin) {
            return res.status(403).send('Unauthorized');
        }

        // Delete the message
        await Message.destroy({
            where: {
                id: messageId
            }
        });

        res.redirect('/');
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).send('Error deleting message');
    }
};