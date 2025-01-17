import React from "react";
import {Modal, Form, OverlayTrigger, Tooltip, Row, Col, Spinner} from 'react-bootstrap';
import InputMask from 'react-input-mask';
import "./App.css";
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css'
import congrats from './congrats.gif'

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


function App() {
    const [data, setData] = React.useState(null);
    const [selectedHoliday, setSelectedHoliday] = React.useState(null);
    const [show, setShow] = React.useState(false);
    const [showSuccess, setShowSuccess] = React.useState(false);
    const [formData, setFormData] = React.useState('')
    const [timeslot, setTimeslot] = React.useState('')
    const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(true);
    const [showPhoneTooltip, setShowPhoneTooltip] = React.useState(false);
    const [showAssignmentDescription, setShowAssignmentDescription] = React.useState(false)
    const [showExpectation, setshowExpectation] = React.useState(false)
    const [showDoIHaveTo, setShowDoIHaveTo] = React.useState(false)
    const [showOverallDescription, setShowOverallDescription] = React.useState(false)
    const [showSignupModal, setShowSignupModal] = React.useState(false)
    const [isSubmitted, setIsSubmitted] = React.useState(false)

    const handleClose = () => {
        setFormData({})
        setShow(false);
    }

    const handleCloseAssignmentDescription = () => {
        setShowAssignmentDescription(false)
    }

    const handleCloseExpectation = () => {
        setshowExpectation(false)
    }

    const handleCloseDoIHaveTo = () => {
        setShowDoIHaveTo(false)
    }

    const handleCloseOverallDescription = () => {
        setShowOverallDescription(false)
    }

    const handleShowAssignmentDescription = () => {
        setShowAssignmentDescription(true)
    }

    const handleShowExpectation = () => {
        setshowExpectation(true)
    }

    const handleShowDoIHaveTo = () => {
        setShowDoIHaveTo(true)
    }

    const handleShowOverallDescription = () => {
        setShowOverallDescription(true)
    }

    const handleRedirectShowAssignmentDescription = () => {
        setshowExpectation(false);
        setShowAssignmentDescription(true);
    }

    const handleCloseSuccess = () => {
        setShowSuccess(false)
        setFormData({})
        window.location.reload()
    }

    const handleCloseSignupModal = () => {
        setShowSignupModal(false)
    }

    function parseJSON(response) {
        return new Promise((resolve) => response.json()
            .then((json) => resolve({
                status: response.status,
                ok: response.ok,
                json,
            })));
    }

    const submit = async () => {
        fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                holidayName: selectedHoliday.holidayName,
                timeslot: timeslot,
                volunteer: formData.name,
                phone: formData.phoneNumber,
                email: formData.email
            }),
        })
            .then(parseJSON)
            .then((response) => {
                if (!response.ok) {
                    alert(`Something bad happened and you didn't actually sign up, probably because Ben isn't really a web developer.\n\nTry again and if this keeps happening, just call/text him to sign up.\n\nIf you want, you could tell him you got the error: ${response.json.error}`)
                } else {
                    handleShowSuccess()
                }
            })
            .catch((err) => alert(`Something really bad happened and you didn't actually sign up, probably because Ben isn't really a web developer.\n\nTry again and if this keeps happening, just call/text him to sign up.\n\nIf you want, you could tell him you got the error: ${err.message}`))
    }

    const handleSubmit = async (event) => {
        setIsSubmitted(true)
        await submit()
        setIsSubmitted(false)
        setShow(false);
    }
    const handleShow = (event) => {
        setTimeslot(event.target.value)
        setShow(true);
    }

    const handleShowSuccess = () => setShowSuccess(true)

    React.useEffect(() => {
        const header = {'ngrok-skip-browser-warning': 'true'}
        fetch("/api", {headers: header})
            .then((res) => res.json())
            .then((data) => {
                data.message.sort((a, b) => a.date.localeCompare(b.date));
                setData(data.message)
            });
    }, []);

    const handleSelectChange = (event) => {
        const selectedHolidayName = event.target.value;
        const selectedHoliday = data.find(item => item.holidayName === selectedHolidayName);
        setSelectedHoliday(selectedHoliday);
        setShowSignupModal(true)
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        setIsSubmitDisabled(nameNotPresent() || !phonePresent())
    }

    const handlePhoneChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        setIsSubmitDisabled(
            !value ||
            nameNotPresent() ||
            !phonePresent()
        );
    };

    const nameNotPresent = () => {
        return formData.name === undefined || formData.name === ''
    }
    const phonePresent = () => {
        return (formData.phoneNumber && formData.phoneNumber.replace(/\D/g, '').length >= 9)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isSubmitDisabled) {
            handleSubmit();
        }
    };

    const phoneTooltip = (
        <Tooltip id="phone-tooltip">Phone number must be 10 digits long</Tooltip>
    );

    const handlePhoneBlur = () => {
        setShowPhoneTooltip(formData.phoneNumber && formData.phoneNumber.replace(/\D/g, '').length !== 10);
    };

    const yesterday = () => {
        let date = new Date()
        date.setDate(date.getDate() + 1);
        return new Date(date).toLocaleString([], {timeZone: "US/Mountain"});
    };

    const stringNotEmpty = (str) => {
        return str !== null && str.length > 0
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Lehi 2nd Ward Flag Holidays</h1>
                <br/>
                <Row noGutters>
                    <Col lg={6} md={12}>
                        <Button onClick={handleShowOverallDescription} className="w-100"> What is this? </Button>
                    </Col>
                    <Col lg={6} md={12}>
                        <Button onClick={handleShowExpectation} className="w-100"> What's expected? </Button>
                    </Col>
                    <Col lg={6} md={12}>
                        <Button onClick={handleShowDoIHaveTo} className="w-100"> Do I have to? </Button>
                    </Col>
                    <Col lg={6} md={12}>
                        <Button onClick={handleShowAssignmentDescription} className="w-100"> How does it work? </Button>
                    </Col>
                </Row>
                <br/>
                <p>
                    {!data ? "The list of holidays is loading. Let Ben Kent know if this doesn't go away within a few seconds." : (
                        <select className="responsive-select" onChange={handleSelectChange}>
                            <option value="">Select a holiday</option>
                            {data.map((item, index) => (
                                <option key={index} value={item.holidayName}
                                        disabled={(stringNotEmpty(item['Route 1 morning'].volunteerName) && stringNotEmpty(item['Route 1 evening'].volunteerName) &&
                                            stringNotEmpty(item['Route 2 morning'].volunteerName) && stringNotEmpty(item['Route 2 evening'].volunteerName))
                                        || new Date(yesterday()) > new Date(new Date(item.date).toLocaleString([], {timeZone: "US/Mountain"}))
                                            ? true
                                            : null}>
                                    {item.holidayName}: {parseDate(new Date(item.date))}
                                </option>
                            ))}
                        </select>
                    )}
                </p>
                {selectedHoliday && (
                    <Modal show={showSignupModal} onHide={handleCloseSignupModal} centered={true}>
                        <Modal.Header>
                            <Modal.Title className={'mx-auto'}>Please choose an available route. Once you sign up,
                                you will receive a text and email confirming your assignment. You will also receive a
                                reminder
                                as the holiday approaches.</Modal.Title>
                        </Modal.Header>
                        <Row noGutters>
                            <Col lg={6} md={12}>
                                <Button value={'Route 1 morning'} onClick={handleShow} className="w-100"
                                        disabled={selectedHoliday['Route 1 morning'].volunteerName ? true : null}>Sign Up - Route 1 Morning</Button>
                                {/*<Button value={'Route 1 morning'} onClick={handleShow} className="w-100">Sign Up - Route*/}
                                {/*    1</Button>*/}
                            </Col>
                            <Col lg={6} md={12}>
                                <Button value={'Route 1 evening'} onClick={handleShow} className="w-100"
                                        disabled={selectedHoliday['Route 1 evening'].volunteerName ? true : null}>Sign Up - Route 1 Evening</Button>
                            </Col>
                            <Col lg={6} md={12}>
                                <Button value={'Route 2 morning'} onClick={handleShow} className="w-100"
                                        disabled={selectedHoliday['Route 2 morning'].volunteerName ? true : null}>Sign Up - Route 2 Morning</Button>
                            </Col>
                            <Col lg={6} md={12}>
                                <Button value={'Route 2 evening'} onClick={handleShow} className="w-100"
                                        disabled={selectedHoliday['Route 2 evening'].volunteerName ? true : null}>Sign Up - Route 2 Evening</Button>
                            </Col>
                        </Row>
                    </Modal>
                )}
                <>
                    <Modal show={show} onHide={handleClose} centered={true}>
                        <Modal.Header closeButton>
                            <Modal.Title
                                className={'mx-auto'}>{selectedHoliday ? selectedHoliday.holidayName + " " : ""}Sign
                                Up</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
                                    <Form.Label>Phone Number</Form.Label>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={phoneTooltip}
                                        show={!isSubmitDisabled && showPhoneTooltip}
                                    >
                                        <InputMask
                                            mask="(999) 999-9999"
                                            maskChar=""
                                            type="tel"
                                            placeholder="(801) 555-5555"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handlePhoneChange}
                                            onBlur={handlePhoneBlur}
                                            onKeyPress={handleKeyPress}
                                        >
                                            {(inputProps) => <Form.Control {...inputProps} />}
                                        </InputMask>
                                    </OverlayTrigger>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea3">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="example@example.com"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onKeyPress={handleKeyPress}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleSubmit} disabled={isSubmitDisabled}>
                                {!isSubmitted && "Submit"}
                                {isSubmitted && <Spinner animation="border" variant="info" />}
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
                <>
                    <Modal show={showSuccess} onHide={handleCloseSuccess} centered={true}>
                        <Modal.Header closeButton>
                            <Modal.Title className={'mx-auto'}>You Are A Champ!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className={'mx-auto'}>
                            <p className={'mx-auto'}>Thanks for signing up to handle flags for {timeslot} on {selectedHoliday ? selectedHoliday.holidayName + "!!!" : ""}</p>
                            <div className={'mx-auto'}><img alt="thanks" src={congrats} className="img-fluid"></img>
                            </div>
                            <br/>
                            <p className={'mx-auto'}>You are seriously the best! You should
                                receive a text/email with more info, and another reminder about a week before your
                                date.</p></Modal.Body>
                    </Modal>
                </>
                <>
                    <Modal show={showOverallDescription} onHide={handleCloseOverallDescription} centered={true}>
                        <Modal.Header closeButton>
                            <Modal.Title className={'mx-auto'}>Flag Assignments Rundown</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className={'mx-auto'}>
                            <p className={'mx-auto'}>Our youth are very blessed to be able to participate in meaningful
                                weekly activities
                                as well as various youth conferences, camps, etc. throughout each year. As you may
                                imagine, the costs for these activities can add up,
                                so we are allowed one fund raiser per year to help finance them all. Our ward has for
                                many years fulfilled this
                                need by setting up flags in the morning and taking them down in the evening at homes in
                                our ward on certain holidays
                                throughout the year in exchange for a donation to our youth programs.</p>
                            <p>At the beginning of the year, the youth canvas the ward collecting donations for this
                                fund raiser,
                                and then each family of the youth take turns to ensure that every home who has donated
                                has a flag placed in their front yard in the early morning and then retrieved at the
                                end of the day.</p>
                        </Modal.Body>
                    </Modal>
                </>
                <>
                    <Modal show={showExpectation} onHide={handleCloseExpectation} centered={true}>
                        <Modal.Header closeButton>
                            <Modal.Title className={'mx-auto'}>What is expected of your family?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className={'mx-auto'}>
                            <p className={'mx-auto'}>We have committed to those who donated that we would deliver flags
                                on six holidays
                                throughout the year, which means a total of 24 different assignment slots since the ward
                                has been split into
                                two routes, and we need to do the morning and evening of each day.</p>
                            <p>We currently have around 15-20 families with youth who participate with our ward, which means that
                                we don't quite have
                                enough families to cover every assignment slot. The expectation is that if your youth
                                participates in activities,
                                your family will sign up for at least one assignment slot. If you have more than one
                                youth in your family participating,
                                it would be a very nice thing if you would sign up for more than one assignment.</p>
                            <p>If you're not sure what "signing up for an assignment" entails, click <LinkButton
                                onClick={handleRedirectShowAssignmentDescription}>here</LinkButton>.</p>
                        </Modal.Body>
                    </Modal>
                </>
                <>
                    <Modal show={showDoIHaveTo} onHide={handleCloseDoIHaveTo} centered={true}>
                        <Modal.Header closeButton></Modal.Header>
                        <Modal.Body className={'mx-auto'}><h2>Yep</h2></Modal.Body>
                    </Modal>
                </>
                <>
                    <Modal show={showAssignmentDescription} onHide={handleCloseAssignmentDescription} centered={true}>
                        <Modal.Header closeButton>
                            <Modal.Title className={'mx-auto'}>Assignment Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className={'mx-auto'}>
                            <p className={'mx-auto'}>The ward has been split into two separate routes, each of them with
                                roughly the same number of flags to be handled. When you sign up for a route, you are
                                responsible
                                for ensuring that a flag is placed in the front yard of each house on your route in the
                                early
                                morning of the holiday for which you signed up, and then retrieved and put back in the
                                shed
                                behind the church at the end of the day, depending on which timeslot you took. In the days leading up to your assignment, you
                                will receive
                                a call/text from Ben or Jamie Kent with a map of your route as well as a key to the
                                shed. If you
                                don't receive this call/text or if you have any questions, feel free to reach out to
                                them at
                                801-636-7228.</p>
                            <p>When you open the shed, you will see all of the flags along the south wall along with a
                                container holding pieces of rebar that are hammered into the yard for the flag pole to
                                slide
                                onto. There are also drivers that can be used to pound the rebar into the ground;
                                however, some
                                people find it easier to use a heavy hammer, so you may want to use one if you have
                                one.</p>
                        </Modal.Body>
                    </Modal>
                </>
            </header>
        </div>
    );
}

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

function parseDate(date) {
    const dayOfWeek = weekdays[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    return `${dayOfWeek} ${month} ${day}`;
}

export default App;