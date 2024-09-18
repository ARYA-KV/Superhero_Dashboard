import commonAPI from "./commonAPI";
import SERVERURL from "./serverurl";

// Get admin details
export const getAdminDetailsAPI = async () => {
    return await commonAPI("GET", `${SERVERURL}/admin`);
};

// Get grievance details
export const getGrievancesAPI = async () => {
    return await commonAPI("GET", `${SERVERURL}/grievances`);
};

 //Delete a grievance
 export const deleteGrievanceAPI = async (id) => {
     return await commonAPI("DELETE", `${SERVERURL}/grievance/${id}`);
 };