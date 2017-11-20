import React, { Component } from 'react';

class MainRoutes extends Component {
	render() {
		return null;

		// return (
		// 	<Switch>
		// 		<PropsRoute 
		// 			name="admin" 
		// 			path="/admin" 
		// 			component={AdminContainer} 
		// 			{...this.props} 
		// 		/>
		// 		<PropsRoute 
		// 			name="customer" 
		// 			path="/customer" 
		// 			component={CustomerContainer} 
		// 			{...this.props}
		// 		/>
		// 		<PrivateRoute
		// 			name="logout"
		// 			path="/logout"
		// 			component={LogoutContainer}
		// 			isAuthenticated={isAuthenticated}
		// 			user={user}
		// 			accessToken={accessToken}
		// 			redirectTo="/"
		// 		/>
		// 	</Switch>	
		// );
	}
}

export default MainRoutes;