import { Fragment, useEffect} from "react";
import { Redirect, Route } from "react-router";
import { USER_LOGIN } from "../../util/settings/config";




 const CheckoutTemplate = (props) => { //path, exact, Component

    const { Component, ...restProps } = props;

    useEffect(() => {
        window.scrollTo(0, 0);

    })


    if(!localStorage.getItem(USER_LOGIN)) {
        return <Redirect to='/login' />
    }
   


    return <Route {...restProps} render={(propsRoute) => { //props.location,props.history,props.match

        return <Fragment>
            <Component {...propsRoute} />
        </Fragment>
    }} />

}


export default CheckoutTemplate;