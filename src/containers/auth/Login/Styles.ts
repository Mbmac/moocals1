import {StyleSheet} from 'react-native';
import COLORS from '../../../assets/Colors/colors';
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', padding: 15},
  titleViewStyle: {flex: 0.25, justifyContent: 'center'},
  headerText: {
    fontSize: 27,
    fontFamily: 'Poppins-Bold',
    textAlignVertical: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    color: COLORS.whiteColor,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  forgotPassText: {fontSize: 16, color: '#7D7D7D'},
  forgotView: {alignItems: 'flex-end', padding: 10, marginBottom: 20},
  sigupView: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupTextOne: {fontSize: 16, fontFamily: 'Poppins-Medium', color: '#9B9B9B'},
  signupTextTwo: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: COLORS.parentColor,
  },
});
export default styles;
