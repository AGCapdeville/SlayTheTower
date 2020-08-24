import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from "./map.module.scss";
import { useClimbState } from '../../../ducks/climbState'
import { setScreen } from '../../../ducks/screen';


import PoissonDiskSampling from 'poisson-disk-sampling'
import { random } from 'lodash';
import { useState } from 'react';

import Konva from 'konva';
import { Stage, Layer, Circle, Text, Line } from 'react-konva';

import _ from 'lodash';

const canvasWidth = 11;
const canvasHeight = 12;


function initArray(rows, columns) {
    var array = new Array(rows);
    
    for (var index = 0; index < rows; index++) {
        array[index] = new Array(columns);
    }

    for (var x = 0; x < rows; x++){
        for (let y = 0; y < columns; y++) {
            array[x][y] = '○'
        }
    }
    return array
}

function addPath(row, column, grid, pathNumber){
    grid[row][column] = pathNumber
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function path(grid, canvasSize, pathQuantity){
    for (let path = 1; path < pathQuantity+1; path++) {

        for (let columnPath = 1; columnPath < canvasSize-1; columnPath++) {
            var pathRow = []

            for (let rowPath = 0; rowPath < canvasSize; rowPath++) {    
                if (grid[rowPath][columnPath] == 0) {
                    pathRow.push(rowPath)
                }
            }
            
            // console.log('for col:',columnPath,' we have this many paths:',pathRow.length)
            var newPath = pathRow[Math.floor(Math.random() * pathRow.length)];
            console.log(newPath)
            addPath(newPath, columnPath, grid, path)
        }
    }

}

function genColumn( coloumn, nodeTotal, map, symbol){
    let row = []
    if ( nodeTotal % 2 == 0){
        row = _.shuffle([0,2,4,6,8,10])
    }else{
        row = _.shuffle([1,3,5,7,9,11])
    }

    for (let node = 0; node < nodeTotal; node++) {
        addPath(row[node], coloumn, map, symbol)        
    }
}


const genMap = () => {

    let mapPoints = []
    let pathTaken = []

    // initialize grid
    const grid = initArray(canvasHeight, canvasWidth)

    // start & end paths
    addPath(5, 0, grid, 'S')
    addPath(6, 0, grid, 'S')

    addPath(5, canvasWidth-1, grid, 'E')
    addPath(6, canvasWidth-1, grid, 'E')
    
    // generate first and last colums
    let nodesPerColumn = [ 0, 3, 4, 4, 5, 6, 5, 4, 4, 3, 0 ]

    for (let columnIndex = 0; columnIndex < nodesPerColumn.length; columnIndex++) {
        let nodeTotal = nodesPerColumn[columnIndex];
        genColumn(columnIndex, nodeTotal, grid, '■')
    }


    // console.log('start & end points:', grid)
    // // path(grid, canvasSize, 3)
    // console.log('NEW MAP:\n',grid)

    return grid
}


const MapScreen = () => {

    const dispatch = useDispatch();
    // const climbState = useClimbState();

    let header = 'MAP'
    // let body = ''
    let bttn = 'BACK'
    
    let mapPoints = genMap()


    return (
    <div className={styles.gameScreen}>
        <div className={styles.menuContainer}>

            <div className={styles.menuHeader}>
                {header}
            </div>

            {/* <div className={styles.mapContainer}>
                {mapPoints.map( (point, index) => 
                    <div key={index} className={styles.nodeArray}>
                        {point.map( (p, index) => 
                            <div  key={index} className={styles.node} >
                                {p}
                            </div>
                        )}
                    </div>
                )}
            </div> */}

            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    {/* <Text text="Some text on canvas" fontSize={15} /> */}
                    <Circle x={100} y={50} radius={15} fill="green" />
                    <Circle x={150} y={100} radius={15} fill="green" />
                    <Circle x={150} y={50} radius={15} fill="green" />
                </Layer>
            </Stage>


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

