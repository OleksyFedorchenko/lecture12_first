import React from 'react';
import Button from '@mui/material/Button';

class ActionButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)

    }

    handleClick() {
        const data = this.props.data;
        const text = this.props.text;
        if (data.a === '') data.a = '0';
        data.signPrev = data.sign;
        data.sign = text;
        if (data.a !== '' && data.b !== '') {
            // eslint-disable-next-line
            switch (data.signPrev) {
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
                    data.b === '0' ? data.temp = "Error division by zero" : data.temp = data.a / data.b;
                    break;
            }
            data.results.push(data.a + data.signPrev + data.b + '=' + data.temp);
            data.b = '';
            data.temp === "Error division by zero" ? data.a = '0' : data.a = data.temp;
        }
        data.out = data.a + data.sign + data.b;
        this.props.onInput(data);
    }

    render() {
        return (
            <Button variant="contained" onClick={this.handleClick}>{this.props.text}</Button>
        );
    }
}

export default ActionButton;