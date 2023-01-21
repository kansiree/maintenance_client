import React , {  useEffect,useRef, useState }from 'react';
import 'antd/dist/antd.min.css';
import { StyleSheet, Text, View } from 'react-native';
import { Container,Row,Col,Button} from "react-bootstrap";
import InputText from './component/InputText'
import './App.css';
import 'antd/dist/antd.min.css';
import  Select  from 'react-select';
import TextField from '@mui/material/TextField'
import ConfigApplication from './application.json'

export default function App() {
  const URL = (ConfigApplication.developMode=="Y")?ConfigApplication.API_URL_LOCAL:ConfigApplication.API_URL;
  const [error, setError] = useState(false);
  // const [isLoaded, setIsLoaded] = this.useState(false);
  const [itemsAir, setItemsAir] = useState([]);
  const [itemsSystem, setItemsSystem] = useState([]);
  const [itemsTrouble, setItemsTrouble] = useState([]);
  const [itemsTechnicalOrder, setItemsTechnicalOrder] = useState([]);
  const [itemsTroubleShooting, setItemsTroubleShooting] = useState([]);
  const [selectedOptionsAirCraft,setSelectedOptionsAirCraft] = React.useState();
  const [selectedOptionsAirCraftSN,setSelectedOptionsAirCraftSN] = React.useState();
  const [selectedOptionsSystem,setSelectedOptionsSystem] = React.useState();
  const [selectedOptionsTrouble,setSelectedOptionsTrouble] = React.useState();
  const [selectedOptionsTechnical,setSelectedOptionsTechnical] = React.useState();
  const [selectedOptionsTrobleShoot,setSelectedOptionsTrobleShoot] = React.useState();
  const [selectDate,setSelectDate] = React.useState();
   // Function triggered on selection
   function handleSelectAircraft(data) {
    setSelectedOptionsAirCraft(data);
  }
   function handleSelectAircraftSN(data) {
    setSelectedOptionsAirCraftSN(data);
  }
  function handleSelectSystem(data) {
    setSelectedOptionsSystem(data);
  } 
  function handleSelectTrouble(data) {
    setSelectedOptionsTrouble(data);
  } 
  function handleSelectTechnical(data) {
    setSelectedOptionsTechnical(data);
  }
  function handleSelectTrobleShoot(data) {
    setSelectedOptionsTrobleShoot(data);
  }

  async function fetchData(){
    console.log("fetchData")
    console.log("url: "+URL);
    const resAir= await fetch(URL+'/getMaster?type=aircraft',{
       method: 'GET',  
       withCredentials: true,  
       crossorigin: true,  
     });
     resAir
     .json()
     .then(res =>  setItemsAir(res.map(item => ({value:item.fullName ,label:item.fullName}))))
     .catch(err => setError(err));

     const resTechnicalOrder = await fetch(URL+'/getMaster?type=technical',{
      method: 'GET',  
      withCredentials: true,  
      crossorigin: true,  
    });
     resTechnicalOrder
     .json()
     .then(res =>  setItemsTechnicalOrder(res.map(item => ({value:item.fullName ,label:item.fullName}))))
     .catch(err => setError(err));

     const resSystem = await fetch(URL+'/getMaster?type=system',{
      method: 'GET',  
      withCredentials: true,  
      crossorigin: true,  
    });
     resSystem
     .json()
     .then(res => setItemsSystem(res.map(item => ({value:item.fullName ,label:item.fullName})))) //  
     .catch(err => setError(err));

  }

  useEffect(()=>{
     fetchData();
  },[])

const btSave = React.useRef();
const primaryPilot = React.createRef();
const second2Pilot = React.createRef();
const remark = React.createRef();
const recoder = React.createRef();
const replace = React.createRef();
const name = React.createRef();
const pathNumber = React.createRef();
const serailNumberRemove = React.createRef();
const serailNumberInstall = React.createRef();
const aircraftSN = React.createRef();
const trouble = React.createRef();
const troubleShooting = React.createRef();

const onClickSave = () => {
      console.log('onClickSave') 

      if(undefined == selectedOptionsAirCraft){
        alert('Please select aircraft type.')
      }else if(aircraftSN.current.value.length <= 0){
        alert('Please key aircraft S/N')
      }else{

        const data = { 
          aircraftType: selectedOptionsAirCraft.value,
          aircraftSN : aircraftSN.current.value,
          system : selectedOptionsSystem.value,
          primaryPilot: primaryPilot.current.value,
          secondaryPilot: second2Pilot.current.value,
          recoder: recoder.current.value,
          date : selectDate,
          trouble: trouble.current.value,
          technicalOrder:selectedOptionsTechnical.value,
          troubleShooting:troubleShooting.current.value,
          replace:replace.current.value,
          name:name.current.value,
          partNumber:pathNumber.current.value,
          serailNumberRemove:serailNumberRemove.current.value,
          serailNumberInstall:serailNumberInstall.current.value,
          remark:remark.current.value,
          imageSerailNumberRemove:"",
          imageSerailNumberInstall:""
        }
        console.log('data: '+ JSON.stringify(data));
        fetch(URL+'/createDetail', {
          method: 'POST',
          body: JSON.stringify(data),
        })
        .then( setTimeout(() => {
          window.location.reload(true);
        }, 200))   
        .then(alert('SAVE SUCCESS'))

      }
   
}
 

  return (
    <Container>
      <Row className="app" >
        <Col>Aircraft Type </Col>
        <Col>  
            <Select
              options={itemsAir}
              placeholder="Select Aircraft Type"
              value={selectedOptionsAirCraft}
              isSearchable={true}
              onChange={handleSelectAircraft}
            />
         </Col>
      </Row>
      <Row className="app">
        <Col>Aircraft S/N </Col>
        <Col>  
        <InputText textPlaceHolder = "Aircraft S/N" ref={aircraftSN}  ></InputText>  
        </Col>
      </Row>
      <Row className="app" >
        <Col>System </Col>
        <Col>    
            <Select
              options={itemsSystem}
              placeholder="Select System"
              value={selectedOptionsSystem}
              isSearchable={true}
              onChange={handleSelectSystem}
            />         
         </Col>
      </Row>
      <Row className="app" >
        <Col>Pilot 1 </Col>
        <Col>    <InputText textPlaceHolder = "Pilot 1" ref={primaryPilot}  ></InputText>    </Col>
      </Row>
      <Row className="app" >
        <Col>Pilot 2 </Col>
        <Col>    <InputText textPlaceHolder = "Pilot 2" ref={second2Pilot}></InputText>    </Col>
      </Row>
      <Row className="app" >
        <Col>Recorder </Col>
        <Col>    <InputText textPlaceHolder="Recoder" ref={recoder}> </InputText>    </Col>
      </Row>
      <Row className="app" >
        <Col>Date </Col>
        <Col>
           <TextField
          id="date"
          label="date"
          type="date"
          onChange={(e) => {
            setSelectDate(e.target.value)
          }}
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
        /> 
        </Col>
       
      </Row>
      <Row className="app" >
        <Col>Trouble </Col>
        <Col>   
        <InputText textPlaceHolder="Trouble" ref={trouble}></InputText>
        </Col>
      </Row>
      <Row className="app" >
        <Col>Technical Order </Col>
        <Col>
            <Select
              options={itemsTechnicalOrder}
              placeholder="Select Technical Order"
              value={selectedOptionsTechnical}
              isSearchable={true}
              onChange={handleSelectTechnical}
            />     
        </Col>
      </Row>
      <Row className="app" >
        <Col>Trouble Shooting  </Col>
        <Col>    
        <InputText textPlaceHolder = "Trouble Shooting" ref={troubleShooting}></InputText>
            </Col>
      </Row>
      <Row className="app" >
        <Col>Replace </Col>
        <Col>    <InputText textPlaceHolder = "Replace" ref={replace} ></InputText>    </Col>
      </Row>
      <Row className="app" >
        <Col>Name </Col>
        <Col>    <InputText textPlaceHolder = "Name" ref={name} ></InputText>    </Col>
      </Row>
      <Row className="app" >
        <Col>Path Number </Col>
        <Col>    <InputText textPlaceHolder = "Path Number" ref={pathNumber}></InputText>    </Col>
      </Row>
      <Row className="app" >
        <Col>Serial number Remove </Col>
        <Col>    <InputText textPlaceHolder = "Serial number Remove" ref={serailNumberRemove}></InputText>    </Col>
      </Row>
      <Row className="app" >
        <Col>Serial number install </Col>
        <Col>    <InputText textPlaceHolder = "Serial number install" ref={serailNumberInstall}></InputText>    </Col>
      </Row>
      <Row className="app" >
        <Col>Remark </Col>
        <Col>    <InputText textPlaceHolder = "Remark" ref={remark}></InputText>    </Col>
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
