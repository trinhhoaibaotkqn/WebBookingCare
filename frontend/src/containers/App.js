import './App.scss';
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/vi';
import '@formatjs/intl-pluralrules/locale-data/en';
import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/locale-data/en';
import '@formatjs/intl-relativetimeformat/locale-data/vi';
import IsNotAuthenticated from '../components/IsNotAuthenticated';
import Login from "./Auth/Login";
import Register from './Auth/Register';
import HomePage from './HomePage/HomePage';
import PatientHome from './PatientPage/PersonalPage/PatientHome';
import AdminHome from './AdminPage/AdminHome';
import AdminUser from './AdminPage/Section/AdminUser/AdminUser';
import AdminFacility from './AdminPage/Section/AdminFacility/AdminFacility';
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
import ScrollToTop from '../components/ScrollToTop';
import DetailSpecialty from './PatientPage/Specialty/DetailSpecialty';
import DetailFacility from './PatientPage/Facility/DetailFacility';
import IsDoctor from '../components/IsDoctor';
import IsAdmin from '../components/IsAdmin';
import IsPatient from '../components/IsPatient';
import AllFacility from './PatientPage/Facility/AllFacility';
import AllSpecialty from './PatientPage/Specialty/AllSpecialty';
import AllDoctor from './PatientPage/Doctor/AllDoctor';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDX-_ufPY0rtodcW-8vp8n8cimQz_H-WNE",
  authDomain: "febookingcare-63eaa.firebaseapp.com",
  projectId: "febookingcare-63eaa",
  storageBucket: "febookingcare-63eaa.appspot.com",
  messagingSenderId: "852585323466",
  appId: "1:852585323466:web:7ed137bc65b7a1bd158d33",
  measurementId: "G-LNP98L0W60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  const messages = LanguageUtils.getFlattenedMessages();
  const language = useSelector((state) => state.common.language);

  return (
    <IntlProvider locale={language} messages={messages[language]} defaultLocale="vi">
      <div className="App">
        <div className='App-content'>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route exact path="/login" element={<IsNotAuthenticated><Login /></IsNotAuthenticated>} />
              <Route exact path="/register" element={<IsNotAuthenticated><Register /></IsNotAuthenticated>} />
              <Route exact path="/all-facilities" element={<AllFacility />} />
              <Route exact path="/all-specialties" element={<AllSpecialty />} />
              <Route exact path="/all-doctors" element={<AllDoctor />} />
              <Route exact path="/personal-page" element={<IsPatient><PatientHome /></IsPatient>} />
              <Route exact path="/detail-doctor/:name" element={<DetailDoctor />} />
              <Route exact path="/detail-specialty/:name" element={<DetailSpecialty />} />
              <Route exact path="/detail-facility/:name" element={<DetailFacility />} />
              <Route path="/verify-booking-appointment" element={<ConfirmBooking />} />
              <Route exact path="/system/admin/" element={<IsAdmin><AdminHome /></IsAdmin>}>
                <Route exact path="user/" element={<AdminUser />} />
                <Route path="user/edit-info-doctor" element={<MarkdownInfoDoctor />} />
                <Route path="facility" element={<AdminFacility />} />
                <Route path="specialty" element={<AdminSpecialty />} />
                <Route path="handbook" element={<AdminHandbook />} />
              </Route>
              <Route exact path="/system/doctor/" element={<IsDoctor><DoctorHome /></IsDoctor>}>
                <Route exact path="schedule" element={<Schedule />} />
                <Route path="info-checkup" element={<InformationCheckup />} />
                <Route path="appointment" element={<Appointment />} />
              </Route>
              <Route exact path="/" element={<HomePage />} />
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
