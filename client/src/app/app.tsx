import { useState } from 'react';
import { Shell } from '../components/shell'
import { useEmail, useEmails } from './api'
import { Home } from './home';
import Preview from './preview';

const previewPattern = new URLPattern({ pathname: "/preview/:id+" });

function App() {
  const emails = useEmails();

  const match = previewPattern.exec(window.location.href);
  const slug = match?.pathname.groups.id;

  const email = useEmail(slug);

  // const router = useRouter();
  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  const [activeView, setActiveView] = useState<string>('desktop');
  const [activeLang, setActiveLang] = useState<string>('jsx');

  // React.useEffect(() => {
  //   const view = searchParams.get('view');
  //   const lang = searchParams.get('lang');

  //   if (view === 'source' || view === 'desktop') {
  //     setActiveView(view);
  //   }

  //   if (lang === 'jsx' || lang === 'markup' || lang === 'markdown') {
  //     setActiveLang(lang);
  //   }
  // }, [searchParams]);

  // const handleViewChange = (view: string) => {
  //   setActiveView(view);
  //   router.push(`${pathname}?view=${view}`);
  // };

  // const handleLangChange = (lang: string) => {
  //   setActiveLang(lang);
  //   router.push(`${pathname}?view=source&lang=${lang}`);
  // };

  return (
    <Shell navItems={emails} title={slug}
      markup={email?.markup}
      activeView={activeView}
      setActiveView={setActiveView}
    >
      {email ? <Preview
        activeView={activeView}
        activeLang={activeLang}
        setActiveLang={setActiveLang}
        markup={email.markup}
        plainText={email.plainText}
        reactMarkup={email.reactMarkup} /> : <Home />}
    </Shell>
  )
}

export default App
