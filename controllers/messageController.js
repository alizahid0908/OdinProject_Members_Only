import { Message, User } from '../models/index.js';

export const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.findAll({
            include: [{
                model: User,
                as: 'author',
                attributes: ['firstName', 'lastName']
            }],
            order: [['createdAt', 'DESC']]
        });

        res.render('index', {
            messages,
            user: req.user,
            isMember: req.user?.membershipStatus === 'member',
            isAdmin: req.user?.isAdmin
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.render('index', { 
            messages: [], 
            error: 'Error loading messages'
        });
    }
};

export const getNewMessage = (req, res) => {
    res.render('new-message');
};

export const createMessage = async (req, res) => {
    try {
        if (!req.user) {
            return res.redirect('/auth/login');
        }

        const { title, content } = req.body;
        await Message.create({
            title,
            content,
            authorId: req.user.id
        });

        res.redirect('/');
    } catch (error) {
        console.error('Error creating message:', error);
        res.render('new-message', { 
            error: 'Error creating message'
        });
    }
};

export const deleteMessage = async (req, res) => {
    try {
        if (!req.user?.isAdmin) {
            return res.status(403).send('Unauthorized');
        }

        await Message.destroy({
            where: { id: req.params.id }
        });

        res.redirect('/');
    } catch (error) {
        console.error('Error deleting message:', error);
        res.redirect('/');
    }
};