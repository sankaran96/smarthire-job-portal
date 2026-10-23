import { initialJobs } from '../data/seed';

const KEYS = {
  jobs: 'smarthire_beginner_jobs',
  applications: 'smarthire_beginner_applications',
  profile: 'smarthire_beginner_profile',
  session: 'smarthire_beginner_session'
};

function read(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function getJobs() {
  return read(KEYS.jobs, initialJobs);
}
export function saveJobs(jobs) {
  localStorage.setItem(KEYS.jobs, JSON.stringify(jobs));
}
export function getApplications() {
  return read(KEYS.applications, []);
}
export function saveApplications(applications) {
  localStorage.setItem(KEYS.applications, JSON.stringify(applications));
}
export function getProfile() {
  return read(KEYS.profile, { name: 'Candidate Demo', email: 'candidate@example.com', skills: ['HTML', 'CSS', 'JavaScript', 'React'], resumeName: '' });
}
export function saveProfile(profile) {
  localStorage.setItem(KEYS.profile, JSON.stringify(profile));
}
export function getSession() {
  return read(KEYS.session, null);
}
export function saveSession(session) {
  localStorage.setItem(KEYS.session, JSON.stringify(session));
}
export function clearSession() {
  localStorage.removeItem(KEYS.session);
}

export function resetDemoData() {
  Object.values(KEYS).forEach(key => localStorage.removeItem(key));
}
