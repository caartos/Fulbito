import React from "react";
import Spinner from "react-native-loading-spinner-overlay";

const LoadingSpinner = ({ loading }) => {
  return <Spinner visible={loading} />;
};

export default LoadingSpinner;
