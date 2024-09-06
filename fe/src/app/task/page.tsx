"use client";

import { useAddTask } from "@/api/api";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import "./task.css";

export default function TasksPage() {
    const [newTask, setNewTask] = useState({
        name: "",
        category: "",
        estimateTime: "",
        description: "",
    });
    const router = useRouter();
    const addTaskMutation = useAddTask();

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setNewTask((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        addTaskMutation.mutate(newTask as any, {
            onSuccess: () => {
                router.push("/");
                router.refresh();
            },
        });
    };

    return (
        <div>
            <Header url="/" text="Zpět" />
            {addTaskMutation.isPending && <h1>Loading...</h1>}
            {addTaskMutation.isError && <h1>Error adding task.</h1>}

            <form className="main" onSubmit={handleSubmit}>
                <div className="taskContainer">
                    <h1>New Task</h1>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            required
                            name="name"
                            id="name"
                            type="text"
                            value={newTask.name}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="description">Description</label>
                        <textarea
                            required
                            name="description"
                            id="description"
                            cols={30}
                            rows={10}
                            value={newTask.description}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="category">Category</label>
                        <input
                            required
                            name="category"
                            id="category"
                            type="text"
                            value={newTask.category}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="estimateTime">Estimate time</label>
                        <input
                            required
                            name="estimateTime"
                            id="estimateTime"
                            type="text"
                            value={newTask.estimateTime}
                            onChange={handleInputChange}
                        />

                        <br />
                        <button type="submit">Add Task</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
