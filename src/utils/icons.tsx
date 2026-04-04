import {
  Activity,
  Binary,
  BriefcaseBusiness,
  FileCode2,
  FolderTree,
  GraduationCap,
  Mail,
  Rocket,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import type { ExperienceEntry, FileId } from '../types/portfolio'

export function iconForFile(fileId: FileId): LucideIcon {
  switch (fileId) {
    case 'about':
      return FileCode2
    case 'projects':
      return FolderTree
    case 'experience':
      return Activity
    case 'skills':
      return Binary
    case 'contact':
      return Mail
  }
}

export function iconForExperienceType(type: ExperienceEntry['type']): LucideIcon {
  switch (type) {
    case 'Work':
      return BriefcaseBusiness
    case 'Internship':
      return GraduationCap
    case 'Project':
      return Rocket
    case 'Achievement':
      return Sparkles
  }
}
