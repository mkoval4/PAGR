import React, {useState} from "react";
import moment from "moment";
import faker from "faker";

import {random as randomDoctor} from "./WithDoctors";
import {random as randomCategory} from "./WithCategories";
import {random as randomHospital} from "./WithHospitals";

let loaded = false;
let taskList = [];
let nextTaskId = 0;

const localstorageKey = 'task-data';

const dataVersion = 1;

const datesFrom = new Date();
datesFrom.setDate(datesFrom.getDate() - 7);

const datesTo = new Date();
datesTo.setDate(datesTo.getDate() + 30);

const generate = (task = {}) => {
    nextTaskId += 1;
    return {
        id: nextTaskId,
        name: faker.random.arrayElement([
            'Tonsillectomy',
            'Prostatectomy',
            'Mastectomy',
            'Inguinal hernia repairs',
            'Free skin graft',
            'Debridement of wound',
            'Coronary artery bypass',
            'Breast biopsy',
            'Coronary angioplasty and stenting',
            'Balloon valve surgery',
            'Valve replacement',
            'Pacemaker Fitting',
            'Partial colectomy',
            'Small-bowel resection',
            'Gall bladder removal',
            'Operation for peptic ulcer disease',
            'Removal of abdominal adhesions',
            'Appendectomy',
            'Laparotomy',
        ]),
        category: randomCategory().name,
        hospital: randomHospital().name,
        description: faker.random.words(),
        dueDate: faker.date.between(datesFrom, datesTo),
        assignedDate: faker.date.past(),
        priority: faker.random.arrayElement([1, 1, 2, 2, 2, 3, 3]),
        completed: false,
        doctor: randomDoctor().name,
        ...task
    };
};

const seed = () => {
    for (let i = 0; i < 50; i++) {
        taskList.push(generate());
    }
};

const saveState = () => {
    localStorage.setItem(localstorageKey, JSON.stringify({
        dataVersion,
        nextTaskId,
        taskList
    }))
};

const loadTaskData = () => {
    if (loaded) {
        return;
    }

    if (localStorage.getItem(localstorageKey)) {
        const {
            dataVersion: lsDataVersion,
            nextTaskId: lsNextTaskId,
            taskList: lsTaskList
        } = JSON.parse(localStorage.getItem(localstorageKey))

        if (dataVersion === lsDataVersion) {
            loaded = true;
            nextTaskId = lsNextTaskId;
            taskList = lsTaskList;
            return;
        }
    }

    seed();
    saveState();
    loaded = true;
};

const WithTasks = (WrappedComponent, opts = {applyCustomSort: false}) => {
    loadTaskData();

    return (props) => {
        const [tasks, setTasks] = useState(taskList)
        const [sortFieldA, setSortFieldA] = useState(['dueDate', true])
        const [sortFieldB, setSortFieldB] = useState(['priority', true])
        const [includeCompleted, setIncludeCompleted] = useState(true)

        let allTasks = tasks
            .map((task) => ({
                ...task,
                dueDate: moment(task.dueDate),
                assignedDate: moment(task.assignedDate)
            }));

        if (!opts.applyCustomSort) {
            allTasks = allTasks
                .sort(function (taskA, taskB) {
                    if (taskA['dueDate'] < taskB['dueDate']) return (-1);
                    if (taskA['dueDate'] > taskB['dueDate']) return (1);
                    return 0;
                })
                .sort(function (taskA, taskB) {
                    if (taskA['priority'] < taskB['priority']) return (-1);
                    if (taskA['priority'] > taskB['priority']) return (1);
                    return 0;
                });
        } else {
            allTasks = allTasks
                .sort(function (taskA, taskB) {
                    if (taskA[sortFieldA[0]] < taskB[sortFieldA[0]]) return (sortFieldA[1] ? -1 : 1);
                    if (taskA[sortFieldA[0]] > taskB[sortFieldA[0]]) return (sortFieldA[1] ? 1 : -1);
                    return 0;
                })
                .sort(function (taskA, taskB) {
                    if (taskA[sortFieldB[0]] < taskB[sortFieldB[0]]) return (sortFieldB[1] ? -1 : 1);
                    if (taskA[sortFieldB[0]] > taskB[sortFieldB[0]]) return (sortFieldB[1] ? 1 : -1);
                    return 0;
                });
        }

        const startOfToday = moment().startOf('day');
        const endOfToday = moment().endOf('day');
        const endOfWeek = moment().endOf('week');
        const startOfWeek = moment().startOf('week');
        const endOfmonth = moment().endOf('month');
        const startOfmonth = moment().startOf('month');

        const filterCompleted = t => includeCompleted || !t.completed;

        const completedTasks = allTasks.filter(t => t.completed);
        const todaysTasks = allTasks.filter(filterCompleted).filter(t => t.dueDate >= startOfToday && t.dueDate <= endOfToday);
        const weeksTasks = allTasks.filter(filterCompleted).filter(t => t.dueDate <= endOfWeek && t.dueDate >= startOfWeek);
        const monthsTasks = allTasks.filter(filterCompleted).filter(t => t.dueDate <= endOfmonth && t.dueDate >= startOfmonth);

        return (
            <WrappedComponent
                addTask={(task) => {
                    taskList.push(generate(task));
                    saveState();
                    setTasks([...taskList]);
                }}
                updateTask={(task) => {
                    const foundIndex = taskList.findIndex(({id}) => id === task.id)
                    if (foundIndex) {
                        taskList[foundIndex] = {
                            ...taskList[foundIndex],
                            ...task
                        };

                        saveState();
                        setTasks([...taskList]);
                    }
                }}
                allTasks={allTasks}
                todaysTasks={todaysTasks}
                weeksTasks={weeksTasks}
                monthsTasks={monthsTasks}
                completedTasks={completedTasks}
                sortFieldA={sortFieldA}
                setSortFieldA={setSortFieldA}
                sortFieldB={sortFieldB}
                setSortFieldB={setSortFieldB}
                includeCompleted={includeCompleted}
                setIncludeCompleted={setIncludeCompleted}
                {...props}
            />
            );
    }
}

export default WithTasks;
