import { createAction, handleActions } from "redux-actions";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { updateFoe } from './foe';

import { logCombat } from './combat';


// TODO: clean up and organize

// Alter Health, Energy & Defense Actions:
export const updatePlayer = createAction('player/UPDATE_PLAYER');
// export const newRound = createAction('player/NEW_ROUND');

// Deck Actions:
export const setDeck = createAction('player/SET_DECK');
export const drawCard = createAction('player/DRAW_CARD');
export const playCard = createAction('player/PLAY_CARD');

export const playIndexedCard = createAction('player/PLAY_INDEXED_CARD');
export const discardHand = createAction('player/DISCARD_HAND');

export const voidCard = createAction('player/VOID_CARD');
export const shuffleDeck = createAction('player/SHUFFLE_DECK');
export const resetDeck = createAction('player/RESET_DECK')

// Hand actions
export const drawHand = createAction('player/DRAW_HAND');



const initialState = {
    deck: [],
    hand: [],
    discard: [],
    voidDeck: []
}


function shuffle(deck) {
    var j, x, i
    for (i = deck.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        x = deck[i]
        deck[i] = deck[j]
        deck[j] = x
    }
    return deck
}

const reduceResetDeck = ({ hand, deck, discard, voidDeck, ...rest }) => {
    discard = [...discard, ...voidDeck]
    discard = [...discard, ...hand]
    const newDeck = [...deck, ...discard]
    return { ...rest, hand:[], deck:newDeck, voidDeck:[], discard:[] }
}

const reduceDrawCard = ({ discard, deck, hand, ...rest }) => {
    if ( deck.length == 0 ){
        if ( discard.length == 0 ){
            return { ...rest, discard, deck, hand}
        } else {
            const shuffledDiscard = shuffle(discard)
            const grabCard = shuffledDiscard[shuffledDiscard.length-1]
            const newDeck = shuffledDiscard.slice(0, shuffledDiscard.length-1)        
            const newHand = [...hand, grabCard]
            return { ...rest, hand: newHand, deck: newDeck, discard: [] }
        }
    } else {
        return { ...rest, hand: [...hand, deck[deck.length-1]], deck: deck.slice( 0, deck.length -1), discard }
    }
}

const reducePlayCard = ({ discard, hand, ...rest }) => {
    const emptyHand = hand.length < 1;
    
    if (!emptyHand){
        const newHand =  hand.slice( 0, hand.length-1)
        const newDiscard = [...discard, hand[hand.length-1] ]
        return { ...rest, hand: newHand, discard: newDiscard}
    }else{
        return { ...rest, hand, discard}
    }
}

const reducePlayIndexedCard = ({ discard, hand, ...rest } , {payload}) => {
    const emptyHand = hand.length < 1;
    console.log(payload)

    if (!emptyHand){
        const grabCard = hand[payload]
        hand.splice(payload, 1)
        const newHand = hand
        const newDiscard = [...discard, grabCard]
        return { ...rest, hand: newHand, discard: newDiscard}
    }else{
        return { ...rest, hand, discard}
    }
}

const reduceDiscardHand = ({ discard, hand, ...rest }) => {
    const emptyHand = hand.length < 1;

    if (!emptyHand){
        const newHand = []
        const newDiscard = [...discard, ...hand ]
        return { ...rest, hand: newHand, discard: newDiscard}
    }else{
        return { ...rest, hand, discard}
    }
}


export default handleActions({
    [drawHand]: (state) => ({...state, deck: state.deck.slice( 0, state.deck.length -5), hand: [...state.hand, ...state.deck.slice(-5)]}),
    [shuffleDeck]: (state) => ({...state, deck: shuffle(state.deck)}),
    [updatePlayer]: (state, action) => ({ ...state, ...action.payload }),
    [setDeck]: (state, action) => ({...state, deck: action.payload }),
    
    [resetDeck]: reduceResetDeck,

    [drawCard]: reduceDrawCard,
    [playCard]: reducePlayCard,
    
    [playIndexedCard]: reducePlayIndexedCard,
    [discardHand]: reduceDiscardHand,

    [voidCard]: (state, action) => ({...state, hand: state.hand.slice(action.payload, 1), voidPile: [...state.void, state.hand.slice(action.payload, 1)]}),
}, initialState);

