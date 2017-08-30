import React from 'react';
import PropTypes from 'prop-types';
import Format from './Format.jsx';

export default class Filetype extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    render() {
        return (
            <div className="checkbox">
                <label htmlFor="checkbox">{this.props.label}</label>
                <input
                    type="checkbox"
                    id="checkbox"
                    name={this.props.filetype}
                    checked={this.state.checked}
                    onChange={this.handleInputChange}
                />
                <div>
                    <Format
                        format={this.props.formats[0]}
                        label={this.props.labels[0]}
                    />
                </div>
            </div>
        );
    }
}

Filetype.propTypes = {
    label: PropTypes.string.isRequired,
    filetype: PropTypes.string.isRequired,
    formats: PropTypes.arrayOf.string.isRequired,
    labels: PropTypes.arrayOf.string.isRequired,
};
