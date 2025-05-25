export const getTasks = async () => {
    try {
        const response = await fetch(`/api/tasks`);

        const data = await response.json();

        return data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getTask = async (id) => {
    try {
       
        const response = await fetch(`/api/tasks/${id}`);

        const data = await response.json();

        return data.data;
    } catch (error) {
        console.error(error);
    }
}

export const createTask = async (entry) => {
    try {
        const response = await fetch(`/api/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entry)
        });

        const data =  await response.json();
        return data;

    } catch (error) {
        console.error(error);
    }
}

export const updateTask = async (id, entry) => {
    try {
        delete entry._id;
        
        const response = await fetch(`/api/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entry)
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteTask = async (id) => {
    try {
        const response = await fetch(`/api/tasks/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        return data.data;
    } catch (error) {
        console.error(error);
    }
}