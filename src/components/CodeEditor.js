import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import DownArrow from '../assets/down arrow.svg';
import ShareIcon from '../assets/Share.svg';
import LinkIcon from '../assets/link.svg';

const EditorContainer = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 900px;
  position: relative;
  z-index: 3;
  border: 1px solid rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    margin: 0 1rem;
    max-width: calc(100% - 2rem);
  }
`;

const EditorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
  border-radius: 12px 12px 0 0;
`;

const EditorTitle = styled.div`
  font-family: 'Outfit', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
`;

const EditorControls = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ControlButton = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  
  &:nth-child(1) { background: #ef4444; }
  &:nth-child(2) { background: #f59e0b; }
  &:nth-child(3) { background: #10b981; }
`;

const CodeArea = styled.div`
  position: relative;
  background: #ffffff;
  border-radius: 0 0 12px 12px;
  overflow: hidden;
`;

const LineNumbers = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  background: #f8fafc;
  padding: 1rem 0.75rem;
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  font-size: 0.875rem;
  color: #9ca3af;
  line-height: 1.5;
  user-select: none;
  z-index: 1;
  min-height: 100%;
  border-right: 1px solid #e5e7eb;
`;

const CodeContent = styled.div`
  margin-left: 3rem;
  padding: 1rem 1.5rem;
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #1f2937;
  white-space: pre-wrap;
  word-wrap: break-word;
  min-height: 300px;
  outline: none;
  position: relative;
  z-index: 2;
`;

const EditorFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  border-radius: 0 0 12px 12px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`;

const FooterLeft = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-family: 'Outfit', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #9ca3af;
  }
  
  &:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }
`;

const DropdownIcon = styled.img`
  width: 12px;
  height: 12px;
  opacity: 0.6;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 0.5rem 0.75rem;
  background: none;
  border: none;
  text-align: left;
  font-family: 'Outfit', sans-serif;
  font-size: 0.875rem;
  color: #374151;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background: #f3f4f6;
  }
  
  &:first-child {
    border-radius: 6px 6px 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 6px 6px;
  }
`;

const FooterRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

const ShareLink = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Outfit', sans-serif;
  font-size: 0.875rem;
  color: #6b7280;
`;

const LinkIconImg = styled.img`
  width: 16px;
  height: 16px;
  opacity: 0.6;
`;

const ShareButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${props => props.disabled ? '#9ca3af' : '#8b5cf6'};
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    background: #7c3aed;
    transform: translateY(-1px);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const ShareIconImg = styled.img`
  width: 16px;
  height: 16px;
`;

const languages = [
  { value: 'html', label: 'HTML' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'css', label: 'CSS' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' }
];

const themes = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' }
];

function CodeEditor({ 
  code, 
  language, 
  theme, 
  isShared, 
  shareId, 
  onCodeChange, 
  onLanguageChange, 
  onThemeChange, 
  onShare 
}) {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const codeRef = useRef(null);

  const handleCodeClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    if (isEditing && codeRef.current) {
      codeRef.current.focus();
      // If the content is empty, place cursor at the beginning
      if (!code || code.trim() === '') {
        const range = document.createRange();
        const sel = window.getSelection();
        range.setStart(codeRef.current, 0);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  }, [isEditing, code]);

  const handleCodeChange = (e) => {
    // Get the raw text content without any HTML formatting
    const newCode = e.target.innerText || e.target.textContent || '';
    onCodeChange(newCode);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData('text');
    // Insert text at cursor position
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(text));
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    // Update the code state
    const newCode = e.target.innerText || e.target.textContent || '';
    onCodeChange(newCode);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const currentCode = code || '';
      const newCode = currentCode.substring(0, start) + '  ' + currentCode.substring(end);
      onCodeChange(newCode);
      
      // Set cursor position after the inserted spaces
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const generateLineNumbers = () => {
    const lines = (code || '').split('\n');
    // Ensure at least one line is always visible
    const displayLines = lines.length > 0 ? lines : [''];
    return displayLines.map((_, index) => (
      <div key={index}>{index + 1}</div>
    ));
  };

  // Simple function to display code without syntax highlighting for now
  const displayCode = (code) => {
    return code || '';
  };

  return (
    <EditorContainer>
      <EditorHeader>
        <EditorTitle>Code Editor</EditorTitle>
        <EditorControls>
          <ControlButton />
          <ControlButton />
          <ControlButton />
        </EditorControls>
      </EditorHeader>
      
      <CodeArea>
        <LineNumbers>
          {generateLineNumbers()}
        </LineNumbers>
        
        {isEditing ? (
          <CodeContent
            ref={codeRef}
            contentEditable
            suppressContentEditableWarning
            onInput={handleCodeChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            onPaste={handlePaste}
            style={{ 
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontFamily: "'Fira Code', 'Monaco', 'Consolas', monospace",
              fontSize: '0.875rem',
              lineHeight: '1.5',
              color: '#1f2937',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              minHeight: '300px'
            }}
          >
            {code || ''}
          </CodeContent>
        ) : (
          <div 
            onClick={handleCodeClick} 
            style={{ 
              cursor: 'text',
              marginLeft: '3rem',
              minHeight: '300px',
              padding: '1rem 1.5rem',
              fontFamily: "'Fira Code', 'Monaco', 'Consolas', monospace",
              fontSize: '0.875rem',
              lineHeight: '1.5',
              color: '#1f2937',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word'
            }}
          >
            {code || ''}
          </div>
        )}
      </CodeArea>
      
      <EditorFooter>
        <FooterLeft>
          <Dropdown>
            <DropdownButton onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}>
              {languages.find(lang => lang.value === language)?.label || 'HTML'}
              <DropdownIcon src={DownArrow} alt="Dropdown" />
            </DropdownButton>
            <DropdownMenu isOpen={isLanguageDropdownOpen}>
              {languages.map(lang => (
                <DropdownItem
                  key={lang.value}
                  onClick={() => {
                    onLanguageChange(lang.value);
                    setIsLanguageDropdownOpen(false);
                  }}
                >
                  {lang.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          
          <Dropdown>
            <DropdownButton onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}>
              {themes.find(t => t.value === theme)?.label || 'Light'}
              <DropdownIcon src={DownArrow} alt="Dropdown" />
            </DropdownButton>
            <DropdownMenu isOpen={isThemeDropdownOpen}>
              {themes.map(t => (
                <DropdownItem
                  key={t.value}
                  onClick={() => {
                    onThemeChange(t.value);
                    setIsThemeDropdownOpen(false);
                  }}
                >
                  {t.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </FooterLeft>
        
        <FooterRight>
          {isShared && shareId && (
            <ShareLink>
              <LinkIconImg src={LinkIcon} alt="Link" />
              .../{shareId}
            </ShareLink>
          )}
          
          <ShareButton
            onClick={onShare}
            disabled={isShared}
          >
            <ShareIconImg src={ShareIcon} alt="Share" />
            Share
          </ShareButton>
        </FooterRight>
      </EditorFooter>
    </EditorContainer>
  );
}

export default CodeEditor;
