import React from 'react';
import Button from '@mui/material/Button';

class DigitButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }


    handleClick() {
        if (this.props.data.b === '' && this.props.data.sign === '') {
            this.props.data.a += this.props.text;
        } else if (this.props.data.a !== '' && this.props.data.b !== '' && this.props.data.finish) {
            this.props.data.b = this.props.text;
            this.props.data.finish = false;
        } else {
            this.props.data.b += this.props.text;
        }
        this.props.data.out=this.props.data.a+this.props.data.sign+this.props.data.b;
        this.props.onInput(this.props.data);
    }

    render() {
        return (
            <Button variant="contained" onClick={this.handleClick}>{this.props.text}</Button>
        );
    }
}

export default DigitButton;
