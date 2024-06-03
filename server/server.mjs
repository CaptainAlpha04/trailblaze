import express from 'express'
import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = 3000

const genAI = new GoogleGenerativeAI(process.env.GENAI_API_KEY);

async function run() {

   try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash",
        systemInstruction: `${process.env.SYSTEM_INSTRUCTIONS}`,
        //generationConfig: {"response_mime_type": "application/json"}
        
    }
);

    const prompt = "I am a UG student of Computer Science. My additional experience is none. My favourite subjects in high school were Mathematics, My hobbies are video games and tourism. I am also interested in Freelancing. The field of Front end dev really intrigues Me. "
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text)
    return text;
   } catch (error) {
    console.log(error)
   } 
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    
}

run()

app.get('/', async (req, res)=> {
})

app.listen(PORT, () => {
    console.log("Listening on port 3000")
})