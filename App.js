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
    feedback: ''
  }

  //function to pick a random number
  generateRandom() {
    return Math.round(Math.random() *  100)
  }

  //function to initialize the game
  init() {
    const secretNumber = this.generateRandom()
    this.setState({ secret: secretNumber })
  }

  // lifecycle function
  componentDidMount() {
    this.init()
  }

  //update input state
  updateInput = (value) => {
    this.setState({input: value})
    
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
    }

    if ( userGuess > secretNumber)
    {
      this.setState({ feedback: 'You guessed larger than the number!'})
    }
    return
  }

  render () {
    return(
      <View style={styles.container}>
        <Text>Guess my number,WOWOWOW</Text>
        
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
        <Text>{this.state.feedback}</Text>
      
      </View>
    )
  }
}

const styles = StyleSheet.create({

  button: {
    width: 200,
    padding: 10,
    backgroundColor: 'lightblue',
    marginTop: 20,
    alignItems: "center"
  },

  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: '#ff33ff',
    fontSize: 32
  },

  input: {
    backgroundColor: '#ffffff',
    width: 100,
    marginTop: 10,
    padding: 10,
    textAlign: 'center'
  }
});
