// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/asyncInjectors';
import loginHeaderSagas from 'containers/LogInHeader/sagas';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err);
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  injectSagas(loginHeaderSagas);

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/LogInHeader/reducer'),
          System.import('containers/LogInHeader'),
          System.import('containers/HomePage/reducer'),
          System.import('containers/HomePage/sagas'),
          System.import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([
          logInReducer,
          logInComponent,
          reducer,
          sagas,
          component,
        ]) => {
          injectReducer('logInHeader', logInReducer.default);
          injectReducer('home', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/features',
      name: 'features',
      getComponent(nextState, cb) {
        System.import('containers/FeaturePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/entries/new',
      name: 'newEntry',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Entry/reducer'),
          System.import('containers/Entry/sagas'),
          System.import('containers/Entry'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('entry', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component, { needsAuth: true });
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/register',
      name: 'register',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Register/reducer'),
          System.import('containers/Register/sagas'),
          System.import('containers/Register'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('register', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/login',
      name: 'logIn',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Register/reducer'),
          System.import('containers/Register/sagas'),
          System.import('containers/Register'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('register', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/entries',
      name: 'entryListCont',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Entry/reducer'),
          System.import('containers/Entry/sagas'),
          System.import('containers/EntryListCont/reducer'),
          System.import('containers/EntryListCont/sagas'),
          System.import('containers/EntryListCont'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([
          entryReducer,
          entrySagas,
          reducer,
          sagas,
          component,
        ]) => {
          injectReducer('entry', entryReducer.default);
          injectSagas(entrySagas.default)
          injectReducer('entryListCont', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/entries/:entryId',
      name: 'viewEntryCont',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/ViewEntryCont/reducer'),
          System.import('containers/ViewEntryCont/sagas'),
          System.import('containers/ViewEntryCont'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('viewEntryCont', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
