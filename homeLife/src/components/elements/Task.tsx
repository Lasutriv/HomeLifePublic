
interface ITaskProps {
  task: {id: string, title: string, description: string, dueDate: string, reminder: number},
  onDelete(id: string): any
}

export const Task = ({ task, onDelete }: ITaskProps) => {
	return (
		<div className="content-task">
			<i style={{ color: 'red', cursor: 'pointer' }} className="fa-solid fa-x fa-xs" onClick={ () => onDelete(task.id) }></i>
			<h4>
				{/* Reminder is stored as 0/1 - true/false */}
				<div className="title">{ task.title }</div>
				<div className="dueDate">Due: { new Date(task.dueDate).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }</div>
				<div className="reminder">
					Reminder: 
					{ task.reminder === 1 ? (
						<div className="fake-checkbox-false"></div>
					) : (
						<div className="fake-checkbox-true"></div>
					)}
				</div>
			</h4>
			<div className="description">{ task.description }</div>
		</div>
	);
};