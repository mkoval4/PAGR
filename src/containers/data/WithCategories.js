import React from "react";
import faker from "faker";

let loaded = false;
let categoryList = [];
let nextCategoryId = 0;

const localstorageKey = 'category-data';

const dataVersion = 2;

const generate = (category = {}) => {
    nextCategoryId += 1;
    return {
        id: nextCategoryId,
        ...category
    };
};

const seed = () => {
    categoryList.push(generate({name: 'Low'}));
    categoryList.push(generate({name: 'Medium'}));
    categoryList.push(generate({name: 'High'}));
};

const saveState = () => {
    localStorage.setItem(localstorageKey, JSON.stringify({
        dataVersion,
        nextCategoryId,
        categoryList
    }))
};

const loadCategoryData = () => {
    if (loaded) {
        return;
    }

    if (localStorage.getItem(localstorageKey)) {
        const {
            dataVersion: lsDataVersion,
            nextCategoryId: lsNextCategoryId,
            categoryList: lsCategoryList
        } = JSON.parse(localStorage.getItem(localstorageKey))

        if (dataVersion === lsDataVersion) {
            loaded = true;
            nextCategoryId = lsNextCategoryId;
            categoryList = lsCategoryList;
            return;
        }
    }

    seed();
    saveState();
    loaded = true;
};

const WithCategorys = (WrappedComponent) => {
    loadCategoryData();

    return props => (
        <WrappedComponent {...props} categories={categoryList} />
    )
}

export const random = () => {
    loadCategoryData();

    return faker.random.arrayElement(categoryList);
}

export default WithCategorys;
