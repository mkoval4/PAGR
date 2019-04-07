import React, {useState} from 'react';

import {Grid, Input, Modal, Form, Label, TextArea, Button, Icon} from "semantic-ui-react";
import moment from "moment";
import WithDoctors from "../../containers/data/WithDoctors";

const EditTaskModal = ({onCloseClicked, updateTask, task, doctors}) => {
    const {name, description, dueDate, priority, doctor, assignedDate} = task;
    const [updatedName, setName] = useState(name);
    const [updatedDescription, setDescription] = useState(description);
    const [updatedDueDate, setDueDate] = useState(moment(dueDate).format('YYYY-MM-DD'));
    const [updatedPriority, setPriority] = useState(priority || 1);
    const [updatedDoctor, setDoctor] = useState(doctor);
    const canSave = updatedName.length > 0 && updatedDescription.length > 0 && updatedDueDate.length > 0

    return (
        <Modal
            open
            centered
            onClose={onCloseClicked}
            closeOnDimmerClick={false}
            closeIcon
        >
            <Modal.Header>
                Edit Task
            </Modal.Header>
            <Modal.Content>
                <Form>
                    <Grid>
                        <Grid.Row columns={3}>
                            <Grid.Column>
                                <Form.Field>
                                    <Input label='Task' labelPosition='left' type='text' onChange={(e, {value}) => setName(value)} value={updatedName} required fluid />
                                </Form.Field>
                                <Form.Field>
                                    <Input label='Due Date' labelPosition='left'  type='date' onChange={(e, {value}) => setDueDate(value)} value={updatedDueDate} required fluid />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <Label>Description</Label>
                                    <TextArea onChange={(e, {value}) => setDescription(value)} value={updatedDescription} required rows={4} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <Form.Select
                                        label='Doctor'
                                        labelPosition='left'
                                        fluid
                                        onChange={(e, {value}) => setDoctor(value)}
                                        value={updatedDoctor}
                                        options={doctors.map(({id, name}) => ({text: name, value: name, key: id}))}
                                    >
                                    </Form.Select>
                                </Form.Field>
                                <Form.Field>
                                    <Form.Select
                                        label='Priority'
                                        labelPosition='left'
                                        fluid
                                        onChange={(e, {value}) => setPriority(parseInt(value))}
                                        value={updatedPriority}
                                        options={[
                                            {text: 'High', value: 1, key: 1},
                                            {text: 'Medium', value: 2, key: 2},
                                            {text: 'Low', value: 3, key: 2},
                                        ]}
                                    >
                                    </Form.Select>
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Modal.Content>

            <Modal.Actions>
                <Button disabled={!canSave} primary onClick={() => {
                    updateTask({
                        ...task,
                        name: updatedName,
                        description: updatedDescription,
                        dueDate: updatedDueDate,
                        priority: updatedPriority,
                        doctor: updatedDoctor,
                        assignedDate: doctor === updatedDoctor ? assignedDate : new Date()
                    });
                    onCloseClicked();
                }} size='large'>
                    <Icon name='save outline'/>
                    Save
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default WithDoctors(EditTaskModal);
