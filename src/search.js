const emojis = require("./emojis");

function search(searchString) {
  /**
   * Flesh out this function so that it returns all the
   * emojis that match the supplied string. It should
   * return an array that contains the subset of matching
   * emojis in the following format:
   *
   * [ { name: 'NAME', emoji: 'EMOJI' }, ... ]
   *
   * A list of emojis have been made available in JSON
   * format in the emojis.json file in this directory.
   *
   * You can check `tests/search.test.js` to see the
   * criteria that this function should satisfy. The test
   * script assumes that emojis from the data file are
   * being used. You can run all tests from the command
   * line as follows:
   *
   *     $ npm run task1:test
   *
   * Have fun!
   */
  return Object.keys(emojis).map(result => {
    if(result.includes(searchString))
    {
      return {"emoji" : emojis[result], "name" : result};
    }
    else {
      return false;
    }
  }).filter(Boolean)
}

module.exports = search;
