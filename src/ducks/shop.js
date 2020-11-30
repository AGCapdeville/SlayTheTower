import { createAction, handleActions } from "redux-actions";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import {cards} from "../game-data/card-data"
import { rest } from "lodash";

export const updateShop = createAction('shop/UPDATE_SHOP');
export const setupShop = createAction('shop/SETUP_SHOP');
export const boughtCard = createAction('shop/BOUGHT_CARD');

const initialState = {
    shopCards: []
}

function rollDice(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}

const reduceSetUpShop = ({ shopCards, ...rest}) => {
    let newShopCards = [...shopCards, cards[rollDice(3,cards.length)], cards[rollDice(3,cards.length)]]
    return { ...rest, shopCards: newShopCards}
}

const reduceBoughtCard = ({shopCards}, {payload}) => {
    shopCards.splice(payload, 1)
    return {...rest, shopCards: shopCards}
}

export default handleActions({
    [updateShop]: (state, action) => ({ ...state, ...action.payload }), 
    [setupShop]: reduceSetUpShop,
    [boughtCard]: reduceBoughtCard,
}, initialState);


const selectShop = createSelector(
    state => state.shop,
    shop => shop   
)

export const useShop = () => useSelector(selectShop);


