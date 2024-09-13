import { ExitButton } from "./Button"

export interface IBillComponentProps {
	bill: {
		id: string, 
		title: string, 
		description: string, 
		dueDate: string, 
		reminder: number, 
		autopay: number, 
		amount: number
	},
	onDelete(id: string): any,
	isOverview: boolean,
}

export interface IBillProps {
	id: number, 
	title: string, 
	description: string, 
	dueDate: string, 
	reminder: number, 
	autopay: number, 
	amount: number
}

export const Bill = ({ bill, onDelete, isOverview }: IBillComponentProps) => {
	return (
		<>
			{isOverview ? (
				<div className="content-bill overview-bills">
					<ExitButton handleCallback={onDelete} callbackParam={bill.id} />
					<h4>
						<div className="title">{ bill.title }</div>
						<div className="amount">Due: ${ bill.amount }</div>
						<div className="dueDate">{ new Date(bill.dueDate).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }</div>
						<div className="reminder">
							Reminder: 
							{ bill.reminder === 1 ? (
								<div className="fake-checkbox-false"></div>
							) : (
								<div className="fake-checkbox-true"></div>
							)}
						</div>
						<div className="reminder">
							Autopay: 
							{ bill.autopay === 1 ? (
								<div className="fake-checkbox-false"></div>
							) : (
								<div className="fake-checkbox-true"></div>
							)}
						</div>
					</h4>
					<div className="extra-info hidden">
						<div className="description">{ bill.description }</div>
					</div>
				</div>
			) : (
				<div className="content-bill upcoming-bills">
					<ExitButton handleCallback={onDelete} callbackParam={bill.id} />
					<h4 className="upcoming-bills">
						<div className="bill-header-left">
							<div className="title">{ bill.title }</div>
							{/* Reminder is stored as 0/1 */}
							<div className="reminder">
								Reminder: 
								{ bill.reminder === 1 ? (
									<div className="fake-checkbox-false"></div>
								) : (
									<div className="fake-checkbox-true"></div>
								)}
							</div>
							<div className="reminder">
								Autopay: 
								{ bill.autopay === 1 ? (
									<div className="fake-checkbox-false"></div>
								) : (
									<div className="fake-checkbox-true"></div>
								)}
							</div>
						</div>
						<div className="bill-header-right">
							<div className="dueDate">{ new Date(bill.dueDate).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }</div>
							<div className="amount">Due: ${ bill.amount }</div>
						</div>
					</h4>
					<div className="extra-info">
						<div className="description">{ bill.description }</div>
					</div>
				</div>
			)}
		</>
	);
};