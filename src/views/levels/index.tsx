import React from 'react';
import { Link } from 'react-router-dom';
import { AppState } from '../../App';

const Levels = (props: { appState: AppState, reset: () => void }) => {
    const icons = props.appState.levels.map(l => {
        if (l.state === 'active' || l.state === 'finished') {
            return (<Link key={l.number} className="levelicon" to={`/bears/${l.number}`}>
                <img
                    width="120px"
                    alt={'Level: ' + l.number}
                    src={require('../../img/level_icon.png')}
                />
                <span className="text">{l.number}</span>
            </Link>)
        } else {
            return (
                <div className="levelicon" key={l.number}>
                    <img
                        width="120px"
                        alt={'Level: ' + l.number}
                        src={require('../../img/level_icon_disabled.png')}
                    />
                </div>
            );
        }
    });

    return (
        <div>
            <header>
                <h1>Levels</h1>
            </header>
            <main>
                {
                    icons
                }
                <button className="button" onClick={() => props.reset()}>Begin opnieuw</button>
            </main>
        </div>
    )
};

export default Levels;
