import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Bears = () => {
    const nrOfBears = 10;
    const [clickedBears, updateClickedBears] = useState<number[]>([]);

    const onBearClicked = (index: number) => {
        if (clickedBears.indexOf(index) !== -1) {
            updateClickedBears([...clickedBears.filter(b => b !== index)]);
        } else {
            updateClickedBears([...clickedBears, index]);
        }
    };


    const icons = [];
    for (let bear = 1; bear <= nrOfBears; bear++) {
        icons.push(
            <img
                width="70px"
                alt={'Bear nummer: ' + bear}
                src={clickedBears.indexOf(bear) !== -1 ? require('../../img/bear_icon_blue.png') : require('../../img/bear_icon.png')}
                style={{ margin: '20px' }}
                onClick={() => onBearClicked(bear)}
            />
        )
    }
    
    return (
        <div>
            <header>
                <Link to="/">
                    <img className="backbutton" height="30px" src={require('../../img/backbutton.png')} />
                </Link>
                <h1>10 Beren zoeken</h1>
            </header>
            <main>
            { icons }
            </main>
        </div>
    )
};

export default Bears;
