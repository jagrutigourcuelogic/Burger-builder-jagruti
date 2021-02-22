import React ,{ Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'; 
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {

    state ={
        showSideDrawer:true
    }

    SideDrawerClosedHandler =()=>{
        this.setState({showSideDrawer:false});
    }
    render(){
        return (
            <Aux >
            <Toolbar  isAuth={this.props.isAuthenticated} />
            <SideDrawer 
            isAuth={this.props.isAuthenticated}
            open={this.state.showSideDrawer}
             closed={this.SideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>)
    }
} 

const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.token !== null ? true : false
    }
}

export default  connect(mapStateToProps)(Layout) ;