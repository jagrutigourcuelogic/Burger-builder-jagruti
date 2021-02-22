import React , { Component } from 'react';
import Button from '../../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../../axios-orders';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Input from '../../../../components/UI/Input/Input1';

class ContactData extends Component {
    
    state = {
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:'',
            zipcode:''
        },
        loading:false
    }

    OrderHandler = (event) => {
      
        event.preventDefault();
               this.setState({loading:true});
       const order ={
           ingredients:this.props.ingredients,
           price:this.props.price,
           customer:{
               name:'Jack Sparrow',
               address:{
                   street:'Baker street',
                   zipcode:'12345',
                   country:'Germany'
               },
               email:'jack@tet.com',

           },
           deliveryMethod:'Bluedart'

       }
        //alert('You Continue!');
        axios.post('/orders.json',order)
        .then(response => {
            if(response.status === 200)
            {
                this.setState({loading:false});
                alert('Data saved');
            }
            console.log(response);
        })
        .catch(error => {
            this.setState({loading:false});
            console.log(error);
        });

        console.log(this.props.ingredients);
    }

        render(){

            let form = (<form>
               <Input inputtype="input" type="text" name="name" placeholder="Your name" />
                <Input inputtype="input" type="text" name="street" placeholder="Your street" />
                <Input inputtype="input" type="text" name="email" placeholder="Your email" />
                <Input inputtype="input" type="text" name="postalCode" placeholder="Your postalCode" />
                <Input inputtype="input" type="text" name="zipcode" placeholder="Your zipcode" />
                <Button btnType="Success" clicked={this.OrderHandler}>ORDER</Button>
            </form>);
            if(this.state.loading)
            {
                form =<Spinner />;
            }
            return (
                <div className={classes.ContactData}>
                    <h4>Enter your Contact details </h4>
                    {form}
                </div>
            );
        }
    } 

    export default ContactData;