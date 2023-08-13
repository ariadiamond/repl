import _ from 'lodash';
import evalCode from './eval';
import { useReducer } from 'react';

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
      run = { source: state.run, ...evalCode(state.run) };
      runs = _.concat([run], state.previousRuns);
      return { run: '', previousRuns: _.take(runs, PREV_RUN_COUNT) };
    default:
      console.error("Unknown action:", action);
      return state;
  }
}

function useRunState() {
  return useReducer(reducer, INIT_STATE);
}

export default useRunState;