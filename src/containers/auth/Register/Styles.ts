import {StyleSheet} from 'react-native';
import COLORS from '../../../assets/Colors/colors';
const styles = StyleSheet.create({
  outerContainer: {flex: 1},
  container: {flex: 1, backgroundColor: '#fff', padding: 15},
  mainContainer: {marginTop: 70},
  headerText: {
    fontSize: 27,
    fontFamily: 'Poppins-Bold',
    flex: 0.25,
    textAlignVertical: 'center',
  },
  titleViewStyle: {justifyContent: 'center'},
  header: {marginTop: 80},
  submitButtonText: {
    fontSize: 16,
    color: COLORS.whiteColor,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  footer: {
    margin: 20,
  },
  sigUpView: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpTextOne: {fontSize: 16, fontFamily: 'Poppins-Medium', color: '#9B9B9B'},
  signUpTextTwo: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: COLORS.parentColor,
  },
  autoMobileContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  autoMobileView: {
    height: 1.5,
    width: '100%',
    flex: 0.4,
    backgroundColor: COLORS.parentColor,
  },
  autoMobileText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.parentColor,
    marginHorizontal: 5,
  },
  indicator: {
    height: 1.5,
    width: '100%',
    flex: 0.4,
    backgroundColor: COLORS.parentColor,
  },
});
export default styles;
