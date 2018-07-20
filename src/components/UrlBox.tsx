import * as React from 'react';
import { Spinner, SpinnerSize, TextField } from 'office-ui-fabric-react';

export interface UrlBoxProps {
    onFaviconObtained: any
}

interface UrlBoxState {
	faviconUrl: string,
	isLoading: boolean,
	isObtained: boolean
	isInvalidUrl: boolean,
	isHttpError: boolean
}

export default class UrlBox extends React.Component<UrlBoxProps, UrlBoxState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
			faviconUrl: null,
			isLoading: false,
			isObtained: false,
			isInvalidUrl: false,
			isHttpError: false
		};
		
		this.onTextFieldBlur = this.onTextFieldBlur.bind(this);
		this.getHostName = this.getHostName.bind(this);
		this.render = this.render.bind(this);
		this.setStatusLoadingFailed = this.setStatusLoadingFailed.bind(this);
	}

	getHostName(href: string) {
		var match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
		if(!match)
			return null;
		else return match[2];
		
		// return match && {
		//     href: href,
		//     protocol: match[1],
		//     host: match[2],
		//     hostname: match[3],
		//     port: match[4],
		//     pathname: match[5],
		//     search: match[6],
		//     hash: match[7]
		// }
	}

	render() {
		let textbox = [
			<TextField label="Insert your hyperlink then click Paste" key="txtbox" 
				errorMessage={this.state.isInvalidUrl ? "Url not valid" : (this.state.isHttpError ? "Could not obtain favicon" : null)} 
				onBlur={this.onTextFieldBlur} />
		];	

		return React.createElement("React.Fragment", null,
			this.state.isLoading ? textbox.concat([<Spinner size={SpinnerSize.medium} key="spinner" />]) : textbox 
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
			isLoading: false,
			isObtained: false,
			isInvalidUrl: false,
			isHttpError: true
		});
	}

	onTextFieldBlur(newValue: React.FocusEvent<HTMLElement>) {		
		const url = (newValue.currentTarget as HTMLInputElement).value;
		const hostname = this.getHostName(url);		
		if(hostname === null) {
			this.setState({
				faviconUrl: null,
				isLoading: false,
				isObtained: false,
				isInvalidUrl: true,
				isHttpError: false
			});
		}
		else {
			this.setState({
				faviconUrl: null,
				isLoading: true,
				isObtained: false,
				isInvalidUrl: false,
				isHttpError: false
			});
			
			var getFaviconPromise = fetch("https://favicongrabber.com/api/grab/" + hostname)
			.then(function(response) {				
				if(response.ok === true)				
					return response.json();
				else
					return null;
			}).then(function(response) {
				if(response === null) {
					this.setStatusLoadingFailed();
					return;
				}
				const faviconUrl = this.pickFavicon(response);				
				this.setState({
					faviconUrl: faviconUrl,
					isLoading: false,
					isObtained: faviconUrl !== null,
					isInvalidUrl: false,
					isHttpError: false
				});

				if(faviconUrl !== null) {
					this.props.onFaviconObtained(faviconUrl);
				}
			}.bind(this) // https://stackoverflow.com/questions/34930771/why-is-this-undefined-inside-class-method-when-using-promises
			).catch(function(err) {
				console.log("Error when obtaining favicon: ", err);
				this.setStatusLoadingFailed();
			}.bind(this));

			
			const getTitlePromise = fetch(url)
			.then((response) => {
				if(!response.ok)
					return null;

				
			})

	
		}
		
	}

	

	
}