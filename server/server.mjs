import express from 'express'
import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

const app = express()
const PORT = 3000

app.use(cors({origin: true, credentials: true}))
app.use(express.json())

const genAI = new GoogleGenerativeAI(process.env.GENAI_API_KEY);

async function personalizedCareer(req) {

   try {
    const { degree, majorSubject, favouriteHighSchoolSubjects, hobbies, 
        additionalInterests, fieldsInterestedIn, additionalExperience } = req.body
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash",
        systemInstruction: `${process.env.SYSTEM_INSTRUCTIONS}`,
        //generationConfig: {"response_mime_type": "application/json"}
        
    }
);

    const prompt = `
    I am a ${degree} student with major subject ${majorSubject}.  
    My favourite subjects in high school were ${favouriteHighSchoolSubjects}.
    My hobbies are ${hobbies}
    I am also interested in ${additionalInterests}. 
    My additional Experience is ${additionalExperience}.
    The fields I am interested in are ${fieldsInterestedIn}.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    console.log(text)
    return text;
   } catch (error) {
    console.log(error)
   } 
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    
}

app.post('/personalized', async (req, res)=> {
    try {
        const personalizedResponse = await personalizedCareer(req)
        res.send({personalizedResponse}).status(200)
    } catch (error) {
        console.log(error)
    
    }    
})

app.listen(PORT, () => {
    console.log("Listening on port 3000")
})