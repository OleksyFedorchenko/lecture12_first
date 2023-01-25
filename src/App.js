import React from "react";
import './App.css';
import DigitButton from "./components/DigitButton";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            a: '',
            b: '',
            sign: '',
            finish: false,
            digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
            action: ['+', '-', '*', '/']
        }
        this.onAdd=this.onAdd.bind(this);
    }

    onAdd(a){

        this.setState({a:a})
    }

    render() {
        console.log(this.state.a);
        return (
            <div>
                <div>
                    <DigitButton text="7" onAdd={this.onAdd}/>
                    <DigitButton text="8"/>
                    <DigitButton text="9"/>
                </div>
                <div>
                    <DigitButton text="4"/>
                    <DigitButton text="5"/>
                    <DigitButton text="6"/>
                </div>
                <div>
                    <DigitButton text="1"/>
                    <DigitButton text="2"/>
                    <DigitButton text="3"/>
                </div>
                <div>
                    <DigitButton text="0"/>
                </div>

            </div>
        );
    }
}

export default App;
