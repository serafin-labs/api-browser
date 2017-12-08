import * as React from "react";
import * as _ from "lodash"

class ApiRelation extends React.Component<{ onClick: () => any, name: string, href: string, templated: boolean }> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="input-group">
                <span className="input-group-addon col-3" id="btnGroupAddon">{this.props.name}</span>
                <span className="input-group-btn .col-8">
                    {this.props.templated ?
                        <input className="btn btn-primary" type='button' disabled value={this.props.href} />
                        :
                        <input className="btn btn-primary" type='button' onClick={this.props.onClick} value={this.props.href} />
                    }
                </span>
            </div>
        )
    };
}

export class ApiRelations extends React.Component<{ content: object, internalUrlChange: (url: string) => any }> {
    constructor(props) {
        super(props);
    }

    render() {
        let relations = [];
        if (this.props.content['_links']) {
            relations = _.map(this.props.content['_links'], (link, key) =>
                <ApiRelation key={key} name={key} href={link['href']} templated={link['templated']} onClick={() => { this.props.internalUrlChange(link['href']) }} />
            );
        }
        return (
            <div>
                {relations}
            </div>
        );
    }
}