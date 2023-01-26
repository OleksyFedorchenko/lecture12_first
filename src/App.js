import React from "react";
import './App.css';
import DigitButton from "./components/DigitButton";
import Button from '@mui/material/Button';
import ActionButton from "./components/ActionButton";
import EqualsButton from "./components/EqualsButton";
import Tasks from './pages/Tasks';
import tasksReducer from './pages/Tasks/reducers/tasks.js';
import {createStore} from "redux";
import {Provider} from "react-redux";



const store = createStore(tasksReducer);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            a: '',
            b: '',
            sign: '',
            finish: false,
            signprev: '',
            temp: '',
            results: [],
            out: ''
        }
        this.onInput = this.onInput.bind(this);
        this.clearAll = this.clearAll.bind(this);
    }

    onInput(setFromButtonComponent) {
        this.setState(setFromButtonComponent)
    }

    clearAll() {
        this.setState({
            a: '',
            b: '',
            sign: '',
            finish: false,
        })
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <div>
                    <Provider store={store}>
                        <Tasks/>
                    </Provider>
                </div>
                <div>
                    {this.state.results.map((item) => (
                        <p key={item} className="history">{item}</p>
                    ))}
                </div>
                <div>
                    <p>{this.state.a + this.state.sign + this.state.b}</p>
                </div>
                <div>
                    <DigitButton text="7" onInput={this.onInput} data={this.state}/>
                    <DigitButton text="8" onInput={this.onInput} data={this.state}/>
                    <DigitButton text="9" onInput={this.onInput} data={this.state}/>
                </div>
                <div>
                    <DigitButton text="4" onInput={this.onInput} data={this.state}/>
                    <DigitButton text="5" onInput={this.onInput} data={this.state}/>
                    <DigitButton text="6" onInput={this.onInput} data={this.state}/>
                </div>
                <div>
                    <DigitButton text="1" onInput={this.onInput} data={this.state}/>
                    <DigitButton text="2" onInput={this.onInput} data={this.state}/>
                    <DigitButton text="3" onInput={this.onInput} data={this.state}/>
                </div>
                <div>
                    <DigitButton text="0" onInput={this.onInput} data={this.state}/>
                </div>
                <div>
                    <Button variant="contained" onClick={this.clearAll}>AC</Button>
                </div>
                <div>
                    <ActionButton text="+" onInput={this.onInput} data={this.state}/>
                    <ActionButton text="-" onInput={this.onInput} data={this.state}/>
                    <ActionButton text="*" onInput={this.onInput} data={this.state}/>
                    <ActionButton text="/" onInput={this.onInput} data={this.state}/>
                    <EqualsButton text="=" onInput={this.onInput} data={this.state}/>
                </div>

            </div>
        );
    }
}

export default App;
