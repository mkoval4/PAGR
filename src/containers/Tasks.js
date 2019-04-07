import React, {useState} from "react";
import {Button, Checkbox, Container, Dropdown, Icon, Menu} from "semantic-ui-react";
import AddTaskModal from "../components/tasks/AddTaskModal";
import WithTasks from "./data/WithTasks";
import TaskTable from "../components/tasks/TaskTable";

const tasks = ({addTask, updateTask, todaysTasks, weeksTasks, monthsTasks, completedTasks, sortFieldA, setSortFieldA, sortFieldB, setSortFieldB, includeCompleted, setIncludeCompleted}) => {
    const [addModalOpen, setAddModalOpen] = useState(false);

    const sortOptions = [
        {
            a: ['dueDate', true],
            b: ['priority', true],
            label: 'Priority (Descending)'
        },
        {
            a: ['dueDate', true],
            b: ['priority', false],
            label: 'Priority (Ascending)'
        },
        {
            a: ['dueDate', true],
            b: ['dueDate', true],
            label: 'Due date'
        },
        {
            a: ['dueDate', true],
            b: ['assignedDate', false],
            label: 'Assigned date (Newest)'
        },
        {
            a: ['dueDate', true],
            b: ['assignedDate', true],
            label: 'Assigned date (Oldest)'
        }
    ];

    const [sortValue, setSortValue] = useState(0);

    return (
        <Container>
            <Menu secondary style={{zIndex: 10}}>
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Checkbox
                            checked={includeCompleted}
                            onChange={(e, {checked}) => {setIncludeCompleted(!!checked)}}
                            label="Include Completed"
                        />
                    </Menu.Item>
                    <Menu.Item>
                        <Dropdown
                            options={sortOptions.map(({label}, idx) => ({key: idx, text: label, value: idx}))}
                            onChange={(e, {value}) => {
                                setSortValue(value);
                                const {a, b} = sortOptions[value];
                                setSortFieldA(a);
                                setSortFieldB(b);
                            }}
                            value={sortValue}
                        >

                        </Dropdown>
                    </Menu.Item>
                    <Menu.Item>
                        <Button primary onClick={() => setAddModalOpen(true)}><Icon name='plus circle'/> Add New Task</Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            {addModalOpen && <AddTaskModal addTask={addTask} onCloseClicked={() => setAddModalOpen(false)} />}
            <TaskTable defaultOpen={true} title={`Todays Tasks`} tasks={todaysTasks} updateTask={updateTask} />
            <TaskTable defaultOpen={false} title={`This Weeks Tasks`} tasks={weeksTasks} updateTask={updateTask} />
            <TaskTable defaultOpen={false} title={`This Months Tasks`} tasks={monthsTasks} updateTask={updateTask} />
            <TaskTable defaultOpen={false} title={`Completed Tasks`} tasks={completedTasks} updateTask={updateTask} />
        </Container>
    );
};

export default WithTasks(tasks, {applyCustomSort: true});
