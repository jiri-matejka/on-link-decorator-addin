import { IAppState, initialState, UrlState } from './stateDefinition'
import { Actions } from './actionTypes'
import { AppActions } from './actionTypes'

export function rootReducer(state: IAppState = initialState, action: AppActions): IAppState {
	switch(action.type) {
		case Actions.INVALID_URL_ENTERED:
			return {...state, urlState: UrlState.INVALID_URL_ENTERED, url: null};
		case Actions.VALID_URL_ENTERED:
			return {...state, urlState: UrlState.VALID_URL_ENTERED, url: action.payload.url};
		default:
			return state;
	}
	
}

