import React from "react";
import './App.css';
import DigitButton from "./components/DigitButton";
import Button from '@mui/material/Button';
import ActionButton from "./components/ActionButton";
import EqualsButton from "./components/EqualsButton";
import Tasks from './pages/Tasks';
import tasksReducer from './pages/Tasks/reducers/tasks.js';
import {legacy_createStore as createStore} from "redux";
import {Provider} from "react-redux";
import uuid from "uuidv4";


const store = createStore(tasksReducer);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            a: '',
            b: '',
            sign: '',
            finish: false,
            signPrev: '',
            temp: '',
            results: [],  //історія обчислень
            out: '',      //поле вводу
            disabled: true, //властивість кнопки обчислення результатів бекенду
            count: '1',   // кількість необхідних результатів з бекенду
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

    render() {
        return (
            <div>
                <div>
                    {
                        this.state.results.map((item) =>
                        (
                        <p key={uuid()} className="history">{item}</p>
                    ))}
                </div>
                <div>
                    <p>{this.state.out}</p>
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
                    <Button variant="contained" onClick={() => this.setState({results: []})}>CLEAR HISTORY</Button>
                </div>
                <div>
                    <ActionButton text="+" onInput={this.onInput} data={this.state}/>
                    <ActionButton text="-" onInput={this.onInput} data={this.state}/>
                    <ActionButton text="*" onInput={this.onInput} data={this.state}/>
                    <ActionButton text="/" onInput={this.onInput} data={this.state}/>
                    <EqualsButton text="=" onInput={this.onInput} data={this.state}/>
                </div>
                <br/>
                <div>
                    <Provider store={store}>
                        <Tasks onInput={this.onInput} data={this.state}/>
                    </Provider>
                </div>
            </div>
        );
    }
}

export default App;
