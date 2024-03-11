import {useEffect, useState} from 'react';
import './App.css';
import DataTable from './components/DataTable';
import {membersURL, headers} from './utils/constants';

function App() {
	const [members, setMembers] = useState([]);

	useEffect(() => {
		const getMembers = async () => {
			try {
				const response = await fetch(membersURL);
				const resp = await response.json();
				// add isChecked, to use it later to delete
				resp.map((p) => (p.isChecked = false));

				setMembers([...resp]);
			} catch (error) {
				console.error(error);
			}
		};
		getMembers();
	}, []);

	return (
		<>
			<div className='text-3xl font-bold underline'>Data table</div>
			{members && members.length > 0 ? (
				<DataTable headers={headers} body={members} />
			) : (
				<></>
			)}
		</>
	);
}

export default App;
