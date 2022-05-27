import { db } from "../firebase";
import { collection, query, getDocs, onSnapshot} from "firebase/firestore";


const userList = []

async function getUsers() {
    const users = []
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
    
    users.push(doc.data())
        });
    for(let i = 0; i<users.length; i++){
        userList.push(
        {id: String(i), title: users[i].displayName}
        )
    }
}

getUsers()


export const getUserCollection = ()=>(userList)
