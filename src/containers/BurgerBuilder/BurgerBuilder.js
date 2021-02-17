import React , { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

const INGRADIENT_PRICES = {
    salad : 0.5,
    cheese : 0.4,
    meat:1.3,
    bacon:0.7
};
class BurgerBuilder  extends  Component {

    state = {
        ingredients : {
            salad :0,
            bacon:0,
            cheese:0,
            meat:0
           
        },
        totalPrice: 4,
        purchasable:false,
        purchasing:false,
        loading:false
    }

    updatePurchaseState (ingredients){
        // const ingredients = {
        //     ...this.state.ingredients
        // };
        const sum = Object.keys(ingredients) //will convert object into array of object keys
             .map(igKey => {
                    return ingredients[igKey]; //map is used to have array of values
               })
               .reduce((sum , el ) => {
                   return sum + el;
               },0);

        this.setState({
            purchasable : sum > 0
        });

}

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCount;
        const priceAddition = INGRADIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice : newPrice,
            ingredients:updatedIngredient
        });
        this.updatePurchaseState(updatedIngredient);

    }

    removeIngredientHandler = (type) => {

        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0)
        {
            return; 
        }
        const updatedCount = oldCount - 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCount;
        const priceDeduction = INGRADIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice : newPrice,
            ingredients:updatedIngredient
        });
        this.updatePurchaseState(updatedIngredient);
    }

    purchaseHandler = () => {
        this.setState({
            purchasing:true
        })
    }

    purchaseCancelHandler = () => {
       
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = () => {

        this.setState({loading:true});
       const order ={
           ingredients:this.state.ingredients,
           price:this.state.totalPrice,
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
                this.setState({loading:false,purchasing:false});
                alert('Data saved');
            }
            console.log(response);
        })
        .catch(error => {
            this.setState({loading:false,purchasing:false});
            console.log(error);
        });
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let value in disabledInfo)
        {
            disabledInfo[value] = (disabledInfo[value] <= 0)
        }
        
        let OrderSummaryvar = <OrderSummary ingredients={this.state.ingredients}
        purchaseCancel={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler} 
        price={this.state.totalPrice}/> ;
        if(this.state.loading)
        {
            OrderSummaryvar = <Spinner />;

        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {OrderSummaryvar}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                ingredientAdded={this.addIngredientHandler} 
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                purchasable={this.state.purchasable}
                price={this.state.totalPrice}
                ordered={this.purchaseHandler} />
               

            </Aux>
        );
    }
}

export default BurgerBuilder;