import { body } from 'express-validator'


export const registerValidation = [
    body('email', 'Invalid email format').isEmail(),
    body('password', 'Invalid password format').isLength({ min: 5}),
    body('fullName', 'Invalid fullName format').isLength({ min: 3}),
];

export const loginValidation = [
    body('email', 'Invalid email format!!!').isEmail(),
    body('password', 'Invalid password format').isLength({ min: 5}),
];