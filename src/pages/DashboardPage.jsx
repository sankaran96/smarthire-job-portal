import { useState } from 'react';
import { getMatchScore } from '../utils/matching';

export default function DashboardPage({ user, jobs, applications, onSaveProfile, onPostJob, onUpdateStatus, onScheduleInterview }) {
  const [profile, setProfile] = useState({ name: user.name, email: user.email, skills: user.skills || [], resumeName: user.resumeName || '', location: user.location || '' });
  const [skillsText, setSkillsText] = useState((user.skills || []).join(', '));
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobForm, setJobForm] = useState({title:'',company:'Demo Company',location:'Chennai, Tamil Nadu',type:'Full-time',category:'Development',salary:'',skills:'HTML, CSS, JavaScript, React',description:''});
  const [schedule, setSchedule] = useState({ applicationId:'', date:'', mode:'Online' });
  const [message, setMessage] = useState('');

  const myApplications = applications.filter(app => app.candidateEmail === user.email);
  const myJobs = jobs.filter(job => job.createdBy === user.email);
  const myApplicants = applications.filter(app => myJobs.some(job => job.id === app.jobId));
  const matchedJobs = jobs.map(job => ({...job, score:getMatchScore(profile.skills,job.skills)})).sort((a,b)=>b.score-a.score).slice(0,3);

  function saveProfile(e) {
    e.preventDefault();
    const updated = {...profile, skills: skillsText.split(',').map(s=>s.trim()).filter(Boolean)};
    onSaveProfile(updated); setProfile(updated); setMessage('Your profile has been saved.');
  }
  function postJob(e) {
    e.preventDefault();
    onPostJob({...jobForm, skills:jobForm.skills.split(',').map(s=>s.trim()).filter(Boolean)});
    setJobForm({title:'',company:'Demo Company',location:'Chennai, Tamil Nadu',type:'Full-time',category:'Development',salary:'',skills:'HTML, CSS, JavaScript, React',description:''});
    setShowJobForm(false); setMessage('Your demo vacancy has been published.');
  }
  function scheduleInterview(e) {
    e.preventDefault();
    if (!schedule.applicationId || !schedule.date) return;
    onScheduleInterview(Number(schedule.applicationId), schedule);
    setSchedule({applicationId:'',date:'',mode:'Online'}); setMessage('Interview details saved in this browser.');
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-heading"><div><span className="eyebrow">{user.role==='RECRUITER'?'RECRUITER WORKSPACE':'CANDIDATE WORKSPACE'}</span><h1>Welcome back, {user.name.split(' ')[0]}.</h1><p>Here’s what’s happening with your {user.role==='RECRUITER'?'hiring':'job search'} today.</p></div><span className="role-pill">{user.role==='RECRUITER'?'Recruiter demo':'Candidate demo'}</span></div>
      {user.role==='CANDIDATE' ? (
        <>
          <div className="stat-grid"><Stat label="Applications sent" value={myApplications.length} icon="↗"/><Stat label="Shortlisted" value={myApplications.filter(a=>a.status==='Shortlisted').length} icon="✦"/><Stat label="Interviews" value={myApplications.filter(a=>a.interview).length} icon="▣"/></div>
          <div className="dashboard-columns">
            <section className="panel"><div className="panel-heading"><div><h2>Your profile</h2><p>Help recruiters understand your strengths.</p></div><span className="panel-icon">♙</span></div>
              <form onSubmit={saveProfile} className="form-stack"><label>Full name<input required value={profile.name} onChange={e=>setProfile({...profile,name:e.target.value})}/></label><label>Email<input type="email" value={profile.email} disabled/></label><label>Location<input value={profile.location} onChange={e=>setProfile({...profile,location:e.target.value})} placeholder="e.g. Chennai"/></label><label>Skills (separated by commas)<textarea rows="3" value={skillsText} onChange={e=>setSkillsText(e.target.value)} placeholder="JavaScript, React, CSS"/></label><label>Resume file (demo only)<input type="file" accept=".pdf,.doc,.docx" onChange={e=>setProfile({...profile,resumeName:e.target.files?.[0]?.name||profile.resumeName})}/><small className="helper-text">This prototype records the filename only; it does not upload the file.</small></label>{profile.resumeName&&<div className="resume-chip">▤ {profile.resumeName}</div>}<button className="button button-primary">Save profile</button></form>
            </section>
            <section className="panel"><div className="panel-heading"><div><h2>My applications</h2><p>Follow your progress from here.</p></div><span className="panel-icon">▤</span></div>
              {myApplications.length===0?<Empty text="You haven't applied to any jobs yet."/>:<div className="application-list">{myApplications.map(app=><div className="application-row" key={app.id}><div className="company-avatar small-avatar">{(jobs.find(j=>j.id===app.jobId)?.company||'C').slice(0,1)}</div><div className="application-info"><strong>{jobs.find(j=>j.id===app.jobId)?.title||'Job listing'}</strong><small>{jobs.find(j=>j.id===app.jobId)?.company||''}</small><span className={`status status-${app.status.toLowerCase().replace(' ','-')}`}>{app.status}</span>{app.interview&&<small>Interview: {new Date(app.interview.date).toLocaleString()} · {app.interview.mode}</small>}</div><span className="match-score">{app.matchScore}% match</span></div>)}</div>}
            </section>
          </div>
          <section className="panel panel-spaced"><div className="panel-heading"><div><h2>Recommended for your skills</h2><p>Simple matching based on the skills in your profile.</p></div></div><div className="recommendation-list">{matchedJobs.map(job=><div className="recommendation-row" key={job.id}><div className="company-avatar small-avatar">{job.company.slice(0,1)}</div><div className="application-info"><strong>{job.title}</strong><small>{job.company} · {job.location}</small></div><div className="match-meter"><strong>{job.score}%</strong><div><i style={{width:`${job.score}%`}}/></div></div></div>)}</div></section>
        </>
      ) : (
        <>
          <div className="stat-grid"><Stat label="Your vacancies" value={myJobs.length} icon="▤"/><Stat label="Applicants" value={myApplicants.length} icon="♙"/><Stat label="Shortlisted" value={myApplicants.filter(a=>a.status==='Shortlisted').length} icon="✦"/></div>
          <section className="panel"><div className="panel-heading"><div><h2>Your vacancies</h2><p>Manage the jobs you post in this browser.</p></div><button className="button button-primary" onClick={()=>setShowJobForm(!showJobForm)}>{showJobForm?'Cancel':'+ Post a job'}</button></div>
            {showJobForm&&<form className="job-form" onSubmit={postJob}><label>Job title<input required value={jobForm.title} onChange={e=>setJobForm({...jobForm,title:e.target.value})}/></label><label>Company<input required value={jobForm.company} onChange={e=>setJobForm({...jobForm,company:e.target.value})}/></label><label>Location<input required value={jobForm.location} onChange={e=>setJobForm({...jobForm,location:e.target.value})}/></label><label>Job type<select value={jobForm.type} onChange={e=>setJobForm({...jobForm,type:e.target.value})}><option>Full-time</option><option>Internship</option><option>Part-time</option><option>Contract</option></select></label><label>Category<select value={jobForm.category} onChange={e=>setJobForm({...jobForm,category:e.target.value})}><option>Development</option><option>Design</option><option>Data</option><option>Other</option></select></label><label>Salary<input value={jobForm.salary} onChange={e=>setJobForm({...jobForm,salary:e.target.value})} placeholder="e.g. ₹3–5 LPA"/></label><label className="full-field">Required skills (comma-separated)<input required value={jobForm.skills} onChange={e=>setJobForm({...jobForm,skills:e.target.value})}/></label><label className="full-field">Job description<textarea required rows="3" value={jobForm.description} onChange={e=>setJobForm({...jobForm,description:e.target.value})}/></label><div className="full-field"><button className="button button-primary">Publish vacancy</button></div></form>}
            {myJobs.length===0?<Empty text="You haven't posted any vacancies yet. Use Post a job to create one."/>:<div className="table-wrap"><table><thead><tr><th>Job title</th><th>Location</th><th>Applicants</th><th>Type</th></tr></thead><tbody>{myJobs.map(job=><tr key={job.id}><td><strong>{job.title}</strong><small>{job.company}</small></td><td>{job.location}</td><td>{applications.filter(a=>a.jobId===job.id).length}</td><td>{job.type}</td></tr>)}</tbody></table></div>}
          </section>
          <section className="panel panel-spaced"><div className="panel-heading"><div><h2>Applicant pipeline</h2><p>Update a candidate's application status or schedule an interview.</p></div></div>
            {myApplicants.length===0?<Empty text="Applicants will appear here after candidates apply to your jobs."/>:<div className="table-wrap"><table><thead><tr><th>Candidate</th><th>Job</th><th>Match</th><th>Status</th><th>Interview</th></tr></thead><tbody>{myApplicants.map(app=><tr key={app.id}><td><strong>{app.candidateName}</strong><small>{app.candidateEmail}</small></td><td>{jobs.find(j=>j.id===app.jobId)?.title}</td><td>{app.matchScore}%</td><td><select value={app.status} onChange={e=>onUpdateStatus(app.id,e.target.value)}><option>Applied</option><option>Under review</option><option>Shortlisted</option><option>Rejected</option><option>Hired</option></select></td><td>{app.interview?<small>{new Date(app.interview.date).toLocaleString()}</small>:<button className="button button-light button-small" onClick={()=>setSchedule({...schedule,applicationId:String(app.id)})}>Schedule</button>}</td></tr>)}</tbody></table></div>}
            {schedule.applicationId&&<form className="schedule-form" onSubmit={scheduleInterview}><h3>Schedule interview</h3><p>Application #{schedule.applicationId}</p><label>Date and time<input type="datetime-local" required value={schedule.date} onChange={e=>setSchedule({...schedule,date:e.target.value})}/></label><label>Interview mode<select value={schedule.mode} onChange={e=>setSchedule({...schedule,mode:e.target.value})}><option>Online</option><option>In person</option><option>Phone</option></select></label><div className="form-actions"><button className="button button-primary">Save schedule</button><button type="button" className="button button-light" onClick={()=>setSchedule({applicationId:'',date:'',mode:'Online'})}>Cancel</button></div></form>}
          </section>
        </>
      )}
      {message&&<div className="toast-message" role="status">{message}<button onClick={()=>setMessage('')}>×</button></div>}
    </div>
  );
}
function Stat({label,value,icon}){return <div className="stat-card"><span className="stat-icon">{icon}</span><span className="stat-label">{label}</span><strong>{value}</strong><span className="stat-foot">Updated just now</span></div>}
function Empty({text}){return <div className="empty-inline"><span>✧</span><p>{text}</p></div>}
