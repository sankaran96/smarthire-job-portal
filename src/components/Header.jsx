import Logo from './Logo';

export default function Header({ user, page, setPage, onLogout }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <button className="logo-button" onClick={() => setPage('jobs')} aria-label="SmartHire home"><Logo /></button>
        <nav className="main-nav" aria-label="Main navigation">
          <button className={page === 'jobs' ? 'nav-link active' : 'nav-link'} onClick={() => setPage('jobs')}>Find jobs</button>
          {user && <button className={page === 'dashboard' ? 'nav-link active' : 'nav-link'} onClick={() => setPage('dashboard')}>Dashboard</button>}
          {!user ? (
            <button className="button button-primary button-small" onClick={() => setPage('welcome')}>Sign in</button>
          ) : (
            <div className="user-menu">
              <span className="user-avatar">{(user.name || 'U').slice(0, 1).toUpperCase()}</span>
              <span className="user-name">{user.name}</span>
              <button className="button button-light button-small" onClick={onLogout}>Log out</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
