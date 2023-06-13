import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Nav from './Components/Nav/Nav';
import Main from './Components/main/Main';
import Login from './Components/Login/Login';
import Calendar from './Components/Calendar/Calendar.tsx';
import Notify from './Components/Notify/Notify.tsx';

function App() {

  return (
    <Router>
      <Switch>
      <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />

        <Route exact path="/home" render={() => (
          <>
            <Nav />
            <Main />
          </>
        )} />

        <Route exact path="/home/calendar" render={() => (
          <>
            <Nav />
            <Calendar />
          </>
        )} />

        <Route exact path="/home/notify" render={() => (
          <>
            <Nav />
            <Notify />
          </>
        )} />


      </Switch>
    </Router>
  );
}

export default App;