import React from 'react';

class DigitButton extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            a:'',
            b:'',
        }
    }

    render() {
        return (
            <button onClick={()=>this.props.onAdd({
                a:this.state.a+this.props.text,
            })}>{this.props.text} </button>
    );
    }
}

export default DigitButton;
