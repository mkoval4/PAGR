import React from "react";
import faker from "faker";
import {random as randomHospital} from "./WithHospitals";

let loaded = false;
let patientList = [];
let nextPatientId = 0;

const localstorageKey = 'patient-data';

const dataVersion = 2;

const generate = (patient = {}) => {
    nextPatientId += 1;
    return {
        id: nextPatientId,
        patientId: faker.random.number(),
        name: faker.name.firstName() + ' ' + faker.name.lastName(),
        email: faker.internet.email(),
        hospital: randomHospital().name,
        location: 'Room ' + faker.random.arrayElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])+ faker.random.arrayElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) + faker.random.arrayElement(['A', 'B', 'C', 'D']),
        ...patient
    };
};

const seed = () => {
    for (let i = 0; i < 30; i++) {
        patientList.push(generate());
    }
};

const saveState = () => {
    localStorage.setItem(localstorageKey, JSON.stringify({
        dataVersion,
        nextPatientId,
        patientList
    }))
};

const loadPatientData = () => {
    if (loaded) {
        return;
    }

    if (localStorage.getItem(localstorageKey)) {
        const {
            dataVersion: lsDataVersion,
            nextPatientId: lsNextPatientId,
            patientList: lsPatientList
        } = JSON.parse(localStorage.getItem(localstorageKey))

        if (dataVersion === lsDataVersion) {
            loaded = true;
            nextPatientId = lsNextPatientId;
            patientList = lsPatientList;
            return;
        }
    }

    seed();
    saveState();
    loaded = true;
};

const WithPatients = (WrappedComponent) => {
    loadPatientData();

    return props => (
        <WrappedComponent {...props} patients={patientList} />
    )
}

export const random = () => {
    loadPatientData();

    return faker.random.arrayElement(patientList);
}

export default WithPatients;
