function processEmployees(employees) {
  // Step 1: Filter employees who completed more than 5 tasks
  const filtered = employees.filter(emp => emp.tasksCompleted > 5);

  // Step 2: Map to a new array with name and performance level
  const evaluated = filtered.map(emp => {
    let performance = "";

    if (emp.rating > 4.5) {
      performance = "Excellent";
    } else if (emp.rating >= 3 && emp.rating <= 4.5) {
      performance = "Good";
    } else {
      performance = "Needs Improvement";
    }

    return {
      name: emp.name,
      performance: performance
    };
  });

  // Step 3: Sort by performance priority: Excellent > Good > Needs Improvement
  const priority = {
    "Excellent": 3,
    "Good": 2,
    "Needs Improvement": 1
  };

  const sorted = evaluated.sort((a, b) => {
    return priority[b.performance] - priority[a.performance];
  });

  // Step 4: Return final sorted array
  return sorted;
}
