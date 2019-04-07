import React from "react";
import {Route} from "react-router";
import Tasks from "../containers/Tasks";
import NotFound from "../containers/NotFound";
import Calendar from "../containers/Calendar";
import DepartmentTasks from "../containers/DepartmentTasks";
import Login from "../containers/Login";
import Register from "../containers/Register";

export default [
    <Route key={1} path={'/'} component={Login} exact />,
    <Route key={2} path={'/login'} component={Login} exact />,
    <Route key={3} path={'/register'} component={Register} exact />,
    <Route key={4} path={'/tasks/'} component={Tasks} exact />,
    <Route key={5} path={'/tasks/:id'} component={Tasks} exact />,
    <Route key={6} path={'/calendar'} component={Calendar} exact />,
    <Route key={7} path={'/department'} component={DepartmentTasks} exact />,
    <Route key={8} path={'*'} component={NotFound} />,
]
