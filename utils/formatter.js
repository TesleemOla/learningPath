export function parseAIResponse(originalInput) {
  
 
    const weeks = [];
    const weekSections = input.split(/\*\*Week \d+: /).slice(1); // Split by week headers and remove the first empty element

    weekSections.forEach((section) => {
        const [titleAndGoal, ...rest] = section.split(/\*\*Topics:\*\*/ || /\*\*Key Topics:\*\*/);
        const [title, goal] = titleAndGoal.split(/\*\*Goal:\*\s*/).map((s) => s.trim());

        const [topicsAndProject, resources] = rest.join("").split(/\*\*Project:\*\*/);
        const topics = topicsAndProject
            .split("\n")
            .filter((line) => line.trim().startsWith("*"))
            .map((line) => line.replace(/^\*\s*/, "").trim());

        const project = resources
            ? resources.split("\n").find((line) => line.trim().startsWith("*"))?.replace(/^\*\s*/, "").trim()
            : "";

        weeks.push({
            title: title.trim(),
            goal: goal.trim(),
            topics,
            project,
        });
    });

    return weeks;
}


[
    {
        "title": "Foundations (Beginner)**\n\n*",
        "goal": "* Understand basic syntax, data types, and control flow.\n*",
        "topics": [
            "* Setting up Python environment (installation, IDE/editor choice)",
            "* Variables, data types (integers, floats, strings, booleans)",
            "* Operators (arithmetic, comparison, logical)",
            "* Input/Output (print(), input())",
            "* Conditional statements (if, elif, else)",
            "* Loops (for, while)",
            "* Basic data structures: Lists and tuples",
            ""
        ]
    },
    {
        "title": "Intermediate Concepts**\n\n*",
        "goal": "* Master functions, working with strings, and more complex data structures.\n*",
        "topics": [
            "* Functions (defining, calling, parameters, return values)",
            "* String manipulation (slicing, methods)",
            "* Dictionaries",
            "* Working with files (reading and writing)",
            "* Exception handling (try-except blocks)",
            "* Modules and packages (importing libraries)",
            ""
        ]
    },
    {
        "title": "Object-Oriented Programming (OOP) and Libraries**\n\n*",
        "goal": "* Understand OOP principles and utilize external libraries.\n*",
        "topics": [
            "* Object-Oriented Programming (classes, objects, methods, inheritance)",
            "* Working with popular libraries:",
            "* `NumPy` (for numerical computation) - focus on array manipulation",
            "* `Pandas` (for data analysis) - focus on DataFrame basics",
            ""
        ]
    },
    {
        "title": "Advanced Topics & Project**\n\n*",
        "goal": "*  Apply learned skills to a larger project and explore advanced concepts.\n*",
        "topics": [
            "*  Advanced Pandas (data cleaning, manipulation, analysis)",
            "*  Introduction to data visualization (Matplotlib or Seaborn)",
            "*  Choosing and using appropriate data structures for specific tasks",
            "*  Debugging techniques and best practices",
            "*  Version control with Git (basic commands)",
            ""
        ],
        "project": "*Resources:**"
    }
]
