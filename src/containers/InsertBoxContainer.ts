import InsertBox, { IInsertBoxProps } from '../components/InsertBox'

import { IAppState, FetchState } from '../stateDefinition'

// special syntax for including an image
const logo = require("../../assets/icon-32.png") as string;

import { connect } from 'react-redux';

function mapStateToProps(state: IAppState) : IInsertBoxProps {
	let props;
	if(state.fetchState === FetchState.FETCH_OK) {
		props = {
			title: state.fetchedTitle,
			link: state.url,
			faviconUrl: state.faviconUrl,
			faviconImageData: state.faviconData,
			faviconMime: state.faviconMime
		};
		
	}
	else {
		props = {
			title: "",
			link: "",
			faviconUrl: "",
			faviconImageData: "",
			faviconMime: ""
		}
	}
	
	return props;
}

export const InsertBoxContainer = connect(mapStateToProps)(InsertBox);