import _ from 'lodash';
import './Run.css';

function PrintSource(props) {
  const { dispatch, source } = props;
  return (
    <div className="run-result__source">
      <h5>Source Code:</h5>
      <pre onClick={() => dispatch({ type: 'repopulate', payload: source })}>
        {source}
      </pre>
    </div>
  );
}

function PrintError(props) {
  const { error } = props;
  return (
    <div className="run-result__error">
      <h5>Error:</h5>
      <table>
      <tbody>
      <tr>
        <td>Name:</td><td className="run-result__error__name">{error.name}</td>
      </tr>
      <tr>
        <td>Message:</td><td className="run-result__error__message">{error.message}</td>
      </tr>
      </tbody>
      </table>
    </div>
  );
}

function PrintResult(props) {
  const { result } = props;
  return (
    <div className="run-result__result">
      <h5>Result</h5>
      <pre>{typeof result === 'object' ? result.toString() : JSON.stringify(result)}</pre>
    </div>
  );
}

function RunResult(props) {
  const { dispatch, run } = props;
  return (
    <div className="run-result">
      <PrintSource dispatch={dispatch} source={run.source} />
      {run.error !== null
        ? <PrintError error={run.error} />
        : <PrintResult result={run.result} />}
    </div>
  );
}

export default RunResult;