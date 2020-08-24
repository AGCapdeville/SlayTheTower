import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from "./map.module.scss";
import { useClimbState } from '../../../ducks/climbState'
import { setScreen } from '../../../ducks/screen';


import PoissonDiskSampling from 'poisson-disk-sampling'
import { random, head } from 'lodash';
import { useState } from 'react';

import { TiArrowUpOutline, TiChevronLeftOutline } from "react-icons/ti";
import { paths } from "../../../game-data/path-data"

import _ from 'lodash';

const mapWidth = 7;
const mapHeight = 7;

/* initates map : row x column, with obj=empty */
function initMap(rows, columns) {
  var array = new Array(rows);
  
  for (var index = 0; index < rows; index++) {
    array[index] = new Array(columns);
  }

  for (var x = 0; x < rows; x++){
    for (let y = 0; y < columns; y++) {
      array[x][y] = paths.find( paths => paths.path === 'empty')
    }
  }
  
  return array
}
function rollDice(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; 
}



/* returns direction 'N:E:S:W' */
function getHeading( directionX, directionY ){
  if (directionX > 0){
    return 'E'
  }else if (directionX < 0){
    return 'W'
  }else if (directionY > 0){
    return 'S'
  }else{
    return 'N'
  }
}
/* flips direction */
function flip( direction ){
  switch (direction) {
    case 'N':
      return 'S'
    case 'S':
      return 'N'
    case 'E':
      return 'W'
    case 'W':
      return 'E'
  }
}
/* returns right of passed direction */
function getRightOfDirection( direction ){
  switch (direction) {
    case 'N':
      return 'E'
    case 'E':
      return 'S'
    case 'S':
      return 'W'
    case 'W':
      return 'N'
    }
}
/* returns left of passed direction */
function getLeftOfDirection( direction ){
  switch (direction) {
    case 'N':
      return 'W'
    case 'E':
      return 'N'
    case 'S':
      return 'E'
    case 'W':
      return 'S'
    default:
      return ''
  }
}




/* Checks if path exists & connects: returns true, else false */
function checkPath( direction, map, x, y ){
  switch (direction) {
    case 'N':
      if (map[x][y-1].path != 'empty'){
        // north exists
        if(map[x][y-1].exitPoint.find( e => e === 'S')){
          // north connects
          return true
        }else{
          return false
        }
      } else {
        return false
      }
    case 'E':
      if (map[x+1][y].path != 'empty'){
        if (map[x+1][y].exitPoint.find( e => e === 'W')){
          return true
        } else {
          return false
        }
      }else{
        return false
      }
    case 'S':
      if (map[x][y+1].path != 'empty'){
        if (map[x][y+1].exitPoint.find( e => e === 'N')){
          return true
        } else {
          return false
        }
      }else{
        return false
      }
    case 'W':      
      if (map[x-1][y].path !== 'empty'){
        // west does exists...
        if (map[x-1][y].exitPoint.find( e => e === 'E')){
          // west connects
          return true
        }else{
          return false
        }
      }else{
        return false
      }
  }
}
/* Checks if path exists & does not connect: return true, else, false  */
function checkPathVoid( direction, map, x, y ){
  switch (direction) {
    case 'N':
      if (map[x][y-1].path != 'empty'){
        if(map[x][y-1].exitPoint.find( e => e === 'S')){
          return false
        }else{
          return true
        }
      } else {
        return false
      }
    case 'E':
      if (map[x+1][y].path != 'empty'){
        if (map[x+1][y].exitPoint.find( e => e === 'W')){
          return false
        } else {
          return true
        }
      }else{
        return false
      }
    case 'S':
      if (map[x][y+1].path != 'empty'){
        if (map[x][y+1].exitPoint.find( e => e === 'N')){
          return false
        } else {
          return true
        }
      }else{
        return false
      }
    case 'W':
      if (map[x-1][y].path != 'empty'){
        if (map[x-1][y].exitPoint.find( e => e === 'E')){
          return false
        }else{
          return true
        }
      }else{
        return false
      }
  }
}
/* Checks path on right: if a path exists, return {true & update directions}, else, {false}  */
function checkRightPath( map, x, y, directionX, directionY ){
  let heading = getHeading( directionX, directionY )
  switch (heading) {
    case 'N':
      if ( map[x+1][y].path == 'empty' ){
        return {canTurn:true, updateX:1, updateY:0}
      }else{
        return {canTurn:false , directionX, directionY}
      }
    case 'E':
      if ( map[x][y+1].path == 'empty' ){
        return {canTurn:true, updateX:0, updateY:1}
      }else{
        return {canTurn:false, directionX, directionY}
      }
    case 'S':
      if ( map[x-1][y].path == 'empty' ){
        return {canTurn:true, updateX:-1, updateY:0}
      }else{
        return {canTurn:false, directionX, directionY}
      }
    case 'W':
      if ( map[x][y-1].path == 'empty' ){
        return {canTurn:true, updateX:0, updateY:-1}
      }else{
        return {canTurn:false, directionX, directionY}
      }
  }
}


