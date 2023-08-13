import _ from 'lodash';
import Syntax from './Syntax';
import './Run.css';

function PrintSource(props) {
  const { dispatch, source } = props;
  return (
    <div className="run-result__source">
      <h5>Source Code:</h5>
      <pre onClick={() => dispatch({ type: 'repopulate', payload: source })}>
         <Syntax source={source} />
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
            <td>Name:</td>
            <td className="run-result__error__name">{error.name}</td>
          </tr>
          <tr>
            <td>Message:</td>
            <td className="run-result__error__message">{error.message}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function getOutput(result) {
  switch(typeof result) {
    case 'string':
      if (result === 'use strict') return 'undefined';
      return <span className="string">"{result}"</span>;
    case 'number':
      return <span className="num">{result}</span>;
    case 'boolean':
      return <span className="true">{result.toString()}</span>;
    case 'undefined':
      return <span className="name">undefined</span>;
    case 'function':
      return <span className="function">function</span>;
    case 'object':
      if (_.isArray(result)) {
        return <>[{_.map(
          result,
          (a, idx) => <>{idx !== 0 && ', '}{getOutput(a)}</>
        )}]</>;
      }
      if (_.isNil(result)) return <span className="null">null</span>;
      // could be array, null
      //
    default:
      return 'Not sure how to display this';
  }
}

function PrintResult(props) {
  const { result } = props;
  const output = getOutput(result);
  return (
    <div className="run-result__result">
      <h5>Result</h5>
      <pre>{output}</pre>
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