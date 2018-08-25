export enum Actions {
	VALID_URL_ENTERED = "VALID_URL_ENTERED",
	INVALID_URL_ENTERED = "INVALID_URL_ENTERED",
	FAVICON_FETCH_STARTED = "FAVICON_FETCH_STARTED",
	FAVICON_FETCH_FAILED = "FAVICON_FETCH_FAILED",
	FAVICON_FETCH_COMPLETED = "FAVICON_FETCH_COMPLETED",
	TITLE_MODIFIED = "TITLE_MODIFIED",

	ONENOTE_BOOKMARKBLOCK_INSERTED = "ONENOTE_BOOKMARKBLOCK_INSERTED",
}

export interface IAction {
	type: Actions
}

export interface IValidUrlEnteredAction {
	type: Actions.VALID_URL_ENTERED,
	payload: {
		url: string
	}
}

export function validUrlEntered(url: string) : IValidUrlEnteredAction { return { type: Actions.VALID_URL_ENTERED, payload: { url: url }} }


export interface IInvalidUrlEnteredAction {
	type: Actions.INVALID_URL_ENTERED
}

export function invalidUrlEntered() {return { type: Actions.INVALID_URL_ENTERED} }


export interface IFaviconFetchStarted {
	type: Actions.FAVICON_FETCH_STARTED,
	url: string
}

export function faviconFetchStarted(url: string) { return {type: Actions.FAVICON_FETCH_STARTED, url: url}}

export interface IFaviconFetchFailed {
	type: Actions.FAVICON_FETCH_FAILED,
	error: string
}

export function faviconFetchFailed(error: string) { return {type: Actions.FAVICON_FETCH_FAILED, error: error}}

export interface IFaviconFetchCompleted {
	type: Actions.FAVICON_FETCH_COMPLETED,
	faviconData: string,
	faviconMime: string,
	title: string
}

export function faviconFetchCompleted(faviconData: string, faviconMime: string, title: string) {
	return {
		type: Actions.FAVICON_FETCH_COMPLETED,
		faviconData: faviconData,
		faviconMime: faviconMime,
		title: title
	};
}

export type AppActions = IValidUrlEnteredAction | IInvalidUrlEnteredAction | IFaviconFetchStarted | IFaviconFetchFailed | IFaviconFetchCompleted;

