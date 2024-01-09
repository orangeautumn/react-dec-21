import React, { useState } from "react";

const CheckAnagram = () => {
  const RESULTS = Object.freeze({
    YES_ANAGRAM: "YES ANAGRAM",
    NO_ANAGRAM: "NO ANAGRAM",
  });

  const [input1, setInput1] = useState();
  const [input2, setInput2] = useState();
  const [result, setResult] = useState();

  const isAnagram = (str1, str2) => {
    if (str1?.length !== str2?.length) {
      return RESULTS.NO_ANAGRAM;
    }

    const arr1 = str1?.split("").sort();
    const arr2 = str2?.split("").sort();

    let isItSame = true;

    arr1?.forEach((item, index) => {
      if (isItSame && item !== arr2[index]) {
        isItSame = false;
      }
    });

    return isItSame ? RESULTS.YES_ANAGRAM : RESULTS.NO_ANAGRAM;
  };

  const isValidAnagram = () => {
    setResult(isAnagram(input1, input2));
  };

  return (
    <>
      <h2> Check Anagram</h2>

      <div>
        <label> Enter Input 1</label>
        <input
          type="text"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
        ></input>
      </div>
      <div>
        <label> Enter Input 2</label>
        <input
          type="text"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
        ></input>
      </div>

      <div>
        <button onClick={isValidAnagram}>Check </button>
      </div>
      <h3> result is -- {result} </h3>
    </>
  );
};

export default CheckAnagram;
