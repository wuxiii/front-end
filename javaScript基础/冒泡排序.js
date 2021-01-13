function bubleSort(arr) {
  const len = arr.length;

  for (let i = len; i >= 2; i--) {
    for (let j = 0; j <= i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}

it("bubleSort", async () => {
  const arr = [2, 5, 10, 1, 3, 4];
  expect(bubleSort(arr).toString()).toBe([1, 2, 3, 4, 5, 10].toString());
});
