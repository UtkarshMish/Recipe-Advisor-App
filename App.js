import React, { Component } from "react";
import
{
  ActivityIndicator,
  View,
  Text,
  ImageBackground,
  ScrollView,
  RefreshControl,
  ToastAndroid,
  StatusBar,
  Alert,
  BackHandler
} from "react-native";
import { WebView } from "react-native-webview";
import AppStyles from "./AppStyles";
export default class App extends Component
{
  state = {
    isLoading: true,
    backCount: 1,
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
  handleWebviewError = () =>
  {
    return (
      <View style={AppStyles.handlers}>
        <ImageBackground
          style={AppStyles.image}
          source={require("./assets/Loading-Logo.jpg")}
        >
          <Text style={AppStyles.baseText}>Sorry !!! Offline!</Text>
        </ImageBackground>
      </View>
    );
  };
  handleChange = async (e) =>
  {
    const URL = await e.url;
    this.setState({ url: URL });
  };
  showRefresh = () =>
  {
    return (<RefreshControl onRefresh={() => (this.RECIPE.reload())} refreshing={false} />);
  }

  render()
  {
    const INJECTEDJAVASCRIPT = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `;
    return (

      <ScrollView contentContainerStyle={{ flex: 1 }} refreshControl={this.showRefresh()}>
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
          renderError={() => this.handleWebviewError()}
          domStorageEnabled
          allowFileAccess
          renderLoading={displayLoader}
          ref={(ref) => (this.RECIPE = ref)}
          saveFormDataDisabled={false}
          onNavigationStateChange={(e) => this.handleChange(e)}
        />
      </ScrollView>

    );
  }
}

function displayLoader()
{
  return (<View style={AppStyles.handlers}>
    <ImageBackground
      style={AppStyles.image}
      source={require("./assets/Loading-Logo.jpg")}
    >
      <ActivityIndicator size={150} color="#e52e71" />

      <Text style={AppStyles.baseText}>
        Please Wait ... While we cook Recipe!!
                  </Text>
    </ImageBackground>
  </View>);
}