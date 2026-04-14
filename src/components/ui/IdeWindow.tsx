import { MacDots } from './Primitives'

export function IdeWindow({ filename, children }: { filename: string; children: React.ReactNode }) {
  return (
    <div className="ide-window flex flex-col h-full">
      <div className="ide-titlebar">
        <MacDots />
        <span className="ide-filename">{filename}</span>
      </div>
      <div className="flex-1 p-3 sm:p-4 flex flex-col">{children}</div>
    </div>
  )
}
