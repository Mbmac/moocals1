import {StyleSheet} from 'react-native';
import COLORS from '../../../assets/Colors/colors';
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', padding: 15},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontFamily: 'Lato-Bold',
    color: COLORS.blackColor,
    textAlign: 'center',
  },
  imageShowParentView: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageShowView: {
    borderRadius: 80,
    width: 100,
    height: 100,
    borderColor: COLORS.blackColor,
    backgroundColor: COLORS.blackColor,
  },
  profileImageStyle: {
    borderRadius: 80,
    width: 100,
    height: 100,
  },
  profileView: {alignItems: 'flex-end', bottom: 30},
  cameraImageStyle: {height: 30, width: 30, bottom: 0},
  inputTextStyle: {
    fontSize: 14,
    color: COLORS.blackColor,
    fontFamily: 'Poppins-Medium',
  },
  inputParentView: {
    flexDirection: 'row',
    backgroundColor: '#F4F4F4',
    color: '#F4F4F4',
    height: 52,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    borderRadius: 26,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  centerSection: {flex: 0.7},
  changePasswordText: {
    fontSize: 14,
    color: COLORS.blackColor,
    fontFamily: 'Poppins-Medium',
  },
  signOut: {color: COLORS.whiteColor, fontSize: 16},
  signOutView: {marginVertical: 15},
  countryCodeText: {
    fontSize: 14,
    color: COLORS.blackColor,
    fontFamily: 'Poppins-Medium',
    paddingVertical: 0,
    paddingHorizontal: 0,
    textAlign: 'left',
    left: 6,
    marginTop: 3,
  },
  backButton: {padding: 10},
});
export default styles;
