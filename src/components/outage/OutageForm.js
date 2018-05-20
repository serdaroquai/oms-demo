import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import { hash } from "../../api/cryptoUtil";

const OutageForm = ({outage, onSave, onChange, saving, errors, savingChain, onSaveChain, verifyingChain, onVerifyChain}) => {
    return (
        <form>
            <h1>Manage Outage</h1>
            <TextInput
                name="id"
                label="Id"
                value={outage.id}
                onChange={onChange}
                error={errors.id}
                disabled={false}
            />
            <TextInput
                name="title"
                label="Description"
                value={outage.title}
                onChange={onChange}
                error={errors.title}
                disabled={false}
            />
            <TextInput
                name="begin"
                label="Start Date"
                value={outage.begin}
                onChange={onChange}
                error={errors.begin}
                disabled={false}
            />
            <TextInput
                name="end"
                label="End Date"
                value={outage.end}
                onChange={onChange}
                error={errors.end}
                disabled={false}
            />
            <TextInput
                name="hash"
                label="Hash Value"
                value={hash(outage)}
                onChange={onChange}
                error={errors.end}
                disabled
            />
            <div class="row">
                <input
                    type="submit"
                    disabled={saving}
                    value={saving ? 'Saving...' : 'Save'}
                    className="btn btn-primary btn-space"
                    onClick={onSave}
                />
                <input
                    type="submit"
                    disabled={savingChain}
                    value={savingChain ? 'Saving...' : 'Save on Chain'}
                    className="btn btn-primary btn-space"
                    onClick={onSaveChain}
                />
                <input
                    type="submit"
                    disabled={verifyingChain}
                    value={verifyingChain ? 'Verifying...' : 'Verify'}
                    className="btn btn-primary"
                    onClick={onVerifyChain}
                />
            </div>
            
        </form>
    );
};

OutageForm.propTypes = {
    outage: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool,
    errors: PropTypes.object,
    savingChain: PropTypes.bool,
    onSaveChain: PropTypes.func.isRequired,
    verifyingChain: PropTypes.bool,
    onVerifyChain: PropTypes.func.isRequired
};

export default OutageForm;