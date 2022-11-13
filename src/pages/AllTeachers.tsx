import Notification from '../components/Notification';
import Spinner from '../components/Spinner';
import { useEffect, useState} from 'react';
import TeacherList from '../components/TeacherList';
import { typeTeacher } from '../utils/types';

export default function AllTeachers() {
	// this state can either hold the actual data or it
	// can hold fetch status values like pending, success
	// , fail etc.
	const [teachers, setTeachers] = useState<string | typeTeacher[]>('pending');
	const [search, setSearch] = useState<string>('')
	const [debouncedSearch, setDebouncedSearch] = useState<string>('')
	

	// fetching the teacher's database
	useEffect(() => {
		fetch('http://127.0.0.1:8000/teacher')
			// fetching successfully
			.then(r => {
				if (r.status === 200) {
					return r.json();
				}
				throw new Error('invalid status code');
			})
			.then(r => {
				setTeachers(r);
			})
			// if some error occured
			.catch(() => {
				setTeachers('failed');
			});
	}, []);
	
	// updating the debounced Search
	useEffect(() => {
		const timeOut = setTimeout(() => {
			setDebouncedSearch(search)	
		}, 500);

		return () => {
			clearTimeout(timeOut)
		}
	},[search])

		return (
		<div className='all-teachers'>
			<header>
				<h1>Teachers List</h1>
				<div className="search">
					<input type="text" placeholder='Search' onChange={e => setSearch(e.target.value)}/>
				</div>
			</header>

				{/* rendering specific element on various states */}
				{/* if fetching is pending */}
				{teachers === 'pending' ? (
					<Spinner />
				) : // if fetching has failed
				teachers === 'failed' ? (
					<Notification
						type='error'
						heading='Cannot Fetch Data'
						content='Seems like you are not in an environment with a valid database available, Try restarting the application or contact the developer - Aditya Tripathi'
					/>
				) : /* if fetching succeed*/(
							<TeacherList teachers={teachers as typeTeacher[]} filter={debouncedSearch} />
				)}

		</div>
	);
}