require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Visume Backend is running!' });
});

// Example route for user data
app.get('/api/user', (req, res) => {
  res.json({ message: 'User data endpoint' });
});

const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Ensure upload directories exist
const uploadDirs = ['uploads', 'uploads/videos', 'uploads/resumes'];
uploadDirs.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype.startsWith('video/')) {
      cb(null, 'uploads/videos/');
    } else {
      cb(null, 'uploads/resumes/');
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// API Endpoint to handle file uploads
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }
  
  // Return the local file path
  const localUrl = `/uploads/${req.file.destination.split('uploads/')[1]}${req.file.filename}`;
  res.json({ 
    message: 'File uploaded successfully locally',
    localUrl: localUrl
  });
});

app.delete('/api/delete', (req, res) => {
  const { fileUrl } = req.body;
  if (!fileUrl) {
    return res.status(400).json({ error: 'No file URL provided.' });
  }

  // Ensure it's an uploads URL and prevent path traversal
  if (fileUrl.startsWith('/uploads/') && !fileUrl.includes('..')) {
    const filePath = path.join(__dirname, fileUrl);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
        return res.json({ message: 'File deleted locally' });
      } catch (err) {
        return res.status(500).json({ error: 'Failed to delete file' });
      }
    } else {
      return res.status(404).json({ error: 'File not found' });
    }
  }
  res.status(400).json({ error: 'Invalid file URL' });
});

const pdfParse = require('pdf-parse');

const PREDEFINED_SKILLS = [
  "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "C", "Ruby", "Go", "Rust", "PHP", "Swift", "Kotlin", "Dart", "Scala", "Perl", "Haskell", "Lua", "R", "Objective-C", "Assembly", "MATLAB", "Groovy", "Shell Scripting", "Bash", "PowerShell",
  "React", "React Native", "Angular", "Vue.js", "Svelte", "Ember.js", "Backbone.js", "Next.js", "Nuxt.js", "Gatsby", "HTML", "HTML5", "CSS", "CSS3", "Tailwind CSS", "Sass", "Less", "Bootstrap", "Material-UI", "Chakra UI", "Ant Design", "Redux", "Zustand", "Context API", "MobX", "Vuex", "RxJS", "Three.js", "WebGL", "Framer Motion", "jQuery",
  "Node.js", "Express", "NestJS", "Django", "Flask", "FastAPI", "Spring Boot", "Spring", "Laravel", "Symfony", "Ruby on Rails", "ASP.NET", "ASP.NET Core", "GraphQL", "REST API", "gRPC", "Apollo", "Socket.io", "WebSockets", "Koa", "Meteor",
  "SQL", "MySQL", "PostgreSQL", "MongoDB", "Redis", "SQLite", "MariaDB", "Oracle", "Microsoft SQL Server", "Cassandra", "DynamoDB", "CouchDB", "Neo4j", "Elasticsearch", "Supabase", "Firebase", "Firestore", "Realm", "Prisma", "TypeORM", "Sequelize", "Mongoose",
  "AWS", "Google Cloud", "Google Cloud Platform", "GCP", "Azure", "Docker", "Kubernetes", "Terraform", "Ansible", "Puppet", "Chef", "Jenkins", "Travis CI", "CircleCI", "GitLab CI", "GitHub Actions", "Nginx", "Apache", "Linux", "Unix", "Ubuntu", "CentOS", "Vagrant", "CI/CD", "Prometheus", "Grafana", "DataDog", "New Relic", "DigitalOcean", "Heroku", "Vercel", "Netlify", "Cloudflare",
  "Flutter", "Ionic", "Cordova", "Xamarin", "Android Studio", "Xcode", "Android SDK", "iOS SDK",
  "Data Scientist", "Machine Learning Engineer", "TensorFlow", "PyTorch", "Keras", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib", "Seaborn", "OpenCV", "NLTK", "Spacy", "Hugging Face", "LangChain", "Gemini", "ChatGPT", "LLM", "Data Analysis", "Data Visualization", "Jupyter", "Apache Spark", "Hadoop", "Kafka", "Airflow", "Tableau", "Power BI",
  "UI/UX Designer", "Figma", "Adobe XD", "Sketch", "InVision", "Photoshop", "Illustrator", "Premiere Pro", "After Effects", "Blender", "Zeplin", "Wireframing", "Prototyping", "User Research", "Canva",
  "Git", "GitHub", "GitLab", "Bitbucket", "Webpack", "Vite", "Babel", "npm", "Yarn", "pnpm", "ESLint", "Prettier", "Agile", "Scrum", "Kanban", "Jira", "Trello", "Asana", "Confluence", "Notion", "Slack", "Discord", "Postman", "Swagger", "Insomnia", "VS Code", "IntelliJ IDEA", "Eclipse", "Vim", "Neovim",
  "Jest", "Cypress", "Playwright", "Mocha", "Chai", "Jasmine", "Karma", "Puppeteer", "Selenium", "JUnit", "PyTest", "RSpec", "Enzyme", "React Testing Library",
  "Full Stack Developer", "Frontend Developer", "Backend Developer", "DevOps Engineer", "Product Manager", "Project Manager", "Scrum Master", "Software Engineer", "Systems Administrator", "QA Engineer", "Database Administrator"
];

const util = require('util');
const { execFile } = require('child_process');
const execFileAsync = util.promisify(execFile);

// Endpoint for AI Resume Extraction
app.post('/api/extract-skills', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  try {
    if (req.file.mimetype === 'application/pdf' || req.file.originalname.toLowerCase().endsWith('.pdf')) {
      let stdout = '';
      try {
        const result = await execFileAsync('python', [path.join(__dirname, 'extract_pdf.py'), req.file.path]);
        stdout = result.stdout;
      } catch (execError) {
        fs.appendFileSync('debug.log', `Exec Error: ${execError.message}\n`);
        return res.status(500).json({ error: 'Python extraction failed' });
      }
      
      const text = stdout.toLowerCase();
      fs.writeFileSync('debug_text.txt', text);
      
      const extractedSkills = [];
      PREDEFINED_SKILLS.forEach(skill => {
        const regex = new RegExp(`\\b${skill.toLowerCase().replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
        if (regex.test(text)) {
          extractedSkills.push(skill);
        } else if (skill.toLowerCase() === 'c++' && text.includes('c++')) {
           extractedSkills.push(skill);
        } else if (skill.toLowerCase() === 'c#' && text.includes('c#')) {
           extractedSkills.push(skill);
        }
      });

      return res.json({ 
        message: 'Skills extracted successfully', 
        skills: extractedSkills,
        localUrl: `/uploads/${req.file.destination.split('uploads/')[1]}${req.file.filename}`
      });
    } else {
      return res.status(400).json({ error: 'Please upload a valid PDF file.' });
    }
  } catch (error) {
    console.error('Error parsing PDF:', error);
    return res.status(500).json({ error: 'Failed to parse resume.' });
  }
});

// Endpoint for Mock AI KYC Verification
app.post('/api/verify-kyc', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded.' });
  }

  // Simulate AI verification delay (1.5 seconds)
  setTimeout(() => {
    res.json({ 
      verified: true, 
      message: 'Document successfully verified by AI' 
    });
  }, 1500);
});

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
