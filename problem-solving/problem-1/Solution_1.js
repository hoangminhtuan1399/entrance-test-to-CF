const adjacentElementsProduct = (...inputArray) => {
    if (inputArray.length < 2) return inputArray[0];

    for (let i = 0; i < inputArray.length; i++) {
        if (typeof (inputArray[i]) !== "number") return "Wrong input";
    }

    let MAX = inputArray[0] * inputArray[1];

    for (let i = 0; i < inputArray.length - 1; i++) {
        let RESULT = inputArray[i] * inputArray[i + 1];

        MAX = RESULT > MAX ? RESULT : MAX;

    }

    return MAX;
}

//test
console.log(adjacentElementsProduct(2, 3, -5, -2, 4));          // => 10