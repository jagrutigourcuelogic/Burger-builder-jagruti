import React  from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
                            .map(igKey => {
                                return <li key={igKey}>
                                <span style={{testTrasform:'capitalize'}}>
                                {igKey}</span> : {props.ingredients[igKey]}</li>
                            });
  
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>The delicious burger with following Ingredients: </p>
            <ul>
                <li>{ingredientSummary}</li>
            </ul>
            <p><strong>Total Price : {props.price}</strong></p>
            <p>Continue to Checkout ?</p>
            <Button btnType="Danger" clicked={props.purchaseCancel}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
        </Aux>
    );
};


export default orderSummary;