import React, { Component } from "react";
import
{
  ScrollView,
  RefreshControl,
  ToastAndroid,
  StatusBar,
  Alert, View,
  BackHandler
} from "react-native";
import { WebView } from "react-native-webview";
import Loader from "./Components/Loader";
const loaderAnimation = require("./assets/cooker-loader.json");
const notFoundAnimation = require("./assets/not-found.json");
export default class App extends Component
{
  state = {
    isLoading: true,
    backCount: 1,
    isRefreshing: false,
    toastShown: false,
    url: "http://www.recipe-advisor.team/",
  };
  componentDidMount()
  {
    BackHandler.addEventListener("hardwareBackPress", this.backPressAction);
  }
  backPressAction = async () =>
  {
    const { backCount, toastShown } = this.state;
    this.RECIPE.goBack();
    if (backCount == 1) {
      if (!toastShown) {
        ToastAndroid.show("Double Tap to Exit", 2000);
        this.setState({ toastShown: true });
      }
      setTimeout(() =>
      {
        this.setState({ backCount: 1 });
      }, 700);
    }
    this.setState({ backCount: backCount + 1 });
    if (backCount > 1) {
      Alert.alert('Exit', 'Are you sure you want to exit?', [{ text: "Cancel" }, { text: "Yes", onPress: () => BackHandler.exitApp() }])
    }
  };
  handleChange = async (e) =>
  {
    const URL = await e.url;
    this.setState({ url: URL });
  };
  setRefresh = () =>
  {
    this.setState({ isLoading: true });
    this.RECIPE.reload();
    this.setState({ isLoading: false });
  }
  showRefresh = () =>
  {
    return (<RefreshControl onRefresh={this.setRefresh} refreshing={this.state.isRefreshing} />);
  }

  render()
  {
    const INJECTEDJAVASCRIPT = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `;
    return (
      <ScrollView contentContainerStyle={{ flex: 1, }} refreshControl={this.showRefresh()} keyboardShouldPersistTaps="always">
        <StatusBar barStyle="default" />
        <WebView
          source={{
            uri: this.state.url,
          }}
          isTVSelectable
          injectedJavaScript={INJECTEDJAVASCRIPT}
          originWhitelist={["*"]}
          thirdPartyCookiesEnabled
          startInLoadingState
          onShouldStartLoadWithRequest
          renderError={() => (<Loader displayAnimation={notFoundAnimation} title={"Error ! reload 🔄"} bgColor={"darkblue"} />)}
          domStorageEnabled
          allowFileAccess
          renderLoading={() => (<Loader displayAnimation={loaderAnimation} title={"Please Wait ! Cooking ..."} />)}
          ref={(ref) => (this.RECIPE = ref)}
          saveFormDataDisabled={false}
          onNavigationStateChange={(e) => this.handleChange(e)} />
      </ScrollView>

    );
  }
}
