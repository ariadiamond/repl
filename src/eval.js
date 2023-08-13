/*
 * We aren't parsing the JS, just letting eval handle it.
 * Although eval isn't recommended, trying to put some boundaries on it with indirect call
 * and adding strict mode
 */
function evalCode(src) {
  let result = null;
  try {
    // run in global scope, prevent a couple attacks
    result = eval?.('"use strict";\n' + src);
  } catch(e) {
    return { error: e, result };
  }
  return { error: null, result };
}

export default evalCode;