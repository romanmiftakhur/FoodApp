import axios from 'axios';
import { BASE_URL } from '../config';

export const Action = {
    GET_RECIPES : 'GET_RECIPES',
    GET_RECIPE : 'GET_RECIPE',
    ADD_TO_FAVORITE : 'ADD_TO_FAVORITE',
    REMOVE_FROM_FAVORITE : 'REMOVE_FROM_FAVORITE',
    ON_ERROR : 'ON_ERROR'
}

export const getRecipes = () => {

    try {
        return async dispatch => {
            const source = axios.CancelToken.source();
            const url = `${BASE_URL}/recipes`;
            const response = await axios.get(url, { cancelToken: source.token });

            if (response.data.results) {
                dispatch({
                    type: Action.GET_RECIPES,
                    payload: response.data.results
                })
            } else {
                dispatch({
                    type: Action.ON_ERROR,
                    payload: 'Data Fetching Failed'
                })
            }
        }
    } catch (error) {
        dispatch({
            type: Action.ON_ERROR,
            payload: 'Data Fetching Cancelled'
        })
    }
};

export const getRecipe = (key) => {
    try {
        return async dispatch => {
            const source = axios.CancelToken.source();
            const url = `${BASE_URL}/recipe/${key}`;
            const response = await axios.get(url, { cancelToken: source.token});

            if ( response.data.results) {
                dispatch({
                    type: Action.GET_RECIPE,
                    payload: [response.data.results]
                })
            } else {
                dispatch({
                    type: Action.ON_ERROR,
                    payload: 'Data Fetching Failed'
                })
            }
        }
    } catch (error) {
        dispatch({
            type: Action.ON_ERROR,
            payload: "Data Fetching Cancelled"
        })
    }
};

export const addToFavorite = (recipe) => dispatch => {
    
    dispatch({
        type: Action.ADD_TO_FAVORITE,
        payload: recipe
    })
};

export const removeFromFavorite = (recipe) => dispatch => {

    dispatch({
        type: Action.REMOVE_FROM_FAVORITE,
        payload: recipe
    })
};


