import * as React from 'react';
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import './App.css';

class App extends React.Component {
  keyboardRef: Keyboard;

  state = {
    layoutName: "default",
    input: ""
  };

  onChange = (input: string) => {
    this.setState({
      input: input
    });
    console.log("Input changed", input);
  };

  onKeyPress = (button: string) => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();

    this.handleCaretButtons(button);
  };

  handleCaretButtons = (button: string) => {
    if(this.keyboardRef.keyboard.caretPosition === null){
      this.keyboardRef.keyboard.caretPosition = this.keyboardRef.keyboard.getInput().length;
    }

    if (button === "{left}"){
      if(this.keyboardRef.keyboard.caretPosition)
        this.keyboardRef.keyboard.caretPosition--;
    }

    if (button === "{right}"){
      if(parseInt(this.keyboardRef.keyboard.caretPosition) <  this.keyboardRef.keyboard.getInput().length)
        this.keyboardRef.keyboard.caretPosition++;
    }

    console.log(this.keyboardRef.keyboard.caretPosition);
  }

  handleShift = () => {
    let layoutName = this.state.layoutName;

    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default"
    });
  };

  onChangeInput = (event: React.ChangeEvent<HTMLInputElement>):void => {
    let input = event.target.value;
    this.setState(
      {
        input: input
      },
      () => {
        this.keyboardRef.keyboard.setInput(input);
      }
    );
  };

  public render() {
    return (
      <div>
        <input
          value={this.state.input}
          placeholder={"Tap on the virtual keyboard to start"}
          onChange={e => this.onChangeInput(e)}
        />
        <Keyboard
          ref={(r:any) => this.keyboardRef = r}
          layoutName={this.state.layoutName}
          onChange={(input: string) => this.onChange(input)}
          onKeyPress={(button: string) => this.onKeyPress(button)}
          layout={{
            default: [
              "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
              "{tab} q w e r t y u i o p [ ] \\",
              "{lock} a s d f g h j k l ; ' {enter}",
              "{shift} z x c v b n m , . / {shift}",
              ".com @ {space} {left} {right}"
            ],
            shift: [
              "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
              "{tab} Q W E R T Y U I O P { } |",
              '{lock} A S D F G H J K L : " {enter}',
              "{shift} Z X C V B N M < > ? {shift}",
              ".com @ {space}"
            ]
          }}
          display={{
            "{left}": "left",
            "{right}": "right"
          }}
          mergeDisplay
          debug
        />
      </div>
    );
  }
}

export default App;
