import React from 'react';
import { useHistory, Link } from 'react-router-dom';

const Levels = () => {
    const history = useHistory();
    const nrOfLevels = 50;

    const icons = [];
    for (let level = 1; level <= nrOfLevels; level++) {
        icons.push(
            <Link key={level} className="levelicon" to="/bears">
                <img
                    width="120px"
                    alt={'Level: ' + level}
                    src={require('../../img/level_icon.png')}
                />
                <span className="text">{ level }</span>
            </Link>
        )

    }

    return (
        <div>
            <header>
                <h1>Levels</h1>
            </header>
            <main>
                {
                    icons
                }
            </main>
        </div>
    )
};

export default Levels;
