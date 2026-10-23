import { useMemo, useState } from 'react';
import JobCard from '../components/JobCard';

export default function JobsPage({ jobs, user, applications, onView, onApply }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All categories');
  const [jobType, setJobType] = useState('All types');
  const categories = ['All categories', ...new Set(jobs.map(job => job.category))];
  const filtered = useMemo(() => jobs.filter(job => {
    const query = search.toLowerCase();
    const matchesQuery = `${job.title} ${job.company} ${job.location} ${job.skills.join(' ')}`.toLowerCase().includes(query);
    return matchesQuery && (category === 'All categories' || job.category === category) && (jobType === 'All types' || job.type === jobType);
  }), [jobs, search, category, jobType]);
  return (
    <>
      <section className="jobs-hero">
        <div className="hero-content">
          <span className="eyebrow">YOUR FUTURE STARTS HERE</span>
          <h1>Find work that<br/><span>works for you.</span></h1>
          <p>Explore opportunities from teams looking for people like you.</p>
          <div className="hero-stats"><div><strong>{jobs.length}+</strong><span>Opportunities</span></div><div><strong>3</strong><span>Career categories</span></div><div><strong>100%</strong><span>Made for your growth</span></div></div>
        </div>
        <div className="hero-illustration"><div className="illustration-circle"/><div className="illustration-card card-top"><span className="illustration-icon">✦</span><div><strong>Find your fit</strong><small>Skills meet opportunity</small></div></div><div className="illustration-card card-bottom"><span className="illustration-icon icon-green">✓</span><div><strong>Keep moving forward</strong><small>Track your progress</small></div></div><div className="illustration-person">☺</div></div>
      </section>
      <section className="jobs-section">
        <div className="section-heading"><div><span className="eyebrow">EXPLORE ROLES</span><h2>Opportunities for you</h2></div><span className="result-count">{filtered.length} roles found</span></div>
        <div className="filter-bar"><div className="search-input"><span>⌕</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Job title, company, skill, or location"/></div><select value={category} onChange={e=>setCategory(e.target.value)} aria-label="Filter category">{categories.map(c=><option key={c}>{c}</option>)}</select><select value={jobType} onChange={e=>setJobType(e.target.value)} aria-label="Filter job type"><option>All types</option><option>Full-time</option><option>Internship</option><option>Part-time</option><option>Contract</option></select></div>
        <div className="job-grid">{filtered.map(job=><JobCard key={job.id} job={job} candidateSkills={user?.role==='CANDIDATE'?user.skills:undefined} applied={applications.some(a=>a.jobId===job.id&&a.candidateEmail===user?.email)} onView={onView} onApply={onApply}/>)}</div>
        {filtered.length===0&&<div className="empty-state"><div>⌕</div><h3>No matching jobs found</h3><p>Try another keyword or change your filters.</p><button className="button button-light" onClick={()=>{setSearch('');setCategory('All categories');setJobType('All types');}}>Clear filters</button></div>}
      </section>
    </>
  );
}
