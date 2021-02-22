import React from 'react';
import { withRouter } from 'react-router-dom';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) =>{ 
    console.log(props);
    let transformedIngredient = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_,i) =>{
            return    <BurgerIngredient  key={igKey + i} type={igKey} />
            });  //Array(3) will give you array of length 3 with empty parameters
        })
        .reduce((arr ,el) => {
            return arr.concat(el);
        }, []);
       //  console.log(transformedIngredient);

       if(transformedIngredient.length ===  0)
       {
           transformedIngredient = <p>Please start adding ingredients !</p>
       }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient  type="bread-top" />
            {transformedIngredient}
            <BurgerIngredient  type="bread-bottom" />
          

        </div>
    );
};

export default withRouter(burger);