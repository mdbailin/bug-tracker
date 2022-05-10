const KEYS ={
    tickets:'tickets',
    ticketId:'ticketId'
}

export const getStatusCollection = ()=>([
    { id: '0', title: 'New' },
    { id: '1', title: 'In Progress' },
    { id: '2', title: 'Resolved' },
])

export const getProjectCollection = ()=>([
    { id: '0', title: 'Frontend' },
    { id: '1', title: 'Backend' },
    { id: '2', title: 'Authentication' },
    { id: '3', title: 'Containerization/Deployment'}
])

export const getPriorityCollection = ()=>([
    { id: '0', title: 'low' },
    { id: '1', title: 'medium' },
    { id: '2', title: 'high' },
    { id: '3', title: 'immediate'}
])

