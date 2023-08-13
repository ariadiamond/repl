/*
 * We are not adding values to the global scope, so this makes things a lot easier
 */
function evalCode(src) {
  let res = null;
  try {
    res = eval(src);
  } catch(e) {
    return { error: e, res };
  }
  return { error: null, res };
}

export default evalCode;