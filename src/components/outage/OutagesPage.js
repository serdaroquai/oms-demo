import React, {PropTypes} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as outageActions from '../../actions/outageActions';

class OutagesPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    outageRow(outage, index) {
        return <div key={index}>{outage.title}</div>;
    }

    render() {
        return (
            <div>
                <h1>Outages</h1>
                {this.props.outages.map(this.outageRow)}
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