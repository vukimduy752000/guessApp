import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Hello</Text>
//     </View>
//   );
// }

export default class Game extends Component {
  // set intial state
  state = {
    secret : 0,
    input: '',
    feedback: '',
    numOfGuess: 10
  }

  //function to pick a random number
  generateRandom() {
    return Math.round(Math.random() *  100)
  }

  //function to initialize the game
  init() {
    const secretNumber = this.generateRandom()
    this.state.numOfGuess = 10
    this.setState({ secret: secretNumber })
  }

  // lifecycle function
  componentDidMount() {
    this.init()
  }
  
  componentWillUnmount()
  {
    this.init()
  }
  

  //update input state
  updateInput = (value) => {
    this.setState({input: value})
  }

  //update changes
  updateChange() {
    this.state.numOfGuess--
    if(this.state.numOfGuess == 0)
    {
      this.setState({feedback: "You are the catchy loser!!"})
      this.init()
    }
  }

  checkGuess = () => {
    const userGuess = parseInt(this.state.input); //convert string to int
    const secretNumber = this.state.secret;
    if (userGuess == secretNumber)
    {
      this.setState({ feedback: 'YOu guessed right!, the number is' + secretNumber })
      //restart the game
      this.init()
      return 
    } 

    if ( userGuess < secretNumber)
    {
      this.setState({ feedback: 'You guessed smaller than the number!'})
      this.updateChange()
    }

    if ( userGuess > secretNumber)
    {
      this.setState({ feedback: 'You guessed larger than the number!'})
      this.updateChange()
    }
    return
  }

  render () {
    return(
      <View style={styles.game}>
        <Text style = {styles.title}>Guess my number</Text>
        
        <TextInput 
        style = {styles.input} 
        keyboardType='number-pad'
        onChangeText = { this.updateInput}> 
        </TextInput>

        <TouchableHighlight
        style = {styles.button} 
        underlayColor="white"
        onPress={this.checkGuess}>
          <Text>Submit Guess</Text>
        </TouchableHighlight>

        <Text
        style = {styles.feedback}>{this.state.feedback}</Text>

        <Text>{"Remaining chances: " + this.state.numOfGuess}</Text>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  feedback: {
    color: '#ffffff',
    fontSize: 14,
    marginTop: 20
  },

  button: {
    width: 200,
    padding: 10,
    backgroundColor: 'lightblue',
    marginTop: 20,
    alignItems: "center"
  },

  game: {
    flex: 1,
    backgroundColor: '#660066',
    padding: 40,
    borderRadius: 50,
    minHeight: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: '#ff33ff',
    fontSize: 50
  },

  title: {
    fontSize: 24,
    textAlign: 'center',
    color: '#fcfcbd'
  },

  input: {
    backgroundColor: '#ffffff',
    width: 200,
    marginTop: 10,
    padding: 10,
    textAlign: 'center'
  }
});
