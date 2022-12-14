import { Route, Routes, HashRouter } from 'react-router-dom';
// Importing Navbar
import Navbar from './components/Navbar';
// Importing all pages
import AllTeachers from './pages/AllTeachers';
import Attendence from './pages/Attendence';
import CreateTeacher from './pages/CreateTeacher';
import UpdateTeacher from './pages/UpdateTeacher'
import Reschedules from './pages/Reschedules';
import TakeAttendence from './pages/TakeAttendence';
import Teacher from './pages/Teacher';
// Importing the settings page
import Settings from './pages/Settings';

export default function Router() {
	return (
		<HashRouter>
			<Routes>
				{/* All Routes configuration */}
				<Route path='/' element={<Navbar />}>
					{/* defaults to the reschedules page */}
					<Route index element={<Reschedules />} />
					<Route path='/settings' element={<Settings/>} />
					{/* routes for teachers db */}
					<Route path='/teachers'>
						<Route index element={<AllTeachers />} />
						<Route path='/teachers/:id' element={<Teacher />} />
						<Route path='/teachers/create' element={<CreateTeacher />} />
						<Route path='/teachers/update/:id' element={<UpdateTeacher/>} />	
					</Route>
					{/* routes for attendence */}
					<Route path='/attendence'>
						<Route index element={<Attendence />} />
						<Route path='/attendence/take' element={<TakeAttendence />} />
					</Route>
				</Route>
			</Routes>
		</HashRouter>
	);
}
