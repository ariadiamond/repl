import _ from 'lodash';
import evalCode from './eval';
import { useMemo, useReducer } from 'react';

const INIT_STATE = {
  run: '',
  previousRuns: [],
};

const PREV_RUN_COUNT = 5;

function reducer(state, action) {
  let run;
  let runs;
  switch(action.type) {
    case 'repopulate':
    case 'updateText':
      return { ...state, run: action.payload };
    case 'addRun':
      if (_.isEmpty(state.run)) {
        return state;
      }
      run = { source: state.run, ...evalCode(state.run), key: _.random(1, 1000) };
      runs = _.concat([run], state.previousRuns);
      return { run: '', previousRuns: _.take(runs, PREV_RUN_COUNT) };
    default:
      console.error("Unknown action:", action);
      return state;
  }
}

const THEMES = ['fruits', 'animals', 'favorite music'];

function useRunState() {
  const theme = useMemo(() => THEMES[_.random(0, _.size(THEMES))], []);
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  return [{ ...state, theme }, dispatch];
}

export default useRunState;