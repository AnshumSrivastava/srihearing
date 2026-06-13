export function localizeLink(linkPath: string, currentLang: 'en' | 'pa' | 'hi') {
  if (currentLang === 'en') return linkPath;
  if (linkPath === '/') return `/${currentLang}`;
  if (linkPath.startsWith('/#')) return `/${currentLang}${linkPath.slice(1)}`;
  return `/${currentLang}${linkPath}`;
}

export function getLangUrl(pathname: string, targetLang: 'en' | 'pa' | 'hi') {
  let cleanPath = pathname;
  if (pathname.startsWith('/pa')) {
    cleanPath = pathname.slice(3) || '/';
  } else if (pathname.startsWith('/hi')) {
    cleanPath = pathname.slice(3) || '/';
  }
  
  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath;
  }
  
  if (targetLang === 'en') {
    return cleanPath;
  } else {
    return `/${targetLang}${cleanPath === '/' ? '' : cleanPath}`;
  }
}
