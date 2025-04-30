const pathPrompt =(topic,goal, currentLevel, timeCommitment)=>{
    return  `
      Create a structured learning path for a student with the following details:
      - Topic: ${topic}
      - Learning goal: ${goal}
      - Current knowledge level: ${currentLevel || 'Beginner'}
      - Time commitment: ${timeCommitment || '5 hours per week'}
      
      The learning path should include:
      1. A list of 5-7 modules in logical order
      2. For each module, include 3-5 specific topics to learn
      3. For each module, suggest learning resources (books, courses, videos)
      4. Estimated time to complete each module
      5. Small projects or exercises to practice after each module
      
      Format the response as a JSON object with the following structure:
      {
        "title": "Learning path title",
        "description": "Brief description of the learning path",
        "modules": [
          {
            "name": "Module name",
            "description": "Module description",
            keywords: ["Keywords"],
            "topics": ["Topic 1", "Topic 2", "Topic 3"],
            "resources": ["Resource 1", "Resource 2"],
            "estimatedHours": 10,
            "projects": ["Project 1", "Project 2"]
          }
        ]
      }

    `;
}

const modulePrompt = (topic)=>{
  return `
  create an in-depth learning material of about 10 to 15 paragraphs based on ${topic}.
  Format the response as a JSON object with the following structure
  {
  module: "topic",
  learning material: " essay",
  additional resources: ["external links"],
  } `
}

export { pathPrompt, modulePrompt}