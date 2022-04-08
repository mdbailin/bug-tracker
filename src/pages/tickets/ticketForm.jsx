import { Grid } from '@mui/material';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as ticketService from "../../services/ticketService";



const initialFValues = {
    id: 0,
    projectId: '',
    project: '',
    ticket: '',
    status: 'new',
    date: new Date(),
    priority: '',

}

export default function EmployeeForm() {

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('project' in fieldValues)
            temp.project = fieldValues.project ? "" : "This field is required."
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

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
            console.log(e)
            resetForm()
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="project"
                        label="project"
                        value={values.project}
                        onChange={handleInputChange}
                        error={errors.project}
                    />
                    <Controls.Input
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
                    <Controls.DatePicker
                        name="date"
                        label="date"
                        value={values.date}
                        onChange={handleInputChange}
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