import _ from 'lodash';
import './Run.css';

function PrintError(props) {
  const { error } = props;
  return (
    <div className="run-result__error">
      <h5>Error</h5>
      <table>
      <tbody>
      <tr>
        <td>Name:</td><td>{error.name}</td>
      </tr>
      <tr>
        <td>Message:</td><td>{error.message}</td>
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
      <pre>{JSON.stringify(result)}</pre>
    </div>
  );
}

function RunResult(props) {
  const { run } = props;
  return (
    <div className="run-result">
      <div className="run-result__source">
        <h5>Source:</h5>
        <pre onClick={() => alert('will repopulate')}>{run.source}</pre>
      </div>
      {run.error !== null
        ? <PrintError error={run.error} />
        : <PrintResult result={run.result} />}
    </div>
  );
}

export default RunResult;