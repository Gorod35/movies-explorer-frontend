import { createContext } from 'react';

export const CurrentUserContext = createContext();

export const currentUser = {
    name: '',
    email: ''
};