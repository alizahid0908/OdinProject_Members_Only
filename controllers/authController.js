import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import { User } from '../models/index.js';
import passport from 'passport';

export const signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('signup', { 
            errors: errors.array(),
            oldInput: req.body 
        });
    }

    try {
        const { firstName, lastName, email, password, isAdmin } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.render('signup', {
                errors: [{ msg: 'Email already registered' }],
                oldInput: req.body
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            membershipStatus: 'basic',
            isAdmin: isAdmin === 'on'
        });

        req.login(user, (err) => {
            if (err) {
                console.error('Login error:', err);
                return next(err);
            }
            return res.redirect('/');
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.render('signup', {
            errors: [{ msg: 'Error creating account. Please try again.' }],
            oldInput: req.body
        });
    }
};

export const getLogin = (req, res) => {
    res.render('login', { error: req.flash('error') });
};

export const login = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
});

export const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
};

export const getSignup = (req, res) => {
    res.render('signup');
};