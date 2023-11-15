import {StyleSheet} from 'react-native';
import COLORS from '../../../assets/Colors/colors';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  map: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    color: COLORS.blackColor,
    padding: 10,
  },
  advertisementDetailView: {
    position: 'absolute',
    top: 80,
    left: 20,
    backgroundColor: COLORS.whiteColor,
    padding: 10,
    borderRadius: 15,
    width: '90%',
    gap: 10,
    paddingBottom: 15,
  },
  advertisementTitle: {
    fontSize: 14,
    fontFamily: 'Lato-Bold',
  },
  advertisementDescription: {
    color: '#7C7C7C',
    fontSize: 11,
    fontFamily: 'Lato-Regular',
  },
  footer: {
    backgroundColor: COLORS.whiteColor,
    padding: 10,
    borderRadius: 20,
    gap: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    bottom: 10,
  },
  footerText: {
    color: COLORS.whiteColor,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  polygonImage: {height: 50, width: 40},
});

export default styles;
