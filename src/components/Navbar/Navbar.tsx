import * as React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import classes from './navbar.module.css';
import { CssBaseline } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );

  const location = useLocation();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    authContext?.logout();
    navigate('/');
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <CssBaseline />

      <AppBar
        position="sticky"
        sx={{
          backgroundColor: '#ebad4e',
          left: 0,
          right: 0,
          top: 0,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              className={classes.navText}
              variant="h6"
              noWrap
              component={NavLink}
              to="/"
              sx={{
                mr: 1,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Productivity-App
            </Typography>
            <Box
              sx={{
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {authContext?.isAuthenticated ? (
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <NavLink
                        to="/"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        className={({ isActive }) =>
                          isActive ? classes.active : undefined
                        }
                        end
                      >
                        Home
                      </NavLink>
                    </Typography>
                  </MenuItem>
                ) : (
                  ''
                )}

                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <NavLink
                      to="/about-me"
                      style={{ textDecoration: 'none', color: 'inherit' }}
                      className={({ isActive }) =>
                        isActive ? classes.active : undefined
                      }
                      end
                    >
                      About Me
                    </NavLink>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    {!authContext?.isAuthenticated ? (
                      <NavLink
                        to="/signin"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        className={({ isActive }) =>
                          isActive ? classes.active : undefined
                        }
                        end
                      >
                        Login
                      </NavLink>
                    ) : (
                      <NavLink
                        to="/signin"
                        onClick={handleSignOut}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        className={({ isActive }) =>
                          isActive ? classes.active : undefined
                        }
                        end
                      >
                        Log Out
                      </NavLink>
                    )}
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Productivity-App
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
              }}
            >
              {authContext?.isAuthenticated ? (
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                    fontWeight: location.pathname === '/' ? 'bold' : 'normal',
                  }}
                  component={NavLink}
                  to="/"
                >
                  Home
                </Button>
              ) : (
                ''
              )}

              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  fontWeight:
                    location.pathname === '/about-us' ? 'bold' : 'normal',
                }}
                component={NavLink}
                to="/about-me"
              >
                About Me
              </Button>
              {!authContext?.isAuthenticated ? (
                <Button
                  className={classes.buttonRight}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                  }}
                  component={NavLink}
                  to="/signin"
                >
                  Log In
                </Button>
              ) : (
                <Button
                  className={classes.buttonRight}
                  onClick={handleSignOut}
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                  }}
                >
                  Log Out
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default Navbar;
