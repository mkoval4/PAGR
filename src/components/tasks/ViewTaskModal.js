import React from 'react';

import {Grid, Input, Modal, Form, Label, TextArea, Button, Icon} from "semantic-ui-react";
import moment from "moment";

const ViewTaskModal = ({onCloseClicked, onEditClicked, task}) => {
    const {name, description, dueDate, priority, doctor} = task;
    return (
        <Modal
            open
            centered
            onClose={onCloseClicked}
            closeOnDimmerClick={false}
            closeIcon
        >
            <Modal.Header>
                Task Detail
            </Modal.Header>
            <Modal.Content>
                <Form>
                    <Grid>
                        <Grid.Row columns={3}>
                            <Grid.Column>
                                <Form.Field>
                                    <Input label='Task' labelPosition='left' type='text' readonly disabled value={name} fluid />
                                </Form.Field>
                                <Form.Field>
                                    <Input label='Due Date' labelPosition='left' type='text' readonly disabled value={moment(dueDate).format('LLL')} fluid />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <Label>Description</Label>
                                    <TextArea readonly value={description} required disabled rows={4} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <Input label='Doctor' labelPosition='left' type='text' readonly disabled value={doctor} fluid />
                                </Form.Field>
                                <Form.Field>
                                    <Input label='Priority' labelPosition='left' type='text' readonly disabled value={priority === 1 ? 'High' : (priority === 2 ? 'Medium' : 'Low')} fluid />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Modal.Content>

            <Modal.Actions>
                <Button primary onClick={onEditClicked} size='large'>
                    <Icon name='save outline'/>
                    Edit Task
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default ViewTaskModal;
