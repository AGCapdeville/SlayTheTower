import { createAction, handleActions } from "redux-actions";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import {cards} from "../game-data/card-data"

export const updateShop = createAction('shop/UPDATE_SHOP');
export const setupShop = createAction('shop/SETUP_SHOP');

const initialState = {
    shopCards: []
}

function rollDice(max) {
    return 1 + Math.floor(Math.random()*max)
}

const reduceSetUpShop = ({ shopCards, ...rest}) => {

    console.log("0 : roll D10:", rollDice(10))
    console.log("1 : roll D10:", rollDice(10))
    console.log("2 : roll D10:", rollDice(10))
    //3 4 5 6
    let newShopCards = [...shopCards, cards[3], cards[3], cards[3] ]
    return { ...rest, shopCards: newShopCards}
}


export default handleActions({
    [updateShop]: (state, action) => ({ ...state, ...action.payload }),
    [setupShop]: reduceSetUpShop
}, initialState);


const selectShop = createSelector(
    state => state.shop,
    shop => shop   
)

export const useShop = () => useSelector(selectShop);


