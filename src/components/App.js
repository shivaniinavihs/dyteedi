import React, { useState, useEffect } from 'react';
import Editor from './Editor';
import useLocalStorage from '../hooks/useLocalStorage';




function App() {
  const [html, setHtml] = useLocalStorage('html','')
  const [css, setCss] = useLocalStorage('css','')
  const [js, setJs] = useLocalStorage('js','')
  const [srcDoc, setSrcDoc] = useState('')
  const [showHtmlPanel, setShowHtmlPanel] = useState(true);
  const [showCssPanel, setShowCssPanel] = useState(false);
  const [showJsPanel, setShowJsPanel] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
      </html>`)
    }, 250)
    return () => clearTimeout(timeout)
  }, [html, css, js])
  const htmlPanelHandler = () => {
    setShowHtmlPanel(!showHtmlPanel);
    setShowJsPanel(false)
    setShowCssPanel(false)
  };

  const CssPanelHandler = () => {
    setShowCssPanel(!showCssPanel);
    setShowHtmlPanel(false);
    setShowJsPanel(false)
  };

  const JsPanelHandler = () => {
    setShowJsPanel(!showJsPanel);
    setShowHtmlPanel(false);
    setShowCssPanel(false)
  };
  return (
    <>
        <div className="file-explorer">
      <div onClick={htmlPanelHandler}>HTML</div>
      <div onClick={CssPanelHandler}>CSS</div>
      <div onClick={JsPanelHandler}>JAVASCRIPT</div>
    </div>
      <div className="pane top-pane">

        {showHtmlPanel && 
                <Editor
                language="xml"
                dispname="HTML"
                value={html}
                onChange={setHtml}
              />
        }

        {showCssPanel &&         
        <Editor
          language="css"
          dispname="CSS"
          value={css}
          onChange={setCss}
        />}

        {showJsPanel && 
        <Editor
        language="javaScript"
        dispname="JS"
        value={js}
        onChange={setJs}
              />
        }
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"

        />
      </div>
    </>
  )

}

export default App;
