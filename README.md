<<<<<<< HEAD
# SmartHire Beginner — Recruitment and Job Portal

A beginner-friendly React project using HTML, CSS, JavaScript, and browser localStorage. No backend or database server is required.

## Features
- Job listing and keyword search
- Filter jobs by category
- Candidate registration demo and login demo
- Candidate dashboard and application status tracking
- Recruiter demo dashboard
- Recruiters can post jobs
- Candidates can apply to jobs
- Skill-overlap matching score
- Responsive CSS layout
- Browser localStorage persistence

## Requirements
- Node.js 18+ recommended
- VS Code (recommended)

## Run the project
1. Extract the ZIP.
2. Open the `SmartHire_Beginner` folder in VS Code.
3. Open the terminal in that folder.
4. Run:
   ```bash
   npm install
   npm run dev
   ```
5. Open the local URL shown in the terminal, usually `http://localhost:5173`.

## Demo accounts
Use the account selector on the welcome screen to enter Candidate Demo or Recruiter Demo. These are local demo roles, not secure authentication.

## Important learning note
This version stores demo data in the current browser's localStorage. It is not suitable for real candidate personal information, secure resumes, multiple users sharing data, or production recruitment. Resume upload is represented by a demo filename only; no private file is uploaded or stored.

## Suggested learning order
1. `src/data/seed.js` — sample jobs
2. `src/utils/storage.js` — localStorage helper functions
3. `src/App.jsx` — app state and workflows
4. `src/components/` — reusable UI
5. `src/styles.css` — layout and responsive styling

## Build for deployment
```bash
npm run build
```
The generated website is in the `dist/` folder.
=======
# smarthire-job-portal
A beginner-friendly job recruitment portal built using React, JavaScript, HTML, and CSS, with job search, candidate dashboard, and application tracking features.
>>>>>>> 7daed68d5e2bd19d355273e8754fe7d0ca496b82
