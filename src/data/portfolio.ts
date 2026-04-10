import type {
  ContactLinks,
  ExperienceEntry,
  ExplorerFile,
  PortfolioStat,
  Profile,
  Project,
  SkillDomain,
  TerminalMessage,
} from '../types/portfolio'

import profilePhoto from '../assets/photo.jpeg'

export const explorerFiles: ExplorerFile[] = [
  { id: 'about', label: 'about.md', note: 'intro, photo, github, linkedin' },
  { id: 'projects', label: 'projects.json', note: 'Streamify, CareerLens, Mind Mirror' },
  { id: 'skills', label: 'skills.ts', note: 'strengths, stack, dependencies' },
  { id: 'contact', label: 'contact.js', note: 'email, github, linkedin, resume' },
]

export const initialTerminalMessages: TerminalMessage[] = [
  { id: 1, kind: 'system', text: 'boot sequence complete' },
  { id: 2, kind: 'system', text: 'workspace ready · type "help" to inspect commands' },
]

export const profile: Profile = {
  name: 'Shaurya',
  handle: 'shaurya@workspace',
  role: 'Full Stack Developer',
  headline:
    'I build user-friendly products with clean UI, useful tooling, and interfaces that feel like real working systems.',
  summary:
    'This portfolio is designed like a coding environment because that is where I do my best work. I enjoy building practical products, thoughtful user experiences, and tools that help people move faster with confidence.',
  location: 'India',
  availability: 'Open to software engineering, frontend, backend and full stack roles',
  photoUrl: profilePhoto,
  githubSummary:
    'My GitHub reflects how I think: practical project structure, readable commits, JavaScript-heavy work, and products built to be maintained rather than just demoed.',
  linkedinSummary:
    'LinkedIn is where I share my journey, connect with recruiters and engineers, and give a clearer professional view beyond code alone.',
  focus: ['Frontend Engineering', 'Backend Engineering', 'Developer Tooling', 'Full Stack Apps'],
  principles: [
    'Build interfaces that explain themselves.',
    'Prefer maintainable systems over clever complexity.',
    'Make technical depth feel approachable.',
  ],
  currentWork: [
    'Improving product experiences with code-first UI thinking.',
    'Building projects that solve real workflow problems.',
    'Strengthening my public portfolio across code, projects, and professional presence.',
  ],
}

export const stats: PortfolioStat[] = [
  { label: 'Core Projects', value: '3' },
  { label: 'Primary Stack', value: 'React + JS' },
  { label: 'Profile Style', value: 'Code First' },
  { label: 'Current Goal', value: 'Impactful Roles' },
]

export const projects: Project[] = [
  {
    id: 'streamify',
    name: 'Streamify',
    file: 'apps/streamify.tsx',
    status: 'Featured Project',
    summary:
      'A real-time video chat and communication platform built with the MERN stack, enabling high-quality video and audio calls between users.',
    impact:
      'Built a full-stack communication platform with real-time video calling, friend management, and a responsive dark-mode UI.',
    stack: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Tailwind CSS', 'GetStream', 'TanStack Query', 'Daisy UI'],
    repoUrl: 'https://github.com/ShauryaBansal01/Video-chat-realtime',
    highlights: [
      'Integrated GetStream for reliable, real-time video and audio communication.',
      'Implemented a MERN stack architecture with TanStack Query for efficient server state management.',
      'Designed a highly responsive, accessible interface utilizing Tailwind CSS and Daisy UI.',
    ],
    snippet: `export function VideoCallRoom({ channel }: { channel: Channel }) {
  return (
    <article className="rounded-xl border border-slate-700 p-4">
      <h3>{channel.name}</h3>
      <div className="video-player-frame">
        <CallPlayer channel={channel} />
      </div>
      <button className="btn-join">Join Call</button>
    </article>
  )
}`,
  },
  {
    id: 'careerlens',
    name: 'CareerLens',
    file: 'apps/careerlens.tsx',
    status: 'Featured Project',
    summary:
      'An AI-powered platform to parse resumes and generate ATS-compliant LaTeX resumes tailored to specific job descriptions.',
    impact:
      'Reduced resume customization time by 80%+ and significantly improved ATS match rates.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Gemini API', 'Tailwind CSS'],
    liveUrl: 'https://career-lens-vert.vercel.app/',
    repoUrl: 'https://github.com/ShauryaBansal01/CareerLens',
    highlights: [
      'Implemented JD-based bullet rewriting using the STAR method and dynamic skill prioritization to improve role relevance.',
      'Built robust features including resume versioning, fast user authentication, and a scalable responsive dark-mode UI.',
    ],
    snippet: `// AI-Powered Resume Parsing Engine
export async function generateAtsResume(resume: string, jd: string) {
  const optimizedData = await geminiApi.analyze({
    text: resume,
    targetRole: jd,
    framework: 'STAR-method',
  })
  
  return renderLatexTemplate(optimizedData)
}`,
  },
  {
    id: 'mind-mirror',
    name: 'Mind Mirror',
    file: 'apps/mind-mirror.tsx',
    status: 'Featured Project',
    summary:
      'A modern mental wellness journaling application that empowers users to track their moods, analyze cognitive patterns, and gain actionable insights through AI-driven recommendations.',
    impact:
      'Built a calm, analytics-driven space that visualizes mood distributions and cognitive trends to improve mental well-being.',
    stack: ['React', 'Node.js', 'Recharts', 'Tailwind CSS', 'AI Integrations'],
    repoUrl: 'https://github.com/ShauryaBansal01/Mind_Mirror',
    highlights: [
      'Developed interactive analytics dashboards with Recharts for visualizing weekly progress and tracking mood history.',
      'Implemented an AI insights engine to deliver personalized recommendations based on journaling data.',
      'Secured user mental wellness data with a robust authentication system, presented in a clean, highly responsive UI.',
    ],
    snippet: `// AI Wellness Insights & Analytics
export function AnalyticsDashboard({ entries }: { entries: JournalEntry[] }) {
  return (
    <div className="rounded-2xl border border-slate-700 p-5">
      <h3>Weekly Mood Trends</h3>
      <div className="analytics-chart">
        <RechartsLineChart data={formatMoodData(entries)} />
      </div>
      <AIRecommendations cognitiveData={entries} />
    </div>
  )
}`,
  },
]