// notes:
// might need to see if I can set initialStates later ???????
// [newRound]: (state) => ({...state, energy: initialState.energy, defense: initialState.defense}),
// deck handle:


// how we grab data from the store
const selectPlayer = createSelector(
    state => state.player,
    player => player   
)

export const usePlayer = () => useSelector(selectPlayer);


/* requiredHero :
// a - any hero standing
// o - off needed
// u - util needed
// d - def needed
// do - def & off needed
// ud - util & def needed
// ou - off & util needed
// e - every hero needed
*/
function checkStanding(state, requiredHeros){

    const offHeroStanding = (state.player.offenseHeroStatus === 'standing' ? true : false);
    const defHeroStanding = (state.player.defenseHeroStatus === 'standing' ? true : false);
    const utilHeroStanding = (state.player.utilityHeroStatus === 'standing' ? true : false);

    console.log('standing heros: off:', offHeroStanding, ', def:', defHeroStanding, ', util:',utilHeroStanding);
    console.log('req heros:',requiredHeros);

    switch (requiredHeros) {
        case 'a':
            // console.log('')
            return (offHeroStanding || defHeroStanding || utilHeroStanding);
        case 'o':
            return (offHeroStanding);
        case 'u':
            return (utilHeroStanding);
        case 'd':
            return (defHeroStanding);
        case 'do':
            return (defHeroStanding && offHeroStanding);
        case 'du':
            return (defHeroStanding && utilHeroStanding);
        case 'ou':
            return (offHeroStanding && utilHeroStanding);
        case 'e':
            return (offHeroStanding && defHeroStanding && utilHeroStanding);
    }
}


// Animations START:

function heroStrikeAnimation(heroElement, offBeat){

    let time = 1;

    if (offBeat){
        time = Math.floor(Math.random() * 100); 
    }

    setTimeout( function(){
        heroElement.style.marginLeft = '0px';
    }, 300 + time)
        
    setTimeout( function(){
        heroElement.style.marginLeft = '20px';
    }, 100 + time)

    setTimeout( function(){
        heroElement.style.marginLeft = '40px';
    }, 150 + time)
    
    setTimeout( function(){
        heroElement.style.marginLeft = '65px';
    }, 200 + time)

    setTimeout( function(){
        heroElement.style.marginLeft = '40px';
    }, 240 + time)

    setTimeout( function(){
        heroElement.style.marginLeft = '10px';
    }, 280 + time)

}

function damageFlash(bodyElement){

    setTimeout( function(){
        bodyElement.style.opacity = 1;
    }, 300)
        
    setTimeout( function(){
        bodyElement.style.opacity = .75;
    }, 100)

    setTimeout( function(){
        bodyElement.style.opacity = .5;
    }, 150)
    
    setTimeout( function(){
        bodyElement.style.opacity = 0;
    }, 200)

    setTimeout( function(){
        bodyElement.style.opacity = .75;
    }, 240)

    setTimeout( function(){
        bodyElement.style.opacity = 0;
    }, 280)
    
}

// Animations END

