import React from "react";
import faker from "faker";

let loaded = false;
let hospitalList = [];
let nextHospitalId = 0;

const localstorageKey = 'hospital-data';

const dataVersion = 2;

const generate = (hospital = {}) => {
    nextHospitalId += 1;
    return {
        id: nextHospitalId,
        ...hospital
    };
};

const seed = () => {
    hospitalList.push(generate({name: 'Central Hospital'}));
    hospitalList.push(generate({name: 'A Betty Hospital'}));
    hospitalList.push(generate({name: 'DW White Hospital'}));
};

const saveState = () => {
    localStorage.setItem(localstorageKey, JSON.stringify({
        dataVersion,
        nextHospitalId,
        hospitalList
    }))
};

const loadHospitalData = () => {
    if (loaded) {
        return;
    }

    if (localStorage.getItem(localstorageKey)) {
        const {
            dataVersion: lsDataVersion,
            nextHospitalId: lsNextHospitalId,
            hospitalList: lsHospitalList
        } = JSON.parse(localStorage.getItem(localstorageKey))

        if (dataVersion === lsDataVersion) {
            loaded = true;
            nextHospitalId = lsNextHospitalId;
            hospitalList = lsHospitalList;
            return;
        }
    }

    seed();
    saveState();
    loaded = true;
};

const WithHospitals = (WrappedComponent) => {
    loadHospitalData();

    return props => (
        <WrappedComponent {...props} hospitals={hospitalList} />
    )
}

export const random = () => {
    loadHospitalData();

    return faker.random.arrayElement(hospitalList);
}

export default WithHospitals;
