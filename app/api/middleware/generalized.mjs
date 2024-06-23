import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import Ajv from 'ajv';

dotenv.config();

// Create a new instance of the GoogleGenerativeAI class
const genAI = new GoogleGenerativeAI(process.env.GENAI_API_KEY);

const ajv = new Ajv();

const schema = {
    type: "object",
    properties: {
        "Recommended Career": { type: "string" },
        "Average Salary WorldWide": { type: "string" },
        "About Recommend Career": { type: "string" },
        "Prerequisites": { type: "array", items: { type: "string" } },
        "Roadmap": { type: "string" },
        "Suggested courses": { 
            type: "array", 
            items: { 
                type: "object", 
                properties: { 
                    Name: { type: "string" }, 
                    Link: { type: "string" } 
                },
                required: ["Name", "Link"]
            }
        },
        "Suggested books": { 
            type: "array", 
            items: { 
                type: "object", 
                properties: { 
                    Name: { type: "string" }, 
                    Link: { type: "string" } 
                },
                required: ["Name", "Link"]
            }
        },
        "Suggested Resources": { 
            type: "array", 
            items: { 
                type: "object", 
                properties: { 
                    Name: { type: "string" }, 
                    Link: { type: "string" } 
                },
                required: ["Name", "Link"]
            }
        },
        "Suggested github repositories": { 
            type: "array", 
            items: { 
                type: "object", 
                properties: { 
                    Name: { type: "string" }, 
                    Link: { type: "string" } 
                },
                required: ["Name", "Link"]
            }
        },
        "Suggested Social Media Influencers": { 
            type: "array", 
            items: { 
                type: "object", 
                properties: { 
                    Name: { type: "string" }, 
                    Link: { type: "string" },
                    Info: { type: "string" }
                },
                required: ["Name", "Link", "Info"]
            }
        },
        "Suggested Podcasts": { 
            type: "array", 
            items: { 
                type: "object", 
                properties: { 
                    Name: { type: "string" }, 
                    Link: { type: "string" } 
                },
                required: ["Name", "Link"]
            }
        },
        "Suggested YouTube Channels": { 
            type: "array", 
            items: { 
                type: "object", 
                properties: { 
                    Name: { type: "string" }, 
                    Link: { type: "string" } 
                },
                required: ["Name", "Link"]
            }
        },
        "Suggested Projects": { 
            type: "array", 
            items: { 
                type: "object", 
                properties: { 
                    Name: { type: "string" }, 
                    Description: { type: "string" },
                    Difficulty: { type: "string" } 
                },
                required: ["Name", "Description", "Difficulty"]
            }
        },
        "Suggested activities": { 
            type: "array", 
            items: { 
                type: "object", 
                properties: { 
                    Name: { type: "string" }, 
                    Description: { type: "string" } 
                },
                required: ["Name", "Description"]
            }
        },
        "Similar Careers": { type: "array", items: { type: "string" } },
    },
    required: [
        "Recommended Career",
        "Average Salary WorldWide",
        "About Recommend Career",
        "Prerequisites",
        "Roadmap",
        "Suggested courses",
        "Suggested books",
        "Suggested Resources",
        "Suggested github repositories",
        "Suggested Social Media Influencers",
        "Suggested Podcasts",
        "Suggested YouTube Channels",
        "Suggested Projects",
        "Suggested activities",
        "Similar Careers"
    ],
};

// Function to clean JSON response
function cleanJSONResponse(text) {
    // Remove both ` and ``` delimiters, as well as **
    return text.replace(/```json|```|`|\*\*/g, '').trim();
}
// Function to generate content for a generalized career
async function generalizedCareer(career) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: `${process.env.GENERALIZED_SYSTEM_INSTRUCTIONS}`,
        });

        const prompt = `
        I want to pursue a career in ${career}.
        In the reasoning section, don't use 2nd person pronouns.
        Use "if", "then", "because", and other reasoning words to explain your reasoning.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        console.log(text);

        // Clean and parse the JSON response
        const cleanedText = cleanJSONResponse(text);
        let data;

        try {
            data = JSON.parse(cleanedText);
        } catch (e) {
            console.error('Invalid JSON format:', e);
            return null;
        }

        // Validate the JSON data
        const valid = ajv.validate(schema, data);
        if (!valid) {
            console.error('JSON validation errors:', ajv.errors);
            return null;
        }

        return data;
    } catch (error) {
        console.log(error);
    }
}

export default generalizedCareer;
