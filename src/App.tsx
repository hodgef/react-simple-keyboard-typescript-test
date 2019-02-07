import * as React from 'react';
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import './App.css';

class App extends React.Component {
  keyboard: Keyboard;

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
  };

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
        this.keyboard.setInput(input);
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
          ref={(r:any) => this.keyboard = r}
          layoutName={this.state.layoutName}
          onChange={(input: string) => this.onChange(input)}
          onKeyPress={(button: string) => this.onKeyPress(button)}
        />
      </div>
    );
  }
}

export default App;
