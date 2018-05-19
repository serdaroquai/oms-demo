import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const OutageListRow = ({outage}) => {
    return (
        <tr>
            <td><a href="#">Save to blockChain</a></td>
            <td><Link to={'/outage/' + outage.id}>{outage.id}</Link></td>
            <td>{outage.title}</td>
            <td>{outage.begin}</td>
            <td>{outage.end}</td>
        </tr>
    );
};

OutageListRow.propTypes = {
    outage: PropTypes.object.isRequired
};

export default OutageListRow;