export const experienceEntries: ExperienceEntry[] = [
  {
    id: 'careerlens-release',
    year: '2025',
    title: 'CareerLens Development',
    type: 'Project',
    duration: '2025',
    summary:
      'Developed an AI-powered platform to parse resumes and generate ATS-compliant LaTeX resumes tailored to specific job descriptions.',
    details: [
      'Implemented JD-based bullet rewriting using the STAR method and dynamic skill prioritization to improve role relevance.',
      'Built robust features including resume versioning, fast user authentication, and a scalable responsive dark-mode UI.',
      'Reduced resume customization time by 80%+ and significantly improved ATS match rates.',
    ],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Gemini API', 'Tailwind CSS'],
  },
  {
    id: 'mind-mirror-release',
    year: '2024',
    title: 'Mind Mirror Development',
    type: 'Project',
    duration: '2024',
    summary:
      'Created a modern mental wellness journaling application to track moods, analyze cognitive patterns, and gain insights.',
    details: [
      'Developed interactive analytics dashboards with Recharts for visualizing weekly progress and tracking mood history.',
      'Implemented an AI insights engine to deliver personalized recommendations based on journaling data.',
      'Secured user mental wellness data with a robust authentication system, presented in a clean, highly responsive UI.',
    ],
    stack: ['React', 'Node.js', 'Recharts', 'Tailwind CSS', 'AI Integrations'],
  },
]

export const skillDomains: SkillDomain[] = [
  {
    id: 'languages-frameworks',
    name: 'Languages & Frameworks',
    summary: 'Core programming languages and modern web frameworks for full-stack development.',
    modules: ['C++', 'JavaScript', 'React.js', 'Express.js', 'Node.js', 'Tailwind CSS'],
  },
  {
    id: 'cloud-databases',
    name: 'Cloud & Databases',
    summary: 'Database management and cloud services for robust backend architectures.',
    modules: ['MongoDB', 'Firebase', 'MySQL'],
  },
  {
    id: 'tools-libraries',
    name: 'Tools & Libraries',
    summary: 'Essential developer tools and libraries that streamline the development workflow.',
    modules: ['C++ STL', 'TanStack Query', 'VS Code', 'Git', 'GitHub', 'Postman', 'Vercel'],
  },
  {
    id: 'coursework',
    name: 'Core Coursework',
    summary: 'Strong foundation in computer science principles and software engineering concepts.',
    modules: ['Data Structures & Algorithms', 'Operating Systems', 'OOPs', 'DBMS', 'Computer Networks', 'Software Engineering'],
  },
  {
    id: 'soft-skills',
    name: 'Soft Skills',
    summary: 'Key interpersonal attributes for effective problem-solving and collaboration.',
    modules: ['Problem-solving', 'Communication', 'Adaptability', 'Willingness to Learn'],
  },
]

export const dependencyGraph = [
  'github -> project-history -> engineering-trust',
  'ui-systems -> reusable-components -> maintainable-frontends',
  'project-storytelling -> recruiter-clarity -> stronger-portfolio',
  'linkedin -> professional-presence -> better-opportunities',
]

export const contactLinks: ContactLinks = {
  email: 'shauryabansal2005@gmail.com',
  github: 'https://github.com/ShauryaBansal01',
  linkedin: 'https://www.linkedin.com/in/shauryabansal70/',
  resume: 'https://example.com/shaurya-resume.pdf',
}
