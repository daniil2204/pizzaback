import { body } from 'express-validator'


export const createPizzaValidation = [
    body('imageUrl', 'Invalid imageUrl format',).isString(),
    body('name', 'Invalid name format',).isLength({min:3}).isString(),
    body('types', 'Invalid types format',).isArray(),
    body('sizes', 'Invalid sizes format',).isArray(),
    body('price', 'Invalid price format',).isInt(),
    body('category', 'Invalid category format',).isArray(),
];