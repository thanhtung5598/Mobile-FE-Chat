import { StyleSheet } from 'react-native';

export const CELL_SIZE = 55;
export const CELL_BORDER_RADIUS = 8;
export const DEFAULT_CELL_BG_COLOR = '#fff';
export const NOT_EMPTY_CELL_BG_COLOR = '#3557b7';
export const ACTIVE_CELL_BG_COLOR = '#f7fafe';

const styles = StyleSheet.create({
  codeFiledRoot: {
    height: CELL_SIZE,
    marginTop: 30,
    width: '100%',
    justifyContent: 'center'
  },
  title: {
    paddingTop: 10,
    color: '#2962ff',
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: 10
  },
  subTitle2: {
    color: '#000',
    textAlign: 'center'
  },
  subTitle1: {
    paddingTop: 30,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  icon: {
    width: 217 / 2.4,
    height: 158 / 2.4,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  cell: {
    height: CELL_SIZE,
    width: CELL_SIZE,
    borderRadius: CELL_BORDER_RADIUS,
    lineHeight: CELL_SIZE - 5,
    fontSize: 30,
    textAlign: 'center',
    color: '#2962ff',
    backgroundColor: '#fff',
    // IOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3
  },
  errorCode: { alignItems: 'center', marginTop: 10 },
  errorCodeText: { textAlign: 'center', color: 'red' }
});

export default styles;
