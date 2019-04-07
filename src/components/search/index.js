import React, {useState} from "react";
import {Button, Dropdown, Form, Header, Icon, Input, Modal, Table} from "semantic-ui-react";
import DatesRangeInput from "semantic-ui-calendar-react/dist/es6/inputs/DatesRangeInput";
import WithTasks from "../../containers/data/WithTasks";
import WithDoctors from "../../containers/data/WithDoctors";
import WithPatients from "../../containers/data/WithPatients";
import WithHospitals from "../../containers/data/WithHospitals";
import WithCategorys from "../../containers/data/WithCategories";
import moment from "moment";

const Search = ({categories, hospitals, patients, doctors, allTasks: tasks, search, onSearchUpdated, onClose}) => {
    const [dateRange, setDateRange] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedHospitals, setSelectedHospitals] = useState([]);

    const categoryOptions = categories.map(({id, name}) =>({key: id, value: name, text: name}));
    const hospitalOptions = hospitals.map(({id, name}) =>({key: id, value: name, text: name}));

    const matchedPatients = patients
        .filter(({name, hospital}) => {
            if (selectedHospitals.length > 0 && !selectedHospitals.includes(hospital)) {
                return false;
            }

            if (search.length > 0 && !name.toLowerCase().includes(search.toLowerCase().trim())) {
                return false;
            }

            return true;
        }).slice(0, 5);

    const matchedDoctors = doctors
        .filter(({name, hospital}) => {
            if (selectedHospitals.length > 0 && !selectedHospitals.includes(hospital)) {
                return false;
            }

            if (search.length > 0 && !name.toLowerCase().includes(search.toLowerCase().trim())) {
                return false;
            }

            return true;
        }).slice(0, 5);

    const dateRangeSplit = dateRange.split(' - ', 2);
    const dateFrom = dateRangeSplit.length === 2 && dateRangeSplit[0].length > 0
        ? moment(dateRangeSplit[0], 'DD-MM-YYYY')
        : false;
    const dateTo = dateRangeSplit.length === 2 && dateRangeSplit[1].length > 0
        ? moment(dateRangeSplit[1], 'DD-MM-YYYY')
        : false;

    const matchedTasks = tasks
        .filter(({name, hospital, category, dueDate}) => {
            if (selectedHospitals.length > 0 && !selectedHospitals.includes(hospital)) {
                return false;
            }

            if (selectedCategories.length > 0 && !selectedCategories.includes(category)) {
                return false;
            }

            if (search.length > 0 && !name.toLowerCase().includes(search.toLowerCase().trim())) {
                return false;
            }

            if (dateFrom !== false && dueDate < dateFrom) {
                return false;
            }

            if (dateTo !== false && dueDate > dateTo) {
                return false;
            }

            return true;
        }).slice(0, 5);

    return (
        <Modal
            open
            centered
            size='large'
            onClose={onClose}
            closeOnDimmerClick={false}
            closeIcon
        >
            <Modal.Header>
                <Input
                    type='text'
                    fluid
                    value={search}
                    onChange={(e, {value}) => onSearchUpdated(value)}
                    icon={<Icon name='search' circular link />}
                />
            </Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Group inline>
                        <Form.Field>
                            <Dropdown
                                placeholder='All Categories'
                                selection
                                multiple
                                search
                                options={categoryOptions}
                                value={selectedCategories}
                                onChange={(e, {value}) => setSelectedCategories(value)}
                            />
                        </Form.Field>

                        <Form.Field>
                            <Dropdown
                                placeholder='Search Hospitals'
                                selection
                                multiple
                                search
                                options={hospitalOptions}
                                value={selectedHospitals}
                                onChange={(e, {value}) => setSelectedHospitals(value)}
                            />
                        </Form.Field>

                        <Form.Field>
                            <DatesRangeInput
                                name="dateRange"
                                placeholder="Date Range"
                                value={dateRange}
                                iconPosition="left"
                                popupPosition="bottom center"
                                clearable
                                onChange={(e, {value}) => setDateRange(value)}
                            />
                        </Form.Field>

                        <Button onClick={() => {
                            setSelectedHospitals([]);
                            setSelectedCategories([]);
                            setDateRange('');
                        }}>
                            <Icon name='remove circle'/>
                            Clear
                        </Button>
                    </Form.Group>
                </Form>
            </Modal.Content>
            <Modal.Content scrolling>
                {(matchedDoctors.length === 0 && matchedPatients.length === 0) && (
                    <>
                        <Header>No Results Found - Try widening your search above?</Header>
                    </>
                )}

                {matchedPatients.length > 0 && (
                    <>
                        <Header>Patients</Header>
                        <Table basic='very'>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Patient ID</Table.HeaderCell>
                                    <Table.HeaderCell>Email</Table.HeaderCell>
                                    <Table.HeaderCell>Hospital</Table.HeaderCell>
                                    <Table.HeaderCell>Location</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {matchedPatients.map(({id, patientId, name, email, hospital, location}) => (
                                    <Table.Row key={id}>
                                        <Table.Cell>{name}</Table.Cell>
                                        <Table.Cell>{patientId}</Table.Cell>
                                        <Table.Cell>{email}</Table.Cell>
                                        <Table.Cell>{hospital}</Table.Cell>
                                        <Table.Cell>{location}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </>
                )}

                {matchedDoctors.length > 0 && (
                    <>
                        <Header>Doctors</Header>
                        <Table basic='very'>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Email</Table.HeaderCell>
                                    <Table.HeaderCell>Hospital</Table.HeaderCell>
                                    <Table.HeaderCell>Office</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {matchedDoctors.map(({id, name, email, hospital, office}) => (
                                    <Table.Row key={id}>
                                        <Table.Cell>{name}</Table.Cell>
                                        <Table.Cell>{email}</Table.Cell>
                                        <Table.Cell>{hospital}</Table.Cell>
                                        <Table.Cell>{office}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </>
                )}

                {matchedTasks.length > 0 && (
                    <>
                        <Header>Tasks</Header>
                        <Table basic='very'>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Completed</Table.HeaderCell>
                                    <Table.HeaderCell>Category</Table.HeaderCell>
                                    <Table.HeaderCell>Task</Table.HeaderCell>
                                    <Table.HeaderCell>Doctor</Table.HeaderCell>
                                    <Table.HeaderCell>Due Date</Table.HeaderCell>
                                    <Table.HeaderCell>Hospital</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {matchedTasks.map(({id, category, name, completed, hospital, doctor, dueDate}) => (
                                    <Table.Row key={id}>
                                        <Table.Cell>{completed ? 'Yes' : 'No'}</Table.Cell>
                                        <Table.Cell>{category}</Table.Cell>
                                        <Table.Cell>{name}</Table.Cell>
                                        <Table.Cell>{doctor}</Table.Cell>
                                        <Table.Cell>{moment(dueDate).format('LLL')}</Table.Cell>
                                        <Table.Cell>{hospital}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </>
                )}
            </Modal.Content>
        </Modal>
    );
};

export default WithCategorys(WithHospitals(WithPatients(WithDoctors(WithTasks(Search)))));
