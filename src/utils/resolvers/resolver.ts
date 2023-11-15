import * as yup from 'yup';

export const schema = yup.object().shape({
    name: yup.string().required("Это поле обязательно").typeError("Имя должно содержать только буквы"),
    phone: yup.string().required("Это поле обязательно").matches(/^\+?[\d]+$/, `Телефон должен содержать только цифры и "+"`),
    email: yup.string().required("Это поле обязательно").email("Некорректный формат email"),
});