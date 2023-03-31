import './App.scss';
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/vi';
import '@formatjs/intl-pluralrules/locale-data/en';
import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/locale-data/en';
import '@formatjs/intl-relativetimeformat/locale-data/vi';
import IsAuthenticated from '../components/IsAuthenticated';
import IsNotAuthenticated from '../components/IsNotAuthenticated';
import Login from "./Auth/Login";
import Register from './Auth/Register';
import HomePage from './HomePage/HomePage';
import PatientHome from './PatientPage/PersonalPage/PatientHome';
import AdminHome from './AdminPage/AdminHome';
import AdminUser from './AdminPage/Section/AdminUser/AdminUser';
import AdminFacility from './AdminPage/Section/AdminFacility';
import AdminSpecialty from './AdminPage/Section/AdminSpecialty/AdminSpecialty';
import AdminHandbook from './AdminPage/Section/AdminHandbook';
import LanguageUtils from "../utils/LanguageUtil";
import { IntlProvider } from "react-intl";
import { useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import MarkdownInfoDoctor from './AdminPage/Section/AdminUser/MarkdownInfoDoctor';
import DetailDoctor from './PatientPage/Doctor/DetailDoctor';
import DoctorHome from './DoctorPage/DoctorHome';
import Schedule from './DoctorPage/Section/Schedule';
import InformationCheckup from './DoctorPage/Section/InformationCheckup';
import ConfirmBooking from './PatientPage/Doctor/ConfirmBooking';
import Appointment from './DoctorPage/Section/Appointment';

function App() {
  const messages = LanguageUtils.getFlattenedMessages();
  const language = useSelector((state) => state.common.language);

  return (
    <IntlProvider locale={language} messages={messages[language]} defaultLocale="vi">
      <div className="App">
        <div className='App-content'>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/login" element={<IsNotAuthenticated><Login /></IsNotAuthenticated>} />
              <Route exact path="/register" element={<IsNotAuthenticated><Register /></IsNotAuthenticated>} />
              <Route exact path="/personal-page" element={<IsAuthenticated><PatientHome /></IsAuthenticated>} />
              <Route exact path="/detail-doctor/:name" element={<DetailDoctor />} />
              <Route path="/verify-booking-appointment" element={<ConfirmBooking />} />
              <Route exact path="/system/admin/" element={<AdminHome />}>
                <Route exact path="user/" element={<AdminUser />} />
                <Route path="user/edit-info-doctor" element={<MarkdownInfoDoctor />} />
                <Route path="facility" element={<AdminFacility />} />
                <Route path="specialty" element={<AdminSpecialty />} />
                <Route path="handbook" element={<AdminHandbook />} />
              </Route>
              <Route exact path="/system/doctor/" element={<DoctorHome />}>
                <Route exact path="schedule" element={<Schedule />} />
                <Route path="info-checkup" element={<InformationCheckup />} />
                <Route path="appointment" element={<Appointment />} />
              </Route>
            </Routes>
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </BrowserRouter>
        </div>
      </div>
    </IntlProvider>
  );
}

export default App;
