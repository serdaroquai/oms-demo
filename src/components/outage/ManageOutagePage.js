import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as outageActions from '../../actions/outageActions';
import OutageForm from './OutageForm';
import toastr from "toastr";

class ManageOutagePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            outage: Object.assign({}, this.props.outage),
            errors: {},
            saving: false //local state
        };

        this.updateOutageState = this.updateOutageState.bind(this); 
        this.saveOutage = this.saveOutage.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.outage.id != nextProps.outage.id) {
            this.setState({outage: Object.assign({},nextProps.outage)});
        }
    }

    updateOutageState(event) {
        const field = event.target.name;
        let outage = Object.assign({}, this.state.outage);
        outage[field] = event.target.value;
        return this.setState({outage: outage});
    }

    saveOutage(event) {
        event.preventDefault();
        this.setState({saving:true});
        this.props.actions.saveOutage(this.state.outage).then(()=>{
            this.setState({saving:false});
            toastr.success("Outage saved");
            this.redirect();
        });
    }

    redirect() {
        this.context.router.push('/outages');
    }

    render() {
        return (
            <OutageForm 
                outage={this.state.outage} 
                onChange={this.updateOutageState}
                onSave={this.saveOutage}
                errors={this.state.errors}
                saving={this.state.saving}
            />
        );
    }
}

ManageOutagePage.propTypes = {
    outage: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired     
};

// Pull in React router context so router is available on this.context.router
// Since its a static type must be done after class declaration
ManageOutagePage.contextTypes = {
    router: PropTypes.object
};

function getOutageById(outages, id) {
    const outageArr = outages.filter(outage => outage.id == id);
    if (outageArr.length) return outageArr[0]; //filter returns an array
    return null;
}

function mapStateToProps(state, ownProps) {
    const outageId = ownProps.params.id; //from the path '/outage/:id', :id defined in routes.js file

    let outage = { id: '', title: '', begin: '', end: '' };

    if (outageId && state.outages.length > 0) {
        outage = getOutageById(state.outages, outageId);
    }

    return {
        outage: outage
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(outageActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageOutagePage);