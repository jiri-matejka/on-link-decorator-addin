import { connect } from 'react-redux'

import { IAppState, FetchState } from '../stateDefinition'
import { IPreviewStaticProps } from '../components/Preview'
import Preview from '../components/Preview'

// function mapDispatchToProps(dispatch) : IPreviewDispatchProps {
// 	return {
		
// 	};
// }

function mapStateToProps(state : IAppState) : IPreviewStaticProps {
	return {
		hasFavicon: state.faviconData !== null,
		faviconData: state.faviconData,
		faviconMime: state.faviconMime,
		isLoading: state.fetchState === FetchState.FETCH_IN_PROGRESS,
		isVisible: state.fetchState !== FetchState.NOT_STARTED,
		isErrored: state.fetchState === FetchState.FETCH_ERROR,
		title : state.title === null ? "" : state.title,
		error: state.fetchError
	};
}

export const PreviewContainer = connect(mapStateToProps)(Preview);

