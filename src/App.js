import React, { useState } from 'react';
import styled from 'styled-components';
import CodeEditor from './components/CodeEditor';
import Header from './components/Header';
import HeroBackground from './assets/Hero-Background-notecode.svg';

const AppContainer = styled.div`
  min-height: 100vh;
  background: 
    url(${HeroBackground}) no-repeat bottom center,
    linear-gradient(180deg, #ffffff 0%, #ffffff 65%, #8B5CF6 100%);
  background-size: cover;
  position: relative;
  overflow-x: hidden;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 2rem 1rem;
  position: relative;
  z-index: 2;
`;

const defaultCode = `<html>
<head>
<title>HTML Sample</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<style type="text/css">
h1 {
color: #cca3a3;
}
</style>
<script type="text/javascript">
alert("I am a sample... visit devChallengs.io for more projects");
</script>
</head>
<body>
<h1>Heading No.1</h1>
<input disabled type="button" value="Click me" />
</body>
</html>`;

function App() {
  const [code, setCode] = useState(defaultCode);
  const [language, setLanguage] = useState('html');
  const [theme, setTheme] = useState('light');
  const [isShared, setIsShared] = useState(false);
  const [shareId, setShareId] = useState(null);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    if (isShared) {
      setIsShared(false);
      setShareId(null);
    }
  };

  const handleShare = () => {
    // Simulate API call - generate ID and save snippet
    const newId = Math.random().toString(36).substr(2, 9);
    setShareId(newId);
    setIsShared(true);
    
    // In a real app, this would make an API call to save the snippet
    console.log('Saving snippet with ID:', newId);
  };

  return (
    <AppContainer>
      <MainContent>
        <Header />
        <CodeEditor
          code={code}
          language={language}
          theme={theme}
          isShared={isShared}
          shareId={shareId}
          onCodeChange={handleCodeChange}
          onLanguageChange={setLanguage}
          onThemeChange={setTheme}
          onShare={handleShare}
        />
      </MainContent>
    </AppContainer>
  );
}

export default App;
