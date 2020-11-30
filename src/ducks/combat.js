import { createAction, handleActions } from "redux-actions";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { updateMonster } from './monster';

import { updatePlayer, discardHand, drawCard, addCardDiscard, addAilgments, playCard } from './player';
import {afflictionCards} from '../game-data/affliction-card-data';

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
    let transitionTime = 500;
    bodyElement.animate([
        {transform: 'translate(0px,0px)'},
        {transform: 'translate(-50px, 0px)'},
        {transform: 'translate(-105px, 0px)'},
        {transform: 'translate(1px, 0px)'},
        {transform: 'translate(0, 0px)'}

    ], {
        duration: transitionTime,
        iterations: 1
    });
}

function hitHero(){
    let roll = getRandomRange(0,3);

    switch (roll) {
        case 0:
            damageFlash(document.getElementById('mageBody'))
            break;
        case 1:
            damageFlash(document.getElementById('swordBody'))
            break;
        case 2:
            damageFlash(document.getElementById('shieldBody'))
            break;
    }
}

function damageFlash(bodyElement){

    let transitionTime = 500;
    bodyElement.animate([
        {opacity: 1},
        {opacity: 0},
        {opacity: .75},
        {opacity: .5},
        {opacity: 0},
        {opacity: .75},
        {opacity: 1}

    ], {
        duration: transitionTime,
        iterations: 1
    });
    
}


function reduceAligments(player){

    for (let index = 0; index < player.offenseHeroAilgments.length; index++) {
        if ( parseInt(player.offenseHeroAilgmentsDuration[index]) - 1 > 0 ){
            // last turn with given ailgment.
            player.offenseHeroAilgmentsDuration[index] -= 1;

        }else {
            // aligment is removed.
            player.offenseHeroAilgments.splice(index,1);
            player.offenseHeroAilgmentsDuration.splice(index,1);
        }
    }

    for (let index = 0; index < player.utilityHeroAilgments.length; index++) {
        if ( parseInt(player.utilityHeroAilgmentsDuration[index]) - 1 > 0 ){
            // last turn with given ailgment.
            player.utilityHeroAilgmentsDuration[index] -= 1;

        }else {
            // aligment is removed.
            player.utilityHeroAilgments.splice(index,1);
            player.utilityHeroAilgmentsDuration.splice(index,1);
        }
    }

    for (let index = 0; index < player.defenseHeroAilgments.length; index++) {
        if ( parseInt(player.defenseHeroAilgmentsDuration[index]) - 1 > 0 ){
            // last turn with given ailgment.
            player.defenseHeroAilgmentsDuration[index] -= 1;

        }else {
            // aligment is removed.
            player.defenseHeroAilgments.splice(index,1);
            player.defenseHeroAilgmentsDuration.splice(index,1);
        }
    }
}

function reduceMonsterAligments(monster){
    for (let index = 0; index < monster.aligment.length; index++) {
        

        if ( parseInt(monster.aligmentDuration[index]) - 1 === 1 ){
            // last turn with given ailgment. Maybe...
            monster.aligmentDuration[index] -= 1;

        }else if ( parseInt(monster.aligmentDuration[index]) - 1 <= 0 ){
            // aligment is removed.
            monster.aligmentDuration.splice(index,1);
            monster.aligment.splice(index,1);
        }
    }
}

function getRandomRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}



