import React from "react";
import { Helmet } from "react-helmet";

const Blog = () => {
  return (
    <div className='min-h-[70vh]'>
      <Helmet>
        <title>Blogs</title>
      </Helmet>
      <div className='max-w-5xl mx-auto px-4 sm:px-8 py-10'>
        <h1 className='text-3xl text-center my-5'>My Blogs</h1>
        <div
          tabIndex={0}
          className='collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-4'
        >
          <div className='collapse-title text-xl font-medium'>
            What are the different ways to manage a state in a React
            application?
          </div>
          <div className='collapse-content'>
            <p className='mb-2'>
              When we have to pass data from one component to another then it
              can be done easily, but if we want to pass our data in nested
              states then it becomes complicated which is called prop drilling
              i.e. passing the data as props from parent component to child
              component. <br /> To avoid prop drilling we have to manage our
              state in such a way that it can be used by every component without
              prop drilling
            </p>
            <p className='mb-2'>
              There are mainly two types of global states management
              <ul>
                <li>1. Redux</li>
                <li>2.Context API</li>
              </ul>
            </p>
            <p className='mb-2'>
              For creating a large and complex application, redux can be used
              while for small and less use of store context API can be used
            </p>
          </div>
        </div>
        <div
          tabIndex={0}
          className='collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-4'
        >
          <div className='collapse-title text-xl font-medium'>
            How does prototypical inheritance work?
          </div>
          <div className='collapse-content'>
            <p className='mb-2'>
              Every object in JavaScript has an internal property called
              [[Prototype]]. The double square brackets that enclose
              [[Prototype]] signify that it is an internal property, and cannot
              be accessed directly in code.
            </p>
            <p className='mb-2'>
              When you instantiate a functional object using the "new" keyword,
              the resulting object shares any methods that are part of the
              original objects prototype. These are not methods that exist
              within it's closure, but methods that are attached to its
              prototype. If you then instantiate a new object from the one you
              just created, it also shares the properties and methods that exist
              on the original object. This is what is referred to as the
              prototype chain. The deeper your inheritance hierarchy, the less
              performant your property look ups may be, as they need to traverse
              the entire prototype chain. In a multiple level inheritance
              situation, you could benefit from using the module pattern, where
              each new instance has its own set of methods that were defined
              within the closure of the original object.
            </p>
          </div>
        </div>
        <div
          tabIndex={0}
          className='collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-4'
        >
          <div className='collapse-title text-xl font-medium'>
            What is a unit test? Why should we write unit tests?
          </div>
          <div className='collapse-content'>
            <p className='mb-2'>
              Essentially, a unit test is a method that instantiates a small
              portion of our application and verifies its behavior independently
              from other parts. A typical unit test contains 3 phases: First, it
              initializes a small piece of an application it wants to test (also
              known as the system under test, or SUT), then it applies some
              stimulus to the system under test (usually by calling a method on
              it), and finally, it observes the resulting behavior. If the
              observed behavior is consistent with the expectations, the unit
              test passes, otherwise, it fails, indicating that there is a
              problem somewhere in the system under test
            </p>
            <p className='mb-2'>
              When using scripting languages like JavaScript, it is really easy
              to put all your functionality in one place. It is tempting to put
              the file opening logic, data validation and database inserting in
              one function. However, doing so makes the function long and hard
              to understand. <br /> What happens when you try to unit test a
              long function like that? In unit testing, you want your code to be
              in smaller chunks so that it is easier to create a test case for
              it. You might break up your import function to have three
              different functions: one for finding and opening the CSV file, one
              for validating the data and one for running the SQL queries to
              insert the data into the database. Now, it is easier to test. As a
              bonus side effect, your code is organized into smaller functions
              making it cleaner and easier to maintain.
            </p>
          </div>
        </div>
        <div
          tabIndex={0}
          className='collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-4'
        >
          <div className='collapse-title text-xl font-medium'>
            React vs. Angular vs. Vue?
          </div>
          <div className='collapse-content'>
            <p className='mb-2'>
              Angular is developed by Google, React by Facebook, Vue is a
              community-driven open-source project. Three component-focused
              frameworks, where Angular has a lot of built-in features, Vue has
              some built-in features, React is very minimalistic. <br />
            </p>
            <p className='mb-2'>
              Angular uses TypeScript and splits HTML + TypeScript logic apart,
              React uses JavaScript and a feature called "JSX" (it combines
              "HTML" and JavaScript logic), Vue uses regular JavaScript and
              splits HTML + JavaScript logic apart.
            </p>
            <p className='mb-2'>
              Vue is easiest to learn, React and Angular are on the same level
              and a bit more difficult than Vue. All three frameworks offer
              great startup and runtime performance, hence "performance" will
              not be your main decision factor.
            </p>
            <p className='mb-2'>
              ll three frameworks are popular but React is a bit more popular
              than Angular, which in turn is getting used more than Vue.
            </p>
            <p className='mb-2'>
              All frameworks are under active development, new features are
              being added over time to all three of them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
