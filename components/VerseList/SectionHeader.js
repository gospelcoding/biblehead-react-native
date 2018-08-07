import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import I18n from "../../i18n/i18n";
import ThemeColors from "../../util/ThemeColors";
import BHButton from "../shared/BHButton";

export default function SectionHeader(props) {
  return (
    <View style={styles.header}>
      <Text
        style={{
          fontWeight: "bold",
          color: "black",
          fontSize: 16,
          padding: 8
        }}
      >
        {props.title}
      </Text>
      {props.reviewButton && (
        <View style={{ margin: 8 }}>
          <BHButton
            color={ThemeColors.blue}
            onPress={props.doReview}
            title={I18n.t("ReviewVerses")}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end"
  }
});
