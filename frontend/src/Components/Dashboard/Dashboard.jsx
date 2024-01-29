import * as React from 'react';
import '../../App.css'
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import ResolveIssue from '../ResolveIssue/ResolveIssue'
import TopIssues from '../TopIssues/TopIssues'
import { useEffect } from 'react';
import ViceChancellor from '../ViceChancellor/ViceChancellor'
import { Stack, ToggleButton } from '@mui/material';
import VCBannedIssues from '../VCBannedIssues/VCBannedIssues';
import VCForwardedIssue from '../VCForwardedIssue/VCForwardedIssue';
import VCTopIssues from '../VCTopIssues/VCTopIssues';

const drawerWidth = 240;
const category = sessionStorage.getItem("category");
let routes;
console.log(category === "Vice Chancellor")
if (category === "Vice Chancellor") {
  routes = [
    {

      name: "Forwarded To VC",
      path: "VCForwardedIssue",
      element: <VCForwardedIssue />
    },
    {
      name: "Banned Issues",
      path: "VCBannedIssues",
      element: <VCBannedIssues />

    },
    {
      name: "Top Issues",
      path: "VCTopIssues",
      element: <VCTopIssues />
    },
  ]
} else {
  routes = [
    {

      name: "Top Issues",
      path: "TopIssues",
      element: <TopIssues />
    },
    {
      name: "Resolve Issue",
      path: "ResolveIssue",
      element: <ResolveIssue />
    },
    {
      name: "Vice Chancellor",
      path: "ViceChancellor",
      element: <ViceChancellor />
    },
  ]
}


function Dashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const navigate = useNavigate();
  const navigateHandler = (path) => {
    navigate(path)
  }
  const name = sessionStorage.getItem("name");
  const category = sessionStorage.getItem("category");
  const checkAuthentication = () => {
    const name = sessionStorage.getItem("name");
    const category = sessionStorage.getItem("category");
    if (name == null && category == null) {
      navigate("/");
    }
  }


  useEffect(() => {
    checkAuthentication();
  }, []);

  const drawer = (
    <div >
      <Toolbar />
      <Divider />
      <Stack >
        {routes.map((routes, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => navigateHandler(routes.path)}>
              <Link type='button' to={"#"} className='focus'>
                <ListItemText sx={{ border: "1px solid #d3d3d3", borderRadius: '10px', p: 2, textAlign: 'center' }} primary={routes.name} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </Stack>
      <Divider />
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px`, backgroundColor: "red" },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <Box sx={{ marginTop: "50px", textAlign: 'center' }}>
            <h1>{name}</h1>
            <h1>{category}</h1>
          </Box>
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <Box sx={{ marginTop: "50px", textAlign: 'center' }}>
            <h1>{name}</h1>
            <h1>{category}</h1>
          </Box>
          {drawer}
        </Drawer>

      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Routes>
          <Route path='/ResolveIssue' element={<ResolveIssue />} />
          <Route path='/TopIssues' element={<TopIssues />} />
          <Route path='/ViceChancellor' element={<ViceChancellor />} />
          <Route path='/VCForwardedIssue' element={<VCForwardedIssue />} />
          <Route path='/ResolveIssue' element={<ResolveIssue />} />
          <Route path='/VCTopIssues' element={<VCTopIssues />} />
          <Route path='/VCBannedIssues' element={<VCBannedIssues />} />
        </Routes>
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  window: PropTypes.func,
};

export default Dashboard;