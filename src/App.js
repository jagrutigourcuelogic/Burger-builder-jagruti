import React , { Component } from 'react';
import { Route ,Switch , Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/BurgerBuilder/Checkout/Checkout';
import Orders from './containers/BurgerBuilder/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { authCheckState } from './store/actions';
import * as actions from './store/actions/index';


const asyncCheckout = asyncComponent(() => {
  return import('./containers/BurgerBuilder/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/BurgerBuilder/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});



class App extends Component{


  componentDidMount(){
    this.props.onTryAutoSignup();
  }

  render(){

    let routes = ( 
                  <Switch>
                    <Route  path="/auth" component={asyncAuth} />
                    <Route  path="/"  exact component={BurgerBuilder} />
                    <Redirect to="/" />
                    </Switch>
                );
    if(this.props.isAuthenticated){
      routes = (
        <Switch>
        <Route  path="/checkout" component={asyncCheckout} />
        <Route  path="/orders" component={asyncOrders} />
       
        <Route  path="/logout" component={Logout} />
        <Route  path="/auth" component={asyncAuth} />
        <Route  path="/"  exact component={BurgerBuilder} />
        <Redirect to="/" />
        </Switch>
      );
    }


    return(
      <div>
        <Layout>
        
          {routes}
          
        </Layout>
        

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      isAuthenticated:state.auth.token !== null
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup : () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps ,mapDispatchToProps)(App);
