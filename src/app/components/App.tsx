import * as React from "react";
import { ApiPanel } from "./ApiPanel";
import { ApiSearchBar } from "./ApiSearchBar";
import * as bootstrap from 'bootstrap';

export class App extends React.Component<null, { apiUrl: string, internalUrl: string }> {
    private panel = null;

    constructor(props) {
        super(props);
        this.state = { apiUrl: 'http://localhost', internalUrl: '/' };
        this.searchBarSubmit = this.searchBarSubmit.bind(this);
    }

    searchBarSubmit(apiUrl: string, internalUrl: string) {
        this.setState({ apiUrl: apiUrl, internalUrl: internalUrl });
    }

    internalURLChange = (url: string) => {
        this.setState({ internalUrl: url });
    }

    render() {
        return (
            <div>
                <ApiSearchBar onSubmit={this.searchBarSubmit} apiUrl={this.state.apiUrl} internalUrl={this.state.internalUrl} />
                <ApiPanel apiUrl={this.state.apiUrl} internalURLChange={this.internalURLChange} url={this.state.apiUrl + this.state.internalUrl}></ApiPanel>
            </div>
        );
    }
}