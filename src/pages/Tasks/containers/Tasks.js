import React from "react";
import {connect} from "react-redux";
import tasksActions from '../actions/tasks'
import Button from '@mui/material/Button';
import {TextField} from "@mui/material";

class Tasks extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.calculateBackEnd = this.calculateBackEnd.bind(this)

    }

    handleClick() {
        this.props.data.disabled = false;
        if (this.props.data.count > 0) {
            tasksActions.fetchTasks({
                tasksCount: this.props.data.count,
            })(this.props.dispatch);
        } else (
            alert("Count should be more than 0")
        )
    }

    calculateBackEnd() {
        let tempRes = 0;
        let dig = [];
        let ops = [];
        for (let i = 0; i < this.props.list.length; i++) {
            dig = this.props.list[i].match(/(?<![-\d])\d+/g).map(v => +v);
            ops = this.props.list[i].split(' ');
            if (ops.includes('+')) {
                tempRes = (+dig[0]) + (+dig[1]);
            } else if (ops.includes('-')) {
                tempRes = dig[0] - dig[1];
            } else if (ops.includes('*')) {
                tempRes = dig[0] * dig[1];
            } else if (ops.includes('/')) {
                tempRes = dig[0] / dig[1];
            }
            this.addResult(dig[0] + ops[1] + dig[1] + '=' + tempRes);
        }
        this.props.onInput(this.props.data);
    }

    addResult(result) {
        this.props.data.results.push(result);
    }

    render() {
        const tasks = this.props;
        return (
            <div>
                <div>
                    <TextField id="standard-basic" type="number" InputProps={{inputProps: {min: 0}}} label="Count"
                               variant="standard" defaultValue="1"
                               onChange={(e) => this.props.data.count = e.target.value}/>
                </div>
                <br/>
                <Button variant="contained" onClick={this.handleClick}>
                    GET DATA FROM BACK-END
                </Button>
                {tasks.isLoading && (
                    <div>
                        Loading...
                    </div>
                )}
                {!tasks.isLoading && (
                    <div>
                        {
                            tasks.list.map((item) => (
                                <p key={item}>{item}</p>
                            ))}
                    </div>
                )}

                <Button variant="contained" onClick={this.calculateBackEnd} disabled={this.props.data.disabled}>CALCULATE
                    BACK-END DATA</Button>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    ...reduxState,
});

const mapDispatchToProps = dispatch => ({
    dispatch,
})
export default connect(mapReduxStateToProps, mapDispatchToProps)(Tasks);