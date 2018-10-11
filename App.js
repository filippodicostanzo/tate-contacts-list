import React from 'react';
import {UsersStack} from "./routes/router";
import { MenuProvider } from 'react-native-popup-menu';


const App = () => {
    return <MenuProvider><UsersStack/></MenuProvider>;
};

export default App;




