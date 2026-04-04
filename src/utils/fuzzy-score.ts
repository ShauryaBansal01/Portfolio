export function fuzzyScore(query: string, candidate: string): number {
  const normalizedQuery = query.trim().toLowerCase()
  if (!normalizedQuery) {
    return 1
  }

  const normalizedCandidate = candidate.toLowerCase()
  if (normalizedCandidate.includes(normalizedQuery)) {
    return 120 - normalizedCandidate.indexOf(normalizedQuery)
  }

  let score = 0
  let lastIndex = -1

  for (const character of normalizedQuery) {
    const nextIndex = normalizedCandidate.indexOf(character, lastIndex + 1)
    if (nextIndex === -1) {
      return -1
    }

    score += 6

    if (nextIndex === lastIndex + 1) {
      score += 4
    }

    if (nextIndex === 0 || normalizedCandidate[nextIndex - 1] === ' ') {
      score += 5
    }

    lastIndex = nextIndex
  }

  return score
}
