import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export let projectList = []
export const getStatusCollection = ()=>([
    { id: '0', title: 'New' },
    { id: '1', title: 'In Progress' }
])

export const getProjects = async () => {
    const projects = []
    const querySnapshot = await getDocs(collection(db, "projects"));
    querySnapshot.forEach((doc) => {
    
    projects.push(doc.data())
        });
    let tempList = []
    for(let i = 0; i<projects.length; i++){
        tempList.push(
        {id: String(i), title: projects[i].projectName}
        )
    }
    projectList = tempList
   
}
getProjects()
export const getProjectCollection = ()=>(projectList)

export const getPriorityCollection = ()=>([
    { id: '0', title: 'low' },
    { id: '1', title: 'medium' },
    { id: '2', title: 'high' },
    { id: '3', title: 'immediate'}
])



