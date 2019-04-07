import React from "react";
import faker from "faker";
import {random as randomHospital} from "./WithHospitals";

let loaded = false;
let doctorList = [];
let nextDoctorId = 0;

const localstorageKey = 'doctor-data';

const dataVersion = 2;

const generate = (doctor = {}) => {
    nextDoctorId += 1;
    return {
        id: nextDoctorId,
        name: faker.name.firstName() + ' ' + faker.name.lastName(),
        email: faker.internet.email(),
        hospital: randomHospital().name,
        office: 'Office ' + faker.random.arrayElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])+ faker.random.arrayElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) + faker.random.arrayElement(['A', 'B', 'C', 'D']),
        ...doctor
    };
};

const seed = () => {
    for (let i = 0; i < 5; i++) {
        doctorList.push(generate());
    }
};

const saveState = () => {
    localStorage.setItem(localstorageKey, JSON.stringify({
        dataVersion,
        nextDoctorId,
        doctorList
    }))
};

const loadDoctorData = () => {
    if (loaded) {
        return;
    }

    if (localStorage.getItem(localstorageKey)) {
        const {
            dataVersion: lsDataVersion,
            nextDoctorId: lsNextDoctorId,
            doctorList: lsDoctorList
        } = JSON.parse(localStorage.getItem(localstorageKey))

        if (dataVersion === lsDataVersion) {
            loaded = true;
            nextDoctorId = lsNextDoctorId;
            doctorList = lsDoctorList;
            return;
        }
    }

    seed();
    saveState();
    loaded = true;
};

const WithDoctors = (WrappedComponent) => {
    loadDoctorData();

    return props => (
        <WrappedComponent {...props} doctors={doctorList} />
    )
}

export const random = () => {
    loadDoctorData();

    return faker.random.arrayElement(doctorList);
}

export default WithDoctors;
