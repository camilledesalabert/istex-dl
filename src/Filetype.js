import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormGroup } from 'react-bootstrap';
import Format from './Format';

export default class Filetype extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            [props.filetype]: props.value || false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.formats = props.formats.split(',')
            .map((format, n) => <Format
                key={`format${format}`}
                label={props.labels.split('|')[n]}
                format={format}
                filetype={props.filetype}
                onChange={props.onFormatChange}
            />);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });

        this.props.onChange({
            filetype: this.props.filetype,
            value,
            format: this.state,
        });
    }

    render() {
        return (
            <FormGroup>
                <Checkbox
                    name={this.props.filetype}
                    checked={this.state[this.props.filetype]}
                    onChange={this.handleInputChange}
                >
                    {this.props.label}
                </Checkbox>
                <FormGroup bsClass="indent">
                    {this.formats}
                </FormGroup>
            </FormGroup>
        );
    }
}

Filetype.propTypes = {
    label: PropTypes.string.isRequired,
    filetype: PropTypes.string.isRequired,
    formats: PropTypes.string.isRequired,
    labels: PropTypes.string.isRequired,
    value: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onFormatChange: PropTypes.func.isRequired,
};

Filetype.defaultProps = {
    value: false,
};
