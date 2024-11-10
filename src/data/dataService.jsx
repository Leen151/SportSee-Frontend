const useApi = true;

import * as callApi from "./callApi";
import * as callDatasMock from "./callDatasMock";

const dataService = useApi ? callApi : callDatasMock;

export const getUsers = dataService.getUsers;
export const getUserById = dataService.getUserById;
export const getActivityByUserId = dataService.getActivityByUserId;
export const getSessionsByUserId = dataService.getSessionsByUserId;
export const getPerformanceByUserId = dataService.getPerformanceByUserId;