import { useMutation } from "@tanstack/react-query";
export type Tasks = {
    id?: number;
    name: string;
    category: string;
    estimateTime: number;
    description: string;
};

// const fetchTasks = async (): Promise<Tasks[]> => {
//     const response = await fetch("http://localhost:4000/api/tasks");
//     if (!response.ok) {
//         throw new Error("Failed to fetch tasks");
//     }
//     return response.json();
// };

// export const getTasks = () => {
//     return useQuery<Tasks[], Error>({
//         queryKey: ["tasks"],
//         queryFn: fetchTasks,
//     });
// };

export async function getTasks() {
    const response = await fetch("http://localhost:4000/api/tasks", {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }

    const tasks = await response.json();
    return tasks;
}

const addTask = async (newTask: Tasks) => {
    const response = await fetch("http://localhost:4000/api/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
    });

    if (!response.ok) {
        throw new Error("Failed to create task");
    }

    return response.json();
};

export const useAddTask = () => {
    return useMutation({
        mutationFn: addTask,

        onError: (error: Error) => {
            console.error("Error creating task:", error);
        },
    });
};
