import { User } from '../models/index.js';

export const checkMembership = async (req, res, next) => {
    if (!req.session.userId) {
        res.locals.isMember = false;
        res.locals.isAdmin = false;
        return next();
    }

    try {
        const user = await User.findByPk(req.session.userId);
        if (!user) {
            res.locals.isMember = false;
            res.locals.isAdmin = false;
            return next();
        }
        res.locals.isMember = user.membershipStatus === 'member';
        res.locals.isAdmin = user.isAdmin;
        req.user = user;
        next();
    } catch (error) {
        console.error('Membership check error:', error);
        res.locals.isMember = false;
        res.locals.isAdmin = false;
        next();
    }
};

export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/login');
};