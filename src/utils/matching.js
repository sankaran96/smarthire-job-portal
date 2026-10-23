export function getMatchScore(candidateSkills = [], jobSkills = []) {
  const candidate = new Set(candidateSkills.map(skill => skill.trim().toLowerCase()));
  const required = [...new Set(jobSkills.map(skill => skill.trim().toLowerCase()).filter(Boolean))];
  if (required.length === 0) return 0;
  const matched = required.filter(skill => candidate.has(skill)).length;
  return Math.round((matched / required.length) * 100);
}
