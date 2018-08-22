import * as React from 'react';
import { TextField } from 'office-ui-fabric-react';

export interface UrlBoxProps {
	onUrlEntered: any,
	isUrlValid: boolean
}

interface UrlBoxState {
	faviconUrl: string,
	faviconData: string,
	isLoading: boolean,
	isObtained: boolean
	isInvalidUrl: boolean,
	isHttpError: boolean
}

export class UrlBox extends React.Component<UrlBoxProps, UrlBoxState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
			faviconUrl: null,
			faviconData: null,
			isLoading: false,
			isObtained: false,
			isInvalidUrl: false,
			isHttpError: false
		};
		
		this.onTextFieldBlur = this.onTextFieldBlur.bind(this);
		this.render = this.render.bind(this);
		this.setStatusLoadingFailed = this.setStatusLoadingFailed.bind(this);
	}



	render() {
		
		return (
			<TextField label="Insert your hyperlink then click Paste" key="txtbox" 
				errorMessage={!this.props.isUrlValid ? "Url not valid" : null} 
				onBlur={this.onTextFieldBlur} />
		)
	}
		

	pickFavicon(faviconRecords) {
		if(faviconRecords.icons.length == 0)
			return null;
	
		let icons32 = faviconRecords.icons.filter(function (icon) { return icon.sizes === "32x32"; });
	
		if(icons32.length > 0)
			return icons32[0].src;
		else
			return faviconRecords.icons[0]; // anything
	
	}



	setStatusLoadingFailed() {
		this.setState({
			faviconUrl: null,
			faviconData: null,
			isLoading: false,
			isObtained: false,
			isInvalidUrl: false,
			isHttpError: true
		});
	}

	onTextFieldBlur(newValue: React.FocusEvent<HTMLElement>) {		
		const url = (newValue.currentTarget as HTMLInputElement).value;

		this.props.onUrlEntered(url);	
				
	}

	
	

	
}