/* returns required paths as: 'N:E:S:W' if true */
function getRequiredPaths( north, east, south, west ){
  let requiredPaths = []
  if (north){
    requiredPaths.push('N')
  }
  if (east){
    requiredPaths.push('E')
  }
  if (south){
    requiredPaths.push('S')
  }
  if (west){
    requiredPaths.push('W')
  }
  return requiredPaths
}
/* returns void paths as: 'N:E:S:W' if true */
function getVoidPaths( north, east, south, west ){
  let voidPaths = []
  if (north){
    voidPaths.push('N')
  }
  if (east){
    voidPaths.push('E')
  }
  if (south){
    voidPaths.push('S')
  }
  if (west){
    voidPaths.push('W')
  }
  return voidPaths
}





function genNewPath(map, currentX, currentY, directionX, directionY){
  let path = {}
  let newDirectionX = directionX
  let newDirectionY = directionY

  // move
  let locationX = currentX + directionX
  let locationY = currentY + directionY
  // move done.

  // check suroundings
  // True: if exists & connects
  let northPathRequired = checkPath('N', map, locationX, locationY)
  let eastPathRequired = checkPath('E', map, locationX, locationY)
  let southPathRequired = checkPath('S', map, locationX, locationY)
  let westPathRequired = checkPath('W', map, locationX, locationY)

  // True: if exists & does not connect
  let northPathVoid = checkPathVoid('N', map, locationX, locationY)
  let eastPathVoid = checkPathVoid('E', map, locationX, locationY)
  let southPathVoid = checkPathVoid('S', map, locationX, locationY)
  let westPathVoid = checkPathVoid('W', map, locationX, locationY)

  // update direction if we can turn right 
  let canTurnRight = checkRightPath( map, locationX, locationY, directionX, directionY)

  if ( canTurnRight.canTurn ) {
    console.log('! ! ! ! TURNING RIGHT ! ! ! !')
    newDirectionX = canTurnRight.updateX
    newDirectionY = canTurnRight.updateY
  }
  // check Done
  
  let heading = getHeading( directionX, directionY )
  // create path based on checks
  let dice = rollDice(0,9)

  let requiredPaths = getRequiredPaths( northPathRequired, eastPathRequired, southPathRequired, westPathRequired )
  let voidPaths = getVoidPaths( northPathVoid, eastPathVoid, southPathVoid, westPathVoid)

  console.log('required paths:', requiredPaths)


  if (requiredPaths.length == 0){
    if (voidPaths.length == 1){ // 1 void, ( prev )
      path = paths.find(paths => paths.path === 'corner')
      path.exitPoint.push(heading)
      path.exitPoint.push(getRightOfDirection(heading))
    }else{ // 2 voids
      path = paths.find(paths => paths.path === 'corner')
      path.exitPoint.push(heading)
      path.exitPoint.push(getLeftOfDirection(heading))
    }
  }else if (requiredPaths.length == 1){
    if (voidPaths.length == 0){
      path = paths.find(paths => paths.path === 'cross')
    }else if (voidPaths.length == 1){
      path = paths.find(paths => paths.path === 'hall')
      path.exitPoint.push( getLeftOfDirection(voidPaths[0]) )
      path.exitPoint.push( flip(getLeftOfDirection(voidPaths[0])) )
    }
  }else {
    // 2 required paths:
    path = paths.find(paths => paths.path === 'fork')
    path.exitPoint = []
    path.exitPoint.push(requiredPaths[0])
    path.exitPoint.push(requiredPaths[1])
    // coin flip for tail of the fork
    if (dice < 5){
      path.exitPoint.push(heading)
    }else{
      path.exitPoint.push( getLeftOfDirection(heading) )
    }
  }

  return { path, newDirectionX, newDirectionY }
}



