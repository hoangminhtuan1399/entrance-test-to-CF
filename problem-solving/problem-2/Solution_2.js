const alternatingSums = (...inputArray) => {
    if (inputArray.length < 2) return [inputArray[0], 0];

    for (let i = 0; i < inputArray.length; i++) {
        if (typeof (inputArray[i]) !== "number" || inputArray[i] < 0) return "Wrong input";
    };

    const RESULT = [];

    let MAX_TEAM_1 = 0;

    let MAX_TEAM_2 = 0;

    for (let i = 0; i < inputArray.length; i++) {
        if (i % 2 === 0) {
            MAX_TEAM_1 += inputArray[i];
        } else {
            MAX_TEAM_2 += inputArray[i];
        }
    };

    RESULT.push(...[MAX_TEAM_1, MAX_TEAM_2]);

    return RESULT;
}

// test
console.log(alternatingSums(60, 40, 20, 55, 75, 64));           // => [155, 159]