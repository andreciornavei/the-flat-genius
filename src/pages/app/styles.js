import {StyleSheet, Dimensions} from 'react-native';

const colors = {
  yellow: '#FFE73B',
  red: '#F4433E',
  green: '#4CAF50',
  blue: '#2296F3',
  border: '#000000',
  background: '#2E2E2E',
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',
  },
  foreground: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: colors.background,
  },
  row: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  colourOne: {
    backgroundColor: colors.yellow,
  },
  colourTwo: {
    backgroundColor: colors.red,
  },
  colourThree: {
    backgroundColor: colors.green,
  },
  colourFour: {
    backgroundColor: colors.blue,
  },
  gameContainer: {
    position: 'relative',
    backgroundColor: colors.border,
    width: Dimensions.get('window').width - 100,
    height: Dimensions.get('window').width - 100,
    padding: 10,
  },
  gameButtonYellow: {
    borderRightWidth: 5,
    borderRightColor: colors.border,
    borderBottomWidth: 5,
    borderBottomColor: colors.border,
  },
  gameButtonRed: {
    borderLeftWidth: 5,
    borderLeftColor: colors.border,
    borderBottomWidth: 5,
    borderBottomColor: colors.border,
  },
  gameButtonBlue: {
    borderTopWidth: 5,
    borderTopColor: colors.border,
    borderLeftWidth: 5,
    borderLeftColor: colors.border,
  },
  gameButtonGreen: {
    borderTopWidth: 5,
    borderTopColor: colors.border,
    borderRightWidth: 5,
    borderRightColor: colors.border,
  },
  status: {
    color: '#ffffff',
    marginBottom: 10,
    fontSize: 16,
  },
  gameCenter: {
    position: 'absolute',
    left: (Dimensions.get('window').width - 100) * 0.5 - 50,
    top: (Dimensions.get('window').width - 100) * 0.5 - 50,
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 10,
    borderRadius: 1000,
    width: 100,
    height: 100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameLevelContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameLevelLabel: {
    color: '#ffffff',
    fontSize: 10,
  },
  gameLevel: {
    color: '#ffffff',
    marginBottom: 3,
    fontSize: 21,
  },
});

export default styles;
