import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Levels from './views/levels';
import Bears from './views/bears';
import './App.css';

type LevelState = 'disabled' | 'active' | 'finished';

export interface Level {
  number: number;
  nrOfBears: number;
  foundBears: Array<number>;
  state: LevelState;
}
export interface AppState {
  levels: Array<Level>;
}

const localStorageKey = 'berenjacht';

const getAppStateFromLocalStorage = (): AppState => {
  const storeState = localStorage.getItem(localStorageKey) as string | null;
  if (!storeState) {
    const state = createDefaultAppState();
    updateAppStateToLocalStorage(state);
    return getAppStateFromLocalStorage();
  } else {
    return JSON.parse(storeState) as AppState;
  }
};

const updateAppStateToLocalStorage = (appState: AppState) => {
  localStorage.setItem(localStorageKey, JSON.stringify(appState));
};

const createDefaultAppState = (): AppState => {
  const nrOfLevels = 50;
  const state: AppState = {
    levels: [],
  };
  for (let level = 1; level <= nrOfLevels; level++) {
    state.levels.push({
      number: level,
      nrOfBears: 5 + ((level - 1) * 5),
      foundBears: [],
      state: (level === 1) ? 'active' : 'disabled',
    });
  }


  return state;
};

function App() {
  const [appState, updateAppState] = useState<AppState>(getAppStateFromLocalStorage())
  const updateBear = (level: number, index: number) => {
    const foundLevel = appState.levels.find(l => l.number === level);
    if (foundLevel) {
      if (foundLevel.foundBears.indexOf(index) !== -1) {
        foundLevel.foundBears = [...foundLevel.foundBears.filter(b => b !== index)]
      } else {
        foundLevel.foundBears = [...foundLevel.foundBears, index];
      }
      updateAppState({
        levels: [...appState.levels],
      });
      updateAppStateToLocalStorage(appState);
    }
  };

  const completeLevel = (level: number) => {
    const foundLevel = appState.levels.find(l => l.number === level);
    const nextLevel = appState.levels.find(l => l.number === level + 1);
    if (foundLevel && nextLevel) {
      foundLevel.state = 'finished';
      nextLevel.state = 'active';
      updateAppState({
        levels: [...appState.levels],
      });
      updateAppStateToLocalStorage(appState);
    }
  };

  const reset = () => {
    updateAppState(createDefaultAppState());
    updateAppStateToLocalStorage(appState);
  }

  return (
    <BrowserRouter basename={'/berenjacht'}>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Levels appState={appState} reset={reset} />
          </Route>
          <Route path="/bears/:level">
            <Bears
              appState={appState}
              updateBear={updateBear}
              completeLevel={completeLevel}
            />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
