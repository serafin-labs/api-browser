import * as React from "react";
import { ApiRelations } from "./ApiRelations";
import { ApiResources } from "./ApiResources";

export class ApiPanel extends React.Component<{ url: string, apiUrl: string, internalURLChange: (url) => any }, { content: object, error: string }> {
    constructor(props) {
        super(props);
        this.state = { content: null, error: null };
    }

    async componentDidMount() {
        return await this.fetchUrl(this.props.url);
    }

    async componentWillReceiveProps(nextProps) {
        if (this.props.url !== nextProps.url) {
            return await this.fetchUrl(nextProps.url);
        }
    }

    private async fetchUrl(url: string) {
        try {
            this.setState({ error: null, content: null });

            let result = await fetch(url, {
                method: 'GET', headers: new Headers({
                    "Content-Type": "application/hal+json",
                })
            });

            result = await result.json();
            return this.setState({ content: result, error: null });
        }
        catch (err) {
            console.error(err);
            return this.setState({ content: null, error: err.message });
        }
    }

    render() {
        if (this.state.error === null && this.state.content === null) {
            return <div>Loading...</div>
        }

        return (this.state.error !== null) ?
            <div className="alert alert-danger" role="alert">Error: {this.state.error}</div>
            :
            <ApiResources content={this.state.content} internalURLChange={this.props.internalURLChange} />
            ;
    }
}