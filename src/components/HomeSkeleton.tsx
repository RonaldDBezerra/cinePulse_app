import { colors } from "@/styles/colors";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming
} from "react-native-reanimated";

function SkeletonSection() {
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
    <View style={styles.section}>
      <Animated.View style={[styles.sectionTitle, animatedStyle]} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEnabled={false}>
        {[...Array(5)].map((_, i) => (
          <Animated.View key={i} style={[styles.card, animatedStyle]}>
            <View style={styles.ratingBadge} />
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

export default function HomeSkeleton() {
  return (
    <ScrollView style={styles.container} scrollEnabled={false}>
      <SkeletonSection />
      <View style={styles.separator} />
      <SkeletonSection />
      <View style={styles.separator} />
      <SkeletonSection />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 2,
    paddingHorizontal: 16
  },

  section: {
    marginTop: 16
  },

  sectionTitle: {
    width: "50%",
    height: 22,
    borderRadius: 6,
    backgroundColor: colors.skeleton,
    marginBottom: 16
  },

  card: {
    width: 120,
    height: 180,
    borderRadius: 12,
    backgroundColor: colors.skeleton,
    marginRight: 12,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },

  ratingBadge: {
    width: 46,
    height: 20,
    borderRadius: 6,
    backgroundColor: colors.background,
    margin: 6,
    opacity: 0.4
  },

  separator: {
    height: 1,
    backgroundColor: colors.skeleton,
    marginVertical: 20,
    opacity: 0.4
  }
});
