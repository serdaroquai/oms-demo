import React from 'react';
import {Route, IndexRoute} from "react-router";
import App from "./components/App";
import HomePage from "./components/home/HomePage";
import AboutPage from "./components/about/AboutPage";
import OutagesPage from "./components/outage/OutagesPage";
import ManageOutagePage from "./components/outage/ManageOutagePage";

// always load app component and pass others as children based on url
export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="about" component={AboutPage}/>
        <Route path="outages" component={OutagesPage}/>
        <Route path="outage" component={ManageOutagePage}/>
        <Route path="outage/:id" component={ManageOutagePage}/>
    </Route>
);