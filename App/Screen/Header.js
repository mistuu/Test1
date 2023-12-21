import React from 'react';
import { View, Text, Image, StatusBar, SafeAreaView } from 'react-native';
import AppStyle from '../common/AppStyle';
import AppColors from '../common/AppColor';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';


export const ParentHeaderHome = ({logout, toolbarTitle, props }) => {
  return (
    <View
      style={{
        position: 'relative',
        zIndex: 5,
        justifyContent: 'center',
        height:
          Platform.OS === 'ios' && DeviceInfo.hasNotch()
            ? 68
            : Platform.OS === 'ios' && !DeviceInfo.hasNotch()
              ? 62
              : 56,
        paddingHorizontal: 15,
        backgroundColor: AppColors.primary,
        elevation: 1,
        zIndex: 1,

      }}>
      <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', }}>
      <TouchableOpacity onPress={()=>logout()}><MaterialIcons name="logout" size={25} style={{}}/></TouchableOpacity>

        <View style={{ justifyContent: 'flex-end', alignItems: 'center',  flexGrow: 1, }}>
          <Text style={{ ...AppStyle.TextStyle.title, fontSize: 22, color: AppColors.white }}>{toolbarTitle}</Text>
        </View>
        <View style={{ justifyContent: 'flex-end', flexDirection: 'row', flexShrink: 1, }}>
          <TouchableOpacity onPress={()=>props()}><MaterialIcons name="favorite" size={25} style={{ marginLeft: 5 }} /></TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


