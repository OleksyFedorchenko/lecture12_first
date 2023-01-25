import React from 'react';
import Button from '@mui/material/Button';
import {TextField} from "@mui/material";


let a = '';
let b = '';
let sign = '';
let signprev = '';
let finish = false;
const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operations = ['*', '/', '+', '-'];
let output = React.createRef();
let temp;


class App2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            count: '0',
            arr: [],
            isLoaded: '',
            disabled: true,
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.getFromBackEnd = this.getFromBackEnd.bind(this);
        this.calculateBackEnd = this.calculateBackEnd.bind(this);

    }

    clearAll() {
        a = '';
        b = '';
        sign = '';
        finish = false;
        output.current.textContent = 0;
    }

    checkKey(k) {
        switch (k) {
            case "+":
                temp = (+a) + (+b);
                break;
            case "-":
                temp = a - b;
                break;
            case "*":
                temp = a * b;
                break;
            case "/":
                temp = a / b;
                break;
        }
        this.setState({results: [...this.state.results, {name: a + signprev + b + '=' + temp}]});
        b = '';
        a = temp;
    }

    calculateBackEnd() {
        let tempres = 0;
        let dig = [];
        let ops = [];
        for (let i = 0; i < this.state.arr.length; i++) {
            dig = this.state.arr[i].match(/(?<![-\d])\d+/g).map(v => +v);
            ops = this.state.arr[i].split(' ');
            if (ops.includes('+')) {
                tempres = (+dig[0]) + (+dig[1]);
            } else if (ops.includes('-')) {
                tempres = dig[0] - dig[1];
            } else if (ops.includes('*')) {
                tempres = dig[0] * dig[1];
            } else if (ops.includes('/')) {
                tempres = dig[0] / dig[1];
            }

            this.addResult(dig[0] + ops[1] + dig[1] + '=' + tempres);
        }
    }

    addResult(result){
        this.setState(prevState=>({results: [...prevState.results, {name: result}]}));
    }

    getFromBackEnd() {

        const url = "http://localhost:8080/task?count=" + this.state.count;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        };
        const promise = fetch(url, options);
        promise.then(response => {
            if (response.ok) {
                response.json()
                    .then((result) => this.setState(() => {
                        return {arr: result}
                    }))
                    .catch(() => console.log('response is not valid JSON'));
                this.setState({isLoaded: "Data is loaded from back-end"});
                this.setState({disabled: false})
                console.log(this.state.arr);
            } else {
                console.log('Error with status' + response.status)
            }

        })

    }

    handleAdd(event) {
        // let arr=['1','2','3'];
        // for (let i = 0; i < arr.length; i++) {
        //     console.log(arr[i]);
        // }
        // for (let i = 0; i < this.state.arr.length; i++) {
        //     console.log(this.state.arr[i]);
        // }
        const key = event.target.textContent;
        output.current.textContent = '';
        if (digit.includes(key)) {
            if (b === '' && sign === '') {
                a += key;
            } else if (a !== '' && b !== '' && finish) {
                b = key;
                finish = false;
            } else {
                b += key;
            }
            output.current.textContent = a + sign + b;
            return;
        }
        if (operations.includes(key)) {
            if (a === '') a = '0';
            signprev = sign;
            sign = key;
            if (a !== '' && b !== '') {
                this.checkKey(signprev);
            }
            output.current.textContent = a + sign + b;
            return;
        }
        if (key === '=') {
            signprev = sign;
            if (a !== '' && b !== '') {
                this.checkKey(signprev);
                signprev = '';
                sign = '';
                output.current.textContent = a;
            } else
                signprev = '';
            sign = '';
            output.current.textContent = a;
        }
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.results.map((item) => (
                        <p className="history">{item.name}</p>
                    ))}
                </div>
                <div className="calc-screen">
                    <p ref={output}>0</p>
                </div>
                <div className="buttons">
                    <div>
                        <Button variant="contained" onClick={this.handleAdd}>7</Button>
                        <Button variant="contained" onClick={this.handleAdd}>8</Button>
                        <Button variant="contained" onClick={this.handleAdd}>9</Button>
                    </div>
                    <div>
                        <Button variant="contained" onClick={this.handleAdd}>4</Button>
                        <Button variant="contained" onClick={this.handleAdd}>5</Button>
                        <Button variant="contained" onClick={this.handleAdd}>6</Button>
                    </div>
                    <div>
                        <Button variant="contained" onClick={this.handleAdd}>3</Button>
                        <Button variant="contained" onClick={this.handleAdd}>2</Button>
                        <Button variant="contained" onClick={this.handleAdd}>1</Button>
                    </div>
                    <div>
                        <Button variant="contained" onClick={this.handleAdd}>0</Button>
                    </div>
                    <br/>
                    <div>
                        <Button variant="contained" onClick={this.clearAll}>AC</Button>
                        <Button variant="contained" onClick={this.handleAdd}>+</Button>
                        <Button variant="contained" onClick={this.handleAdd}>-</Button>
                    </div>
                    <div>
                        <Button variant="contained" onClick={this.handleAdd}>/</Button>
                        <Button variant="contained" onClick={this.handleAdd}>*</Button>
                        <Button variant="contained" onClick={this.handleAdd}>=</Button>
                    </div>
                    <br/>
                    <div>
                        <TextField id="standard-basic" label="Count" variant="standard" defaultValue="0"
                                   onChange={(e) => this.setState({count: e.target.value})}/>
                    </div>
                    <div>
                        <Button variant="contained" onClick={this.getFromBackEnd}>GET FROM BACK-END</Button>
                    </div>
                    <div>
                        <h2>{this.state.isLoaded}</h2>
                    </div>
                    <div>
                        <Button variant="contained" onClick={this.calculateBackEnd} disabled={this.state.disabled}>CALCULATE
                            BACK-END DATA</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default App2;