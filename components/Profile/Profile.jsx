import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import PersonIcon from "@mui/icons-material/Person";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import logOut from "../../lib/firebase/signOut";
import BreadCrumbs from './BreadCrumbs'
import { styled } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import DOB from './DOB'
import Button from "@mui/material/Button";
import EventsTable from './EventsTable';
import Gender from './Gender';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import HouseIcon from '@mui/icons-material/House';

const drawerWidth = 240;

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'blue',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'blue',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#444',
    },
    '&:hover fieldset': {
      borderColor: '#444',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'blue',
    },
  },
});
const UserData = ({ icon,val, title, edit }) => {
  const [value, setValue] = useState(val);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className="flex items-center justify-between">
      <div className="text-gray-800 font-semibold tracking-wider  "> <span className="mr-1">{icon}</span> {title}</div>
      <CssTextField
        id="outlined-basic"
        value={value}
        InputProps={{
          readOnly: edit ? false : true,
         }}
        variant="outlined"
        className="w-72 bg-bgray-50"
        onChange={handleChange}
        focused={edit}
        />
      </div>
   
  );
};

function ResponsiveDrawer(props) {
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [edit, setEdit] = useState(false);
  
 const {email, displayName, photoURL, phoneNumber, dob,}=props.userData
  
 
  const handleDisabled = () => {
    setDisabledBtn(!disabledBtn);
    setEdit(!edit);
  };
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const signOut = () => {
    logOut();
  };

  const drawer = (
    <div>
      <div className="py-4">
        <img
          src={photoURL}
          alt="..."
          className="rounded-full mx-auto w-16"
        />
        <p className="text-center py-2">{displayName}</p>
      </div>
      <Divider variant="middle" />
      <nav>
        <a
          href="#"
          className="flex py-4 px-4 gap-2 items-center hover:bg-blue-500 hover:text-gray-50 transition-all duration-200"
        >
          <PersonIcon /> <span>Profile</span>
        </a>
        <a
          href="#events"
          className="flex py-4 px-4 gap-2 items-center hover:bg-blue-500 hover:text-gray-50 transition-all duration-200"
        >
          <EventIcon /> <span>My Events</span>
        </a>
        <a
          href="/"
          className="flex py-4 px-4 gap-2 items-center hover:bg-blue-500 hover:text-gray-50 transition-all duration-200"
          onClick={signOut}
        >
          <LogoutIcon /> <span>Logout</span>
        </a>
      </nav>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        className="bg-blue-500 shadow-none"
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
          <div className="flex items-center justify-between w-full">
            <div className="text-[2.25rem] font-bold text-gray-200 tracking-wider dancing cursor-pointer">
              hevently
            </div>
            <BreadCrumbs/>
          </div>
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
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
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
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <div className="bg-gray-200 profile-bg">
          <div className=" min-h-screen ">
            <div className="  p-6 mb-8" >
              <h3 className="text-3xl text-center font-semibold tracking-wider text-gray-600 pb-8">
                Profile
              </h3>
              <div>
                <div className="flex justify-center gap-12 flex-wrap">
                  <div className="flex flex-col space-y-6 text-gray-600 text-md md:text-lg tracking-wider w-[26rem]">
                     <UserData icon={<EmailIcon/>} val={email} title="Email" edit={edit} />
                    <UserData icon={<CallIcon/>} val="554516321" title="Mobile" edit={edit} /> 
                  <Gender edit={edit}/>
                  </div>
                  <div className="flex flex-col space-y-6 text-gray-600 text-md md:text-lg tracking-wider w-[26rem] ">
                    <UserData icon={<HouseIcon/>} val="Rishikesh" title="City" edit={edit} />
                    <UserData icon={<LocationCityIcon/>}  val="Uttarakhand" title="State" edit={edit} />
                    <DOB edit={edit}/>
                  </div>
                </div>
                <div className="flex justify-center gap-4 pt-12 pb-4">
                  <Button
                    className="bg-blue-500 hover:bg-blue-700 capitalize text-md poppins"
                    variant="contained"
                    size="small"
                    onClick={handleDisabled}
                    disabled={disabledBtn ? false : true}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={handleDisabled}
                    variant="contained"
                    className="poppins capitalize text-md bg-blue-500 hover:bg-blue-700"
                    size="small"
                    disabled={disabledBtn ? true : false}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
            <Divider/>
            <h3 className="text-3xl text-center font-semibold tracking-wider text-gray-600 py-10">
               My Events
                </h3>
           <div className="pb-12 w-3/4 mx-auto" id="events"> <EventsTable/></div>
          </div>
        </div>
      </Box>
    </Box>
  );
}


const Profile = ({user,events}) => {
  console.log(events)
  return (
    <div>
      <ResponsiveDrawer userData={user} />
    </div>
  )
}

export default Profile
