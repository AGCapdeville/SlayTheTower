import { createAction, handleActions } from "redux-actions";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { updateFoe } from './foe';
import { updatePlayer, discardHand, drawCard } from './player';

// export const setupEncounter = createAction('foe/SETUP_ENCOUNTER');
export const updateEncounter = createAction('foe/UPDATE_ENCOUNTER');

const initialState = {};


export default handleActions({
    [updateEncounter]: (state, action) => ({ ...state.encounter, ...action.payload }),
}, initialState);


// how we grab data from the store
const selectEncounter = createSelector(
    state => state.encounter,
    encounter => encounter   
)

export const useEncounter = () => useSelector(selectEncounter);

export const endTurn = () => (dispatch, getState) => {

    var zone = document.getElementById('playerZone');
    console.log("zone", zone)

    zone.style.height = "58vh"
    zone.style.width = "100vw"
    zone.style.backgroundColor = "black"
    zone.style.opacity = .75
    zone.style.position = "absolute"

    var turnBttn = document.getElementById('turnBttn');
    

    var combatMsgs = document.getElementById('combatMsgs');

    combatMsgs.innerHTML = "Foes Turn!"
    setTimeout( function()
    { 
        combatMsgs.innerHTML = "Waiting."; 
        dispatch( discardHand() )
    }, 1000 );
    setTimeout( function(){ combatMsgs.innerHTML = "Waiting.."; }, 1500 );
    setTimeout( function(){ combatMsgs.innerHTML = "Waiting..."; }, 2000 );
    
    const state = getState()
    const player = state.player
    const foe = state.foe

    const telegraphing = foe.telegraphing

    if ( telegraphing[0].effect == "damage" ){
        const dmg = telegraphing[0].power
        const moveMsg = foe.name + " uses " + telegraphing[0].name + " dealing\n" + telegraphing[0].power + " dmg"
        setTimeout( function(){ combatMsgs.innerHTML = moveMsg }, 3000);

        const trample = player.armor - dmg
        if ( trample <= 0 ){
            const newArmor = 0
            const newHealth = player.health + trample
            setTimeout( function(){ dispatch( updatePlayer({ health: newHealth, armor: newArmor }) ) },4000);
            
        } else {
            const newArmor = trample
            setTimeout( function(){ dispatch( updatePlayer({ armor: newArmor }) ) },4000);    
        }
        //  if players health drops to 0, exit game... do that later

    } else if (telegraphing[0].effect == 'armor') {
        const newFoeArmor = telegraphing[0].power
        const moveMsg = foe.name + " uses " + telegraphing[0].name + " gaining\n" + telegraphing[0].power + " armor"
        setTimeout( function(){ combatMsgs.innerHTML = moveMsg }, 3000)
        setTimeout( function(){ dispatch( updateFoe({ armor: newFoeArmor })) },4000);
    }

    // adding in a new foe effects...
    // if ( telegraphing[0].effect == ) 

    const moves = foe.moves
    const lengthOfMoves = Object.keys(moves).length
    const position = telegraphing[0].order

    if ( position + 1 < lengthOfMoves ) {
        const newPos = position+1
        const newTelegraph = moves.filter(obj => {
            if (obj.order === newPos){
                return obj
            }
        })
        
        console.log ("new Telegraph",newTelegraph)
        setTimeout( function(){ dispatch( updateFoe({ telegraphing: newTelegraph }) )}, 4500)
   
    } else {
        const newPos = 0
        const newTelegraph = moves.filter(obj => {
            if (obj.order == newPos){
                return obj
            }        
        })        
        console.log ("new Telegraph",newTelegraph)
        setTimeout( function(){ dispatch( updateFoe({ telegraphing: newTelegraph }) )}, 4500)
    }


    // notify player foe turn is over, and their turn now begins...
    // with that we have to reset player armor & energy
    // could handle everything from getState and updates here...

    // TODO: await (dispatch)... create a function with Await(game action),(how-long). ( A Promise )
    setTimeout( function(){ combatMsgs.innerHTML = "Foe's Turn Over" }, 5000);
    setTimeout( function(){ combatMsgs.innerHTML = "Armor & Energy Reset" }, 6000);
    setTimeout( function(){ dispatch( updatePlayer({ energy: 3, armor:0 }) )}, 6100);
    setTimeout( function(){ combatMsgs.innerHTML = "Your Turn..." }, 7000);
    
    setTimeout( function(){     
        dispatch( drawCard() )
    }, 7000);

    setTimeout( function(){
        dispatch( drawCard() )
    }, 7300);

    setTimeout( function(){
        dispatch( drawCard() )
    }, 7600);

    setTimeout( function(){
        dispatch( drawCard() )
    }, 7900);

    setTimeout( function(){
        dispatch( drawCard() )
        zone.style.height = "0vh"
        zone.style.width = "0vw"

        // turnBttn.cursor = "allowed";
        // turnBttn.backgroundColor = "darkslategrey"
        // turnBttn.style.opacity = 1

    }, 8200);



}