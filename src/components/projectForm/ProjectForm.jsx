import { Grid } from '@mui/material';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as projectService from "../../services/projectService";
import { collection, doc, addDoc, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";




const initialFValues = {
    projectDescription: '',
    projectName: '',
    userId: []

}

export default function ProjectForm() {
    

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('projectDescription' in fieldValues)
            temp.projectDescription = fieldValues.projectDescription ? "" : "This field is required."
        if ('projectName' in fieldValues)
            temp.projectName = fieldValues.projectName ? "" : "This field is required."
        if ('userId' in fieldValues)
            temp.userId = fieldValues.status.userId != 0 ? "" : "You must have at least one member in the project."
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
            
                await addDoc(collection(db, "projects"), {
                    ...values,
                    timeStamp: serverTimestamp()
                  });
                resetForm()
                

        }catch(err){
            console.log(err)
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.TextArea
                        name="projectDescription"
                        label="Project Description"
                        value={values.projectDescription}
                        onChange={handleInputChange}
                        error={errors.projectDescription}
                    />
                    <Controls.Select
                        name="projectName"
                        label="Project Name"
                        value={values.projectName}
                        onChange={handleInputChange}
                        error={errors.status}
                    />

                </Grid>
                <Grid item xs={6}>
                    <Controls.Select
                        name="userId"
                        label="userId"
                        value={values.userId}
                        onChange={handleInputChange}
                        options={projectService.getUserCollection()}
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