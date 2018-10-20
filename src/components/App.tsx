import * as React from 'react';
import { Button } from 'office-ui-fabric-react';
import * as OfficeHelpers from '@microsoft/office-js-helpers';

import Header from './Header';

import { UrlBoxContainer } from '../containers/UrlBoxContainer';
import { PreviewContainer } from '../containers/PreviewContainer';

import './AppStyles.css'

export interface AppProps {
    title: string
    isOfficeInitialized: boolean;
}

export default class App extends React.Component<AppProps> {    
    constructor(props, context) {
        super(props, context);
        this.render = this.render.bind(this);
        this.onInsertClick = this.onInsertClick.bind(this);
    }

    componentDidMount() {
    }

    wait = ms => new Promise((r)=>setTimeout(r, ms));

    click = async () => {


        try {
            // await this.wait(2000);
            // console.log("after wait");
            await OneNote.run(async context => {
                
               var page = context.application.getActivePage();
              
               page.load("contents");

                await context.sync();

                const outline = page.contents.items[0].outline;

                outline.load("paragraphs");

                await context.sync();
               
                for(var i=0; i < outline.paragraphs.count; i++) {
                    var para = outline.paragraphs.items[i];

                    para.load("richText");
    
                    await context.sync();
    
                    var rich = para.richText;
    
                    var html = rich.getHtml();
    
                    await context.sync();
    
                    console.log(html.value);
                }               

                outline.paragraphs.items[0].insertHtmlAsSibling(OneNote.InsertLocation.after,
                     "<p data-id=\"test\">Data id para</p>");

              return context.sync();
            });
        } catch(error) {
            OfficeHelpers.UI.notify(error);
            OfficeHelpers.Utilities.log(error);
        };
    }

    onInsertClick() {
        this.click();
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

        let elements = new Array(3);

        elements.push (<Header logo='assets/logo-filled.png' title={this.props.title} message='Welcome' />);

        elements.push(<UrlBoxContainer />);
        elements.push(<PreviewContainer/>);

        

        elements.push(<Button primary text="Insert" className="app-primary-button" 
            onClick={this.onInsertClick} />)


        return React.createElement("div", {className: "ms-welcome"}, elements);
        
    }

  
}
