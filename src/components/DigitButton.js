import React from 'react';
import Button from '@mui/material/Button';

class DigitButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }


    handleClick() {
        const data = this.props.data;
        const text = this.props.text;
        if (data.b === '' && data.sign === '') {
            data.a += text;
        } else if (data.a !== '' && data.b !== '' && data.finish) {
            data.b = text;
            data.finish = false;
        } else {
            data.b += text;
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

export default DigitButton;
