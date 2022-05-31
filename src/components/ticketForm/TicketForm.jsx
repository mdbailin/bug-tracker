import { Grid } from '@mui/material';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as ticketService from "../../services/ticketService";
import { collection, doc, addDoc, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";




const initialFValues = {
    projectId: '',
    ticket: '',
    status: 'new',
    priority: '',

}

export let ticketIncrement = 0;

export default function TicketForm() {
    

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('ticket' in fieldValues)
            temp.ticket = fieldValues.ticket ? "" : "This field is required."
        if ('projectId' in fieldValues)
            temp.projectId = fieldValues.projectId.length != 0 ? "" : "This field is required."
        if ('status' in fieldValues)
            temp.status = fieldValues.status.length != 0 ? "" : "This field is required."
        if ('priority' in fieldValues)
            temp.priority = fieldValues.priority.length != 0 ? "" : alert("You must have a priority.")
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
                ticketIncrement += 1
                const projectRef = doc(db, "projects", values.projectId)
                await addDoc(collection(db, "tickets"), {
                    ...values,
                    timeStamp: serverTimestamp(),
                    userId: JSON.parse(localStorage.getItem("user"))["uid"],
                    completed: false
                  });
                await updateDoc(projectRef, {
                    userId: arrayUnion(JSON.parse(localStorage.getItem("user"))["email"])
                })
                console.log(ticketIncrement)
                

        }catch(err){
            console.log(err)
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.TextArea
                        name="ticket"
                        label="ticket"
                        value={values.ticket}
                        onChange={handleInputChange}
                        error={errors.ticket}
                    />
                    <Controls.Select
                        name="status"
                        label="status"
                        value={values.status}
                        onChange={handleInputChange}
                        options={ticketService.getStatusCollection()}
                        error={errors.status}
                    />

                </Grid>
                <Grid item xs={6}>
                    <Controls.Select
                        name="projectId"
                        label="projectId"
                        value={values.projectId}
                        onChange={handleInputChange}
                        options={ticketService.getProjectCollection()}
                        error={errors.projectId}
                    />
                    <Controls.Select
                        name="priority"
                        label="priority"
                        value={values.priority}
                        onChange={handleInputChange}
                        options={ticketService.getPriorityCollection()}
                    />

                    <div className="buttons">
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}