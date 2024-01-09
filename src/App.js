import logo from "./logo.svg";
import "./App.css";
import DisplayUsers from "./components/displayUsers";
import DisplayNotifications from "./components/DisplayNotifications";
import CheckAnagram from "./components/CheckAnagram";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <DisplayNotifications /> */}
        display Users
        <DisplayUsers />
        <CheckAnagram />
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
