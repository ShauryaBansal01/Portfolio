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
  { id: 'projects', label: 'projects.json', note: 'LingoBridge, CareerLens, Mind Mirror' },
  { id: 'experience', label: 'experience.log', note: 'journey, milestones, growth' },
  { id: 'skills', label: 'skills.ts', note: 'strengths, stack, dependencies' },
  { id: 'contact', label: 'contact.js', note: 'email, github, linkedin, resume' },
]

export const initialTerminalMessages: TerminalMessage[] = [
  { id: 1, kind: 'system', text: 'boot sequence complete' },
  { id: 2, kind: 'system', text: 'workspace ready · type "help" to inspect commands' },
]

export const profile: Profile = {
  name: 'Your Name',
  handle: 'yourname@workspace',
  role: 'Full Stack Developer',
  headline:
    'I build developer-friendly products with clean UI, useful tooling, and interfaces that feel like real working systems.',
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
    id: 'lingobridge',
    name: 'LingoBridge',
    file: 'apps/lingobridge.tsx',
    status: 'Featured Project',
    summary:
      'A language learning and communication platform focused on helping users practice, understand, and bridge everyday language barriers.',
    impact:
      'Built as a product that combines approachable design with practical problem solving around communication.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    repoUrl: 'https://github.com/yourname/lingobridge',
    highlights: [
      'Designed a user-friendly interface for language-focused workflows.',
      'Structured the app to keep learning flows simple and easy to navigate.',
      'Used modular frontend patterns to keep the product scalable.',
    ],
    snippet: `export function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <article className="rounded-xl border border-slate-700 p-4">
      <h3>{lesson.title}</h3>
      <p>{lesson.languagePair}</p>
      <button>Continue practice</button>
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
      'A career-focused platform that helps users understand opportunities, improve direction, and explore professional growth paths with more clarity.',
    impact:
      'Turns career discovery into a more guided and less overwhelming product experience.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase'],
    liveUrl: 'https://career-lens-vert.vercel.app/',
    repoUrl: 'https://github.com/yourname/careerlens',
    highlights: [
      'Organized complex information into a cleaner exploration flow.',
      'Focused on clarity, usability, and guiding the user toward decisions.',
      'Built components that support a polished recruiter-facing project presentation.',
    ],
    snippet: `export function CareerPathCard({ path }: { path: CareerPath }) {
  return (
    <section className="space-y-2">
      <h3>{path.title}</h3>
      <p>{path.summary}</p>
      <span>{path.growthLevel}</span>
    </section>
  )
}`,
  },
  {
    id: 'mind-mirror',
    name: 'Mind Mirror',
    file: 'apps/mind-mirror.tsx',
    status: 'Featured Project',
    summary:
      'A reflective self-awareness project centered on journaling, mood insights, and helping users better understand their thoughts and habits.',
    impact:
      'Shows my interest in building calmer digital experiences with a personal and human-centered feel.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    repoUrl: 'https://github.com/yourname/mind-mirror',
    highlights: [
      'Created an interface that feels personal without becoming visually noisy.',
      'Balanced interaction and minimalism for a thoughtful product mood.',
      'Used component-driven design to keep the experience cohesive.',
    ],
    snippet: `export function ReflectionPanel({ entry }: { entry: JournalEntry }) {
  return (
    <div className="rounded-2xl border border-slate-700 p-5">
      <p>{entry.mood}</p>
      <h3>{entry.title}</h3>
      <p>{entry.summary}</p>
    </div>
  )
}`,
  },
]

export const experienceEntries: ExperienceEntry[] = [
  {
    id: 'build-phase',
    year: '2026',
    title: 'Portfolio and Product Building',
    type: 'Project',
    duration: 'Current',
    summary:
      'Focused on building a stronger public portfolio that reflects both my technical depth and product thinking.',
    details: [
      'Created polished personal projects with clear problem statements and structured frontend architecture.',
      'Improved how I present projects through stronger storytelling, cleaner UI, and developer-centric design.',
      'Built this portfolio to feel like a real workspace rather than a generic template.',
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 'careerlens-release',
    year: '2025',
    title: 'CareerLens Development',
    type: 'Project',
    duration: '2025',
    summary:
      'Worked on a project focused on career guidance, clarity, and helping users evaluate growth paths.',
    details: [
      'Designed an interface that organizes career information in a clean and guided way.',
      'Used reusable UI components to keep the experience scalable and consistent.',
      'Focused on making the product helpful rather than overwhelming.',
    ],
    stack: ['React', 'TypeScript', 'Firebase'],
  },
  {
    id: 'lingobridge-release',
    year: '2024',
    title: 'LingoBridge Development',
    type: 'Project',
    duration: '2024',
    summary:
      'Built a language-focused product experience around connection, learning, and practical communication.',
    details: [
      'Translated a learning-oriented product idea into a cleaner frontend experience.',
      'Designed reusable cards and flows for lessons, progress, and practice.',
      'Strengthened my confidence in shipping structured frontend work.',
    ],
    stack: ['React', 'TypeScript', 'Node.js'],
  },
  {
    id: 'mind-mirror-release',
    year: '2023',
    title: 'Mind Mirror Development',
    type: 'Achievement',
    duration: '2023',
    summary:
      'Explored building a calmer reflective app experience centered on journaling and self-awareness.',
    details: [
      'Focused on balancing emotional tone with usable interaction design.',
      'Built UI that feels intentional and personal without becoming visually heavy.',
      'Used the project to develop stronger design instincts in frontend work.',
    ],
    stack: ['React', 'TypeScript', 'Framer Motion'],
  },
]

export const skillDomains: SkillDomain[] = [
  {
    id: 'frontend',
    name: 'Frontend Systems',
    level: 90,
    summary: 'Building interfaces that stay clean, responsive, and easy to use.',
    modules: ['React', 'TypeScript', 'Tailwind CSS', 'Responsive Design', 'Accessibility'],
  },
  {
    id: 'projects',
    name: 'Project Architecture',
    level: 84,
    summary: 'Structuring apps so features and components stay easy to grow.',
    modules: ['Component Design', 'File Organization', 'State Design', 'Reusable UI'],
  },
  {
    id: 'tooling',
    name: 'Developer Workflow',
    level: 82,
    summary: 'Creating development experiences that feel organized and efficient.',
    modules: ['Vite', 'GitHub', 'CLI Thinking', 'Debugging', 'Deployment'],
  },
  {
    id: 'product',
    name: 'Product Thinking',
    level: 80,
    summary: 'Turning ideas into useful products with clearer user journeys.',
    modules: ['UX Thinking', 'Problem Solving', 'Project Storytelling', 'Iteration'],
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
  resume: 'https://example.com/yourname-resume.pdf',
}
