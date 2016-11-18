import { UserAuthWrapper } from 'redux-auth-wrapper'
import { routerActions } from 'react-router-redux'

// Wrapper that renders the component if authed, otherwise redirects to login page.
export const UserIsAuthenticated = UserAuthWrapper({
  authSelector: (state) => state.get('global').get('user'), // how to get the user state
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated', // a nice name for this auth check
  failureRedirectPath: '/user/login',
})
