const getDefaultState = () => ({
    tasks: []
})

const tasks = (state = getDefaultState(), action) => {
    return {...state};
}

export default tasks;
