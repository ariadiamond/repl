import './App.css';
import useRunState from './reducer';

function App() {
  const [state, dispatch] = useRunState();
  return (
    <div className="App">
      <div className="previous elements" />
      <div>
      <textarea className="repl" onChange={(e) => dispatch({ type: 'updateText', payload: e.target.value })} value={state.run} />
      </div>
      <button type="button" onClick={() => dispatch({ type: 'addRun' })}>Run!</button>
    </div>
  );
}

export default App;
