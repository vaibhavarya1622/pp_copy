import React,{useState,useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MapContainer from './sideMapComponent/sideMapComponent'
import logo from '../images/PP_logo_yellow.png'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import LocalHospitalRoundedIcon from '@material-ui/icons/LocalHospitalRounded';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Fab from '@material-ui/core/Fab';
import Navbar from './Navbar/Navbar.component'
import Footer from './Footer/Footer.component'
import user from './../images/user.png'
import axios from 'axios'
import PersonIcon from '@material-ui/icons/Person';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  overrides:{
    MuiCssBaseline:{
      '@global':{
        'html':{
          scrollbarWidth:'none'
        }
      }
    }
  },
  root: {
    flexGrow: 1,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.background.paper,
  },
  navbar_logo:{
    width:`calc(0.90*${drawerWidth}px)`,
    top:'0',
  }
}));

export default function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [PatientOpen, setPatientOpen] = React.useState(true);
  const handlePatientClick = () => {
    setPatientOpen(!PatientOpen);
  };
  const [HospitalOpen,setHospitalOpen]=React.useState(true);
  const handleHospitalClick=()=>{
    setHospitalOpen(!HospitalOpen)
  }
  const [driverOpen,setDriverOpen]=React.useState(true)
  const handleDriverClick=()=>{
    setDriverOpen(!driverOpen)
  }
  const [userDetails,setUserDetails]=useState({})
  useEffect(() => {
    axios.put('https://server.prioritypulse.co.in/users/activeRideById',{
      rideid:sessionStorage.getItem('rideid')
    })
    .then(response=>{
      const data=response.data
      // console.log(data)
      setUserDetails({
            name:data['name'],
            pcase:data['pcase'],
            patientNo:data['patientNo'],
            age:data['age'],
            guardianNo:data['guardianNo'],
            pickedBy:data['pickedBy'],
            hospital:data['hospital'],
            patientPolyline:data['patientPolyline'],
            hospitalPolyline:data['hospitalPolyline']
      })
    })
    .catch(err=>{
      console.log(err)
    })
  }, [])

  const drawer = (
    <div>
      <div className={classes.toolbar} position='fixed' style={{backgroundImage: 'linear-gradient(to right, #a116ef, #390999)'}}>
      <img className={classes.navbar_logo} src={logo} alt='Priority Pulse' />
      </div>
      <List>
      <ListItem button onClick={handleDriverClick}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Driver Information" />
        {driverOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={driverOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemText primary={userDetails['pickedBy']?userDetails['pickedBy'].name:'Not Available'} />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText primary={userDetails['pickedBy']?userDetails['pickedBy'].mobileNo:'Not Available'} />
          </ListItem>
        </List>
      </Collapse>
      </List>
      <Divider />
      <List>
      <ListItem button onClick={handlePatientClick}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Patient Information" />
        {PatientOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={PatientOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemText primary={userDetails.name?userDetails.name:'Not available'} />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText primary={userDetails.pcase?userDetails.pcase:'Not Available'} />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText primary={userDetails.age?userDetails.age:'Not Available'} />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText  primary={userDetails.patientNo?userDetails.patientNo:'Not Available'} />
          </ListItem>
        </List>
      </Collapse>
      </List>
      <Divider />
      <List>
      <ListItem button onClick={handleHospitalClick}>
        <ListItemIcon>
          <LocalHospitalRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Hospital Information" />
        {HospitalOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={HospitalOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemText primary={userDetails['hospital']?userDetails['hospital']['name']:'Not Available'} />
          </ListItem>
          <ListItem button className={classes.nested}>

            <ListItemText  primary={userDetails['hospital']?userDetails.hospital['city']:'Not Available'} />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText primary={userDetails['hospital']?userDetails.hospital['hospitalNumbers'][0]:'Not Available'} />
          </ListItem>
        </List>
      </Collapse>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <Navbar location='token' />
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden implementation="css">
          <Drawer
            container={container}
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main style={{height:'100vh'}}>
        <Fab size='medium' aria-label="add" style={{zIndex:'10'}} onClick={handleDrawerToggle}>
        <ArrowRightIcon />
         </Fab>
        <MapContainer userDetails={userDetails}/>
      </main>
      <Footer />
    </div>
  );
}
