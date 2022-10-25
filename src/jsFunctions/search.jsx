// import react
import React from "react";

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