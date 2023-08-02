import React from "react";

import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Animated,
  Image,
  TouchableOpacity
} from "react-native";

// Constants
import { images, theme } from "../../constants";
const { onboarding1, onboarding2, onboarding3 } = images;

//Theme
const { COLORS, FONTS, SIZES } = theme;

// Dummy Data
const onBoardings = [
  {
    title: "Lets Travelling",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    img: onboarding1
  },
  {
    title: "Navigation",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    img: onboarding2
  },
  {
    title: "Destination",
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
    img: onboarding3
  }
];

const OnBoarding = () => {
  const [completed, setCompleted] = React.useState(false);
  const scrollX = new Animated.Value(0);

  React.useEffect(() => {
    // To check if user has finished scrolling the onboarding pages
    scrollX.addListener(({ value }) => {
      if (Math.floor(value / SIZES.width) === onBoardings.length - 1) {
        setCompleted(true);
      }
    });
    return () => scrollX.removeListener();
  }, []);

  // Render
  function renderContent() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        decelerationRate={0}
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}>
        {onBoardings.map((item, index) => (
          <View key={index} style={{ width: SIZES.width }}>
            {/* Image */}
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}>
              <Image
                source={item.img}
                resizeMode="cover"
                style={{
                  width: "100%",
                  height: "100%"
                }}
              />
            </View>
            {/* Text */}
            <View
              style={{
                position: "absolute",
                bottom: "3%",
                left: 40,
                right: 40
              }}>
              <Text
                style={{
                  ...FONTS.h1,
                  color: COLORS.gray,
                  textAlign: "center",
                  fontWeight: "bold"
                }}>
                {item.title}
              </Text>
              <Text
                style={{
                  ...FONTS.body3,
                  textAlign: "center",
                  marginTop: SIZES.base,
                  color: COLORS.gray
                }}>
                {item.description}
              </Text>
            </View>
            {/* Bottom */}
            <TouchableOpacity
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 130,
                height: 50,
                paddingLeft: 20,
                justifyContent: "center",
                borderTopLeftRadius: 30,
                borderBottomLeftRadius: 30,
                backgroundColor: COLORS.blue
              }}
              onPress={() => console.log("Button on pressed")}>
              <Text style={{ ...FONTS.h2, color: COLORS.white }}>
                {completed ? "Let's Go" : "Skip"}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </Animated.ScrollView>
    );
  }

  function renderDots() {
    const dotPosition = Animated.divide(scrollX, SIZES.width);
    return (
      <View style={styles.dotContainer}>
        {onBoardings.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp"
          });
          const dotSize = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [SIZES.base, 17, SIZES.base],
            extrapolate: "clamp"
          });
          return (
            <Animated.View
              key={`dot-${index}`}
              opacity={opacity}
              style={[
                styles.dot,
                { width: dotSize, height: dotSize }
              ]}></Animated.View>
          );
        })}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>{renderContent()}</View>
      <View style={styles.dotsRootContainer}>{renderDots()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white
  },
  dotsRootContainer: {
    position: "absolute",
    bottom: SIZES.height > 700 ? "26%" : "20%"
  },
  dotContainer: {
    flexDirection: "row",
    height: SIZES.padding,
    alignItems: "center",
    justifyContent: "center"
  },
  dot: {
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.blue,
    marginHorizontal: SIZES.radius / 2
  }
});

export default OnBoarding;

// 6: 54
