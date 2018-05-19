import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';

const OutageForm = ({outage, onSave, onChange, saving, errors}) => {
    return (
        <form>
            <h1>Manage Outage</h1>
            <TextInput
                name="id"
                label="Id"
                value={outage.id}
                onChange={onChange}
                error={errors.id}
            />
            <TextInput
                name="title"
                label="Description"
                value={outage.title}
                onChange={onChange}
                error={errors.title}
            />
            <TextInput
                name="begin"
                label="Start Date"
                value={outage.begin}
                onChange={onChange}
                error={errors.begin}
            />
            <TextInput
                name="end"
                label="End Date"
                value={outage.end}
                onChange={onChange}
                error={errors.end}
            />
            <input
                type="submit"
                disabled={saving}
                value={saving ? 'Saving...' : 'Save'}
                className="btn btn-primary"
                onClick={onSave}
            />
        </form>
    );
};

OutageForm.propTypes = {
    outage: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool,
    errors: PropTypes.object
};

export default OutageForm;