import React from "react";
import { StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";
class Loader extends React.Component {
  componentDidMount() {
    this.animation.play();
  }
  render() {
    const { displayAnimation, bgColor, title } = this.props;
    return (
      <View style={styles.animationContainer}>
        <LottieView
          loop={true}
          autoPlay={true}
          ref={(animation) => {
            this.animation = animation;
          }}
          style={[
            styles.animationStyles,
            { backgroundColor: bgColor ? bgColor : "#fc5" },
          ]}
          source={displayAnimation}
        />
        <Text style={styles.textStyle}>{title}</Text>
      </View>
    );
  }
}
export default Loader;
const styles = StyleSheet.create({
  animationContainer: {
    display: "flex",
    flexDirection: "column-reverse",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  animationStyles: {
    flex: 0.5,
  },
  textStyle: {
    flex: 0.5,
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    bottom: "10%",
    justifyContent: "center",
    textTransform: "capitalize",
    color: "crimson",
  },
});
