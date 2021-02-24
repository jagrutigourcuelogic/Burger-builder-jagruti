import React ,{ useState } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'; 
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = props => {

    const [sideDrawerIsVisible , setSideDrawerIsVisible] = useState(false);
    

    const SideDrawerClosedHandler =()=>{
        setSideDrawerIsVisible(false);
    };

   const SideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    };
   
        return (
            <Aux >
            <Toolbar  
            isAuth={props.isAuthenticated}
            drawerToggleClicked={SideDrawerToggleHandler}
             />
            <SideDrawer 
            isAuth={props.isAuthenticated}
            open={sideDrawerIsVisible}
             closed={SideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>)
    
} 

const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.token !== null ? true : false
    }
}

export default  connect(mapStateToProps)(Layout) ;