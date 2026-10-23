import { useEffect, useState } from 'react';
import Header from './components/Header';
import Modal from './components/Modal';
import Notice from './components/Notice';
import WelcomePage from './pages/WelcomePage';
import JobsPage from './pages/JobsPage';
import DashboardPage from './pages/DashboardPage';
import { initialJobs } from './data/seed';
import { clearSession, getApplications, getJobs, getProfile, getSession, resetDemoData, saveApplications, saveJobs, saveProfile, saveSession } from './utils/storage';
import { getMatchScore } from './utils/matching';

export default function App() {
  const [jobs,setJobs] = useState(getJobs);
  const [applications,setApplications] = useState(getApplications);
  const [profile,setProfile] = useState(getProfile);
  const [user,setUser] = useState(getSession);
  const [page,setPage] = useState(getSession() ? 'jobs' : 'welcome');
  const [selectedJob,setSelectedJob] = useState(null);
  const [notice,setNotice] = useState('');

  useEffect(()=>saveJobs(jobs),[jobs]);
  useEffect(()=>saveApplications(applications),[applications]);
  useEffect(()=>saveProfile(profile),[profile]);
  useEffect(()=>{if(user)saveSession(user);},[user]);

  function enter(role) {
    const saved = getProfile();
    const demoUser = role === 'recruiter'
      ? {name:'Recruiter Demo',email:'recruiter@example.com',role:'RECRUITER'}
      : {name:saved.name||'Candidate Demo',email:saved.email||'candidate@example.com',role:'CANDIDATE',skills:saved.skills||[],resumeName:saved.resumeName||'',location:saved.location||''};
    setUser(demoUser); saveSession(demoUser); setPage('jobs'); setNotice(`Welcome, ${demoUser.name}! You are using demo mode.`);
  }
  function logout() { setUser(null); clearSession(); setPage('welcome'); setNotice('You have left the demo session.'); }
  function updateProfile(updated) {
    const next={...profile,...updated};setProfile(next);
    const nextUser={...user,...updated};setUser(nextUser);saveSession(nextUser);
  }
  function apply(job) {
    if(!user){setPage('welcome');setNotice('Choose Candidate Demo to apply for jobs.');return;}
    if(user.role!=='CANDIDATE'){setNotice('Switch to Candidate Demo to apply for jobs.');return;}
    if(applications.some(a=>a.jobId===job.id&&a.candidateEmail===user.email)){setNotice('You have already applied for this job.');return;}
    const app={id:Date.now(),jobId:job.id,candidateEmail:user.email,candidateName:user.name,status:'Applied',matchScore:getMatchScore(user.skills||[],job.skills),appliedAt:new Date().toISOString(),interview:null};
    setApplications(prev=>[app,...prev]);setNotice(`Application submitted for ${job.title}.`);
  }
  function postJob(input) {
    const job={...input,id:Date.now(),posted:'Just now',createdBy:user.email,status:'OPEN'};
    setJobs(prev=>[job,...prev]);setNotice('Job published successfully.');
  }
  function updateStatus(id,status) {
    setApplications(prev=>prev.map(app=>app.id===id?{...app,status}:app));setNotice(`Application status changed to ${status}.`);
  }
  function scheduleInterview(applicationId, details) {
    setApplications(prev=>prev.map(app=>app.id===applicationId?{...app,interview:{date:details.date,mode:details.mode}}:app));
    setNotice('Interview schedule saved.');
  }
  function reset() {
    resetDemoData();setJobs(initialJobs);setApplications([]);setProfile({name:'Candidate Demo',email:'candidate@example.com',skills:['HTML','CSS','JavaScript','React'],resumeName:''});setUser(null);setPage('welcome');setNotice('Demo data reset.');
  }
  return (
    <div className="app">
      <Header user={user} page={page} setPage={setPage} onLogout={logout}/>
      <main className="main-content">
        {notice&&<div className="container notice-container"><Notice message={notice} onClose={()=>setNotice('')}/></div>}
        {page==='welcome' ? <WelcomePage onEnter={enter}/> :
          page==='dashboard' && user ? <div className="container"><DashboardPage user={user} jobs={jobs} applications={applications} onSaveProfile={updateProfile} onPostJob={postJob} onUpdateStatus={updateStatus} onScheduleInterview={scheduleInterview}/></div> :
          <div className="container"><JobsPage jobs={jobs} user={user} applications={applications} onView={setSelectedJob} onApply={apply}/></div>}
      </main>
      <footer className="site-footer"><div className="container footer-inner"><span>© 2026 SmartHire Demo</span><span>Built with HTML · CSS · JavaScript · React</span><button onClick={reset}>Reset demo data</button></div></footer>
      {selectedJob&&<Modal title={selectedJob.title} onClose={()=>setSelectedJob(null)}><div className="modal-body"><p className="company-name">{selectedJob.company}</p><p className="job-meta">{selectedJob.location} · {selectedJob.type} · {selectedJob.salary}</p><h3>About this role</h3><p>{selectedJob.description}</p><h3>Required skills</h3><div className="skill-list">{selectedJob.skills.map(s=><span className="skill-tag" key={s}>{s}</span>)}</div><div className="modal-actions"><button className="button button-light" onClick={()=>setSelectedJob(null)}>Close</button><button className="button button-primary" onClick={()=>{apply(selectedJob);setSelectedJob(null);}}>Apply now</button></div></div></Modal>}
    </div>
  );
}
