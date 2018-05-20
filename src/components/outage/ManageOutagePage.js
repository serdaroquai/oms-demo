import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as outageActions from '../../actions/outageActions';
import OutageForm from './OutageForm';
import toastr from "toastr";
import { hash } from "../../api/cryptoUtil";
//import neoApi from "../../api/mockNeoApi";
import neoApi from "../../api/neoApi";

class ManageOutagePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            outage: Object.assign({}, this.props.outage),
            errors: {},
            saving: false, //local state
            savingChain: false,
            verifyingChain: false
        };

        this.updateOutageState = this.updateOutageState.bind(this); 
        this.saveOutage = this.saveOutage.bind(this);
        this.saveChain = this.saveChain.bind(this);
        this.verifyChain = this.verifyChain.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.outage.id != nextProps.outage.id) {
            this.setState({outage: Object.assign({},nextProps.outage)});
        }
    }

    saveChain(event) {
        event.preventDefault();
        this.setState({savingChain:true});
        const outage = this.state.outage;
        
        return neoApi.saveOutage(outage).then(savedOutage => {
            this.setState({savingChain:false});
            toastr.success("Transaction issued on chain");
        }).catch(error => {
            this.setState({savingChain:false});
            toastr.error(error);
        });
    }

    verifyChain(event) {
        event.preventDefault();
        this.setState({verifyingChain:true});
        const outage = this.state.outage;
        neoApi.getOutage(outage).then(result => {
            this.setState({verifyingChain:false});
            const outageHash = hash(outage);
            if (typeof result != undefined && result === outageHash){
                toastr.success("Verify Outage success");
            } else {
                toastr.error("Verify Outage failed");
            }
        }).catch(error => {
            this.setState({verifyingChain:false});
            toastr.error(error);
        });

        // this.props.actions.verifyChain(this.state.outage).then(()=>{
        //     this.setState({verifyingChain:false});
        //     // const outageHash = hash(this.state.outage);
        //     // if (typeof result == undefined || result == null) {
        //     //     toastr.error("Outage not found on chain");
        //     // } else if ( outageHash === result) {
        //     //     toastr.success("Outage matches with chain");
        //     // } else {
        //     //     toastr.error("Outage does not match with chain");
        //     // }
        // }).catch(error=>{
        //     this.setState({verifyingChain:false});
        //     toastr.error(error);
        // });
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
        }).catch(error=>{
            this.setState({saving:false});
            toastr.error(error);
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
                savingChain={this.state.savingChain}
                onSaveChain={this.saveChain}
                verifyingChain={this.state.verifyingChain}
                onVerifyChain={this.verifyChain}
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