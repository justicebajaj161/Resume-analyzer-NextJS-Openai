import { OpenAI } from 'openai';
import { PdfReader } from 'pdfreader';
import mammoth from 'mammoth';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function extractTextFromPDF(buffer) {
  return new Promise((resolve, reject) => {
    const reader = new PdfReader();
    let text = '';
    
    reader.parseBuffer(buffer, (err, item) => {
      if (err) {
        console.error('PDF parsing error:', err);
        reject(new Error('Failed to parse PDF: ' + err.message));
        return;
      }

      if (!item) {
        // End of file
        resolve(text);
        return;
      }

      if (item.text) {
        text += item.text + ' ';
      }
    });
  });
}

async function parseFile(buffer, contentType) {
  try {
    if (contentType === 'application/pdf') {
      return await extractTextFromPDF(buffer);
    } else if (contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    } else if (contentType === 'text/plain') {
      return buffer.toString('utf-8');
    }
    throw new Error('Unsupported file type: ' + contentType);
  } catch (error) {
    console.error('Error parsing file:', error);
    throw new Error('File parsing failed: ' + error.message);
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return Response.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Process file
    const buffer = await file.arrayBuffer();
    const resumeText = await parseFile(buffer, file.type);

    // Updated prompt focusing on 5 key sections
    // Updated prompt focusing on 5 key sections (without scores)
const prompt = `Analyze this resume and provide feedback ONLY about these 5 sections:
1. Skills
2. Education
3. Experience
4. Projects
5. Contact Information

For each section, provide:
- Does it exist? (true/false)
- Brief feedback
- 2-3 specific improvements

Return valid JSON in this exact format:
{
  "skills": {
    "exists": true/false,
    "feedback": " eg: Good technical skills listed",
    "improvements": [
      "eg: Group similar skills together",
      "eg: Skills in demand should be mentioned first"
    ]
  },
  "education": {
    "exists": true/false,
    "feedback": "eg: college listed but missing qualification",
    "improvements": [
      "eg: Add graduation dates"
    ]
  },
  "experience": {
    "exists": true/false,
    "feedback": "eg: Good job descriptions",
    "improvements": [
      "eg: Add the start date of the exerience"
    ]
  },
  "projects": {
    "exists": true/false,
    "feedback": "eg: Missing projects section",
    "improvements": [
      "eg: Include what technology was used in the project",
    ]
  },
  "contact": {
    "exists": true/false,
    "feedback": "Complete contact info",
    "improvements": [ 
       "eg: Email address should also be added"
    ]
  }
}

Resume Content:
${resumeText.substring(0, 10000)}${resumeText.length > 10000 ? '\n[Content truncated]' : ''}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4-1106-preview',
      messages: [
        {
          role: "system",
          content: "You are a resume analyzer. Return ONLY valid JSON in the exact specified format."
        },
        {
          role: "user", 
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 2000,
      response_format: { type: "json_object" }
    });
    
    const analysis = JSON.parse(response.choices[0].message.content);
    console.log(analysis)
    return Response.json(analysis);

  } catch (error) {
    console.error('Error:', error);
    return Response.json(
      {
        error: 'Analysis failed',
        details: error.message,
        suggestion: 'Please try a different file or contact support'
      },
      { status: 500 }
    );
  }
}