import * as React from 'react';
import { Spinner, SpinnerSize, TextField } from 'office-ui-fabric-react';

export interface UrlBoxProps {
    onFaviconObtained: any
}

interface UrlBoxState {
	faviconUrl: string,
	faviconData: string,
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
			faviconData: null,
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

	postWithData = (url = ``, data = {}) => {
		// Default options are marked with *
		  return fetch(url, {
			  method: "POST", // *GET, POST, PUT, DELETE, etc.
			  mode: "cors", // no-cors, cors, *same-origin
			  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
			  credentials: "same-origin", // include, same-origin, *omit
			  headers: {
				  "Content-Type": "application/json; charset=utf-8",
				  // "Content-Type": "application/x-www-form-urlencoded",
			  },
			  redirect: "follow", // manual, *follow, error
			  referrer: "no-referrer", // no-referrer, *client
			  body: JSON.stringify(data), // body data type must match "Content-Type" header
		  })
		  .then(response => response.json()) // parses response to JSON
		  .catch(error => console.error(`Fetch Error =\n`, error));
	  };

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
		const hostname = this.getHostName(url);		
		if(hostname === null) {
			this.setState({
				faviconUrl: null,
				faviconData: null,
				isLoading: false,
				isObtained: false,
				isInvalidUrl: true,
				isHttpError: false
			});
		}
		else {
			this.setState({
				faviconUrl: null,
				faviconData: null,
				isLoading: true,
				isObtained: false,
				isInvalidUrl: false,
				isHttpError: false
			});
			
			this.postWithData("https://onenoteutilities/AddinServices/api/pageinfo", { address: url })
				.then(function(response) {
				if(response === undefined) {
					this.setStatusLoadingFailed();
					return;
				}
				const error = response.Error;
				const faviconData = response.FaviconData;
				const faviconMime = response.FaviconMime;
				const title = response.Title;

				if(error !== "") {
					this.setStatusLoadingFailed();
					console.log(error);
					return;
				}
				
				this.setState({
					faviconUrl: null,
					faviconData: faviconData,
					isLoading: false,
					isObtained: faviconData !== undefined,
					isInvalidUrl: false,
					isHttpError: false
				});

				if(faviconData !== undefined) {
					this.props.onFaviconObtained(faviconData, faviconMime, title);
				}
			}.bind(this) // https://stackoverflow.com/questions/34930771/why-is-this-undefined-inside-class-method-when-using-promises
			).catch(function(err) {
				console.log("Error when obtaining favicon: ", err);
				this.setStatusLoadingFailed();
			}.bind(this));

			
			

	
		}
		
	}

	
	

	
}
