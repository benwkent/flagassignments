import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import {Col, Form, Modal, OverlayTrigger, Row, Spinner} from "react-bootstrap";
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import InputMask from "react-input-mask";

const Administration = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('authenticated')|| false);


    if(isAuthenticated === 'true' || isAuthenticated === true) {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Administration</h1>
                    <br/>
                    <Row><Button onClick={handleShowFamiliesModal}> Manage Families </Button></Row>
                    <Row><Button onClick={handleShowHolidaysModal}> Manage Holidays </Button></Row>
                    <Row><Button onClick={handleShowAssignmentsModal}> View Assignments </Button></Row>
                    <br/>
                    <>
                        <Modal show={showFamiliesModal} onHide={handleShowFamiliesModalClose} centered={true}>
                            <Modal.Header closeButton>
                                <Modal.Title
                                    className={'mx-auto'}>Families with youth</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Here you can see and manage families</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleShowFamiliesModalClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                    <>
                        <Modal show={showHolidaysModal} onHide={handleShowHolidaysModal} centered={true}>
                            <Modal.Header closeButton>
                                <Modal.Title
                                    className={'mx-auto'}>Holidays</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Here you can see and manage holidays</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleShowHolidaysModalClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                    <>
                        <Modal show={showAssignmentsModal} onHide={handleShowAssignmentsModalClose} centered={true}>
                            <Modal.Header closeButton>
                                <Modal.Title
                                    className={'mx-auto'}>Current assignments</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Here you can see and manage assignments</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleShowAssignmentsModalClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                    <LinkButton onClick={handleLogout} className="w-10"> Logout </LinkButton>
                </header>
            </div>
        );
    } else{
        return <Navigate replace to="/"/>;
    }

    function handleShowFamiliesModal() {
        setShowFamiliesModal(true);
    }

    function handleShowHolidaysModal() {
        setShowHolidaysModal(true);
    }

    function handleShowAssignmentsModal() {
        setShowAssignmentsModal(true);
    }

    function handleShowFamiliesModalClose() {
        setShowFamiliesModal(false);
    }

    function handleShowAssignmentsModalClose() {
        setShowAssignmentsModal(false);
    }

    function handleShowHolidaysModalClose() {
        setShowHolidaysModal(false);
    }

    function handleLogout() {
        localStorage.setItem('authenticated', false);
        setIsAuthenticated(false);
        return <Navigate replace to="/"/>;
    }
};

const theme = {
    blue: {
        default: "#3f51b5",
        hover: "#283593",
    },
    pink: {
        default: "#e91e63",
        hover: "#ad1457",
    },
};

const Button = styled.button`
    background-color: ${(props) => theme[props.theme].default};
    color: white;
    padding: 5px 5px;
    border-radius: 5px;
    outline: 0;
    border: 0;
    text-transform: uppercase;
    margin: 10px 0px;
    cursor: pointer;
    transition: ease background-color 250ms;
    vertical-align: middle;
    margin-left: 5px;

    &:hover {
        background-color: ${(props) => theme[props.theme].hover};
    }

    &:disabled {
        cursor: default;
        opacity: 0.7;
        text-decoration: line-through;
    }
`;

const LinkButton = styled.button`
    background: none !important;
    border: none;
    padding: 0 !important;
    color: #069;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => theme[props.theme].hover};
    }

    &:disabled {
        cursor: default;
        opacity: 0.7;
        text-decoration: line-through;
    }
`;

LinkButton.defaultProps = {
    theme: "blue"
};

Button.defaultProps = {
    theme: "blue",
};
export default Administration;