function processStudents(students) {
  // Step 1: Filter students who scored above 60
  const filtered = students.filter(student => student.marks > 60);

  // Step 2: Sort in descending order of marks
  const sorted = filtered.sort((a, b) => b.marks - a.marks);

  // Step 3: Map to extract student names only
  const names = sorted.map(student => student.name);

  // Step 4: Return the array of sorted names
  return names;
}
