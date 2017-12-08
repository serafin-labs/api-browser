import * as React from "react";

export class ApiSearchBar extends React.Component<{ apiUrl: string, internalUrl: string, onSubmit: (apiUrl: string, internalUrl: string) => any }, { apiUrl: string, internalUrl: string }> {
    constructor(props) {
        super(props);
        this.state = { apiUrl: props.apiUrl, internalUrl: props.internalUrl };
    }

    handleURLChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.refs.apiUrl['value'], this.refs.internalUrl['value']);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ internalUrl: nextProps.internalUrl });
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} >
                    <div className="input-group">
                        <span className="input-group-addon" id="btnGroupAddon">URL</span>
                        <input className="form-control" placeholder="API base URL..." aria-label="API base URL..." ref='apiUrl' type='text' name='apiUrl' value={this.state.apiUrl} onChange={this.handleURLChange} ></input>
                        <input className="form-control" placeholder="relative URL..." aria-label="relative URL..." ref='internalUrl' type='text' name='internalUrl' value={this.state.internalUrl} onChange={this.handleURLChange} ></input>
                        <span className="input-group-btn">
                            {this.state.apiUrl && <input className="btn btn-primary" type='submit' value="OK" />}
                        </span>
                    </div>
                </form>
            </div>
        );
    }
}