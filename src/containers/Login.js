import React from "react";
import {Button, Container, Form, Grid, Header, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";

export default () => (
    <Container text>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h1'>Login</Header>

                <Form size='large'>
                    <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                        />

                        <Button as={Link} primary fluid size='large' to="/tasks">Login</Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    </Container>
);