function moveHero(requiredHeros, offHeroBody, defHeroBody, utilHeroBody){

    switch (requiredHeros) {
        case 'a':
            let choice = Math.floor(Math.random() * 3); 
            if (choice === 1) {
                heroStrikeAnimation(offHeroBody);
            }else if( choice === 2){
                heroStrikeAnimation(defHeroBody);
            }else{
                heroStrikeAnimation(utilHeroBody);
            }
            break;
        case 'o':
            heroStrikeAnimation(offHeroBody);
            break;
        case 'u':
            heroStrikeAnimation(utilHeroBody);
            break;
        case 'd':
            heroStrikeAnimation(defHeroBody);
            break;
        case 'do':
            heroStrikeAnimation(offHeroBody);
            heroStrikeAnimation(defHeroBody);
            break;
        case 'du':
            heroStrikeAnimation(defHeroBody);
            heroStrikeAnimation(utilHeroBody);
            break;
        case 'ou':
            heroStrikeAnimation(offHeroBody);
            heroStrikeAnimation(utilHeroBody);
            break;
        case 'e':
            heroStrikeAnimation(offHeroBody);
            heroStrikeAnimation(defHeroBody);
            heroStrikeAnimation(utilHeroBody);
            break;
    }
}


// Async Actions
export const applyCard = (cardIndex) => (dispatch, getState) => {
    const state = getState();

    // delay:
    // setTimeout( function(){     
    //     dispatch( drawCard() )
    // }, 7000);

    const card = state.player.hand[cardIndex]
    const energyCost = card.energy;
    const standing = checkStanding(state, card.requiredHero);
        
    const foeDefense = state.foe.defense

    // This is how we parse players played cards in the game....
    // What checks do we need to do? 
    //  1. Player energy
    //  2. Player has required party members for said card.
    //
    // If the above are okay, we then procced to parse the cards action:
    //   1. Expend energy cost of card (if needed)
    //   2. Play animation of party attacking/ defending/ skill
    //   3. Subtract health from monster.
    //   4. tbc....


    // attempt animation...
    let offHeroBody = document.getElementById('offHero');
    let defHeroBody = document.getElementById('defHero');
    let utilHeroBody = document.getElementById('utilHero');



    if (energyCost <= state.player.energy) {
        if (standing){
        
            moveHero(card.requiredHero, offHeroBody, defHeroBody, utilHeroBody);

            const newEnergy = state.player.energy - energyCost


            // TARGET: FOE
            if (card.action.target=="foe"){    


                // FOE DAMAGED
                if (card.action.effect=="damage"){

                    let foeBody = document.getElementById('foeBody');
                    console.log('GET foeBody: ',foeBody);
                    damageFlash(foeBody);

                    const damage = card.action.power;
                    const trample = foeDefense - damage;
                    if (trample < 0) {
                        const newFoeHealth = parseInt(state.foe.health) + parseInt(trample);
                        dispatch(updateFoe({ health: newFoeHealth, defense: 0}));
                        dispatch(logCombat({ origin: 'player', description: ('Player used: '+card.name+' dealing '+((-1)*(trample))+' damage.' ) }))
                    }else{
                        const newFoeDefense = trample;
                        dispatch(updateFoe({ defense: newFoeDefense }));
                        dispatch(logCombat({ origin: 'player', description: ('Player used: '+card.name+' dealing 0 damage.' ) }))
                    }
                    dispatch(updatePlayer({ energy: newEnergy }));
                }



            } else {
                if (card.action.effect=="heal"){
                    const heal = card.action.power
                    const newPlayerHealth = parseInt(state.player.health) + parseInt(heal)
                    dispatch(updatePlayer({ health: newPlayerHealth, energy: newEnergy }))
                    dispatch(logCombat({ origin: 'player', description: ('Player used: '+card.name+' healing '+heal+' party health' ) }))

                } else if (card.action.effect=="defense"){
                    const defense = card.action.power
                    const newPlayerDefense = parseInt(state.player.defense) + parseInt(defense)
                    dispatch(updatePlayer({ defense: newPlayerDefense, energy: newEnergy}))
                    dispatch(logCombat({ origin: 'player', description: ('Player used: '+card.name+' gaining '+defense+' party defense' ) }))
                }
            }
            dispatch(playIndexedCard(cardIndex))

        }else{
            console.log('! Required hero not standing !')
        }
    } else {
        // replace with sound?
        console.log("! Not Enough Energy !")
    }


}



