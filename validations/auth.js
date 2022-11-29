import {body} from 'express-validator'

export const registerValidation=[
    body("password", "Проблемы с полем пароль").isLength({min:5}),
    body("nickName", "Введите правильно ник в ТГ").isLength({min:3}),
    body("fullName", "Введите ваше имя").isLength({min:3}),
    body("tel", "Не правильно указан телефон").isLength({min:10, max:13}),
    body("avatarUrl", "неверная ссылка на авку").optional().isURL()
]