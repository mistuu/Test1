import Snackbar from 'react-native-snackbar';
import AppColors from '../common/AppColor';
import {Platform, PermissionsAndroid} from 'react-native';

function showMsg(message) {
  setTimeout(() => {
    Snackbar.show({
      text: message,
      textColor: AppColors.white,
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: AppColors.accentDarker,
    });
  }, 400);
}

function isValidData(data) {
  if (data === undefined) {
    return false;
  } else if (data === null) {
    return false;
  } else if (data === '') {
    return false;
  } else {
    return true;
  }
}

function isValidArray(array) {
  if (array === undefined) {
    return false;
  } else if (array === null) {
    return false;
  } else if (array === '') {
    return false;
  } else if (array === []) {
    return false;
  } else if (array.length === 0) {
    return false;
  } else {
    return true;
  }
}

const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission',
        },
      );
      // If CAMERA Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.log(err);
      return false;
    }
  } else return true;
};

const requestExternalWritePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'External Storage Write Permission',
          message: 'App needs write permission',
        },
      );
      // If WRITE_EXTERNAL_STORAGE Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.log(err);
      return false;
    }
  } else return true;
};

const requestExternalReadPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'External Storage Read Permission',
          message: 'App needs read permission',
        },
      );
      // If WRITE_EXTERNAL_STORAGE Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.log(err);
      return false;
    }
  } else return true;
};


export default {
  isValidData,
  showMsg,
  isValidArray,
  requestCameraPermission,
  requestExternalReadPermission,
  requestExternalWritePermission,

};
