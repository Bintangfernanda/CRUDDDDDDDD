import { useState, useEffect } from "react";

const App = () => {
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [tableData, setTableData] = useState([]);
	const [editingId, setEditingId] = useState(null);
	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await fetch(
				"https://jsonplaceholder.typicode.com/users"
			);

			const data = await response.json();

			setTableData(data);
		} catch (error) {
			console.log("Error mendapatkan user: " + error);
		}
	};

	const handleName = (event) => {
		setName(event.target.value);
	};

	const handleUsername = (event) => {
		setUsername(event.target.value);
	};

	const handleEmail = (event) => {
		setEmail(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (name && username && email) {
			const newData = { name, username, email };

			try {
				const response = await fetch(
					"https://jsonplaceholder.typicode.com/users",
					{
						method: "POST",
						body: JSON.stringify(newData),
						headers: {
							"Content-Type": "application/json; charset=UTF-8",
						},
					}
				);
				const data = await response.json();

				setTableData([...tableData, data]);
				setName("");
				setUsername("");
				setEmail("");
			} catch (error) {
				console.log("Error menambahkan user: " + error);
			}
		}
	};

	const handleEdit = (id) => {
		const updateUser = tableData.find((data) => data.id === id);

		if (updateUser) {
			{
				setName(updateUser.name);
				setUsername(updateUser.username);
				setEmail(updateUser.email);
				setEditingId(id);
			}
		}
	};

	const handleUpdate = async () => {
		if (name && username && email && editingId !== null) {
			const updateUser = { name, username, email };

			try {
				const response = await fetch(
					`https://jsonplaceholder.typicode.com/users/${editingId}`,
					{
						method: "PUT",
						body: JSON.stringify(updateUser),
						headers: {
							"Content-Type": "application/json; charset=UTF-8",
						},
					}
				);

				const data = await response.json();
				const updatedUser = tableData.map((user) =>
					user.id === editingId ? data : user
				);

				setTableData(updatedUser);
				
        setName("");
				setUsername("");
				setEmail("");
				setEditingId(null);
			} catch (error) {
				console.log("Error mengubah user: " + error);
			}
		}
	};

	const handleDelete = async (id) => {
		try {
			await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
				method: "DELETE",
			});

			const deletedData = tableData.filter((data) => data.id !== id);
			setTableData(deletedData);
		} catch (error) {
			console.log("Error menghapus user: " + error);
		}
	};

	console.log(tableData);

	return (
		<>
			<div>
				<form onSubmit={handleSubmit}>
					<fieldset>
						<input
							value={name}
							onChange={handleName}
							placeholder="Name"
						></input>
						<input
							value={username}
							onChange={handleUsername}
							placeholder="Username"
						></input>
						<input
							value={email}
							onChange={handleEmail}
							placeholder="Email"
						></input>
					</fieldset>
					<button type="submit">Add Data</button>
				</form>

				<button type="submit" onClick={handleUpdate}>
					Update Data
				</button>

				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Username</th>
							<th>Email</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{tableData.map((data, index) => {
							return (
								<tr key={index}>
									<td>{data.name}</td>
									<td>{data.username}</td>
									<td>{data.email}</td>
									<td>
										<button onClick={() => handleEdit(data.id)}>Update</button>
									</td>
									<td>
										<button onClick={() => handleDelete(data.id)}>
											Delete
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default App;