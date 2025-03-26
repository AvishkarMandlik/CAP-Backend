function getSem(Year, Sem) {
  const sem = Sem.split("").pop();
  switch (Year) {
    case "First Year":
      return sem;
    case "Second Year":
      return (2 + Number(sem));
    case "Third Year":
      return (4 + Number(sem));
    case "Fourth Year":
      return (6 + Number(sem));
    case "Fifth Year":
      return (8 + Number(sem));
  }
}

module.exports = { getSem };
