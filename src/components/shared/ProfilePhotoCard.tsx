import { useState } from 'react'
import { Camera, ImageOff } from 'lucide-react'
import { profile } from '../../data/portfolio'

export function ProfilePhotoCard() {
  const [imageBroken, setImageBroken] = useState(false)

  return (
    <div className="rounded-[22px] border border-[var(--panel-border)] bg-[var(--panel)] p-5 sm:p-6">
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">Profile Photo</p>
      <div className="mt-4 overflow-hidden rounded-[20px] border border-[var(--panel-border)] bg-[var(--panel-soft)]">
        {!imageBroken ? (
          <img
            src={profile.photoUrl}
            alt={`${profile.name} profile`}
            className="h-[320px] w-full object-cover object-center"
            onError={() => setImageBroken(true)}
          />
        ) : (
          <div className="flex h-[320px] flex-col items-center justify-center gap-3 bg-[linear-gradient(135deg,rgba(21,33,48,0.9),rgba(12,18,29,0.96))] text-center text-[var(--text-secondary)]">
            <div className="rounded-2xl border border-[var(--panel-border)] bg-[var(--panel)] p-4 text-[var(--accent)]">
              <ImageOff className="size-8" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--text-primary)]">Add your photo here</p>
              <p className="mt-2 max-w-xs text-xs leading-6">
                Replace the placeholder by adding your image as
                <span className="mx-1 text-[var(--accent)]">/public/profile-photo.jpg</span>
                or updating the path in the portfolio data file.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-soft)] p-4">
        <span className="rounded-xl border border-[var(--panel-border)] bg-[var(--panel)] p-3 text-[var(--accent-secondary)]">
          <Camera className="size-4" />
        </span>
        <div>
          <p className="text-sm text-[var(--text-primary)]">Workspace portrait</p>
          <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
            A dedicated photo area makes the portfolio feel more personal and recruiter-friendly.
          </p>
        </div>
      </div>
    </div>
  )
}
