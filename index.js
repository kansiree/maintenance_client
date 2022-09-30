import { registerRootComponent } from 'expo';
import App from './App';
import Header from './component/Header';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import AddMaster from './component/AddMaster';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

export default function Maintanance(){

    return(
        <BrowserRouter>
            <Header></Header>
           <Container style={{marginTop:5}} >
            <Routes>
                <Route path="/"></Route>
                <Route path="/add" element={<App></App>}></Route>
                <Route path='/addMaster' element={<AddMaster></AddMaster>}></Route>
            </Routes>
           </Container>
           
        </BrowserRouter>
    );
}
registerRootComponent(Maintanance);
