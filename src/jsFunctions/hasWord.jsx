// to search for a word inside a string
function hasWord(input, word) {
  word = input.match(new RegExp(word, "g"));
  if (word != null) {
    return true;
  } else {
    return false;
  }
}

export default hasWord;