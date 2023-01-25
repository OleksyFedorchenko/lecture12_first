import React from 'react';
import Button from '@mui/material/Button';

class ActionButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)

    }

    handleClick(){
        if (this.props.data.a === '') this.props.data.a = '0';
        this.props.data.signprev = this.props.data.sign;
        this.props.data.sign = this.props.text;
        if (this.props.data.a !== '' && this.props.data.b !== '') {
            switch (this.props.data.signprev) {
                case "+":
                    this.props.data.temp = (+this.props.data.a) + (+this.props.data.b);
                    break;
                case "-":
                    this.props.data.temp = this.props.data.a - this.props.data.b;
                    break;
                case "*":
                    this.props.data.temp = this.props.data.a * this.props.data.b;
                    break;
                case "/":
                    this.props.data.temp = this.props.data.a / this.props.data.b;
                    break;
            }
            this.props.data.results.push(this.props.data.a + this.props.data.signprev + this.props.data.b + '=' + this.props.data.temp);
            this.props.data.b = '';
            this.props.data.a = this.props.data.temp;
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
export default ActionButton;