type Column<T> = {
	key: string;
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
	[key: string]: unknown;
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
		<table className="w-full table-fixed border-collapse">
			<thead className="bg-neutral-100">
				<tr className="border-b border-neutral-200">
					{columns.map((col) => (
						<th
							key={String(col.key)}
							className={`px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider ${col.width}`}
						>
							{col.label}
						</th>
					))}

					{renderActions && (
						<th className="px-4 py-3 text-center text-xs font-semibold text-neutral-500 uppercase tracking-wider w-[10%]">
							ACCIONES
						</th>
					)}
				</tr>
			</thead>

			<tbody className="divide-y divide-neutral-200">
				{data.map((row) => (
					<tr key={row.id} className="hover:bg-neutral-50 transition-colors">
						{columns.map((col) => (
							<td
								key={String(col.key)}
								className="px-4 py-3 text-sm text-neutral-700"
							>
								{col.render ? col.render(row) : String(row[col.key])}
							</td>
						))}

						{renderActions && (
							<td className="px-4 py-3">
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
