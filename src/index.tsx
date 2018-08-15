import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers'
import App from './components/App';

import './styles.less';
import 'office-ui-fabric-react/dist/css/fabric.min.css';

initializeIcons();

const store = createStore(rootReducer);

let isOfficeInitialized = false;

const title = 'OneNote Utilities Bookmark Helper';

const render = (Component) => {
    ReactDOM.render(
        <Provider store={store}>
        <AppContainer>
            <Component title={title} isOfficeInitialized={isOfficeInitialized} />
        </AppContainer>
        </Provider>,
        document.getElementById('container')
    );
};

/* Render application after Office initializes */
Office.initialize = () => {
    isOfficeInitialized = true;
    render(App);
};

/* Initial render showing a progress bar */
render(App);

if ((module as any).hot) {
    (module as any).hot.accept('./components/App', () => {
        const NextApp = require('./components/App').default;
        render(NextApp);
    });
}
