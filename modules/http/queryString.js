//example1
const queryString = require("querystring");

const searchParams = "course=node&lesson=http";

const queryObj = queryString.parse(searchParams);

queryObj.excercise = "querystring";

//example 2
const queryStr = queryString.stringify(queryObj);

console.log(queryStr);

// Most backend developers use URLSearchParams because it is standardized,
//  works in both browsers and Node.js, and makes code easier to maintain and share.
//  Even though querystring is faster, the speed difference is usually not important for most projects.
//  The industry standard is to use URLSearchParams unless working with old
// code or in rare cases where maximum speed is needed.
