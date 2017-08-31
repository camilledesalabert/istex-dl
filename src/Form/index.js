import React from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import './style.css';
import Filetype from '../Filetype';

export default class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            q: '',
            size: 1,
            extractMetadata: false,
            extractFulltext: false,
            extractEnrichments: false,
            extractCover: false,
            extractAnnexes: false,
        };

        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleQueryChange(event) {
        const target = event.target;
        this.setState({
            q: target.value,
        });
        const ISTEX = this.buildURLFromState();

        ISTEX.searchParams.delete('extract');

        fetch(ISTEX.href)
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error('Bad response from server');
                }
                return response.json().then((json) => {
                    const { total } = json;
                    this.setState({
                        total,
                    });
                });
            });
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;

        const value = target.type && target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            [name]: value,
        });
    }

    handleSubmit(event) {
        const { href } = this.buildURLFromState();
        window.location = href;
        event.preventDefault();
    }

    buildURLFromState() {
        const ISTEX = new URL('https://api.istex.fr/document/');
        let extract = '';

        if (this.state.extractMetadata) {
            extract = extract.concat('metadata;');
        }
        if (this.state.extractFulltext) {
            extract = extract.concat('fulltext;');
        }

        ISTEX.searchParams.set('q', this.state.q);
        ISTEX.searchParams.set('extract', extract);
        ISTEX.searchParams.set('size', this.state.size);

        return ISTEX;
    }

    render() {
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="q" className="col-sm-1 control-label">Requête</label>
                    <div className="col-sm-11">
                        <textarea
                            className="form-control"
                            name="q"
                            id="q"
                            rows="3"
                            autoFocus="true"
                            value={this.state.q}
                            onChange={this.handleQueryChange}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <span className="col-sm-1 control-label">Documents à télécharger</span>
                    <div className="col-sm-11">
                        {this.state.total}
                    </div>
                </div>
                <Filetype
                    label="Métadonnées"
                    filetype="metadata"
                    formats="xml,mods"
                    labels="XML|MODS"
                />
                <Filetype
                    label="Texte intégral"
                    filetype="fulltext"
                    formats="pdf,tei,txt,ocr,zip,tiff"
                    labels="PDF|TEI|TXT|OCR|ZIP|TIFF"
                />
                <Filetype
                    label="Annexes"
                    filetype="annexes"
                    formats="pdf,jpeg,qt,ppt,xls,avi,xml,gif,wmv"
                    labels="PDF|JPEG|QT|PPT|XLS|AVI|XML|GIF|WMV"
                />
                <Filetype
                    label="Couvertures"
                    filetype="covers"
                    formats="pdf,gif,jpg"
                    labels="PDF|GIF|JPEG"
                />
                <Filetype
                    label="Enrichissements"
                    filetype="enrichments"
                    formats="tei"
                    labels="TEI"
                />
                <div className="form-group">
                    <div className="col-sm-10">
                        <div className="checkbox">
                            <label htmlFor="size" className="col-sm-1">Size</label>
                            <div className="col-sm-1">
                                <InputRange
                                    id="size"
                                    maxValue={200}
                                    minValue={0}
                                    value={this.state.size}
                                    onChange={size => this.setState({ size })}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-1 col-sm-11">
                        <button type="submit" className="btn btn-primary">Télécharger</button>
                    </div>
                </div>
            </form>
        );
    }
}
