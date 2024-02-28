import * as React from "react";
import "../../App.css";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import { Stack, ToggleButton } from "@mui/material";
import IssueUpvote from "../../StudentComponents/IssueUpvote/IssueUpvote";
import TopIssues from "../../StudentComponents/TopIssues/TopIssues";
import IssueCreated from "../../StudentComponents/IssueCreated/issueCreated";
import CreateIssue from "../../StudentComponents/CreateIssue/CreateIssue";
import IssueResolved from "../../StudentComponents/IssueResolved/IssueResolved";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
const drawerWidth = 240;
const routes = [
  {
    name: "Issue Created",
    path: "Student/IssueCreated",
    element: <IssueCreated />,
    icon : <CheckCircleIcon />
  },
  {
    name: "Issue Upvoted",
    path: "Student/IssueUpvoted",
    element: <IssueUpvote />,
    icon : <CheckCircleIcon />

  },
  {
    name: "Student Top Issues",
    path: "Student/TopIssues",
    element: <TopIssues />,
    
  },
  {
    name: "Create Issue",
    path: "Student/CreateIssue",
    element: <CreateIssue />,
  },
  {
    name: "Resolved Issue",
    path: "Student/IssueResolved",
    element: <IssueResolved />,
  },
];

function StudentDashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const navigate = useNavigate();
  const navigateHandler = (path) => {
    navigate(path);
  };
  const name = sessionStorage.getItem("name");
  const category = sessionStorage.getItem("category");
  const checkAuthentication = () => {
    const name = sessionStorage.getItem("name");
    const category = sessionStorage.getItem("category");
    if (name == null && category == null) {
      navigate("/");
    }
  };
  let location = useLocation();
  const isActiveRoute = (path) => {
    return location.pathname.slice(18) === path;
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const drawer = (
    <div>
      <Toolbar />
      <Stack>
        {routes.map((routes, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => navigateHandler(routes.path)}>
              <Link type="button" to={"#"} className="focus">
                <ListItemText
                  style={{
                    backgroundColor: isActiveRoute(routes.path)
                      ? "white"
                      : "#7d0707",
                    color: isActiveRoute(routes.path) ? "black" : "white",
                  }}
                  sx={{
                    border: "none",
                    borderRadius: "10px",
                    p: 2,
                    textAlign: "center",
                  }}
                  primary={routes.name}
                />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </Stack>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px`, backgroundColor: "#931e1e" },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap component="div">
            Student Dashboard
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
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "transparent",
            },
          }}
        >
          <Box sx={{ marginTop: "50px", textAlign: "center" }}>
            <AccountCircleIcon style={{ fontSize: "6rem", color: "white" }} />
            <h1 style={{ color: "white" }}>{name}</h1>
            <h1 style={{ color: "white" }}>
              {sessionStorage.getItem("department")}
            </h1>
          </Box>
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <Box sx={{ marginTop: "50px", textAlign: "center" }}>
            <h1 style={{ color: "white" }}>{name}</h1>
            <h1 style={{ color: "white" }}>
              {sessionStorage.getItem("department")}
            </h1>
          </Box>
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Routes>
          <Route path="/Student/IssueCreated" element={<IssueCreated />} />
          <Route path="/Student/IssueUpvoted" element={<IssueUpvote />} />
          <Route path="/Student/TopIssues" element={<TopIssues />} />
          <Route path="/Student/CreateIssue" element={<CreateIssue />} />
          <Route path="/Student/IssueResolved" element={<IssueResolved />} />
        </Routes>
      </Box>
    </Box>
  );
}

StudentDashboard.propTypes = {
  window: PropTypes.func,
};

export default StudentDashboard;
