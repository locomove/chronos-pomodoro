import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { RouterLink } from '../RouterLink';
import styles from './styles.module.css';

type AvailableThemes = 'dark' | 'light';

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storageTheme =
      (localStorage.getItem('theme') as AvailableThemes) || 'dark';
    return storageTheme;
  });
  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  };

  function handleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();
    setTheme(prevTheme => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
      return nextTheme;
    });

    //document.documentElement.setAttribute('data-theme', theme);
  }
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <nav className={styles.menu}>
      <RouterLink
        className={styles.menuLink}
        href='/'
        aria-label='ir para pagina inicial'
        title='ir para pagina inicial'
      >
        <HouseIcon />
      </RouterLink>
      <RouterLink
        className={styles.menuLink}
        href='/history/'
        aria-label='ir para historico'
        title='ir para historico'
      >
        <HistoryIcon />
      </RouterLink>
      <RouterLink
        className={styles.menuLink}
        href='/settings/'
        aria-label='ir para configurações'
        title='ir para configurações'
      >
        <SettingsIcon />
      </RouterLink>
      <a
        className={styles.menuLink}
        href='#'
        aria-label='mudar o tema'
        title='mudar o tema'
        onClick={handleThemeChange}
      >
        {nextThemeIcon[theme]}
      </a>
    </nav>
  );
}
