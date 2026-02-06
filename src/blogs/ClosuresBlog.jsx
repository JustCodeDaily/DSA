import CodePlayground from '../components/CodePlayground';
import './BlogPost.css';

function ClosuresBlog() {
  return (
    <>
      <article className="blog-post">
        <h1>Understanding JavaScript Closures</h1>
        <p className="post-meta">Master one of JavaScript's most powerful features</p>

        <section id="what-is-closure">
          <h2>What is a Closure?</h2>
          <p>
            A closure is a function that has access to variables in its outer (enclosing) scope, 
            even after the outer function has returned. This creates a private scope that persists 
            between function calls.
          </p>
        </section>

        <section id="basic-example">
          <h2>Basic Closure Example</h2>
          <p>
            The inner function maintains access to the outer function's variables, creating 
            a persistent private state.
          </p>
          
          <CodePlayground
            code={`// Basic closure
function createCounter() {
  let count = 0; // Private variable
  
  return function() {
    count++;
    return count;
  };
}

const counter1 = createCounter();
console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter1()); // 3

// Each counter has its own closure
const counter2 = createCounter();
console.log(counter2()); // 1
console.log(counter2()); // 2

// Original counter is unaffected
console.log(counter1()); // 4`}
            height={420}
          />
        </section>

        <section id="private-methods">
          <h2>Practical Use Case: Private Methods</h2>
          <p>
            Closures enable data encapsulation by creating private methods and variables 
            that can't be accessed directly from outside.
          </p>
          
          <CodePlayground
            code={`function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private
  
  // Public API
  return {
    deposit(amount) {
      if (amount > 0) {
        balance += amount;
        return \`Deposited $\${amount}. New balance: $\${balance}\`;
      }
      return 'Invalid amount';
    },
    
    withdraw(amount) {
      if (amount > 0 && amount <= balance) {
        balance -= amount;
        return \`Withdrew $\${amount}. New balance: $\${balance}\`;
      }
      return 'Invalid amount or insufficient funds';
    },
    
    getBalance() {
      return \`Current balance: $\${balance}\`;
    }
  };
}

const myAccount = createBankAccount(100);
console.log(myAccount.getBalance());
console.log(myAccount.deposit(50));
console.log(myAccount.withdraw(30));
console.log(myAccount.getBalance());

// Cannot access balance directly
console.log('Direct access:', myAccount.balance); // undefined`}
            height={480}
          />
        </section>

        <section id="common-pitfall">
          <h2>Common Pitfall: Closures in Loops</h2>
          <p>
            A classic gotcha when using closures inside loops. Understanding this 
            helps avoid unexpected behavior.
          </p>
          
          <CodePlayground
            code={`// Problem: Using var in loops
console.log('--- Problem with var ---');
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log('var:', i); // All print 3!
  }, 100);
}

// Solution 1: Use let (block-scoped)
console.log('\n--- Solution with let ---');
for (let j = 0; j < 3; j++) {
  setTimeout(function() {
    console.log('let:', j); // Prints 0, 1, 2
  }, 200);
}

// Solution 2: Create closure with IIFE
console.log('\n--- Solution with IIFE ---');
for (var k = 0; k < 3; k++) {
  (function(num) {
    setTimeout(function() {
      console.log('IIFE:', num); // Prints 0, 1, 2
    }, 300);
  })(k);
}`}
            height={480}
          />
        </section>

        <section id="key-takeaways">
          <h2>Key Takeaways</h2>
          <ul>
            <li>Closures allow functions to access outer scope variables</li>
            <li>They create private variables and methods (encapsulation)</li>
            <li>Each closure has its own independent scope</li>
            <li>Use <code>let</code> instead of <code>var</code> in loops to avoid closure pitfalls</li>
            <li>Closures are fundamental to many JavaScript patterns (modules, callbacks, etc.)</li>
          </ul>
        </section>
      </article>
    </>
  );
}

export default ClosuresBlog;
