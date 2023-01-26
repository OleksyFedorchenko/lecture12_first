import React from "react";
import {connect} from "react-redux";

class Tasks extends React.Component{
    render() {
        console.log(this.props);
        return(
            <div>
                Tasks
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    ...reduxState,
});
export default connect(mapReduxStateToProps)(Tasks);