import _ from 'lodash';
import { tokenizer } from 'acorn';
import HighlightableToken, { terms } from './HighlightableToken';
import './syntax.css';

function WriteToken(props) {
  const { tokens, src } = props;
  if (_.isEmpty(tokens)) return src;
  const [t, ...rest] = tokens;
  const start = src.slice(0, t.start);
  const middle = src.slice(t.start, t.end);
  const end = src.slice(t.end);
  const highlightLabel = _.includes(terms, t.type.label);
  return (
    <>
      <WriteToken tokens={rest} src={start} />
      {highlightLabel
        ? <HighlightableToken label={t.type.label} text={middle} />
        : <span className={t.type.label}>{middle}</span>}
      {end}
    </>
  );
}

function Syntax({ source }) {
  let tokens;
  try {
    tokens = [...tokenizer(source, { ecmaVersion: 'latest' })];
  } catch(e) {
    console.error(e);
    return null;
  }
  return <WriteToken src={source} tokens={_.reverse(tokens)} />;
}

export default Syntax;
