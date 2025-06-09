import { User } from '../models/index.js';

export const getJoinClub = (req, res) => {
    if (!req.user) {
        return res.redirect('/auth/login');
    }
    if (req.user.membershipStatus === 'member') {
        return res.redirect('/');
    }
    res.render('join-club');
};

export const joinClub = async (req, res) => {
    if (!req.user) {
        return res.redirect('/auth/login');
    }

    const { passcode } = req.body;

    if (passcode !== process.env.CLUB_PASSCODE) {
        return res.render('join-club', {
            error: 'Invalid passcode. Try again!'
        });
    }

    try {
        await User.update(
            { membershipStatus: 'member' },
            { where: { id: req.user.id } }
        );

        req.user.membershipStatus = 'member';
        
        res.redirect('/');
    } catch (error) {
        console.error('Membership upgrade error:', error);
        res.render('join-club', {
            error: 'Error upgrading membership. Please try again.'
        });
    }
};