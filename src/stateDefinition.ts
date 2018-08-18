export enum UrlState {
	NO_URL_ENTERED = "NO_URL_ENTERED",
	VALID_URL_ENTERED = "VALID_URL_ENTERED",
	INVALID_URL_ENTERED = "INVALID_URL_ENTERED"
}

export enum FetchState {
	NOT_STARTED = "NOT_STARTED",
	FETCH_ERROR = "FETCH_ERROR",
	FETCH_EMPTY = "FETCH_EMPTY",
	FETCH_OK = "FETCH_OK"
}

export interface IAppState {
	urlState: UrlState,
	fetchState: FetchState
	url: string,
	title: string,
	fetchTitle: string,
	faviconData: string,
	faviconMime: string
}

export const initialState : IAppState = {
	urlState: UrlState.NO_URL_ENTERED,
	fetchState: FetchState.NOT_STARTED,
	url: null,
	title: null,
	fetchTitle: null,
	faviconData: null,
	faviconMime: null
}

