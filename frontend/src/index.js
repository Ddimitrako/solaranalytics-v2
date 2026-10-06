import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import {  Route, Switch, Redirect,BrowserRouter as Router } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
// Chakra imports
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import {CheckoutForm ,Return, SuccessMessage} from "./components/stripe/CheckoutForm";
import {AuthContext} from "./contexts/Contexts";
import App from './app'; // Import the new component

ReactDOM.render(
    <ChakraProvider theme={theme}>
        <App /> {/* Use the new component here */}
    </ChakraProvider>,
    document.getElementById("root")
);
