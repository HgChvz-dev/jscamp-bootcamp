import { Link } from "./Link.jsx";
import { useTheme } from '../hooks/useTheme.jsx';

import styles from './Header.module.css';

export function Header(){
    const { theme, toggleTheme } = useTheme();

    return (
        <header className={ styles.header }>
          <h1>
            <Link href='/' className={ styles.logo }>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
            </Link>
            DevJobs
          </h1>
          <nav className={ styles.navPages }>
              <Link href="/" aria-current="page">Buscar</Link>
              <Link href="/search" >Empleos</Link>
              <Link href="#">Empresas</Link>
              <Link href="#">Salarios</Link>
          </nav>

          <div className={ styles.headerLeft }>


                <button 
                    className={styles.themeToggle}
                    onClick={toggleTheme}
                    aria-label="Cambiar tema"
                >
                    <div className={`${styles.themeToggleTrack} ${theme === 'light' ? styles.trackLight : ''}`}>
                        <div className={`${styles.themeToggleThumb} ${theme === 'light' ? styles.thumbLight : ''}`}>
                            {theme === 'dark' ? (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                                </svg>
                            ) : (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                    <circle cx="12" cy="12" r="5"/>
                                    <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            )}
                        </div>
                    </div>
                </button>
                <button className="btn-secundary">Subir CV</button>
                <Link href="/signin">
                      <button className="btn-login">Iniciar Sesión</button>
                </Link>
                <devjobs-avatar service="github" username="hgchvz" size="32"></devjobs-avatar>
          </div>
      </header>
    )
}

