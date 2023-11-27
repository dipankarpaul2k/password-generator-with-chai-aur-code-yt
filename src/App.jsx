import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  let [length, setLength] = useState(8);
  let [numAllowed, setNumAllowed] = useState(false);
  let [charAllowed, setCharAllowed] = useState(false);
  let [password, setPassword] = useState("");

  const passwordRef = useRef();

  /* "useCallback" is a hook in React that is used to memoize functions,
  preventing unnecessary re-creation of functions on each render.
  This can be beneficial in optimizing performance, especially
  in scenarios where functions are passed down to child components. 
  */
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    str += numAllowed ? "0123456789" : "";
    str += charAllowed ? "!@#$%^&*-_+" : "";

    for (let i = 0; i <= length; i++) {
      const randomIndex = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(randomIndex);
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  /* "useRef" is a hook in React that provides a way to keep track 
  of a mutable value that persists across renders of a component. 
  It's commonly used to hold references to DOM elements or to 
  store values that don't trigger a re-render when they change.
  */

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  /* "useEffect" hook is used to perform side effects in functional components.
  The first argument is a function containing the code 
  that will be executed as the side effect.
  The second argument is an optional array of dependencies. 
  If any of the dependencies change, the effect function is re-run.
  If the dependency array is omitted, the effect runs after every render, 
  potentially causing performance issues. If an empty 
  dependency array ([]) is provided, 
  the effect runs only once after the initial render. 
  */
  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        {/* Heading */}
        <h1 className="text-white text-2xl text-center my-3">
          Password generator
        </h1>

        {/* password box */}
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPassword}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            copy
          </button>
        </div>

        {/* options container */}
        <div className="flex justify-between text-sm gap-x-2">
          {/* length input */}
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={32}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>

          {/* number input */}
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="numberInput"
              defaultValue={numAllowed}
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          {/* character input */}
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="charInput"
              defaultValue={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
