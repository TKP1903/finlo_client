// import react
import React from "react";

function arrayHasSum(
  array,
  sum,
  excludedIndices, // set of indices
  tolerance
) {
  // check if there is a subArray in the array whose sum is equal to the given sum

  // conditions :-
  // 1. the subArray should not contain the excludedIndices
  // 2. time complexity should be O(n) or less

  // using sliding window technique and a hashmap
  // to store the sum of the subArray
  // and the index of the last element of the subArray

  // initialize the hashmap
  const map = new Map();
  // initialize the sum of the subArray
  let subArraySum = 0;
  // iterate over the array
  for (let i = 0; i < array.length; i++) {
    // if the current index is not in the excludedIndices
    if (!excludedIndices.has(i)) {
      // add the current element to the sum of the subArray
      subArraySum += array[i];
      // if the sum of the subArray is equal to the given sum
      if (subArraySum === sum) {
        return true;
      }
      // if the sum of the subArray - the given sum is present in the hashmap
      if (map.has(subArraySum - sum)) {
        return true;
      }
      // store the sum of the subArray and the index of the last element of the subArray
      map.set(subArraySum, i);
    }
  }
  return false;
}

// allow for % error in search match
function searchWithTolerance(tolerance) {
  function hasCloseMatchto(item, query) {
    // try to match the query with the item within tolerance
    if (item == query) return true;
    // find the ascii sum and xor of both the query and the item
    let asciiSum = {
      query: 0,
    };
    let xor = {
      query: 0,
    };
    const asciiArrs = {
      query: [],
      item: [],
    };
    for (let i = 0; i < query.length; i++) {
      asciiArrs.query.push(query.charCodeAt(i));
      asciiArrs.item.push(item.charCodeAt(i));
    }
    for (let i = 0; i < query.length; i++) {
      asciiSum.query += asciiArrs.query[i];
      xor.query ^= asciiArrs.query[i];
    }
    // find if the item contains the subarray with the given ascii sum
    if (arrayHasSum(asciiArrs.item, asciiSum.query, new Set())) {
      return true;
    }
  }
  return function search(input, query) {
    // convert the query to lower case
    query = query.toLowerCase();
    // filter the array of objects
    return input.filter((item) => {
      // convert the object to string
      item = JSON.stringify(item);
      // convert the object to lower case
      item = item.toLowerCase();
      // split for non alphabet
      const queries = query.split(/[^A-Za-z]/);

      queries.forEach((query) => {
        // check if query has close match in item
        if (hasCloseMatchto(item, query)) {
          return true;
        }
      });
      return false;
      // return hasCloseMatchto(item, query);
    });
  };
}

// SIMPLE SEARCH
// filter the an array of objects accroding to the seach query
function search(input, query) {
  // convert the query to lower case
  query = query.toLowerCase();
  // filter the array of objects
  return input.filter((item) => {
    // convert the object to string
    item = JSON.stringify(item);
    // convert the object to lower case
    item = item.toLowerCase();
    // check if the object contains the query
    return item.includes(query);
  });
}

export default search;
export { searchWithTolerance, search };
