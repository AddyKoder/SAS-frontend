import TeacherForm from '../components/TeacherForm';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { typeTeacher } from '../utils/types';
import Spinner from '../components/Spinner';
import Notification from '../components/Notification';
import { useNavigate } from 'react-router-dom';

interface fullTypeTeacher extends typeTeacher {
	timeTable: object;
}

export default function UpdateTeacher() {
	const { id } = useParams();
	const [teacher, setTeacher] = useState<string | fullTypeTeacher>('pending');
	const navigate = useNavigate();

	// fetching Teacher's data
	useEffect(() => {
		fetch(`http://127.0.0.1:8000/teacher/${id}`)
			// fetching successfully
			.then(r => {
				if (r.status === 200) {
					return r.json();
				}
				throw new Error('invalid status code');
			})
			.then(r => {
				setTeacher(r);
			})
			// if some error occured
			.catch(() => {
				setTeacher('failed');
			});
	}, []);

	return teacher === 'pending' ? (
		<Spinner />
	) : teacher === 'failed' ? (
		<Notification type='error' heading='Cannot fetch Data' content='Some error occured while fetching the data' />
	) : (
		<TeacherForm
			name={(teacher as fullTypeTeacher).name}
			className={(teacher as fullTypeTeacher).classTeacherOf}
			category={(teacher as fullTypeTeacher).category}
			timeTable={(teacher as fullTypeTeacher).timeTable as { [type: string]: string[] }}
			onSubmit={teacherData => {
				// deleting the _id property on timetable
				// this was before causing an error in the backend
				// by failing the data verifier
				delete Object(teacherData).timeTable._id
				fetch(`http://127.0.0.1:8000/teacher/${id}`, {
					method: 'post',
					body: JSON.stringify({...teacherData }),
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				}).then(r => {
					if (r.status === 200) navigate('/teachers');
					else {
						return r.text()
					}
				}).then(r => console.log(r))
			}}
		/>
	);
}
