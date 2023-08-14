import _ from 'lodash';
import Syntax from './Syntax';
import HighlightableToken from './HighlightableToken';
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
      <h4>Error:</h4>
      <span className="run-result__error__name">
        <HighlightableToken label={error.name} text={error.name} />
      </span>
      <span className="run-result__error__message">{error.message}</span>
    </div>
  );
}

function getOutput(result) {
  switch(typeof result) {
    case 'string':
      if (result === 'use strict') return getOutput(undefined);
      return <HighlightableToken text={'"' + result + '"'} label="string" />;
    case 'number':
      return <HighlightableToken text={result} label="num" />;
    case 'boolean':
      return <HighlightableToken text={result.toString()} label="true" />;
    case 'undefined':
      return <HighlightableToken text="undefined" label="undefined" />;
    case 'function':
      return <HighlightableToken text="function" label="function" />;
    case 'object':
      if (_.isArray(result)) {
        return (
          <>
            <HighlightableToken text="[" label="[" />
            {_.map(result, (a, idx) => <>{idx !== 0 && ', '}{getOutput(a)}</>)}
            <HighlightableToken text="]" label="]" />
          </>
        );
      }
      if (_.isNil(result)) return <HighlightableToken text="null" label="null" />;
      if (_.isPlainObject(result)) {
        return (
          <>
            <HighlightableToken text="{" label="object" />
            {_.map(result, (v, k) => <p>{'  '}<HighlightableToken text={k} label="object_key"/>: {getOutput(v)}</p>)}
            <HighlightableToken text="}" label="object" />
          </>
        );
      }
    // fallthrough
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
