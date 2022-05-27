import { db } from "../firebase";
import { collection, query, getDocs, onSnapshot} from "firebase/firestore";


// const getProjects = async() => {
//     const projects = []
//     const querySnapshot = await getDocs(collection(db, "projects"));
//     querySnapshot.forEach((doc) => {
    
//     projects.push(doc.data())
//         });
    
//   };

const projectList = []
export const getStatusCollection = ()=>([
    { id: '0', title: 'New' },
    { id: '1', title: 'In Progress' }
])

async function getProjects() {
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



