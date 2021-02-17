import React , { Component } from 'react';
import Aux from '../Aux';
//import axios from '../../axios-orders';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent , axios) => {
    return class extends Component {
        state={
            error:null
        }


        componentDidMount(){
            axios.interceptors.request.use(request => {
                this.setState({error:null});
                return request;
            });
            axios.interceptors.response.use(null,error =>{
                this.setState({error:error});
            });

        }
        errorConfirmedHadler = () => {
            this.setState({error:null});
        }

        render(){
            return (
                <Aux>
                    <Modal show={this.state.error}
                        clicked={this.errorConfirmedHadler}>
                        {this.state.error ? this.state.error.message :null }
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            );
        }
    }
}


    export default  withErrorHandler;