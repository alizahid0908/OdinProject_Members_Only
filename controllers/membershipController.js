import { User } from '../models/index.js';

export const getJoinClub = (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/auth/login');
    }
    res.render('join-club');
};

export const joinClub = async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/auth/login');
    }

    const { passcode } = req.body;

    if (passcode !== process.env.CLUB_PASSCODE) {
        return res.render('join-club', {
            error: 'Invalid passcode'
        });
    }

    try {
        await User.update(
            { membershipStatus: 'member' },
            { where: { id: req.session.userId } }
        );
        res.redirect('/messages'); // Redirect to messages page after successful upgrade
    } catch (error) {
        console.error('Membership upgrade error:', error);
        res.render('join-club', {
            error: 'Something went wrong. Please try again.'
        });
    }
};