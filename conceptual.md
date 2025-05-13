### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
Promises are a good way to manage asynchronous code. Allows chaining and avoids deep nesting. Another way to manage asynchronous code is using async functions with await

- What is a Promise?
Javascrtipt object that represents the eventual result of an asynchronous operation.

- What are the differences between an async function and a regular function?
regular functions return a direct value(number,string etc). Async functions return a promise which. Can use await with async functions. Try/catch works seemlessly with await and thrown errors.

- What is the difference between Node.js and Express.js?
 Node.js is a runtime environment that lets you let Javascript code from server side. Express.js is a web framework that lets us build web servers and PI easily
- What is the error-first callback pattern?
Its a common convention is node where the first argument of a callback is always the error and the second argument is the data/result
- What is middleware?
Middleware is a function that runs before the final route handler, executied with app.use() depending on where we put it it can run before every route.
- What does the `next` function do?
Next is a function that tells express to move to the next middleware or route handler 

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

main issue is that these requests run one after another and not inparallel so the total wait time is the sum of all 3 requests. if we use promise.all() they will run concurrently so they dont have to wait for one to finish to start the other

We can use await instead of relying on Jquery since we are in an async function
No error handling either!