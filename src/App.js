import {Switch, Route} from 'react-router-dom'

import Courses from './components/Courses'
import CourseDetails from './components/CourseDetails'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Courses} />
    <Route exact path="/courses/:id" component={CourseDetails} />
  </Switch>
)

export default App
