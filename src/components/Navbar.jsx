import React, { useState } from 'react';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const menuItems = [
    { text: 'Home', link: '/' },
    { text: 'Burns', link: '/burns' },
  ];

  return (
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed">
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <Typography variant="h6" component="div">
                Vita Inu Burn Dashboard
              </Typography>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {menuItems.map((item) => (
                  <Link
                      key={item.text}
                      to={item.link}
                      style={{ textDecoration: 'none', color: 'white' }}
                  >
                    <Button variant="button" sx={{ mx: 2 }}>
                      {item.text}
                    </Button>
                  </Link>
              ))}
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
          <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
            <List>
              {menuItems.map((item) => (
                  <ListItem
                      key={item.text}
                      button
                      component={Link}
                      to={item.link}
                      sx={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <ListItemText primary={item.text} />
                  </ListItem>
              ))}
            </List>
            <Divider />
          </Box>
        </Drawer>
      </Box>
  );
}

export default Navbar;
