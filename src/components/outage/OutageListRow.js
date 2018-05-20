import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import { hash } from '../../api/cryptoUtil';

const OutageListRow = ({outage}) => {
    
    return (
        <tr>
            <td><Link to={'/outage/' + outage.id}>{outage.id}</Link></td>
            <td>{outage.title}</td>
            <td>{outage.begin}</td>
            <td>{outage.end}</td>
            <td>{hash(outage)}</td>
        </tr>
    );
};

OutageListRow.propTypes = {
    outage: PropTypes.object.isRequired
};

export default OutageListRow;