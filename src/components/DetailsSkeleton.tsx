import { colors } from "@/styles/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from "react-native-reanimated";

export default function DetailsSkeleton() {

  const opacity = useSharedValue(0.3);

  opacity.value = withRepeat(
    withTiming(1, { duration: 900 }),
    -1,
    true
  );

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value
  }));

  return (
    <View style={styles.container}>

      <Animated.View style={[styles.backdrop, animatedStyle]} />

      <View style={styles.header}>

        <Animated.View style={[styles.poster, animatedStyle]} />

        <View style={styles.info}>

          <Animated.View style={[styles.title, animatedStyle]} />

          <Animated.View style={[styles.rating, animatedStyle]} />

          <Animated.View style={[styles.genre, animatedStyle]} />

        </View>
      </View>

      <View style={styles.section}>
        <Animated.View style={[styles.line, animatedStyle]} />
        <Animated.View style={[styles.line, animatedStyle]} />
        <Animated.View style={[styles.lineShort, animatedStyle]} />
      </View>

      <View style={styles.section}>
        <Animated.View style={[styles.row, animatedStyle]} />
        <Animated.View style={[styles.row, animatedStyle]} />
        <Animated.View style={[styles.row, animatedStyle]} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.black
  },

  backdrop: {
    width: "100%",
    height: 260,
    backgroundColor: colors.skeleton
  },

  header: {
    flexDirection: "row",
    padding: 20,
    marginTop: -80
  },

  poster: {
    width: 130,
    height: 190,
    borderRadius: 14,
    backgroundColor: colors.skeleton
  },

  info: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center"
  },

  title: {
    width: "80%",
    height: 24,
    borderRadius: 6,
    backgroundColor: colors.skeleton,
    marginBottom: 10
  },

  rating: {
    width: "40%",
    height: 16,
    borderRadius: 6,
    backgroundColor: colors.skeleton,
    marginBottom: 8
  },

  genre: {
    width: "60%",
    height: 14,
    borderRadius: 6,
    backgroundColor: colors.skeleton
  },

  section: {
    paddingHorizontal: 20,
    marginTop: 30
  },

  line: {
    width: "100%",
    height: 14,
    borderRadius: 6,
    backgroundColor: colors.skeleton,
    marginBottom: 10
  },

  lineShort: {
    width: "70%",
    height: 14,
    borderRadius: 6,
    backgroundColor: colors.skeleton
  },

  row: {
    width: "100%",
    height: 20,
    borderRadius: 6,
    backgroundColor: colors.skeleton,
    marginBottom: 12
  }

});