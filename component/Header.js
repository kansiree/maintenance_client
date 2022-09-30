import React from "react";
import { Container,Nav,Navbar } from 'react-bootstrap';

export default function Header(){
    return(
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Maintanance</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/add">Add Mantanance Detail</Nav.Link>
                        <Nav.Link href="/addMaster">Add Master</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>   
            );
}