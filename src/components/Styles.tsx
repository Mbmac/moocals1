import {StyleSheet} from 'react-native';
import COLORS from '../assets/Colors/colors';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', padding: 15},
  titleViewStyle: {flex: 0.25, justifyContent: 'center'},
  headerText: {
    fontSize: 27,
    fontFamily: 'Poppins-Bold',
    textAlignVertical: 'center',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    bottom: 50,
    gap: 15,
  },
  submitButtonText: {
    fontSize: 16,
    color: COLORS.whiteColor,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  forgotPassText: {fontSize: 16, fontWeight: '500', color: '#7D7D7D'},
  forgotView: {alignItems: 'flex-end', padding: 10, marginBottom: 20},
});
export default styles;
