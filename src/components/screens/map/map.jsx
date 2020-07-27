import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from "./map.module.scss";
import { useClimbState } from '../../../ducks/climbState'
import { setScreen } from '../../../ducks/screen';

import PoissonDiskSampling from 'poisson-disk-sampling'
import { random } from 'lodash';
import { useState } from 'react';


function initArray(rows, columns) {
    var array = new Array(rows);
    
    for (var index = 0; index < rows; index++) {
        array[index] = new Array(columns);
    }

    for (var x = 0; x < rows; x++){
        for (let y = 0; y < columns; y++) {
            array[x][y] = 0
        }
    }
    return array
}

function addPath(row, column, grid){
    grid[row][column] = 1
}

const genMap = () => {
    const canvasSize = 10;

    let mapPoints = []
    let pathTaken = []

    // initialize grid
    const grid = initArray(canvasSize, canvasSize)
    // start & end paths
    addPath(5,0,grid)
    addPath(5,9,grid)
    console.log('start & end points:', grid)


    for (let columnPath = 1; columnPath < canvasSize-1; columnPath++) {
        var pathRow = []
        for (let rowPath = 0; rowPath < canvasSize; rowPath++) {    
            if (grid[rowPath][columnPath] == 0) {
                pathRow.push(rowPath)
            }
        }
        
        console.log('for col:',columnPath,' we have this many paths:',pathRow.length)
        var newPath = pathRow[Math.floor(Math.random() * pathRow.length)];
        console.log(newPath)
        addPath(newPath, columnPath, grid)
    }

    console.log('NEW MAP:\n',grid)

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

            <div className={styles.mapContainer}>
                {mapPoints.map( (point, index) => 
                    <div key={index} className={styles.nodeArray}>
                        {point.map( (p, index) => 
                            <div  key={index} className={styles.node} >
                                {p}
                            </div>
                        )}
                    </div>
                )}
            </div>


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

