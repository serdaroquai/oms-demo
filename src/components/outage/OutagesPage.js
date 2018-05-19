import React, {PropTypes} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as outageActions from '../../actions/outageActions';
import OutageList from './OutageList';
import {browserHistory} from 'react-router';

class OutagesPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.redirectToCreateOutagePage = this.redirectToCreateOutagePage.bind(this);
    }

    redirectToCreateOutagePage() {
        browserHistory.push('/outage');
    }

    render() {
        const {outages} = this.props;

        return (
            <div>
                <h1>Outages</h1>
                <input
                    type="submit"
                    value="Create Outage"
                    className="btn btn-primary"
                    onClick={this.redirectToCreateOutagePage}
                />
                <OutageList outages={outages}/>
            </div>
        );
    }
}

OutagesPage.propTypes = {
    outages: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        outages: state.outages
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(outageActions, dispatch)
    };
    // return {
    //     createOutage: outage => dispatch(outageActions.createOutage(outage))
    // };
}

export default connect(mapStateToProps, mapDispatchToProps)(OutagesPage);