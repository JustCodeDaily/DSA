import CodePlayground from '../components/CodePlayground';
import './BlogPost.css';

function ArrayMethodsBlog() {
  return (
    <>
      <article className="blog-post">
        <h1>JavaScript Array Methods</h1>
        <p className="post-meta">Essential array methods every JavaScript developer should know</p>

        <section id="introduction">
          <h2>Introduction</h2>
          <p>
            JavaScript arrays come with powerful built-in methods that make data manipulation 
            efficient and expressive. In this post, we'll explore the most commonly used array 
            methods with practical examples.
          </p>
        </section>

        <section id="map-filter-reduce">
          <h2>Map, Filter, and Reduce</h2>
          <p>
            These three methods form the foundation of functional programming in JavaScript. 
            They allow you to transform, filter, and aggregate array data without mutating 
            the original array.
          </p>
          
          <CodePlayground
            code={`// Map: Transform each element
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
console.log('Doubled:', doubled);

// Filter: Select elements that match criteria
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log('Even numbers:', evenNumbers);

// Reduce: Aggregate to a single value
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log('Sum:', sum);

// Chaining methods
const result = numbers
  .filter(num => num > 2)
  .map(num => num * 3)
  .reduce((acc, num) => acc + num, 0);
  
console.log('Chained result:', result);`}
            height={420}
          />
        </section>

        <section id="find-findindex">
          <h2>Find and FindIndex</h2>
          <p>
            These methods help you locate specific elements in an array. <code>find()</code> returns 
            the first element that matches, while <code>findIndex()</code> returns its position.
          </p>
          
          <CodePlayground
            code={`const users = [
  { id: 1, name: 'Alice', age: 28 },
  { id: 2, name: 'Bob', age: 35 },
  { id: 3, name: 'Charlie', age: 42 }
];

// Find user by name
const user = users.find(u => u.name === 'Bob');
console.log('Found user:', user);

// Find index of user over 40
const index = users.findIndex(u => u.age > 40);
console.log('Index of user over 40:', index);

// Check if element exists
const hasAlice = users.some(u => u.name === 'Alice');
console.log('Has Alice:', hasAlice);

// Check if all match condition
const allAdults = users.every(u => u.age >= 18);
console.log('All adults:', allAdults);`}
            height={380}
          />
        </section>

        <section id="key-takeaways">
          <h2>Key Takeaways</h2>
          <ul>
            <li><strong>map()</strong> - Transform each element and return new array</li>
            <li><strong>filter()</strong> - Select elements that pass a test</li>
            <li><strong>reduce()</strong> - Combine all elements into single value</li>
            <li><strong>find()</strong> - Get first element matching condition</li>
            <li><strong>some()</strong> - Check if any element matches</li>
            <li><strong>every()</strong> - Check if all elements match</li>
          </ul>
        </section>
      </article>
    </>
  );
}

export default ArrayMethodsBlog;
