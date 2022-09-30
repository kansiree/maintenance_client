import React , {  useEffect, useState }from 'react';
import 'antd/dist/antd.min.css';
import { StyleSheet, Text, View } from 'react-native';
import { Select } from 'antd';
import { Container,Row,Col,Button} from "react-bootstrap";
import SearchSelectComponent from './component/SearchSelectComponent';
import InputText from './component/InputText'
import './App.css';

const { Option } = Select;
const dataTest = ['A','B','C']

export default function App() {
  const [error, setError] = useState(false);
  // const [isLoaded, setIsLoaded] = this.useState(false);
  const [itemsAir, setItemsAir] = useState([]);
  const [itemsSystem, setItemsSystem] = useState([]);
  const [itemsTrouble, setItemsTrouble] = useState([]);
  const [itemsTechnicalOrder, setItemsTechnicalOrder] = useState([]);
  const [itemsTroubleShooting, setItemsTroubleShooting] = useState([]);

  async function fetchData(){
    console.log("fetchData")
     const url = 'http://localhost:8081';
     const resAir= await fetch(url+'/getMaster?type=aircraft');
     resAir
     .json()
     .then(res =>  setItemsAir(res.map(item => item.fullName)))
     .catch(err => setError(err));

     const resSystem = await fetch(url+'/getMaster?type=system');
     resSystem
     .json()
     .then(res =>  setItemsSystem(res.map(item => item.fullName)) )
     .catch(err => setError(err));

     const resTechnicalOrder = await fetch(url+'/getMaster?type=technical');
     resTechnicalOrder
     .json()
     .then(res =>  setItemsTechnicalOrder(res.map(item => item.fullName)))
     .catch(err => setError(err));

    //  console.log(dataTest)
    //  console.log(itemsSystem)

  }

  useEffect(()=>{
     fetchData();
     
  },[])

const aircraftType = React.useRef();
const primaryPilot = React.useRef();
const btSave = React.useRef();

const onClickSave = () => {
    let valueAircraftType = aircraftType.value
    let valuePrimaryPilot = primaryPilot.current.value
    const data = { aircraftType: valueAircraftType, 
      primaryPilot: valueDetail }
      console.log('onClickSave')
      console.log(data)
    // fetch('http://localhost:8081/createDetail', {
    //     method: 'POST',
    //     body: JSON.stringify(data),
    // })
    // .then(alert('SAVE SUCCESS'))
}
  
  return (
    <Container>
      <Row className="app" >
        <Col>Aircraft Type </Col>
        <Col> <SearchSelectComponent list={itemsAir} ref={aircraftType} ></SearchSelectComponent>    </Col>
      </Row>
      <Row className="app">
        <Col>Aircraft S/N </Col>
        <Col>    <SearchSelectComponent list={itemsAir}></SearchSelectComponent>    </Col>
      </Row>
      <Row className="app" >
        <Col>System </Col>
        <Col>    <SearchSelectComponent list={itemsSystem}></SearchSelectComponent>    </Col>
      </Row>
      <Row className="app" >
        <Col>Pilot 1 </Col>
        <Col>    <InputText textPlaceHolder = "Pilot 1" ref={primaryPilot}></InputText>    </Col>
      </Row>
      <Row className="app" >
        <Col>Pilot 2 </Col>
        <Col>    <InputText textPlaceHolder = "Pilot 2"></InputText>    </Col>
      </Row>
      <Row className="app" >
        <Col>Recorder </Col>
        <Col>    <InputText textPlaceHolder="Recoder"></InputText>    </Col>
      </Row>
      <Row className="app" >
        <Col>Date </Col>
        <Col>    <SearchSelectComponent list={dataTest}></SearchSelectComponent>    </Col>
      </Row>
      <Row className="app" >
        <Col>Trouble </Col>
        <Col>    <SearchSelectComponent list={dataTest}></SearchSelectComponent>    </Col>
      </Row>
      <Row className="app" >
        <Col>Technical Order </Col>
        <Col>    <SearchSelectComponent list={itemsTechnicalOrder}></SearchSelectComponent>    </Col>
      </Row>
      <Row className="app" >
        <Col>Trouble Shooting  </Col>
        <Col>    <SearchSelectComponent list={dataTest}></SearchSelectComponent>    </Col>
      </Row>
      <Row className="app" >
        <Col>Replace </Col>
        <Col>    <InputText textPlaceHolder = "Replace"></InputText>    </Col>
      </Row>
      <Row className="app" >
        <Col>Name </Col>
        <Col>    <InputText textPlaceHolder = "Name"></InputText>    </Col>
      </Row>
      <Row className="app" >
        <Col>Path Number </Col>
        <Col>    <InputText textPlaceHolder = "Path Number"></InputText>    </Col>
      </Row>
      <Row className="app" >
        <Col>Serial number Remove </Col>
        <Col>    <InputText textPlaceHolder = "Serial number Remove"></InputText>    </Col>
      </Row>
      <Row className="app" >
        <Col>Serial number install </Col>
        <Col>    <InputText textPlaceHolder = "Serial number install"></InputText>    </Col>
      </Row>
      <Row className="app" >
        <Col>Remark </Col>
        <Col>    <InputText textPlaceHolder = "Remark"></InputText>    </Col>
      </Row>
      
        <Button variant="primary" type="submit" ref={btSave} style={{marginTop:10}} onClick={onClickSave}>Save</Button>  

    </Container>

    );
  
}

const app = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
