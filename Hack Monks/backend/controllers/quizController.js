const fs = require('fs');
const path = require('path');

const submitQuiz = async (req, res) => {
  const { responses, name } = req.body;
  console.log(name);

  // Validate input
  if (!responses || !Array.isArray(responses) || responses.length === 0) {
    return res.status(400).json({ error: 'Invalid quiz data.' });
  }

  // Validate name input
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Invalid user name.' });
  }

  // Create quiz content in the required format
  let quizContent = `${name}\n`; // Start with the user's name
  responses.forEach((response, index) => {
    quizContent += `${index + 1}. ${response.question} - ${response.answer}\n`;
  });

  // Sanitize the user's name to ensure safe file creation
  const sanitizedFileName = name.trim().replace(/[^a-zA-Z0-9]/g, '_');
  const resultsDir = path.join(__dirname, '..', 'results');

  console.log(sanitizedFileName);
  // Ensure the results directory exists
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir);
  }

  // Use the sanitized name for the file name with a .txt extension
  const fileName = `${sanitizedFileName}.txt`;
  const filePath = path.join(resultsDir, fileName);

  // Save the quiz content to the file
  try {
    fs.writeFileSync(filePath, quizContent);
    res.status(200).json({ message: 'Quiz submitted successfully.', fileName });
  } catch (error) {
    console.error('Error saving quiz:', error);
    res.status(500).json({ error: 'Failed to save quiz.' });
  }
};

module.exports = { submitQuiz };