export const endTurn = () => (dispatch, getState) => {

    let playerOverlay = document.getElementById('playerOverlay');

    playerOverlay.style.height = "50vh"
    playerOverlay.style.width = "100vw"
    playerOverlay.style.transform = "translate(0px,50px)"
    playerOverlay.style.backgroundColor = "black"
    playerOverlay.style.opacity = .75
    playerOverlay.style.position = "absolute"
    playerOverlay.style.zIndex = 100
    playerOverlay.style.bottom = 0

    let monsterBody = document.getElementById('monsterOuterContainer');
    
    setTimeout( function(){ 
        dispatch( discardHand() )
    }, 1000 );

    const state = getState()
    const player = state.player
    const monster = state.monster

    monster.defense = 0;

    const telegraphing = monster.telegraphing

    console.log('telegraph:', telegraphing)

    if ( !monster.aligment.includes('stun') ){

        for (let m = 0; m < telegraphing.effect.length; m++) {
                
            if ( telegraphing.effect[m] == "damage" ){

                strikeAnimation(monsterBody);
                hitHero();

                const dmg = telegraphing.power[m]
                const moveMsg = monster.name + " used " + telegraphing.name[m] + ", dealing\n" + telegraphing.power[m] + " damage."

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


            } else if (telegraphing.effect[m] == 'defense') {


                const newDefense = telegraphing.power[m]
                const moveMsg = monster.name + " used " + telegraphing.name[m] + ", gained\n +" + telegraphing.power[m] + " defense."

                setTimeout( function(){
                    //  combatMsgs.innerHTML = moveMsg 
                    dispatch(logCombat( {origin:'monster', description:moveMsg} ), 1000)
                }, 1000)

                setTimeout( function(){ 
                    dispatch( updateMonster({ defense: newDefense })) 
                },1100);
            } else if (telegraphing.effect[m] == 'fatigue') {

                const moveMsg = monster.name + " used " + telegraphing.name[m] + ", adding " + telegraphing.power[m] + " fatigue cards to the partys deck."

                setTimeout( function(){
                    dispatch(logCombat( {origin:'monster', description:moveMsg} ), 1000)
                }, 1000);

                for (let each = 0; each < telegraphing.power[m]; each++) {
                    dispatch( addCardDiscard(afflictionCards.find( affliction => affliction.name === 'Fatigue')) )
                }

            } else if (telegraphing.effect[m] == 'bleed') {
                const moveMsg = monster.name + " used " + telegraphing.name[m] + ", adding " + telegraphing.power[m] + " bleed cards to the partys deck."

                setTimeout( function(){
                    dispatch(logCombat( {origin:'monster', description:moveMsg} ), 1000)
                }, 1000);

                console.log('bleed move! :', afflictionCards.find( a => a.name ==='bleed'))

                for (let each = 0; each < telegraphing.power[m]; each++) {
                    dispatch( addCardDiscard(afflictionCards.find( affliction => affliction.name === 'Bleed')) )
                }

            }else if (telegraphing.effect[m] == 'stun') {

                let heroList = ['mage', 'sword', 'shield']
                let target = getRandomRange(0,heroList.length)
                let targetHero = heroList[target]

                dispatch( addAilgments({
                        target : targetHero,
                        effect :'stun',
                        duration : telegraphing.power[m]
                    })
                )
                const moveMsg = monster.name + " used " + telegraphing.name[m] + ", stunning " + targetHero + " hero, for " + telegraphing.power[m] + " turns."
                setTimeout( function(){
                    dispatch(logCombat( {origin:'monster', description:moveMsg} ), 1000)
                }, 1000);

            }else if (telegraphing.effect[m] == 'idle'){
                state.monster.aligment.push('stun');
                state.monster.aligmentDuration.push(telegraphing.power[m]);
                const moveMsg = monster.name + " used " + telegraphing.name[m] + ", idling for " + telegraphing.power[m] + " turns."
                setTimeout( function(){
                    dispatch(logCombat( {origin:'monster', description:moveMsg} ), 1000)
                }, 1000);
            }else if (telegraphing.effect[m] == 'heal'){
                if (monster.health + telegraphing.power[m] > monster.total){
                    monster.health = monster.total;
                }else{
                    monster.health = monster.health + (telegraphing.power[m]);
                }
                const moveMsg = monster.name + " used " + telegraphing.name[m] + ", healing for " + telegraphing.power[m] + " health."
                setTimeout( function(){
                    dispatch(logCombat( {origin:'monster', description:moveMsg} ), 1000)
                }, 1000);
            }else{                
                //default
            }

        }

        const moves = monster.moves;
        const lengthOfMoves = Object.keys(moves).length;
        let randomMove = getRandomRange(0, lengthOfMoves);
        const newTelegraph = moves[randomMove]
        setTimeout( function(){ dispatch( updateMonster({ telegraphing: newTelegraph }) )}, 1200)
    }

    reduceAligments(state.player);
    reduceMonsterAligments(monster);


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

