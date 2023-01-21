import { Button, Container, FloatingLabel,Form } from "react-bootstrap";
import { StyleSheet } from 'react-native';
import React from "react";
import ConfigApplication from '../application.json'

export default function AddMaster() {
    
const type = React.useRef();
const detail = React.useRef();
const btSave = React.useRef();
const URL = (ConfigApplication.developMode=="Y")?ConfigApplication.API_URL_LOCAL:ConfigApplication.API_URL;
console.log("URL: "+URL);
const onClickSave = () => {
    let valueType = type.current.value
    let valueDetail = detail.current.value
    const data = { type: valueType, 
                    fullName: valueDetail }
    console.log(JSON.stringify(data));
    if(data.fullName==''){
        alert('please key detail.');
    }else if(data.type=='-1'){
        alert('please select type.');

    }else{

        fetch(URL+'/createMaster', {
            method: 'POST',
            withCredentials: true,  
            crossorigin: true,  
            mode: 'no-cors',  
            body: JSON.stringify(data),
        })
        .then(alert('SAVE SUCCESS'))
    }

}
    return (
        <Form>
            <Container>
                <FloatingLabel controlId="floatingSelect" label="Select Type">
                    <Form.Select aria-label="Floating label select example" ref={type} >
                        <option value="-1">Select Type </option>
                        <option value="system">system</option>
                        <option value="aircraft">aircraft</option>
                        <option value="technical">technical</option>
                    </Form.Select>
                </FloatingLabel>
                <FloatingLabel controlId="floatingText"  label="Detail" style={{marginTop:10}} >
                    <Form.Control
                        as="textarea"
                        ref={detail}
                        placeholder="Leave a comment here"
                        style={{ height: '100px' }}>
                        
                    </Form.Control>
                </FloatingLabel>
                <Button variant="primary" type="submit" ref={btSave} style={{marginTop:10}} onClick={onClickSave}>Save</Button>
            </Container>
        </Form>

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