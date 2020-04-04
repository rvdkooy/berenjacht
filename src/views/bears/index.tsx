import React from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { AppState, Level } from '../../App';

interface Props {
    appState: AppState;
    updateBear: (level: number, index: number) => void;
    completeLevel: (level: number) => void;
}

const Bears = (props: Props) => {
    const history = useHistory();
    const params = useParams<{ level: string }>();
    const currentLevel = props.appState.levels.find(l => l.number === parseInt(params.level))

    const renderContent = (level?: Level) => {
        if (level) {
            const onBearClicked = (index: number) => {
                props.updateBear(level.number, index);
            };

            const completeLevel = (level: number) => {
                props.completeLevel(level);
                history.push('/');
            }

            const icons = [];
            if (currentLevel) {
                for (let bear = 1; bear <= currentLevel.nrOfBears; bear++) {
                    icons.push(
                        <img
                            key={bear}
                            width="70px"
                            alt={'Bear nummer: ' + bear}
                            src={level.foundBears.indexOf(bear) !== -1 ? require('../../img/bear_icon_brown.png') : require('../../img/bear_icon.png')}
                            style={{ margin: '20px' }}
                            onClick={() => onBearClicked(bear)}
                        />
                    )
                }
            }

            return (
                <div>
                    { icons }
                    {   
                        
                        (level.nrOfBears === level.foundBears.length) ?
                            <div className="bottombuttoncontainer">
                                <button className="button" onClick={() => completeLevel(level.number)}>Volgende Level</button>
                            </div>
                             : null
                    }
                </div>
            );
        } else {
            return (<div>Geen level gevonden</div>);
        }
    }

    return (
        <div>
            <header>
                <Link to="/">
                    <img alt="terug" className="backbutton" height="30px" src={require('../../img/backbutton.png')} />
                </Link>
                <h1>{`${currentLevel?.nrOfBears} Beren zoeken`}</h1>
            </header>
            <main>
                {renderContent(currentLevel)}
            </main>
        </div>
    )
};

export default Bears;
