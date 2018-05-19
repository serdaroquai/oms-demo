import React, {PropTypes} from 'react';
import OutageListRow from './OutageListRow';

const OutageList = ({outages}) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>&nbsp;</th>
                    <th>Outage Id</th>
                    <th>Description</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                </tr>
            </thead>
            <tbody>
                {outages.map(outage => <OutageListRow key={outage.id} outage={outage}/>)}
            </tbody>
        </table>
    );
};

OutageList.propTypes = {
    outages: PropTypes.array.isRequired
};

export default OutageList;