import './App.css';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import { useState, useRef } from 'react';
import Weather from "./Weather.js";
import "@fontsource/inter";
import { Container } from '@mui/system';
import { Card } from '@mui/material';
import TextField from '@mui/material/TextField';
import { ThemeProvider } from '@mui/material/styles';
import { montheme, tuetheme, wedtheme, thutheme, fritheme} from './themes'; // Import your custom theme



function App(){
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const [inputValue, setInputValue] = useState("");
  const [units, setUnits] = useState("metric");
  const [unitdisplay, setUnitsDis] = useState("Celcius");
  const [degree, setDegree] = useState("°C")
  const [city, setCity] = useState("London");

  //init lists
  const [taskMon, setTaskMon] = useState([
    { taskName: 'Mon 1', taskEditable: false },
    { taskName: 'Task 2', taskEditable: false },
  ]);
  const [taskTue, setTaskTue] = useState([
    { taskName: 'Tue 1', taskEditable: false },
    { taskName: 'Task 2', taskEditable: false },
  ]);

  const [taskWed, setTaskWed] = useState([
    { taskName: 'Wed 1', taskEditable: false },
    { taskName: 'Task 2', taskEditable: false },
  ]);

  const [taskThu, setTaskThu] = useState([
    { taskName: 'Thu 1', taskEditable: false },
    { taskName: 'Task 2', taskEditable: false },
  ]);

  const [taskFri, setTaskFri] = useState([
    { taskName: 'Fri 1', taskEditable: false },
    { taskName: 'Task 2', taskEditable: false },
  ]);

  const daysvar = [taskMon, taskTue, taskWed, taskThu, taskFri];

  const themevar = [montheme, tuetheme, wedtheme, thutheme, fritheme]

  //Rearrange list items
  const dragItem = useRef();
  const dragOverItem = useRef();

  const dragStart = (e, position, day) => {
    dragItem.current = position;

  };

  const dragEnter = (e, position, day) => {
    dragOverItem.current = position;
  };

  const drop = (e, day) => {
    const copyListItems = [...day];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;

    switch (day) {
      case taskMon:
        setTaskMon(copyListItems);
        break;
      case taskTue:
        setTaskTue(copyListItems);
        break;
      case taskWed:
        setTaskWed(copyListItems);
        break;
      case taskThu:
        setTaskThu(copyListItems);
        break;
      case taskFri:
        setTaskFri(copyListItems);
        break;
      default:
        console.log("WTF");
    }
  };


  //new button
  function handleNewItem(day){
    const newTask = { taskName : 'Untitled', taskEditable: true };
    const newTasks = [...day, newTask];
    
    switch (day){
      case taskMon:
        setTaskMon(newTasks);
        break;
      case taskTue:
        setTaskTue(newTasks);
        break;
      case taskWed:
        setTaskWed(newTasks);
        break;
      case taskThu:
        setTaskThu(newTasks);  
        break;
      case taskFri:
        setTaskFri(newTasks);
        break;  
      default:
        console.log("WTF");
    }
  }

  //handle click on task
 function handleTaskClick(index, day) {
  const temp = [...taskMon, ...taskTue, ...taskWed, ...taskThu, ...taskFri];
  const newTasks = [...day];
  const allTasksEditable = temp.every((task) => task.taskEditable === false);

  if (allTasksEditable || newTasks[index].taskEditable === true) {
    newTasks[index].taskEditable = true;
  } else {
    newTasks[index].taskEditable = false;
  }

  switch (day) {
    case taskMon:
      setTaskMon(newTasks);
      break;
    case taskTue:
      setTaskTue(newTasks);
      break;
    case taskWed:
      setTaskWed(newTasks);
      break;
    case taskThu:
      setTaskThu(newTasks);
      break;
    case taskFri:
      setTaskFri(newTasks);
      break;
    default:
      console.log("WTF");
  }
} // Added closing brace here

  //handle rename
  function handleTaskNameChange(index, newName, day){
    const newTasks = [...day];
    newTasks[index].taskName = newName;
    newTasks[index].taskEditable = false;
    switch (day) {
      case taskMon:
        setTaskMon(newTasks);
        break;
      case taskTue:
        setTaskTue(newTasks);
        break;
      case taskWed:
        setTaskWed(newTasks);
        break;
      case taskThu:
        setTaskThu(newTasks);
        break;
      case taskFri:
        setTaskFri(newTasks);
        break;
      default:
        console.log("WTF");
    }

      setInputValue("");
      
    }

    //handle input location{
 
    const handleCityChange = (e) => {
      setCity(prompt("Input City"));
    };

    function handleUnitChange(){
      console.log(degree)
      if (units === "metric"){
        setUnits("imperial");
        setUnitsDis("Farenheit");
        setDegree("°F");
      }
      else{
        setUnits("metric");
        setUnitsDis("Celcius");
        setDegree("°C");
      }
    }

    const handleDeleteTask = (index, day) => {
      const newTasks = day.filter((task, taskIndexhaha) => taskIndexhaha !== index);
      setTaskMon(newTasks);
    };

  return (
    
      <Container sx={{px: '30px', py:'30px'}} className="App">
      <Grid container spacing={4}>
        
        {days.map((thisday, index) => (
            <ThemeProvider theme={themevar[index]}>
              <Grid item md={1.7} key={days[index]} >
              <Typography className='DayContainer'  
                sx={{ fontFamily: 'Inter', fontWeight: 900, fontSize: '32px', textAlign: 'left', mb:'10px' }}>
                  {days[index]}
              </Typography>
              <Stack sx={{backgroundColor: themevar[index].palette.primary.main, border: 2, borderColor: themevar[index].palette.primary.border, minHeight:'300px', mb:'15px', direction:"column", justifyContent:'space-between'
              , boxShadow: '0px 0px 8px -4px inset', px: '3px'}}>
                <Container disableGutters>
                  {daysvar[index].map((task, taskindex) => (
                    <Paper elevation={1} key={taskindex} square  
                    sx={{backgroundColor: themevar[index].palette.primary.task, height:'30px', lineHeight:'30px', my:'2px', px:'1px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',}} 
                        className='draggable-item'
                    draggable onClick={() => handleTaskClick(taskindex, daysvar[index])}
                    onDragStart={(e) => dragStart(e, taskindex, daysvar[index])}
                    onDragEnter={(e) => dragEnter(e, taskindex, daysvar[index])}
                    onDragEnd={(e) => drop(e, daysvar[index])}
  >
                      {task.taskEditable ? (
                        
                        <TextField 
                        size='small'
                        placeholder="Untitled Task"
                        variant="standard"
                        InputProps={{
                          disableUnderline: true,
                          style:{
                            fontSize:'16px'
                          }
                        }}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {if (e.key === "Enter")
                                              handleTaskNameChange(taskindex, inputValue, daysvar[index])
                                            else if (e.key === "Delete")
                                              handleDeleteTask(taskindex, daysvar[index])

                                          }} />
                      ) : (
                        <span>{task.taskName}</span>
                      )}
                    </Paper>
                  ))}
                </Container>
                
              <Button variant="text" onClick={() => handleNewItem(daysvar[index])} sx={{position:'relative', bottom:'0', color:'#000000'}}>Add Task</Button>
              
              
              </Stack>
              <Card sx={{backgroundColor: themevar[index].palette.primary.main, border: 2, borderColor: themevar[index].palette.primary.border, borderRadius:'10px', mb:'15px', boxShadow: '0px 0px 8px -4px inset'}} elevation={0}>
                <Weather city={city} units={units} degree={degree} dayindex={index}/>
              </Card>
            </Grid>
          </ThemeProvider>

          ))}
        
      </Grid>
      <Stack direction="row" spacing={2} className='Buttons'>
        <Button variant="outlined">Add Weekly Task</Button>
        <Button variant="outlined">Add Monthly Task</Button>
        <Button variant="outlined">Add Recurring Task</Button>
        <Button variant="outlined" onClick={() => handleUnitChange(units)}>{unitdisplay}</Button>
        <Button variant="outlined" onClick={handleCityChange}>Select Location</Button>
      </Stack>
      </Container>
      
      
    
  );
}

export default App;