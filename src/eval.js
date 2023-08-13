/*
 * We aren't parsing the JS, just letting eval handle it.
 * Although eval isn't recommended, trying to put some boundaries on it with indirect call
 * and adding strict mode
 */
function evalCode(src) {
  let res = null;
  try {
    // run in global scope, prevent a couple attacks
    res = eval?.('"use strict";\n' + src);
  } catch(e) {
    return { error: e, res };
  }
  return { error: null, res };
}

export default evalCode;