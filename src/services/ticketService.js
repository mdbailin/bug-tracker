import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";



// const getProjects = async() => {
//     const projects = []
//     const querySnapshot = await getDocs(collection(db, "projects"));
//     querySnapshot.forEach((doc) => {
    
//     projects.push(doc.data())
//         });
    
//   };

console.log("test")
let projectList = []
export const getStatusCollection = ()=>([
    { id: '0', title: 'New' },
    { id: '1', title: 'In Progress' }
])

export const getProjects = async () => {
    projectList = []
    const projects = []
    const querySnapshot = await getDocs(collection(db, "projects"));
    querySnapshot.forEach((doc) => {
    
    projects.push(doc.data())
        });
    for(let i = 0; i<projects.length; i++){
        projectList.push(
        {id: String(i), title: projects[i].projectName}
        )
    }
}

getProjects()
export const getProjectCollection = ()=>(projectList)


export const getPriorityCollection = ()=>([
    { id: '0', title: 'low' },
    { id: '1', title: 'medium' },
    { id: '2', title: 'high' },
    { id: '3', title: 'immediate'}
])



