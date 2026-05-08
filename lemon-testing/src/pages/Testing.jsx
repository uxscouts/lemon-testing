
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import SignupForm from '../components/TestForm3';
import TestForm4 from '../components/TestForm4';
import BookingForm2 from '../components/BookingForm2';

function Testing(){
    return (
        <Container>
            <h1>Testing Page</h1>
            <p>This is a simple testing page.</p>
            <SignupForm />
            <hr/>
            <TestForm4/>
            <hr/>
            <BookingForm2 onChildSubmit={(data) => console.log("Data from child:", data)} />
        </Container>
    );

}
export default Testing;