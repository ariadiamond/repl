import _ from 'lodash';
import useRunState from './reducer';
import RunResult from './Run';
import './App.css';

function PreviousElements({ previousRuns, dispatch }) {
  return (
    <div className="previous-runs">
      {!_.isEmpty(previousRuns) && <h5>Past runs</h5>}
      {_.map(previousRuns, (run, i) => <RunResult key={i} run={run} dispatch={dispatch} />)}
    </div>
  );
}

function App() {
  const [state, dispatch] = useRunState();
  const buttonDisabled = _.isEmpty(state.run);
  return (
    <div className="App">
      <div className="text-area">
        <textarea
          className="repl"
          placeholder="Write JavaScript code here!"
          onChange={(e) => dispatch({ type: 'updateText', payload: e.target.value })}
          value={state.run}
        />
      </div>
      <div className="cta-buttons">
        <button disabled={buttonDisabled} onClick={() => dispatch({ type: 'updateText', payload: '' })}>
          Clear
        </button>
        <button disabled={buttonDisabled} onClick={() => dispatch({ type: 'addRun' })}>
          Run!
        </button>
      </div>
      <PreviousElements previousRuns={state.previousRuns} dispatch={dispatch} />
    </div>
  );
}

export default App;
