import _ from 'lodash';
import { tokenizer } from 'acorn';
import './syntax.css';

const skipTokens = ['(', ')', '{', '}', ';', '<<', '>>', '=', '>=', '<='];

const dictionary = {
  string: '',
  num: '',
  // true, false are for boolean
};

function WriteToken(props) {
  const { tokens, src } = props;
  if (_.isEmpty(tokens)) return src;
  const [t, ...rest] = tokens;
  const start = src.slice(0, t.start);
  const middle = src.slice(t.start, t.end);
  const end = src.slice(t.end);
  const highlightLabel = !_.includes(skipTokens, t.type.label);
  return (
    <>
      <WriteToken tokens={rest} src={start} />
      {highlightLabel
        ? <span className={t.type.label}>{middle}</span>
        : middle}
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
