import { Alert, Share } from "react-native";

export function useInviteFriends({ fulbitoName }) {
  const onShare = async () => {
    try {
      const result = await Share.share({
        title: "Compartir en WhatsApp",
        message: `
          Join fulbito: ${fulbitoName}
  Create your predictions and win.
  Good luck.`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  return { onShare };
}
