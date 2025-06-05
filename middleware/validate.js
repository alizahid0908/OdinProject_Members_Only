import { body } from 'express-validator';

export const validateSignup = [
    body('firstName')
        .trim()
        .isLength({ min: 3 })
        .withMessage('First name must be at least 3 characters long')
        .escape(),
    body('lastName')
        .trim()
        .isLength({ min: 3 })
        .withMessage('Last name must be at least 3 characters long')
        .escape(),
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        })
];