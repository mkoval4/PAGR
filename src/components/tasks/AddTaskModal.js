import React, {useState} from 'react';

import {Grid, Input, Modal, Form, Label, TextArea, Button, Icon} from "semantic-ui-react";
import WithDoctors from "../../containers/data/WithDoctors";

const AddTaskModal = ({onCloseClicked, addTask, doctors}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState(1);
    const [doctor, setDoctor] = useState(doctors[0].name);
    const canSave = name.length > 0 && description.length > 0 && dueDate.length > 0
    return (
        <Modal
            open
            centered
            onClose={onCloseClicked}
            closeOnDimmerClick={false}
            closeIcon
        >
            <Modal.Header>
                Add New Task
            </Modal.Header>
            <Modal.Content>
                <Form>
                    <Grid>
                        <Grid.Row columns={3}>
                            <Grid.Column>
                                <Form.Field>
                                    <Input label='Task' labelPosition='left' type='text' onChange={(e, {value}) => setName(value)} value={name} required fluid />
                                </Form.Field>
                                <Form.Field>
                                    <Input label='Due Date' labelPosition='left' type='date' onChange={(e, {value}) => setDueDate(value)} value={dueDate} required fluid />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <Label>Description</Label>
                                    <TextArea onChange={(e, {value}) => setDescription(value)} value={description} required rows={4} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <Form.Select
                                        label='Request for Assistance'
                                        labelPosition='left'
                                        fluid
                                        onChange={(e, {value}) => setDoctor(value)}
                                        value={doctor}
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
                                        value={priority}
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
                    addTask({name, description, dueDate, priority, doctor, assignedDate: new Date()});
                    onCloseClicked();
                }} size='large'>
                    <Icon name='save outline'/>
                    Save
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default WithDoctors(AddTaskModal);
