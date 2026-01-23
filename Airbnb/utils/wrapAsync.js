// A utility function to wrap asynchronous route handlers and middleware
// to catch errors and pass them to the next middleware (error handler)
// This helps to avoid repetitive try-catch blocks in each async route handler
// and keeps the code clean and maintainable

// Example usage:
// const wrapAsync = require('./utils/wrapAsync');
// app.get('/route', wrapAsync(async (req, res, next) => {
//     // your async code here
// }));

// If an error occurs, it will be passed to the next middleware
// automatically
// Defining the wrapAsync function
// It takes a function 'fn' as an argument

function wrapAsync(fn) {  // Returns a new function that wraps the original function
    return function(req, res, next) {    // The returned function takes req, res, and next as arguments
        fn(req, res, next).catch(next); // Calls the  original function and catches any errors, passing them to next()
    }
}
// or using arrow function syntax
module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
};
// Exporting the wrapAsync function to be used in other files
module.exports = wrapAsync;