import { useContext } from "react";
import { FontContext } from "../App";

export function useFontStyle(styles) {
  const font = useContext(FontContext);
  styles.mainTitle = {
    ...styles.mainTitle,
    fontFamily: font.fontFamily["bold"],
  };
  styles.title = {
    ...styles.title,
    fontFamily: font.fontFamily["bold"],
  };
  styles.buttonText = {
    ...styles.buttonText,
    fontFamily: font.fontFamily["bold"],
  };
  styles.return = {
    ...styles.return,
    fontFamily: font.fontFamily["bold"],
  };
  styles.forgotPass = {
    ...styles.forgotPass,
    fontFamily: font.fontFamily["regular"],
  };
  styles.logOutText = {
    ...styles.logOutText,
    fontFamily: font.fontFamily["bold"],
  };
  styles.checkBoxLeague = {
    ...styles.checkBoxLeague,
    fontFamily: font.fontFamily["regular"],
  };
  styles.checkTitle = {
    ...styles.checkTilte,
    fontFamily: font.fontFamily["bold"],
  };
  styles.homeVsAwayText = {
    ...styles.homeVsAwayText,
    fontFamily: font.fontFamily["bold"],
  };

  return styles;
}
