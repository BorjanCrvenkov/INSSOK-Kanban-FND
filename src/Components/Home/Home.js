import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

const Home = () => {
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h1>Welcome to the Home Page</h1>
                        <p>Here's some information about our company and what we do.</p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <h2>Our Products</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
                    </Col>
                    <Col xs={12} md={6}>
                        <h2>Our Services</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;