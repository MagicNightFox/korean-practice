import './App.css'
import {
  Box,
  Paper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from "@mui/material";
import * as characterTypes  from "./constants.js";
import {useState} from "react";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function App() {
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [hangeul, setHangeul] = useState(["consonants"]);
  const [currentCharacter, setCurrentCharacter] = useState(Object.entries(characterTypes.consonants)[getRandomInt(Object.keys(characterTypes.consonants).length)]);
  const handleTestedHangeul = (event, toggledLetters) => {
    if(toggledLetters.length < 1) return;
    setHangeul(toggledLetters);
  }

  const newCharacter = () => {
    let type = hangeul[getRandomInt(hangeul.length)];
    setCurrentCharacter(Object.entries(characterTypes[type])[getRandomInt(Object.keys(characterTypes[type]).length)])
  }

  const checkInput = (input) => {
    if(Array.isArray(currentCharacter[1])) {
      return currentCharacter[1].includes(input);
    }
    return input === currentCharacter[1];

  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const input = Object.fromEntries(new FormData(event.target)).input;
    if(checkInput(input)){
      event.target.reset();
      newCharacter();
      setCorrectCount(correctCount + 1);
      return;
    }
    setIncorrectCount(incorrectCount + 1);

  }
  const handleUserInput = (event) => {
    if(checkInput(event.target.value)) {
      event.target.value = "";
      newCharacter();
      setCorrectCount(correctCount + 1);
    }
  }
  return (
    <Box width="100%" minHeight="98vh" display="flex" flexDirection="column" justifyContent="center">
      <Paper elevation={4} sx={{width:"512px", height:"512px", borderRadius:"16px", alignSelf:"center", padding: "8px"}}>
        <form style={{backgroundColor:"#FFF", display:"flex", flexDirection:"column", height:"100%"}} onSubmit={handleSubmit}>
          <ToggleButtonGroup
            className="difficultyToggles"
            value={hangeul}
            onChange={handleTestedHangeul}
            aria-label="choose-hangeul-to-test"
            sx={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)"}}
          >
            <ToggleButton value="consonants" aria-label="consonants">
              Consonants
            </ToggleButton>
            <ToggleButton value="vowels" aria-label="vowels">
              Vowels
            </ToggleButton>
            <ToggleButton value="doubleConsonants" aria-label="doubleConsonants">
              Double Consonants
            </ToggleButton>
            <ToggleButton value="vowelCombinations" aria-label="vowelCombinations" >
              Vowel Combinations
            </ToggleButton>
          </ToggleButtonGroup>
          <Box className="character" flexGrow={1} display="flex" alignSelf="center">
            <Typography alignSelf="center" variant="h1" component="p" sx={{userSelect:"none"}}>{currentCharacter[0]}</Typography>
          </Box>
          <Box className="controls" alignSelf="center">
            <TextField id="input" type="text" name="input" onChange={handleUserInput} aria-label="input"/>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}

export default App
