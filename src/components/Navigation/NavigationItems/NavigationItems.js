import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
       <ul className={classes.NavigationItems}>
       <NavigationItem link="/" >Burger Builder</NavigationItem>  
     {props.isAuthenticate ?  <NavigationItem link="/orders">Orders</NavigationItem>    : null}  
     { !props.isAuthenticate 
       ? <NavigationItem link="/auth">Authenticate</NavigationItem>   
       : <NavigationItem link="/logout">Logout</NavigationItem>  }  


       </ul>
);
 export default navigationItems;