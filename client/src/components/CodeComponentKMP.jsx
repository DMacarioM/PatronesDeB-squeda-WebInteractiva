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

const placeholderCodeCompactJS = `function buildLPSArray(patron) {
    let m = patron.length;
    let lps = Array(m).fill(0);
    let length = 0;
    let i = 1;
    while (i < m) {
        if (patron[i] === patron[length]) {
            length++;
            lps[i] = length;
            i++;
        } else {
            if (length !== 0) {
                length = lps[length - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    return lps;
}

function KMP(texto, patron) {
    let n = texto.length;
    let m = patron.length;
    let lps = buildLPSArray(patron);
    let i = 0; // Índice para texto
    let j = 0; // Índice para patron
    while (i < n) {
        if (patron[j] === texto[i]) {
            i++;
            j++;
        }
        if (j === m) {
            return i - j; // Patrón encontrado en la posición i - j
        } else if (i < n && patron[j] !== texto[i]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }
    return -1; // Patrón no encontrado
}

// Ejemplo de uso
let texto = "Este es un ejemplo de texto";
let patron = "ejemplo";
let resultado = KMP(texto, patron);
if (resultado !== -1) {
    console.log("Patrón encontrado en la posición {resultado}");
} else {
    console.log("Patrón no encontrado");
}
`;
const placeholderCodeCompactPY = `def build_lps_array(patron):
    m = len(patron)
    lps = [0] * m
    length = 0
    i = 1
    while i < m:
        if patron[i] == patron[length]:
            length += 1
            lps[i] = length
            i += 1
        else:
            if length != 0:
                length = lps[length - 1]
            else:
                lps[i] = 0
                i += 1

    return lps

def KMP(texto, patron):
    n = len(texto)
    m = len(patron)
    lps = build_lps_array(patron)
    i = 0  # Índice para texto
    j = 0  # Índice para patrón

    while i < n:
        if patron[j] == texto[i]:
            i += 1
            j += 1

        if j == m:
            return i - j  # Patrón encontrado en la posición i - j
        elif i < n and patron[j] != texto[i]:
            if j != 0:
                j = lps[j - 1]
            else:
                i += 1

    return -1  # Patrón no encontrado

# Ejemplo de uso
texto = "Este es un ejemplo de texto"
patron = "ejemplo"
resultado = KMP(texto, patron)
if resultado != -1:
    print(f"Patrón encontrado en la posición {resultado}")
else:
    print("Patrón no encontrado")

`;

const CodeComponentKMP = () => {
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

export default CodeComponentKMP;
