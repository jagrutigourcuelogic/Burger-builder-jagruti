import React ,{ useEffect } from 'react';
import { connect } from 'react-redux';
import Order from '../../../components/Order/Order';
import axios from "../../../axios-orders";
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';
const Orders = props =>  {

    const {onFetchOrders } = props;
    useEffect(() => {
        onFetchOrders(props.token)
    },[onFetchOrders]); 

        let orders = <Spinner />;
    
        if ( !props.loading ) {
            console.log(props.orders);
            orders = props.orders.map( order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                    orderBy={order.orderData.name}
                    orderByEmail={order.orderData.email} />
            ) )
        }
        return (
            <div>
                {orders}
            </div>
        );
 
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token:state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch( actions.fetchOrders(token) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( Orders, axios ) );