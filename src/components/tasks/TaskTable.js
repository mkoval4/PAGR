import React, {useState} from "react";
import {Button, Divider, Header, Icon, Table} from "semantic-ui-react";
import './TaskTable.scss';
import {CALENDAR_FORMAT} from "../../constants";
import EditTaskModal from "./EditTaskModal";
import moment from "moment";
import ViewTaskModal from "./ViewTaskModal";

const TaskTableRow = ({task: initialTask, updateTask}) => {
    const [task, setTask] = useState(initialTask);
    const {name, doctor, dueDate, priority, completed, assignedDate} = task;
    const [editOpen, setEditOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);

    const onUpdateTaskClicked = (updatedTask) => {
        updateTask(updatedTask);
        setTask(updatedTask);
    };

    console.log(task);

    return (
        <Table.Row>
            <Table.Cell>
                <Icon style={{cursor: 'pointer'}} name={completed ? 'check square outline' : 'square outline'} size='large' onClick={() => onUpdateTaskClicked({...task, completed: !completed})} />
            </Table.Cell>
            <Table.Cell><Icon name='square full' color={parseInt(priority) === 1 ? 'red' : (priority === 2 ? 'yellow' : 'grey')} /></Table.Cell>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{doctor}</Table.Cell>
            <Table.Cell>{moment(dueDate).format(CALENDAR_FORMAT)}</Table.Cell>
            <Table.Cell>assigned {moment(assignedDate).fromNow()}</Table.Cell>
            <Table.Cell>
                <Button secondary onClick={() => setViewOpen(true)}><Icon name='magnify' /> View</Button>
                <Button secondary onClick={() => setEditOpen(true)}><Icon name='edit' /> Edit</Button>
            </Table.Cell>
            {editOpen && <EditTaskModal onCloseClicked={() => setEditOpen(false)} task={task} updateTask={onUpdateTaskClicked} />}
            {viewOpen && <ViewTaskModal onCloseClicked={() => setViewOpen(false)} onEditClicked={() => {
                setViewOpen(false);
                setEditOpen(true);
            }} task={task} />}
        </Table.Row>
    );
}

export default ({tasks, title, defaultOpen, updateTask}) => {
    const [open, setOpen] = useState(defaultOpen)

    return (
        <div>
            <Header as='h2'>
                <Icon name='angle down' rotated={open ? undefined : "counterclockwise"} onClick={() => setOpen(!open)} /> {`${title} (${tasks.length} tasks)`}
            </Header>
            {open && (
                <Table basic='very'>
                    <Table.Body>
                        {tasks.map(t => (
                            <TaskTableRow key={t.id} task={t} updateTask={updateTask} />
                        ))}
                    </Table.Body>
                </Table>
            )}
            <Divider />
        </div>
    );
}
