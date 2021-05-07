function underLinetoCamelCase(name) {
  const splitResult = name.split("_");
  let result = splitResult[0] + "";
  for (let i = 1; i < splitResult.length; i++) {
    const firstLetter = splitResult[i].slice(0, 1);
    const restLetter = splitResult[i].slice(1);
    const CamelCase = firstLetter.toUpperCase() + restLetter;

    result += CamelCase;
  }
  console.log(result);
  return result;
}

underLinetoCamelCase("under_line_to_camecase");
