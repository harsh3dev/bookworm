import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    favorites: [],
};

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            const exists = state.favorites[0]?.find(book => book.id === action.payload.id);
            if (!exists) {
                state.favorites.push(action.payload);
            }
        },
        removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter(book => book.id !== action.payload);
        },
    },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
