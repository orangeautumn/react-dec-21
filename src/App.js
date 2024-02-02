import logo from "./logo.svg";
import "./App.css";
import DisplayUsers from "./components/displayUsers";
import DisplayNotifications from "./components/DisplayNotifications";
import CheckAnagram from "./components/CheckAnagram";
import { UploadFiles } from "./components/UploadFiles";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DisplayNotifications />
        display Users
        <DisplayUsers />
        <CheckAnagram />
        <UploadFiles />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
