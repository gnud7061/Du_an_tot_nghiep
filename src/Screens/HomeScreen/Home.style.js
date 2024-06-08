import { StyleSheet } from "react-native";
import COLORS from '../../constants/colors';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 15,
    paddingLeft: 10,
  },
  imageTitle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f2f2',
  },
  textTitle: {
    fontSize: 25,
    fontFamily: 'Inter-Bold',
  },
  textHead: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  viewSearch: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  search: {
    width: '80%',
    height: 55,
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: '#DEDEDE',
  },
  textInputSearch: {
    fontSize: 18
  },
  viewItem: {
    width: 75,
    height: 105,
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: 'space-around',
    marginLeft: 20,
    borderColor: '#DEDEDE',
    shadowColor: '#000',
    backgroundColor: COLORS.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },


});