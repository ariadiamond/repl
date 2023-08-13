import _ from 'lodash';
import useRunState from './reducer';
import RunResult from './Run';
import './App.css';

function PreviousElements({ previousRuns }) {
  return (
    <div>
      {_.map(previousRuns, (run, i) => <RunResult key={i} run={run} />)}
    </div>
  );
}

function App() {
  const [state, dispatch] = useRunState();
  return (
    <div className="App">
      <PreviousElements  previousRuns={state.previousRuns} />
      <div>
      <textarea className="repl" onChange={(e) => dispatch({ type: 'updateText', payload: e.target.value })} value={state.run} />
      </div>
      <button type="button" onClick={() => dispatch({ type: 'addRun' })}>Run!</button>
    </div>
  );
}

export default App;
