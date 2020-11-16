import { createAction, handleActions } from "redux-actions";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { updateMonster } from './monster';

import { updatePlayer, discardHand, drawCard } from './player';


export const updateCombat = createAction('combat/UPDATE_COMBAT');
export const logCombat = createAction('combat/LOG_COMBAT');
export const resetCombatLog = createAction('combat/RESET_COMBAT_LOG');

const initialState = {
    combatLog : 
        [{
            origin: 'player',
            description: 'Start of combat'
        }]
};

export default handleActions({
    [updateCombat]: (state, action) => ({ ...state, ...action.payload }),
    [logCombat]: (state, action) => ({ ...state.combatLog, combatLog: [...state.combatLog, action.payload] })
}, initialState);


// how we grab data from the store
const selectCombat = createSelector(
    state => state.combat,
    combat => combat   
)

export const useCombat = () => useSelector(selectCombat);


function strikeAnimation(bodyElement){

    setTimeout( function(){
        bodyElement.style.marginLeft = '15px';
    }, 300)
        
    setTimeout( function(){
        bodyElement.style.marginLeft = '10px';
    }, 100)
    
    setTimeout( function(){
        bodyElement.style.marginLeft = '0px';
    }, 200)

    setTimeout( function(){
        bodyElement.style.marginLeft = '5px';
    }, 240)
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


function reduceAligments(player){

    console.log('reducing aligment durration!')

    for (let index = 0; index < player.offenseHeroAilgments.length; index++) {
        if ( parseInt(player.offenseHeroAilgmentsDuration[index]) - 1 === 0 ){
            // last turn with given ailgment.
            player.offenseHeroAilgmentsDuration[index] -= 1;

        }else if ( parseInt(player.offenseHeroAilgmentsDuration[index]) - 1 < 0 ){
            // aligment is removed.
            player.offenseHeroAilgments.splice(index,1);
            player.offenseHeroAilgmentsDuration.splice(index,1);
        }
    }

    for (let index = 0; index < player.utilityHeroAilgments.length; index++) {
        console.log( 'aligment:', player.utilityHeroAilgments[index], 'lasting:', parseInt(player.utilityHeroAilgmentsDuration[index]) )
        if ( parseInt(player.utilityHeroAilgmentsDuration[index]) - 1 === 0 ){
            // last turn with given ailgment.
            player.utilityHeroAilgmentsDuration[index] -= 1;

        }else if ( parseInt(player.utilityHeroAilgmentsDuration[index]) - 1 < 0 ){
            // aligment is removed.
            player.utilityHeroAilgments.splice(index,1);
            player.utilityHeroAilgmentsDuration.splice(index,1);
            
        }
    }

    for (let index = 0; index < player.defenseHeroAilgments.length; index++) {
        if ( parseInt(player.defenseHeroAilgmentsDuration[index]) - 1 === 0 ){
            // last turn with given ailgment.
            player.defenseHeroAilgmentsDuration[index] -= 1;

        }else if ( parseInt(player.defenseHeroAilgmentsDuration[index]) - 1 < 0 ){
            // aligment is removed.
            player.defenseHeroAilgments.splice(index,1);
            player.defenseHeroAilgmentsDuration.splice(index,1);
        }
    }
}

function reduceMonsterAligments(monster){
    for (let index = 0; index < monster.aligment.length; index++) {
        if ( parseInt(monster.aligmentDuration[index]) - 1 === 0 ){
            // last turn with given ailgment. Maybe...
            monster.aligmentDuration[index] -= 1;

        }else if ( parseInt(monster.utilityHeroAilgmentsDuration[index]) - 1 < 0 ){
            // aligment is removed.
            monster.aligmentDuration.splice(index,1);
            monster.aligment.splice(index,1);
        }
    }
}

export const endTurn = () => (dispatch, getState) => {

    let playerOverlay = document.getElementById('playerOverlay');


    playerOverlay.style.height = "40vh"
    playerOverlay.style.width = "100vw"
    playerOverlay.style.backgroundColor = "black"
    playerOverlay.style.opacity = .75
    playerOverlay.style.position = "absolute"
    playerOverlay.style.zIndex = 100
    playerOverlay.style.bottom = 0
    
    setTimeout( function(){ 
        dispatch( discardHand() )
    }, 1000 );

    const state = getState()
    const player = state.player
    const monster = state.monster

    const telegraphing = monster.telegraphing

    reduceMonsterAligments(monster);

    if ( !monster.aligment.includes('blind') ){

        if ( telegraphing[0].effect == "damage" ){


            const dmg = telegraphing[0].power
            const moveMsg = monster.name + " used " + telegraphing[0].name + ", dealing\n" + telegraphing[0].power + " damage."

            setTimeout( function(){
                dispatch(logCombat( {origin:'monster', description:moveMsg} ), 1000)
            }, 1000);

            const trample = player.defense - dmg
            if ( trample <= 0 ){
                const newDefense = 0
                const newHealth = player.health + trample
                setTimeout( function(){ dispatch( updatePlayer({ health: newHealth, defense: newDefense }) ) },1000);
                
            } else {
                const newDefense = trample
                setTimeout( function(){ dispatch( updatePlayer({ defense: newDefense }) ) },1000);    
            }


        } else if (telegraphing[0].effect == 'defense') {


            const newDefense = telegraphing[0].power
            const moveMsg = monster.name + " used " + telegraphing[0].name + ", gained\n +" + telegraphing[0].power + " defense."

            setTimeout( function(){
                //  combatMsgs.innerHTML = moveMsg 
                dispatch(logCombat( {origin:'monster', description:moveMsg} ), 1000)
            }, 1000)

            setTimeout( function(){ 
                dispatch( updateMonster({ defense: newDefense })) 
            },1100);


        }
    }

    const moves = monster.moves
    const lengthOfMoves = Object.keys(moves).length
    const position = telegraphing[0].order

    if ( position + 1 < lengthOfMoves ) {
        const newPos = position+1
        const newTelegraph = moves.filter(obj => {
            if (obj.order === newPos){
                return obj
            }
        })
        
        // console.log ("new Telegraph",newTelegraph)
        setTimeout( function(){ dispatch( updateMonster({ telegraphing: newTelegraph }) )}, 1200)
   
    } else {
        const newPos = 0
        const newTelegraph = moves.filter(obj => {
            if (obj.order == newPos){
                return obj
            }        
        })        
        // console.log ("new Telegraph",newTelegraph)
        setTimeout( function(){ dispatch( updateMonster({ telegraphing: newTelegraph }) )}, 1200)
    }

    reduceAligments(state.player);


    setTimeout( function(){
        dispatch( updatePlayer({ energy: 3, defense: 0 }) 
    )}, 1200);
    
    setTimeout( function(){     
        dispatch( drawCard() )
    }, 1500);

    setTimeout( function(){
        dispatch( drawCard() )
    }, 2000);

    setTimeout( function(){
        dispatch( drawCard() )
    }, 2500);

    setTimeout( function(){
        dispatch( drawCard() )
    }, 3000);

    setTimeout( function(){
        dispatch( drawCard() )
        playerOverlay.style.height = "0vh"
        playerOverlay.style.width = "0vw"
    }, 3500);


}

