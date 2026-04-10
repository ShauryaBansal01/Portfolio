export type Theme = 'dark' | 'light'

export type FileId = 'about' | 'projects' | 'skills' | 'contact'

export type TerminalMessageKind = 'input' | 'output' | 'system'

export type ExplorerFile = {
  id: FileId
  label: string
  note: string
}

export type TerminalMessage = {
  id: number
  kind: TerminalMessageKind
  text: string
}

export type PortfolioStat = {
  label: string
  value: string
}

export type Project = {
  id: string
  name: string
  file: string
  status: string
  summary: string
  impact: string
  stack: string[]
  liveUrl?: string
  repoUrl: string
  highlights: string[]
  snippet: string
}

export type ExperienceEntry = {
  id: string
  year: string
  title: string
  type: 'Work' | 'Internship' | 'Project' | 'Achievement'
  duration: string
  summary: string
  details: string[]
  stack: string[]
}

export type SkillDomain = {
  id: string
  name: string
  level?: number
  summary: string
  modules: string[]
}

export type Profile = {
  name: string
  handle: string
  role: string
  headline: string
  summary: string
  location: string
  availability: string
  photoUrl: string
  githubSummary: string
  linkedinSummary: string
  focus: string[]
  principles: string[]
  currentWork: string[]
}

export type ContactLinks = {
  email: string
  github: string
  linkedin: string
  resume: string
}
