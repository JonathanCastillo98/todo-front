import './taskMini.css'

type Task = {
    title: string,
    description: string
    status: string,
    id: string,
    createdAt: string,
    updatedAt: string
}
type Props = {
    task: any
}

const TaskMini = ({ task }: Props) => {
    const startDrag = (e: any, item: Task) => {
        e.dataTransfer.setData('itemID', item.id);
        console.log(item);

    }

    return (
        <div className="task-mini" draggable onDragStart={(e) => startDrag(e, task)}>
            <div className="task-title">{task.title}</div>
            <div className="task-description">{task.description}</div>
        </div>

    )
}
export default TaskMini