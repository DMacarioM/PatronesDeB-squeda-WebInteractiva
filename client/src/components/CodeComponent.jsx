import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import 'prismjs/themes/prism.css';
import Prism from 'prismjs';
import '../css/CodeComponent.css';

const CodeBlock = ({ code, showFull }) => {
    const displayedCode = showFull ? code : code.split('\n').slice(0, 5).join('\n') + '\n...';

    return (
      <pre className="language-javascript">
        <code className="language-javascript" dangerouslySetInnerHTML={{ __html: Prism.highlight(displayedCode, Prism.languages.javascript, 'javascript') }} />
      </pre>
    );
};

const placeholderCodeCompactJS = `function busquedaDirecta(texto, patron) {
    let n = texto.length;
    let m = patron.length;

    for (let i = 0; i <= n - m; ++i) {
        let j;
        for (j = 0; j < m; ++j) {
            if (texto[i + j] !== patron[j]) {
                break;
            }
        }
        if (j === m) {
            return i; // Patrón encontrado en la posición i
        }
    }

    return -1; // Patrón no encontrado
}

// Ejemplo de uso
let texto = "Este es un ejemplo de texto";
let patron = "ejemplo";
let resultado = busquedaDirecta(texto, patron);

if (resultado !== -1) {
    console.log("Patrón encontrado en la posición {resultado}");
} else {
    console.log("Patrón no encontrado");
}
`;
const placeholderCodeCompactPY = `def busqueda_directa(texto, patron):
    n = len(texto)
    m = len(patron)

    for i in range(n - m + 1):
        j = 0
        while j < m:
            if texto[i + j] != patron[j]:
                break
            j += 1

        if j == m:
            return i  # Patrón encontrado en la posición i

    return -1  # Patrón no encontrado

# Ejemplo de uso
texto = "Este es un ejemplo de texto"
patron = "ejemplo"
resultado = busqueda_directa(texto, patron)

if resultado != -1:
    print(f"Patrón encontrado en la posición {resultado}")
else:
    print("Patrón no encontrado")

`;

const CodeComponent = () => {
    const [copied, setCopied] = useState(false);
    const [showFull, setShowFull] = useState(true);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 600);

    const handleCopy = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    const toggleShowFull = () => {
      setShowFull(!showFull);
    };

    useEffect(() => {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= 600);
        setShowFull(!(window.innerWidth <= 600));
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return (
      <div className="code-container">
        <Tabs>
          <TabList>
            <Tab>JavaScript</Tab>
            <Tab>Python</Tab>
          </TabList>

          <TabPanel>
            <div className="code-section">
              <CodeBlock code={placeholderCodeCompactJS} showFull={showFull} />
              <CopyToClipboard text={placeholderCodeCompactJS} onCopy={handleCopy}>
                <button className="copy-button comic-button">{copied ? '¡Copiado!' : 'Copiar'}</button>
              </CopyToClipboard>
              {isSmallScreen && (
                <button className="comic-button toggle-button" onClick={toggleShowFull}>
                  {showFull ? 'Mostrar menos' : 'Mostrar más'}
                </button>
              )}
            </div>
          </TabPanel>
          <TabPanel>
          <div className="code-section">
              <CodeBlock code={placeholderCodeCompactPY} showFull={showFull} />
              <CopyToClipboard text={placeholderCodeCompactPY} onCopy={handleCopy}>
                <button className="copy-button comic-button">{copied ? '¡Copiado!' : 'Copiar'}</button>
              </CopyToClipboard>
              {isSmallScreen && (
                <button className="comic-button toggle-button" onClick={toggleShowFull}>
                  {showFull ? 'Mostrar menos' : 'Mostrar más'}
                </button>
              )}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    );
};

export default CodeComponent;
