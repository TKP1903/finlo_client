// import react
import React from "react";

// allow for % error in search match
function searchWithTolerance(tolerance) {
  function hasCloseMatchto (item, query) {
    // try to match the query with the item within tolerance
    if (item == query)
      return true;
    // find the ascii sum and xor of both the query and the item
    let asciiSum = {
      query: 0,
      item: 0,
    };
    let xor = {
      query: 0,
      item: 0,
    };
    for (let i = 0; i < query.length; i++) {
      asciiSum.query += query.charCodeAt(i);
      xor.query ^= query.charCodeAt(i);
    }
    for (let i = 0; i < item.length; i++) {
      asciiSum.item += item.charCodeAt(i);
      xor.item ^= item.charCodeAt(i);
    }
    // are the sum and xor within tolerance ?
    if (
      Math.abs(asciiSum.query - asciiSum.item) <= tolerance &&
      Math.abs(xor.query - xor.item) <= tolerance
    ) {
      return true;
    } else {
      return false;
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
