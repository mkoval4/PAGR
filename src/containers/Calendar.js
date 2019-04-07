import React, {useState} from "react";
import {Container, Header} from "semantic-ui-react";
import FullCalendar from 'fullcalendar-reactwrapper';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css'
import WithTasks from "./data/WithTasks";
import moment from "moment";
import EditTaskModal from "../components/tasks/EditTaskModal";
import '../styles/calendar.scss'
import ViewTaskModal from "../components/tasks/ViewTaskModal";

const Calendar = ({allTasks: tasks, updateTask}) => {
    const events = tasks.map(({id, name, dueDate, priority}) => ({
        id,
        title: name,
        start: moment(dueDate).format('YYYY-MM-DD'),
        allDay: true,
        backgroundColor: priority === 1 ? '#db2828' : (priority === 2 ? '#fbbd08' : '#767676'),
        borderColor: priority === 1 ? '#db2828' : (priority === 2 ? '#fbbd08' : '#767676'),
        priority
    }));

    const [openViewTaskId, setOpenViewTaskId] = useState(false);
    const openViewTask = openViewTaskId ? tasks.find(t => t.id === openViewTaskId) : false;

    const [openEditTaskId, setOpenEditTaskId] = useState(false);
    const openEditTask = openEditTaskId ? tasks.find(t => t.id === openEditTaskId) : false;

    return (
        <Container>
            <Container text>
                <Header as='h1'>Calendar</Header>
            </Container>
            <Container>
                {openViewTask && (
                    <ViewTaskModal
                        task={openViewTask}
                        onCloseClicked={() => setOpenViewTaskId(false)}
                        onEditClicked={() => {
                            setOpenViewTaskId(false);
                            setOpenEditTaskId(openViewTaskId);
                        }}
                    />
                )}
                {openEditTask && (
                    <EditTaskModal
                        task={openEditTask}
                        updateTask={updateTask}
                        onCloseClicked={() => setOpenEditTaskId(false)}
                    />
                )}
                <FullCalendar
                    id = "your-custom-ID"
                    header = {{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,basicWeek,basicDay'
                    }}
                    defaultView='basicWeek'
                    navLinks={true} // can click day/week names to navigate views
                    editable={false}
                    eventLimit={false} // allow "more" link when too many events
                    eventClick={({id}) => {setOpenViewTaskId(id)}}
                    events = {events}
                    eventOrder="priority,title"
                />
            </Container>
        </Container>
    );
};

export default WithTasks(Calendar);
