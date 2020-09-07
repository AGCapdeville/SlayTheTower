import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import _, { random, isEmpty } from 'lodash';
import styles from "./map.module.scss";


import { useMap, updateMap } from '../../../ducks/map';
import { updateScreen } from '../../../ducks/screen';

// For Encounters:
import { usePlayer, drawHand, shuffleDeck, resetDeck } from '../../../ducks/player';
import { spawnFoe } from '../../../ducks/foe';


function eventHandler(event, dispatcher){
  console.log("EVENT:", event)
  switch (event) {
    case '👹':
      dispatcher(updateScreen('Title'));
    case '💢':
      break;
    case '🔥':
      break;
    case '❗':
      break;
    case '💰':
      break;
    case '⚔️':
      console.log('engaging combat...')

      dispatcher(spawnFoe());
      dispatcher(resetDeck());
      dispatcher(shuffleDeck());
      dispatcher(drawHand());
      // Load fight before screen update?
      dispatcher(updateScreen('Encounter'));
      break;
    default:
      break;
  }
}

function rollDice(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; 
}

function genPathLength(){
  let length = rollDice(1,4)
  let onesOdds = rollDice(0,50)

  if (onesOdds == 0 && length == 1){
    return 1
  }
  if (onesOdds < 1 && length == 3){
    return 4
  }
  return length
}

function genEvent( roll, fightOdds, elieteOdds, bonfireOdds, trialOdds, shopOdds){
  if ( roll < fightOdds){
    return {  fieldEvent: '⚔️' }
  }else if ( roll < elieteOdds ){
    return {  fieldEvent: '💢' }
  }else if ( roll < bonfireOdds ){
    return {  fieldEvent: '🔥' }
  }else if ( roll < trialOdds ){
    return {  fieldEvent: '❗' }
  }else if ( roll < shopOdds){
    return {  fieldEvent: '💰' }
  }else{
    return {  fieldEvent: '⚔️' }
  }
}

function genPath( pathLength, setEvent ){

  if ( setEvent ){
    
    let events = []
    for (let e = 0; e < pathLength; e++) {
      let roll = rollDice(0,101);
      events.push(genEvent(roll, 70, 85, 100, 0, 0))
    }

    return({
      fieldEvent: setEvent,
      fieldPaths: pathLength,
      fieldPathEvents: events
    })

  }else{

    // generate paths
    let events = []
    for (let e = 0; e < pathLength; e++) {
      let roll = rollDice(0,101);
      events.push(genEvent(roll, 70, 90, 100))
    }

    // generate field of said paths
    let roll = rollDice(0,101);
    return({
      fieldEvent: genEvent(roll, 70, 80, 87, 95, 100).fieldEvent,
      fieldPaths: pathLength,
      fieldPathEvents: events
    })

  }
}

function fillPaths( numberOfPaths, setEvent) {
  const paths = []

  for (let p = 0; p < numberOfPaths; p++) {
    // Gen a new number of paths per field choice
    paths.push( genPath( genPathLength(), setEvent ))
  }

  return paths
}

function startingField(startingPaths){
  let newField = {
    fieldEvent: 'START',
    fieldPaths: startingPaths,
    fieldPathEvents: fillPaths(startingPaths, '⚔️'),
    count: 0
  }
  return newField
}

function createField( fieldEvents, fieldCount ){
  let pathLength = 0
  let fieldBatch = []

  if ( fieldCount === 7){
    for (let i = 0; i < fieldEvents.length; i++) {
      fieldBatch.push({
        fieldEvent: fieldEvents[i].fieldEvent,
        fieldPaths: 0,
        fieldPathEvents: [{
          fieldEvent: "👹"
        }]
      })
    }
  }else{
    for (let i = 0; i < fieldEvents.length; i++) {
      pathLength = genPathLength()
      fieldBatch.push({
        fieldEvent: fieldEvents[i].fieldEvent,
        fieldPaths: pathLength,
        fieldPathEvents: fillPaths(pathLength)
      })
    }
  }

  return fieldBatch
}

const MapScreen = () => {

  const dispatch = useDispatch();
  const currentField = useMap();
  const UsePlayer = usePlayer();


  useEffect(() => {
    if (currentField.count === 0){
      dispatch(updateMap(startingField(3)))
    }
  }, []);
  

  const onPathSelection = (field) => {
    let newField = {}

    // check if the next event is going to be floor boss:
    let isBossNext = field.fieldPathEvents.find( fields => fields.fieldEvent === "👹" )
    
    if ( isBossNext ){
      newField = {
        fieldEvent: field.fieldEvent,
        fieldPaths: 1,
        fieldPathEvents: [{
            fieldEvent: "👹",
            fieldPaths: 0,
          fieldPathEvents: []
        }],
        count: currentField.count + 1
      }
    }else{
      newField = {
        fieldEvent: field.fieldEvent,
        fieldPaths: field.fieldPathEvents.length,
        fieldPathEvents: createField(field.fieldPathEvents, currentField.count),
        count: currentField.count + 1
      }
    }
    // update map...
    dispatch(updateMap(newField))
    eventHandler(newField.fieldEvent, dispatch)
  }


  return (
    <div style={{display:'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh', color: 'white'}}>
      
      <div style={{display:'flex', width:'90vw',flexDirection:'row', backgroundColor: 'black', color:'white'}}>
        <strong style={{color:'red', margin:'10px'}}> ❤️ {UsePlayer.health}/{UsePlayer.maxHealth}</strong>
      </div>

      <div style={{display:'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', width:'90vw', height:'90vh'}}>
        <h1> Field Event: {currentField.fieldEvent}</h1>

        <div style={{display:'flex', flexDirection:'row',}}>
          {currentField.fieldPathEvents.map( (field, index) =>
            <button key={index} className={styles.pathButton} onClick={() => onPathSelection(field)}>
                <h2>{field.fieldEvent}</h2>
                {field.fieldPathEvents.map( (e, index) => 
                  <div key={index} style={{display:'flex', margin:'2px', opacity:'.5'}}>
                    {e.fieldEvent}
                  </div>
                )}
            </button>
          )}
        </div>

      </div>

    </div>
  );

}


export default MapScreen;

