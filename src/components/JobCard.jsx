import { getMatchScore } from '../utils/matching';

export default function JobCard({ job, candidateSkills, applied, onView, onApply }) {
  const score = candidateSkills ? getMatchScore(candidateSkills, job.skills) : null;
  return (
    <article className="job-card">
      <div className="job-card-top">
        <div className="company-avatar">{job.company.slice(0, 1).toUpperCase()}</div>
        <span className="job-type">{job.type}</span>
      </div>
      <h3>{job.title}</h3>
      <p className="company-name">{job.company}</p>
      <div className="job-meta"><span>⌖ {job.location}</span><span>◷ {job.posted || 'Recently'}</span></div>
      <p className="job-description">{job.description}</p>
      <div className="skill-list">
        {job.skills.slice(0, 4).map(skill => <span className="skill-tag" key={skill}>{skill}</span>)}
      </div>
      <div className="job-card-bottom">
        <div><strong>{job.salary || 'Salary not listed'}</strong>{score !== null && <span className="match-score">{score}% skill match</span>}</div>
        <div className="card-actions">
          <button className="button button-light button-small" onClick={() => onView(job)}>Details</button>
          <button className="button button-primary button-small" disabled={applied} onClick={() => onApply(job)}>{applied ? 'Applied' : 'Apply'}</button>
        </div>
      </div>
    </article>
  );
}
