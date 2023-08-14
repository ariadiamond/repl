import _ from 'lodash';
import { useState } from 'react';

const boolean = 'A true or false value. As we will see, this will be key to contidionals';
const array = 'A list of values. Values can be of any type (including Arrays!), and do not have to match. Keys for accessing a particular value are 0, 1, 2...(number of values - 1)';
const dictionary = {
  // types
  string: 'A unit of text',
  num: 'A number, potentially including with fractional values and/or negative values. At absurd precision and massive scale, this ends up approximating',
  true: boolean,
  false: boolean,
  null: 'An explicitly unset value. This means that someone decided this value should not be defined.',
  undefined: 'An implicitly unset value. This could be if we declare a variable but do not give it a value, we dereference a key that does not exist in an object, or something else.',
  function: `A reusable block of code. As mentioned in Week 4, it optionally:
    - takes in some values
    - runs some code
    - returns a value`,
  '[': array,
  ']': array,
  object: 'A container of values, similar to an Array. The main difference is that objected are keyed by strings, rather than numbers',
  object_key: 'An identifier in an object that resolves to a value.',
  // variables
  name: 'A container for some value, whether it is a string, null, or something else.',
  const: 'A container for some value that cannot change. It also is required to set the value when declaring (so if you see a const, there should also be an assignment to it)',
  '=': 'Sets the value on the left to whatever the right resolves to',
  // conditionals
  switch: '',
  case: '',
  if: 'Our code block for only running code under certain circumstances. If the expression in our if clause returns true (ish), we execute this code',
  else: 'A code block for when our if clause is false (ish). If we aren\'t running code in the true block, we are running the code in the false block.',
  // conditionals: comparators
  '==/!=/===/!==': 'Our first comparitor that checks if to values are the same. With more complex values like arrays, equality gets more finicky, and checking ',
  // functions
  return: 'One possible action of a function. Sends the value back to whoever called the function.',
  // errors
  SyntaxError: 'This usually means that the code is not properly written JavaScript. Double check your code for any mistakes (they happen to the best of us!)',
  ReferenceError: 'This is usually related to a variable being undefined. Double check that the variable name isn\'t misspelled',
  TypeError: 'This is a fun error! It can be caused by a decent number of things, such as trying to redefine a constant.'
};

const LABEL_OVERRIDES = {
  num: 'number',
  true: 'boolean',
  false: 'boolean',
  object_key: 'object key',
  name: 'variable',
  '[': 'array',
  ']': 'array',
  '=': 'assignment',
  '==/!=/===/!==': '(in)equality',
}

export const terms = _.keys(dictionary);

function HighlightableToken(props) {
  const [isHover, setIsHover] = useState(false);
  const { text, label } = props;
  const toggleHover = () => setIsHover(hover => !hover);
  return (
    <span className={_.kebabCase(LABEL_OVERRIDES[label] || label)} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
      {text}
      {isHover && (
        <span className="hover">
          <b>{LABEL_OVERRIDES[label] || label}:</b>
          <p>{dictionary[label]}</p>
        </span>
      )}
    </span>
  );
}

export default HighlightableToken;