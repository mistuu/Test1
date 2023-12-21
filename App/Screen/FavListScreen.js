import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import AppColors from '../common/AppColor';
import AppStyle from '../common/AppStyle';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ToolBar from '../components/ToolBar';
import Modal from 'react-native-modal';
import { getItem, storeItem } from '../utils/AsyncConfig';
const { width, height } = Dimensions.get('window');
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default class FavListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      modalVisible: false,
      currentInfo: null
    };
  }
  async componentDidMount() {
    const favProd = await getItem("favProd")
    this.setState({
      data: favProd
    })
  }
  removeFav = (id) => {
    let data = this.state.data.filter(prod => prod.id !== id)
    this.setState({ data: data })
    storeItem("favProd", data)
  }
  render() {
    return (
      <View style={styles.container}>
        <ToolBar
          toolBarTitle={'Favorite'}
          showSubTitle={false}
          showBackIcon={true}
          elevations={0}
          navigation={this.props.navigation}
          onHomeIconClick={() => {
            this.props.navigation.goBack(null);
          }}
        />
        <FlatList
          data={this.state.data}

          renderItem={({ item, index }) => {
            return (

              <TouchableOpacity onPress={() => { this.setState({ info: item, modalVisible: true }) }}>
                <View style={styles.list}>

                  <Image
                    source={{ uri: item.thumbnail }}
                    style={styles.imageStyle}
                  />

                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                    }}>
                    <Text style={[styles.titleText, { fontWeight: '700' }]}>{item.title}</Text>
                    <Text style={styles.titleText} numberOfLines={1}>{item.brand}</Text>
                    <Text style={styles.titleText} numberOfLines={1}>{item.description}</Text>


                  </View>

                  <TouchableOpacity style={{ alignSelf: 'center', position: 'absolute', right: 10 }} onPress={() => this.removeFav(item.id)}><MaterialIcons name="delete" size={33} color={AppColors.colorRed} style={{ marginLeft: 5 }} /></TouchableOpacity>


                </View>
              </TouchableOpacity>


            );
          }}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{ color: AppColors.black, fontSize: 20 }}>
                No Product Available
              </Text>
            </View>
          }
          onEndReached={this.LoadMoreData}
          onEndReachedThreshold={0.2}
          keyExtractor={item => item.id}

        />
        <Modal
          isVisible={this.state.modalVisible}
          onBackdropPress={() => this.setState({ modalVisible: false })}
          onSwipeComplete={() => this.setState({ modalVisible: false })}
          swipeDirection="left"
          onBackButtonPress={() => this.setState({ modalVisible: false })}>
          <View
            style={styles.modaViewMain}>
            <ScrollView>
              <View
                style={styles.modalSubView}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity
                    onPress={() => this.setState({ modalVisible: false })}>
                    <MaterialIcon
                      name="arrow-back"
                      size={24}
                      color={AppColors.white}
                    />
                  </TouchableOpacity>
                  <Text
                    style={styles.modalHeaderText}>
                    Product Details
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.bodyHeader}>
                    Name
                  </Text>
                  <Text style={styles.bodyHeader}>
                    Brand
                  </Text>
                </View>
                <View style={{ width: '90%', flexDirection: 'row' }}>
                  <Text
                    style={styles.bodyText}>
                    {this.state.info?.title}
                  </Text>
                  <Text
                    style={styles.bodyText}>
                    {this.state.info?.brand}
                  </Text>
                </View>
                <View
                  style={{ width: '90%', flexDirection: 'row', marginTop: 13 }}>
                  <Text style={{ color: AppColors.black, width: width }}>
                    Description
                  </Text>
                </View>
                <View style={{ width: '90%', flexDirection: 'row' }}>
                  <Text
                    style={{
                      color: AppColors.black,
                      fontWeight: 'bold',
                      width: width / 1.3,
                      fontSize: 16,
                    }}>
                    {this.state.info?.description}
                  </Text>
                </View>
                <View
                  style={{ width: '90%', flexDirection: 'row', marginTop: 13 }}>
                  <Text style={styles.bodyHeader}>
                    Price
                  </Text>
                  <Text style={styles.bodyHeader}>
                    Rating
                  </Text>
                </View>
                <View style={{ width: '90%', flexDirection: 'row' }}>
                  <Text
                    style={styles.bodyText}>
                    {this.state.info?.price}
                  </Text>
                  <Text
                    style={styles.bodyText}>
                    {this.state.info?.rating}
                  </Text>
                </View>


                <View
                  style={{ width: '90%', flexDirection: 'row', marginTop: 13 }}>
                  <Text style={styles.bodyHeader}>
                    Photo
                  </Text>
                </View>

                <Image
                  style={{ height: 70, width: '25%' }}
                  source={{ uri: this.state.info?.thumbnail }}
                />


              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  badge: {
    width: 90,
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 20,
  },
  list: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 20,
    marginHorizontal: 15,
    marginTop: 10,
    elevation: 5,
    margin: 5,
    backgroundColor: AppColors.white,
    padding: 5,
    borderRadius: 7,

  },
  imageStyle: { width: 40, height: 40, borderRadius: 50, marginRight: 10 },
  hoursText: {
    ...AppStyle.TextStyle.inputTextFont,
    color: AppColors.black,
    fontSize: 12,
  },
  titleText: {
    ...AppStyle.TextStyle.descNormalPrimary,
    color: AppColors.black,
    marginRight: 72
  },
  modaViewMain: {
    padding: 10,
    borderRadius: 13,
    backgroundColor: AppColors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSubView: {
    width: '100%',
    borderRadius: 13,
    backgroundColor: AppColors.white,
  },
  modalHeader: {
    flexDirection: 'row',
    backgroundColor: AppColors.primary,
    padding: 7,
    borderRadius: 4,
    width: "95%",
    alignContent: 'center'
  },
  modalHeaderText: {
    fontSize: 20,
    color: AppColors.white,
    fontWeight: 'bold',
    marginLeft: 20
  },
  bodyHeader: {
    color: AppColors.black,
    width: width / 2.5
  },
  bodyText: {
    color: AppColors.black,
    fontWeight: 'bold',
    width: width / 2.5,
    fontSize: 16,
  }
});
