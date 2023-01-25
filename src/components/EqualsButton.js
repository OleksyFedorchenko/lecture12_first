import React from 'react';
import Button from '@mui/material/Button';

class EqualsButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        const data = this.props.data;
        data.signprev = data.sign;
        if (data.a !== '' && data.b !== '') {
            switch (data.signprev) {
                case "+":
                    data.temp = (+data.a) + (+data.b);
                    break;
                case "-":
                    data.temp = data.a - data.b;
                    break;
                case "*":
                    data.temp = data.a * data.b;
                    break;
                case "/":
                    data.temp = data.a / data.b;
                    break;
            }
            data.results.push(data.a + data.signprev + data.b + '=' + data.temp);
            data.b = '';
            data.a = data.temp;
            data.signprev = '';
            data.sign = '';
            data.out = data.a;
        } else {
            data.signprev = '';
            data.sign = '';
        }
        this.props.onInput(data);
    }

    render() {
        return (
            <Button variant="contained" onClick={this.handleClick}>{this.props.text}</Button>
        );
    }
}

export default EqualsButton;