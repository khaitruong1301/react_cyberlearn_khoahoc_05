import { Fragment } from "react";
import { Route } from "react-router";
import Header from "./Layout/Header/Header";
import HomeCarousel from "./Layout/HomeCarousel/HomeCarousel";



export const HomeTemplate = (props) => { //path, exact, Component

    const { Component, ...restProps } = props;

    return <Route {...restProps} render={(propsRoute) => { //props.location,props.history,props.match

        return <Fragment>
            <Header {...propsRoute}/>
            <HomeCarousel {...propsRoute} />

            <Component {...propsRoute} />

            


            <footer className="bg-black h-10 text-white">
                Đây là footer homepage
            </footer>
        </Fragment>
    }} />

}