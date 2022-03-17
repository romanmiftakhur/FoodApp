import { Action } from "./action";

const initialState = {
    recipes : [],
    details: [],
    favorite : []
}

function recipeReducer(state = initialState, action) {
    
    switch (action.type) {
        case Action.GET_RECIPES:
            return {
                ...state,
                recipes: action.payload
            };
        case Action.GET_RECIPE:
        return {
            ...state,
            details: action.payload
        };
        case Action.ADD_TO_FAVORITE:
            return {
                ...state,
                favorite: [...state.favorite, action.payload]
            };
        case Action.REMOVE_FROM_FAVORITE:
            return {
                ...state,
                favorite: state.favorite.filter((recipe) => recipe._title !== action.payload._title)
            };
        default:
            return state;
    };
};

export default recipeReducer;