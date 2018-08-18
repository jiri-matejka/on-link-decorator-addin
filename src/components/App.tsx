import * as React from 'react';
import { Button } from 'office-ui-fabric-react';
import Header from './Header';
import Preview from './Preview';
import UrlBox from './UrlBox';

import * as OfficeHelpers from '@microsoft/office-js-helpers';

export interface AppProps {
    title: string
    isOfficeInitialized: boolean;
}

export interface AppState {
    title: string;
    faviconData: string;
    faviconMime: string;
}

export default class App extends React.Component<AppProps, AppState> {    
    constructor(props, context) {
        super(props, context);
        this.onFaviconObtained = this.onFaviconObtained.bind(this);
        this.render = this.render.bind(this);
        this.state = {
            title: null,
            faviconData: null,
            faviconMime: null
        };
    }

    componentDidMount() {
    }

    click = async () => {
        try {
            await OneNote.run(async context => {
                /**
                 * Insert your OneNote code here
                 */
                return context.sync();
            });
        } catch(error) {
            OfficeHelpers.UI.notify(error);
            OfficeHelpers.Utilities.log(error);
        };
    }

    render() {
        // const {
        //     title,
        //     isOfficeInitialized,
        // } = this.props;

        // if (!isOfficeInitialized) {
        //     return (
        //         <Progress
        //             title={title}
        //             logo='assets/logo-filled.png'
        //             message='Please sideload your addin to see app body.'
        //         />
        //     );
        // }

        const haveFavicon = this.state.title !== "" && this.state.title !== null;

        let elements = new Array(3);

        elements.push (<Header logo='assets/logo-filled.png' title={this.props.title} message='Welcome' />);
        elements.push(<UrlBox onFaviconObtained={this.onFaviconObtained} />);
       
        elements.push(<Preview isVisible={haveFavicon} isLoading={false} faviconData={this.state.faviconData} 
            faviconMime={this.state.faviconMime} title={this.state.title} />);
    
        elements.push(<Button primary text="Insert" disabled={!haveFavicon} />)


        return React.createElement("div", {className: "ms-welcome"}, elements);
        
    }

    onFaviconObtained(faviconData: string, faviconMime: string, title: string) {
        this.setState({
            title: title,
            faviconData: faviconData,
            faviconMime: faviconMime
        });
    }
}
