import axios from "axios"

const apiKey = process.env.OPENAI_API_KEY
const gptInstace = axios.create({
  baseURL: "https://api.openai.com/v1/chat/completions",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`,
  },
})

export const generateResponse = async (message: string) => {
  try {
    if (apiKey === undefined) {
      return("No api key has been set. Look at example.env.txt")
    }
    const response = await gptInstace.post("", {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: message,
          temperature: 0.7,
        },
      ],
    })

    return response.data.choices[0].message.content
  } catch (error) {
    console.error("Error sending message to ChatGPT:", error)
    return ""
  }
}
