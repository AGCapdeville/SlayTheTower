import React from 'react';
import { updateScreen } from '../../../ducks/screen';
import { useDispatch } from 'react-redux';


const OrientationScreen = () => {

    const dispatch = useDispatch();
      
    return (
            <div >

                <div>
                    Game is built to be played on chrome on Mobile & Desktop... Be sure to put the game into fullscreen.
                </div>

            </div>
    );
}

export default OrientationScreen