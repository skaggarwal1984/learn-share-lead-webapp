import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import back arrow icon
import { styled } from '@mui/system';
import DescriptionIcon from '@mui/icons-material/Description';


// Define theme colors
const themeColors = {
  primary: '#1976d2', // Primary color for active links
  secondary: '#ffffff', // Background color for the header
  text: '#333333', // Default text color
  shadow: '0 1px 3px rgba(0, 0, 0, 0.1)', // Box shadow for the header
};

// Header styling
const HeaderSection = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  background: themeColors.secondary, // Background color
  color: themeColors.text, // Text color
  boxShadow: themeColors.shadow, // Box shadow
  padding: '0 20px', // Adjusted padding
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  zIndex: 1200,
  height: '60px', // Increased height for better spacing
});

const HeaderContent = styled('div')({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
});

const NavContainer = styled('nav')({
  display: 'flex',
  alignItems: 'center',
  marginRight: 'auto', // Push the navigation to the left
});

const NavList = styled('ul')({
  display: 'flex',
  listStyle: 'none',
  padding: 0,
  margin: 0,
  gap: '20px', // Increased gap for better spacing
});

const NavItem = styled('li')({
  display: 'inline',
  fontSize: '1rem', // Adjusted font size
  fontWeight: 'bold',
});

const NavLink = styled(Link)(({ isActive }) => ({
  textDecoration: 'none',
  color: isActive ? themeColors.primary : themeColors.text,
  fontWeight: isActive ? 'bold' : 'normal',
  display: 'flex',
  alignItems: 'center',
  gap: '8px', // Increased gap between icon and text
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const IconContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '16px', // Increased gap between icons
});

const BackButton = styled('button')({
  background: 'none',
  border: 'none',
  color: themeColors.primary,
  fontSize: '1.5rem',
  cursor: 'pointer',
  '&:hover': {
    color: '#115293',
  },
  display: 'flex',
  alignItems: 'center',
  marginRight: '20px', // Ensure space between back button and navigation links
});

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };

  // Check if the current path is the root URL
  const showBackButton = location.pathname !== '/';

  return (
    <HeaderSection>
      <HeaderContent>
        {showBackButton && (
          <BackButton onClick={handleBackClick}>
            <ArrowBackIcon />
          </BackButton>
        )}
        <NavContainer>
          <NavList>
            <NavItem>
              <NavLink
                to="/"
                isActive={location.pathname === '/'}
              >
                <HomeIcon fontSize="small" /> Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to="/profile"
                isActive={location.pathname === '/profile'}
              >
                <AccountCircleIcon fontSize="small" /> My Profile
              </NavLink>
            </NavItem>
          </NavList>
        </NavContainer>
      </HeaderContent>
    </HeaderSection>
  );
};

export default Header;
