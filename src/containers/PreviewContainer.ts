import { connect } from 'react-redux'

import { IAppState, FetchState } from '../stateDefinition'
import { IPreviewStaticProps, IPreviewDispatchProps } from '../components/Preview'
import Preview from '../components/Preview'
import { titleModified } from '../actionTypes';

enum ErrorCodes {
	InvalidAddress = "InvalidAddress",
	PageNotAvailable = "PageNotAvailable"
}

function mapErrorCodeToDescription(errorCode: string): string {
	switch(errorCode) {
		case ErrorCodes.InvalidAddress:
			return "address is invalid";
		case ErrorCodes.PageNotAvailable:
			return "page is not available"
		default:
			throw new Error("Non existent enum value");
	}
}

function mapStateToProps(state : IAppState) : IPreviewStaticProps {
	return {
		hasFavicon: state.faviconData !== null,
		faviconData: state.faviconData,
		faviconMime: state.faviconMime,
		isLoading: state.fetchState === FetchState.FETCH_IN_PROGRESS,		
		isErrored: state.fetchState === FetchState.FETCH_ERROR,
		title : state.title === null && state.fetchState !== FetchState.FETCH_IN_PROGRESS ? state.url : (state.title || ''),
		error: state.fetchError !== null ? mapErrorCodeToDescription(state.fetchError) : null
	};
}

function mapDispatchToProps(dispatch) : IPreviewDispatchProps {
	return {
		onTitleChanged: x => dispatch(titleModified(x))
	};
}

export const PreviewContainer = connect(mapStateToProps, mapDispatchToProps)(Preview);

