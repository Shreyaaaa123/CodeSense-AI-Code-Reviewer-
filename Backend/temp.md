❌ Bad Code:
```javascript
function sum(){ return a+b; }
```

🔍 Issues:
* ❌ **Undeclared Variables:** The variables `a` and `b` are not declared within the function's scope, nor are they
passed as parameters. This will lead to a `ReferenceError` if `a` and `b` are not defined in an accessible outer scope
(e.g., global scope), which is generally considered a bad practice due to potential side effects and lack of
predictability.
* ❌ **Lack of Predictability & Reusability:** The function's behavior depends entirely on external variables, making it
hard to test, reuse in different contexts, and understand without inspecting the surrounding code. Functions should
ideally take their inputs as parameters.
* ❌ **No Type Safety (Implicit):** While JavaScript is dynamically typed, clearly defined parameters allow for better
static analysis and documentation, improving code robustness.

✅ Recommended Fix:

```javascript
/**
* Calculates the sum of two numbers.
* @param {number} a - The first number.
* @param {number} b - The second number.
* @returns {number} The sum of a and b.
*/
function sum(a, b) {
return a + b;
}

// Example usage:
// console.log(sum(5, 3)); // Output: 8
// console.log(sum(10, -2)); // Output: 8

// --- Modern Alternative (concise for simple functions) ---
/**
* Calculates the sum of two numbers using an arrow function.
* @param {number} a - The first number.
* @param {number} b - The second number.
* @returns {number} The sum of a and b.
*/
const sumArrow = (a, b) => a + b;

// Example usage:
// console.log(sumArrow(5, 3)); // Output: 8
```

💡 Improvements:
* ✔ **Clear Parameters:** The function now explicitly defines `a` and `b` as its inputs, making it self-contained and
reusable.
* ✔ **Prevented Runtime Errors:** Addresses the `ReferenceError` by ensuring `a` and `b` are provided when the function
is called.
* ✔ **Improved Readability & Maintainability:** It's immediately clear what the function expects and how it operates,
making it easier to understand, test, and maintain.
* ✔ **Added Documentation:** JSDoc comments explain the function's purpose, parameters, and return value, adhering to
best practices.
* ✔ **Encourages Testability:** Functions with clear inputs and outputs are much easier to unit test.
* ✔ **Modern Practices:** Provided an arrow function alternative, which is common in modern JavaScript for concise
functions.