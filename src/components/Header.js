import React from 'react';
import styled from 'styled-components';
import NoteCodeLogo from '../assets/NoteCodeLogo.svg';

const HeaderContainer = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 3;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const LogoIcon = styled.img`
  width: 120px;
  height: auto;
`;

const Tagline = styled.h2`
  font-family: 'Outfit', sans-serif;
  font-size: 2.5rem;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.2;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <Logo>
        <LogoIcon src={NoteCodeLogo} alt="NoteCode Logo" />
      </Logo>
      <Tagline>
        Create & Share<br />
        Your Code easily
      </Tagline>
    </HeaderContainer>
  );
}

export default Header;
