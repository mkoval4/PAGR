import React from "react";
import {Button, Container, Header, Segment, Grid, Form} from "semantic-ui-react";
import {Link} from "react-router-dom";

export default () => (
    <Container text>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h1'>Register</Header>

                <Form size='large'>
                    <Segment stacked>
                        <Form.Input type='text' fluid icon='user' iconPosition='left' placeholder='Name' />
                        <Form.Input type='email' fluid icon='envelope' iconPosition='left' placeholder='E-mail address' />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                        />

                        <Button as={Link} primary fluid size='large' to="/tasks">Register</Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    </Container>
);
