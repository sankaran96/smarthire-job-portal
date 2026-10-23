import Logo from '../components/Logo';

export default function WelcomePage({ onEnter }) {
  return (
    <main className="welcome-page">
      <section className="welcome-copy">
        <Logo />
        <span className="eyebrow">A SMARTER WAY TO GET HIRED</span>
        <h1>Make your next career move <span>count.</span></h1>
        <p className="welcome-description">Discover opportunities, show your skills, and follow your applications — all in one simple place.</p>
        <div className="welcome-points"><span>✓ Find jobs that fit your skills</span><span>✓ Track every application</span><span>✓ Keep interviews organized</span></div>
        <div className="welcome-actions">
          <button className="button button-primary button-large" onClick={() => onEnter('candidate')}>Continue as candidate <span>→</span></button>
          <button className="button button-outline button-large" onClick={() => onEnter('recruiter')}>Explore recruiter demo</button>
        </div>
        <p className="demo-note">Demo only · No real account or password needed</p>
      </section>
      <section className="welcome-art" aria-label="Recruitment dashboard preview">
        <div className="floating-label label-one">✦ Your next opportunity</div>
        <div className="preview-window">
          <div className="preview-top"><div className="window-dots"><i/><i/><i/></div><span>Opportunity dashboard</span></div>
          <div className="preview-body">
            <div className="preview-greeting">Good morning, Alex <span>✦</span></div>
            <div className="preview-search">⌕ &nbsp; Search job title or skill</div>
            <div className="preview-job"><div className="preview-logo">P</div><div><strong>Frontend Developer</strong><small>PixelCraft · Chennai</small><div className="preview-tags"><i>React</i><i>CSS</i><i>JavaScript</i></div></div><b>↗</b></div>
            <div className="preview-job"><div className="preview-logo green">N</div><div><strong>React Developer Intern</strong><small>NextGen · Remote</small><div className="preview-tags"><i>React</i><i>HTML</i></div></div><b>↗</b></div>
            <div className="preview-progress"><div><span>Application progress</span><strong>75%</strong></div><div className="progress-track"><i/></div></div>
          </div>
        </div>
        <div className="floating-label label-two"><span className="green-dot"/> Application submitted!</div>
      </section>
    </main>
  );
}
