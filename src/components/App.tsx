import * as React from 'react';
import { Button } from 'office-ui-fabric-react';
import * as OfficeHelpers from '@microsoft/office-js-helpers';

import Header from './Header';

import { UrlBoxContainer } from '../containers/UrlBoxContainer';
import { PreviewContainer } from '../containers/PreviewContainer';

import './AppStyles.css'

import { dumpParagraphs } from '../onenote-trial'

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
        
        //dumpParagraphs();

        //dumpPage();

        try {
            // await this.wait(2000);
            // console.log("after wait");
            await OneNote.run(async context => {
                
               var page = context.application.getActivePage();
                
                page.load("contents");                

                const restApiId = page.getRestApiId();

                await context.sync();                

                console.log("outlines: " + page.contents.items.length) ;
                console.log("page rest api id: " + restApiId.value) ;

                page.contents.load("outline");

                await context.sync();    

                const outline = page.contents.items[0].outline;
                                
                //console.log("outline id is " + outline.id);
                //outline.load("paragraphs");

                outline.appendHtml("<table border=\"1\"><tr><td>first cell</td><td>second cell</td></table>");

                console.log("before appendHtml");
                await context.sync();
                console.log("after appendHtml");
               
                //const para = outline.paragraphs;
                
                
                //para.load("items");
                

                console.log("before reading items");
                await context.sync();
                console.log("after reading items");

                
                // for(var i=0; i < outline.paragraphs.count; i++) {
                //     var para = outline.paragraphs.items[i];

                //     para.load("richText");
    
                //     await context.sync();
    
                //     var rich = para.richText;
    
                //     var html = rich.getHtml();
    
                //     await context.sync();
    
                //     console.log(html.value);
                // }               

                // para.items[0].insertHtmlAsSibling(OneNote.InsertLocation.after,
                //       "<p style=\"\" language=\"mi-mi\">Language mi-mi</p>");


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
