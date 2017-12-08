import * as React from "react";
import { ApiRelations } from "./ApiRelations";
import * as _ from "lodash"

class ApiResource extends React.Component<{ content: object, internalURLChange: (url: string) => any }> {
    constructor(props) {
        super(props);
    }

    render() {
        let properties = _.map(_.omit(this.props.content, '_links'), (value, key) =>
            <div key={key} className="form-group row" >
                <label className="col-form-label col-3">{key}</label>
                <input className="form-control col-9" type="text" id={key} value={value.toString()} />
            </div>
        );

        return (
            <div className='container resource'>
                <ApiRelations content={this.props.content} internalUrlChange={this.props.internalURLChange} />
                {properties.length > 0 &&
                    <div className='container properties'>
                        {properties}
                    </div>
                }
            </div>
        );
    }
}

class ApiResourceCollection extends React.Component<{ content: object, internalURLChange: (url: string) => any }> {
    render() {
        let data = _.map(this.props.content, (content, key) =>
            <ApiResource key={key} content={content} internalURLChange={this.props.internalURLChange} />
        );

        return data;
    }
}

export class ApiResources extends React.Component<{ content: object, internalURLChange: (url: string) => any }> {
    constructor(props) {
        super(props);
    }

    render() {
        let resources = null;
        if (this.props.content['data']) {
            resources = (
                <div className='container resource-collection'>
                    <ApiResource content={_.omit(this.props.content, 'data')} internalURLChange={this.props.internalURLChange} />
                    <ApiResourceCollection content={this.props.content['data']} internalURLChange={this.props.internalURLChange} />
                </div>
            );
        } else {
            resources = (
                <div className='container resource-collection'>
                    <ApiResource content={this.props.content} internalURLChange={this.props.internalURLChange} />
                </div>
            );
        }

        return resources;
    }
}