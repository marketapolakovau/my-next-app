import { getTasks, Tasks } from "@/api/api";
import Header from "@/components/Header";

import styles from "./page.module.css";

export default async function Home() {
    const tasks = await getTasks();

    return (
        <div>
            <Header url="/task" text="Add new task" />

            <div className={styles.main}>
                <div className={styles.taskList}>
                    <h1>My Tasks</h1>
                    <ul>
                        {tasks.map((task: Tasks) => (
                            <li key={task.id} className={styles.taskItem}>
                                <div>
                                    <h2>{task.name}</h2>
                                    <p className={styles.taskDetail}>
                                        <strong>Description:</strong>{" "}
                                        {task.description}
                                    </p>
                                    <p className={styles.taskDetail}>
                                        <strong>Category:</strong>{" "}
                                        {task.category}
                                    </p>
                                    <p className={styles.taskDetail}>
                                        <strong>Estimate Time:</strong>{" "}
                                        {task.estimateTime} hours
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
