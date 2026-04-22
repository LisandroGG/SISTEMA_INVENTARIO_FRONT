type Column<T> = {
	key: keyof T;
	label: string;
	width?: string;
	render?: (item: T) => React.ReactNode;
};

type TableProps<T> = {
	columns: Column<T>[];
	data: T[];
	renderActions?: (item: T) => React.ReactNode;
	emptyMessage?: string;
};

type TableItem = {
	id: string | number;
};

const Table = <T extends TableItem>({
	columns,
	data,
	renderActions,
	emptyMessage = "No hay datos",
}: TableProps<T>) => {
	if (!data.length) {
		return <div>{emptyMessage}</div>;
	}

	return (
		<table>
			<thead>
				<tr>
					{columns.map((col) => (
						<th key={String(col.key)} className={col.width}>
							{col.label}
						</th>
					))}

					{renderActions && <th>Acciones</th>}
				</tr>
			</thead>

			<tbody>
				{data.map((row) => (
					<tr key={row.id}>
						{columns.map((col) => (
							<td key={String(col.key)}>
								{col.render ? col.render(row) : String(row[col.key])}
							</td>
						))}

						{renderActions && (
							<td>
								<div className="flex items-center justify-center gap-2">
									{renderActions(row)}
								</div>
							</td>
						)}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