function genMap(walkLength){
  // Initialize map with 'empty'
  var map = []
  map = initMap(mapWidth, mapHeight, 'empty')

  // middle of map (kind of)
  let currentX = Math.floor(mapWidth/2);
  let currentY = Math.floor(mapHeight/2);
  
  const startingPath = paths.find( paths => paths.path === 'cross');
  map[currentX][currentY] = startingPath

  let directionX = 0
  let directionY = -1

  for (let step = 0; step < walkLength; step++) {
    console.log('\n\n\n\n -  -  -  -  -  -  -  -  -  -  -  -  - ')
    console.log(' -  -  -  -  -  -  - START  -  -  -  - ')

    let pathInfo = genNewPath(map, currentX, currentY, directionX, directionY);
    console.log('= = = = = = = = = = = = = = =')
    console.log('new path:', pathInfo.path)
    // update positions X & Y
    currentX += directionX
    currentY += directionY

    map[currentX][currentY] = new pathInfo.path

    // update new direction
    directionX = pathInfo.newDirectionX
    directionY = pathInfo.newDirectionY

  }
  return map;
}






const MapScreen = () => {
  const dispatch = useDispatch();

  let header = 'MAP'
  let bttn = 'BACK'


  console.log('=START=')

  const map = genMap(6);

  console.log('complete walked map:', map)

  return (
  <div className={styles.gameScreen}>
      <div className={styles.menuContainer}>

          <div className={styles.menuHeader}>
              {header}
          </div>

          <div className={styles.pathRowContainer}>
            {map.map( (xCord, index) => 
              <div key={index} className={styles.pathColumnOutline}>
                {xCord.map( (yCord, index) => 
                  <div key={index} className={styles.pathRowOutline}>
                      <div className={styles.nodeRow}> 
                        <div className={styles.nodeBlock}></div> 
                        <div className={styles.nodeBlock}> {yCord?.exitPoint?.find(d => d === 'N')} </div> 
                        <div className={styles.nodeBlock}></div> 
                      </div>
                      <div className={styles.nodeRow}> 
                        <div className={styles.nodeBlock}>
                          {yCord?.exitPoint?.find(d => d === 'W')}
                        </div> 
                        
                        <div className={styles.nodeBlock}> 
                          {yCord?.path}
                        </div> 
                        
                        <div className={styles.nodeBlock}>
                          {yCord?.exitPoint?.find(d => d === 'E')}
                        </div> 
                      </div>
                      <div className={styles.nodeRow}> 
                        <div className={styles.nodeBlock}></div> 
                        <div className={styles.nodeBlock}> {yCord?.exitPoint?.find(d => d === 'S')} </div> 
                        <div className={styles.nodeBlock}></div> 
                      </div>
                  </div>

                )}
              </div>
            )}          
          </div>


          {/* <>

          <TiArrowUpOutline />
          </> */}


          {/* <div className={styles.mapContainer}>
            {mapPoints.map( (point, index) => 
              <div key={index} className={styles.nodeArray}>
                {point}
              </div>
            )}
          </div> */}



          <div className={styles.menuFooter}>
              <div className={styles.menuOption} onClick={() => dispatch(setScreen('Title'))}>
                  {bttn}
              </div>
          </div>


      </div>
  </div>
  
  );

}


export default MapScreen;

