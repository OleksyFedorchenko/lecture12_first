import React from 'react';
import Button from '@mui/material/Button';

class EqualsButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        const data = this.props.data;
        data.signPrev = data.sign;
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
                    data.temp = data.a / data.b;
                    break;
            }
            data.results.push(data.a + data.signPrev + data.b + '=' + data.temp);
            data.b = '';
            data.a = data.temp;
            data.signPrev = '';
            data.sign = '';
            data.out = data.a;
        } else {
            data.signPrev = '';
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