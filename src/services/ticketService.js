const KEYS ={
    tickets:'tickets',
    ticketId:'ticketId'
}

export const getStatusCollection = ()=>([
    { id: '1', title: 'New' },
    { id: '2', title: 'In Progress' },
    { id: '3', title: 'Resolved' },
])

export const getProjectCollection = ()=>([
    { id: '1', title: 'Frontend' },
    { id: '2', title: 'Backend' },
    { id: '3', title: 'Authentication' },
    { id: '4', title: 'Containerization/Deployment'}
])

export const getPriorityCollection = ()=>([
    { id: '1', title: 'low' },
    { id: '2', title: 'medium' },
    { id: '3', title: 'high' },
    { id: '4', title: 'immediate'}
])

