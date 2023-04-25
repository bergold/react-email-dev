import { CodeContainer } from '../components/code-container';
import { Tooltip } from '../components/tooltip';

export interface PreviewProps {
  activeView: string;
  activeLang: string;
  setActiveLang: (v: string) => void;
  markup: string;
  reactMarkup: string;
  plainText: string;
}

export default function Preview({
  activeView,
  activeLang,
  setActiveLang,
  markup,
  reactMarkup,
  plainText,
}: PreviewProps) {
  if (activeView === 'desktop') {
    return <iframe srcDoc={markup} className="w-full h-[calc(100vh_-_70px)]" />
  } else {
    return <div className="flex gap-6 mx-auto p-6 max-w-3xl">
      <Tooltip.Provider>
        <CodeContainer
          markups={[
            { language: 'jsx', content: reactMarkup },
            { language: 'markup', content: markup },
            { language: 'markdown', content: plainText },
          ]}
          activeLang={activeLang}
          setActiveLang={setActiveLang}
        />
      </Tooltip.Provider>
    </div>
  }
}
