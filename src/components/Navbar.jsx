import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { AppBar, Box, Container, styled, Toolbar } from '@mui/material';
import { NavLink } from 'react-router-dom';

const StyledContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'space-between',
});

const Menu = styled(Box)({
  display: 'flex',
  color: 'gold',
});

const Navbar = () => {

  const navRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(true);

  const handleIntersection = ([entry]) => {
    setIsIntersecting(entry.isIntersecting);
  };

  const [navEntry] = useInView({
    triggerOnce: true,
  });

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setIsIntersecting(scrollY < 20);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection);
    if (navEntry && navEntry.ref) {
      observer.observe(navEntry.ref);
    }
    return () => {
      if (navEntry && navEntry.ref) {
        observer.unobserve(navEntry.ref);
      }
    };
  }, [navEntry]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isIntersecting) {
        navRef.current.style.backgroundColor = 'transparent';
    } else {
        navRef.current.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    }
  }, [isIntersecting]);

  return (
    <AppBar ref={navRef} color="transparent" elevation={0}>
      <Toolbar>
        <StyledContainer >
          <NavLink to="/" variant="h6" style={{ textDecoration: 'none', color: 'gold', fontWeight: '700' }}>
            Movie-Watch
          </NavLink>
          <Menu>
            <NavLink to="/" style={{ textDecoration: 'none', color: 'gold' }}>
              Movie
            </NavLink>
            <NavLink to="/tvList" style={{ marginLeft: '1.3rem', textDecoration: 'none', color: 'gold' }}>
              TV-Series
            </NavLink>
          </Menu>
        </StyledContainer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;