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
    height: "55%",
    width: "100%",
    position: "absolute",
  },
  animationStyles: { opacity: 1 },
  textStyle: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    justifyContent: "center",
    textTransform: "capitalize",
    color: "crimson",
    top: "60%",
  },
});
