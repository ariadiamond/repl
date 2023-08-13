import _ from 'lodash';
import useRunState from './reducer';
import RunResult from './Run';
import './App.css';

function PreviousElements({ previousRuns, dispatch }) {
  return (
    <div>
      <h5>Past runs</h5>
      {_.map(previousRuns, (run, i) => <RunResult key={i} run={run} dispatch={dispatch} />)}
    </div>
  );
}

function App() {
  const [state, dispatch] = useRunState();
  const buttonDisabled = _.isEmpty(state.run);
  return (
    <div className="App">
      <div>
        <textarea
          className="repl"
          onChange={(e) => dispatch({ type: 'updateText', payload: e.target.value })}
          value={state.run}
        />
      </div>
      <div>
        <button disabled={buttonDisabled} onClick={() => dispatch({ type: 'updateText', payload: '' })}>
          Clear
        </button>
        <button disabled={buttonDisabled} onClick={() => dispatch({ type: 'addRun' })}>
          Run!
        </button>
      </div>
      <PreviousElements  previousRuns={state.previousRuns} dispatch={dispatch} />
    </div>
  );
}

export default App;
