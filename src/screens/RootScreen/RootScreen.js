import React, { PureComponent } from "react";

import NavigationService from "../../navigationService/NavigationService";
import AppStack from "../../routers";

export default class RootScreen extends PureComponent {
  render() {
    return (
      <AppStack
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}