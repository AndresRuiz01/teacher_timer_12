import './App.css';
// import TimerManager from './TimerManager';
import StationTimer from './StationTimer';

const teacher_timers = [
  {title: "Get Ready", length: 1},
  {title: "Station One", length: 12},
  {title: "Transition", length: 1},
  {title: "Station Two", length: 12},
  {title: "Transition", length: 1},
  {title: "Station Three", length: 12},
  {title: "Transition", length: 1},
  {title: "Station Four", length: 12},
  {title: "Clean Up", length: 3},
]

const test_timers = [
  {title: "Test 1", length: 0.1},
  {title: "Test 2", length: 0.13},
  {title: "Test 3", length: 0.1}
]


function App() {
  return (
    <div className="App">
      {/* <TimerManager timers={teacher_timers}/> */}
      <StationTimer timers={teacher_timers} />
    </div>
  );
}

export default App;
