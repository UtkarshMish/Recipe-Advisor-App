import React, { Component } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  ImageBackground,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { WebView } from "react-native-webview";

export default class App extends Component {
  state = {
    isLoading: true,
    url: "http://www.recipe-advisor.team",
  };
  handleWebviewError = () => {
    return (
      <View style={styles.handlers}>
        <ImageBackground
          style={styles.image}
          source={require("./assets/Loading-Logo.jpg")}
        >
          <Text style={styles.baseText}>Sorry !!! Offline!</Text>
        </ImageBackground>
      </View>
    );
  };
  handleChange = async (e) => {
    const URL = await e.url;
    this.setState({ url: URL });
  };
  render() {
    const INJECTEDJAVASCRIPT = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `;
    var RECIPE;
    return (
      <>
        <View style={[styles.container, styles.horizontal]}>
          <WebView
            source={{
              uri: this.state.url,
            }}
            injectedJavaScript={INJECTEDJAVASCRIPT}
            originWhitelist={["*"]}
            thirdPartyCookiesEnabled={true}
            startInLoadingState={true}
            onShouldStartLoadWithRequest={true}
            renderError={() => this.handleWebviewError()}
            domStorageEnabled={true}
            renderLoading={() => (
              <View style={styles.handlers}>
                <ImageBackground
                  style={styles.image}
                  source={require("./assets/Loading-Logo.jpg")}
                >
                  <ActivityIndicator size={150} color="#e52e71" />

                  <Text style={styles.baseText}>
                    Please Wait ... While we cook Recipe!!
                  </Text>
                </ImageBackground>
              </View>
            )}
            ref={(ref) => (RECIPE = ref)}
            saveFormDataDisabled={false}
            onNavigationStateChange={(e) => this.handleChange(e)}
          />
        </View>
        <View style={styles.buttons}>
          <Button
            buttonStyle={styles.buttons}
            icon={
              <Icon
                raised
                name="angle-left"
                type="font-awesome"
                size={12}
                color="#123"
              />
            }
            onPress={async () => await RECIPE.goBack()}
          >
            <Icon name="rowing" />
          </Button>
          <Button
            buttonStyle={styles.buttons}
            icon={
              <Icon
                raised
                name="repeat"
                type="font-awesome"
                size={12}
                color="#123"
              />
            }
            onPress={async () => await RECIPE.reload()}
          />
          <Button
            buttonStyle={styles.buttons}
            icon={
              <Icon
                raised
                name="angle-right"
                type="font-awesome"
                size={12}
                color="#123"
              />
            }
            onPress={async () => await RECIPE.goForward()}
          />
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center",
  },
  handlers: {
    backgroundColor: "indianred",
    position: "absolute",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  baseText: {
    textAlign: "center",
    fontSize: 20,
    color: "#67BD71",
    textTransform: "capitalize",
  },
  horizontal: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginTop: 20,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "black",
  },
});
