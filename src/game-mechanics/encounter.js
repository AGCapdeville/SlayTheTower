// This class should be called when the player enters an encounter
import sample from 'lodash/sample';
import {creeps} from '../game-data/creep-data'
// import { setHealth } from '../ducks/player'
// import { useFoe } from '../ducks/foe';
import { useDispatch } from 'react-redux';
import { setFoeName, setFoeTotalHealth, alterFoeArmor, setFoeImg, alterFoeHealth, setFoeMoves} from '../ducks/foe';



export default class Encounter{
    
    constructor(){
    }

    spawnCreep() {
        // const dispatcher = useDispatch()
        // const creep = sample(creeps);
        // // let creep = creeps[Math.floor(Math.random()*2)] //random creep
        // // let creep = creeps[0] // slime
        // const creepHealth = creep.health + Math.floor(Math.random() * creep.mod)
        // dispatcher(setFoeTotalHealth(creepHealth))
        // dispatcher(alterFoeHealth(creepHealth))
        // dispatcher(alterFoeArmor(creep.armor))
        // dispatcher(setFoeName(creep.name))
        // dispatcher(setFoeImg(creep.art))
        // dispatcher(setFoeMoves(creep.moves))
    }

    gameRound(self){
        // while ( this.player.health > 0 && this.creep.health > 0 ) {
        //     this.playerTurn()
        //     this.creepTurn()
        // }
    }


    playerTurn(){
        // draw hand

        // wait for player to do actions
        // wait for player to click end turn OR player uses all energy
        
        // discard rest of players hand
    }
    
    // right now we are just going to handle one creep being spawned 
    creepTurn(){
        // creep uses hidden action
        // creep spawns new hidden action icon above head
        // creep ends turn
    }



}











