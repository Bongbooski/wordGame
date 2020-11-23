export const getAverage = (numArray: number[]) => {
  if (numArray && numArray.length > 0) {
    let result = 0;
    numArray.map((val) => {
      result = result + val;
    });
    return Math.floor(result / numArray.length);
  }
  return 0;
};
