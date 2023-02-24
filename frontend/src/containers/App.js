import './App.scss';
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/vi';
import '@formatjs/intl-pluralrules/locale-data/en';
import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/locale-data/en';
import '@formatjs/intl-relativetimeformat/locale-data/vi';
import Login from "./Auth/Login";
import Register from './Auth/Register';
import HomePage from './HomePage/HomePage';
import LanguageUtils from "../utils/LanguageUtil";
import { IntlProvider } from "react-intl";
import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

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
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </IntlProvider>
  );
}

export default App;
