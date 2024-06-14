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

const placeholderCodeCompactJS = `function buildBadCharTable(patron) {
    let table = new Array(256).fill(-1); // Inicializa con -1 (no encontrado)
    for (let i = 0; i < patron.length; i++) {
        table[patron.charCodeAt(i)] = i;
    }
    return table;
}

function buildGoodSuffixTable(patron) {
    let m = patron.length;
    let table = new Array(m).fill(0);
    let i = m - 1;
    let j = m;

    while (i >= 0) {
        while (j < m && patron[i] !== patron[j]) {
            j++;
        }
        if (j === m) {
            table[i] = m - i;
        } else {
            table[i] = j - i;
        }
        i--;
        j = i + 1;
    }

    return table;
}

function BoyerMoore(texto, patron) {
    let n = texto.length;
    let m = patron.length;
    let badChar = buildBadCharTable(patron);
    let goodSuffix = buildGoodSuffixTable(patron);
    let i = 0; // Índice para texto

    while (i <= n - m) {
        let j = m - 1; // Índice para patrón
        while (j >= 0 && patron[j] === texto[i + j]) {
            j--;
        }
        if (j < 0) {
            return i; // Patrón encontrado en la posición i
        } else {
            i += Math.max(goodSuffix[j], j - badChar[texto.charCodeAt(i + j)]);
        }
    }

    return -1; // Patrón no encontrado
}

// Ejemplo de uso
let texto = "Este es un ejemplo de texto";
let patron = "ejemplo";
let resultado = BoyerMoore(texto, patron);

if (resultado !== -1) {
    console.log("Patrón encontrado en la posición {resultado}");
} else {
    console.log("Patrón no encontrado");
}

`;
const placeholderCodeCompactPY = `def build_bad_char_table(patron):
    table = [-1] * 256  # Inicializa con -1 (no encontrado)
    for i in range(len(patron)):
        table[ord(patron[i])] = i
    return table

def build_good_suffix_table(patron):
    m = len(patron)
    table = [0] * m
    i = m - 1
    j = m

    while i >= 0:
        while j < m and patron[i] != patron[j]:
            j += 1
        if j == m:
            table[i] = m - i
        else:
            table[i] = j - i
        i -= 1
        j = i + 1

    return table

def boyer_moore(texto, patron):
    n = len(texto)
    m = len(patron)
    bad_char = build_bad_char_table(patron)
    good_suffix = build_good_suffix_table(patron)
    i = 0  # Índice para texto

    while i <= n - m:
        j = m - 1  # Índice para patrón
        while j >= 0 and patron[j] == texto[i + j]:
            j -= 1
        if j < 0:
            return i  # Patrón encontrado en la posición i
        else:
            i += max(good_suffix[j], j - bad_char[ord(texto[i + j])])

    return -1  # Patrón no encontrado

# Ejemplo de uso
texto = "Este es un ejemplo de texto"
patron = "ejemplo"
resultado = boyer_moore(texto, patron)

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
