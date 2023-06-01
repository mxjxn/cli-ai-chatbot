// Import dependencies
const { Configuration, OpenAIApi } = require("openai");
const readline = require("readline");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Configure OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,

});
const openai = new OpenAIApi(configuration);

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to handle user input and API calls
async function chatWithGPT3(prompt, chatHistory) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: chatHistory + "\nYou: " + prompt + "\nBot: ",
    max_tokens: 888,
  });
  return completion.data.choices[0].text.trim();
}

// Main chat loop
//
function chatLoop(chatHistory = "") {
  rl.question("You: ", async (input) => {
    if (input.toLowerCase() === "exit") {
      rl.close();
    } else if (input.toLowerCase() === "clear") {
      chatLoop(""); // Clear chat history
    } else {
      const response = await chatWithGPT3(input, chatHistory);
      const updatedChatHistory = chatHistory + "\nYou: " + input + "\nGPT-3: " + response;
      console.log("GPT-3: " + response);
      chatLoop(updatedChatHistory);
    }
  });
}

// Start chat loop
console.log("Type 'exit' to end the conversation. Type 'clear' to clear chat history.");

process.stdout.write("\u001b[2J\u001b[0;0H");
chatLoop();
