import React, {useEffect, useState, useMemo} from 'react';
import SlashScreen from 'react-native-splash-screen';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import Sound from 'react-native-sound';
import SoundYellow from '../../assets/sounds/yellow.mp3';
import SoundRed from '../../assets/sounds/red.mp3';
import SoundBlue from '../../assets/sounds/blue.mp3';
import SoundGreen from '../../assets/sounds/green.mp3';
import SoundGameOver from '../../assets/sounds/error.wav';

import LightenDarkenColor from '../../utils/LightenDarkenColor';
import RandomColor from '../../utils/RandomColor';
import styles from './styles';

import Icon from 'react-native-vector-icons/Feather';
Icon.loadFont();

const states = {
  START: 'start',
  LEARNING: 'learning',
  MOVING: 'moving',
  GAMEOVER: 'gameover',
};

const App = () => {
  const [gameState, setGameState] = useState(states.START);
  const [moves, setMoves] = useState([]);
  const [moveIndex, setMoveIndex] = useState(0);

  const [handlers, setHandlers] = useState({
    yellow: {
      idleColor: LightenDarkenColor('#FFE73B', 0),
      activeColor: LightenDarkenColor('#FFE73B', 120),
      stateColor: LightenDarkenColor('#FFE73B', 0),
    },
    red: {
      idleColor: LightenDarkenColor('#F4433E', 0),
      activeColor: LightenDarkenColor('#F4433E', 120),
      stateColor: LightenDarkenColor('#F4433E', 0),
    },
    blue: {
      idleColor: LightenDarkenColor('#2296F3', 0),
      activeColor: LightenDarkenColor('#2296F3', 120),
      stateColor: LightenDarkenColor('#2296F3', 0),
    },
    green: {
      idleColor: LightenDarkenColor('#4CAF50', 0),
      activeColor: LightenDarkenColor('#4CAF50', 120),
      stateColor: LightenDarkenColor('#4CAF50', 0),
    },
  });

  useEffect(() => {
    SlashScreen.hide();
  }, []);

  const title = useMemo(() => {
    switch (gameState) {
      case states.START:
        return 'Toque em Play para começar';
      case states.LEARNING:
        return 'Memorize a sequência';
      case states.MOVING:
        return 'Reproduza a sequência';
      case states.GAMEOVER:
        return 'Você perdeu, tente novamente';
      default:
        return 'O jogo perdeu o estado';
    }
  }, [gameState]);

  const nextLevel = (reset = false) => {
    const newMove = RandomColor();
    const updateMoves = reset ? [newMove] : [...moves, newMove];
    setMoveIndex(0);
    setGameState(states.LEARNING);
    setMoves(updateMoves);
    setTimeout(() => {
      teachMove(0, updateMoves);
    }, 3000);
  };

  const gameover = () => {
    setGameState(states.GAMEOVER);
    playSound('gameover');
  };

  const teachMove = (i = 0, runMoves) => {
    playSound(runMoves[i]);
    highlightColor(runMoves[i], true);
    setTimeout(() => {
      highlightColor(runMoves[i], false);
    }, 600);
    setTimeout(() => {
      if (i < runMoves.length - 1) {
        teachMove(i + 1, runMoves);
      } else {
        setGameState(states.MOVING);
      }
    }, 800);
  };

  const makeMove = color => {
    if (gameState === states.MOVING) {
      if (moves[moveIndex] === color) {
        playSound(color);
        if (moveIndex === moves.length - 1) {
          nextLevel();
        } else {
          setMoveIndex(moveIndex + 1);
        }
      } else {
        gameover();
      }
    }
  };

  const highlightColor = (color, active = false) => {
    setHandlers({
      ...handlers,
      [color]: {
        ...handlers[color],
        stateColor: active
          ? handlers[color].activeColor
          : handlers[color].idleColor,
      },
    });
  };

  const playSound = soundName => {
    const sound = new Sound(pickSoundColor(soundName), error => {
      if (error) {
        console.log('error');
      } else {
        sound.play(() => sound.release());
      }
    });
  };

  const pickSoundColor = color => {
    switch (color) {
      case 'yellow':
        return SoundYellow;
      case 'green':
        return SoundGreen;
      case 'blue':
        return SoundBlue;
      case 'red':
        return SoundRed;
      default:
        return SoundGameOver;
    }
  };

  const handleGame = () => {
    switch (gameState) {
      case states.START:
      case states.GAMEOVER:
        nextLevel(true);
        break;
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.body}>
        <View style={styles.foreground}>
          <Text style={styles.status}>{title}</Text>
          <View style={styles.gameContainer}>
            <View style={styles.row}>
              <TouchableOpacity
                disabled={gameState !== states.MOVING}
                onPress={() => makeMove('yellow')}
                style={{
                  ...styles.column,
                  ...styles.gameButtonYellow,
                  backgroundColor: handlers.yellow.stateColor,
                }}
              />
              <TouchableOpacity
                disabled={gameState !== states.MOVING}
                onPress={() => makeMove('red')}
                style={{
                  ...styles.column,
                  ...styles.gameButtonRed,
                  backgroundColor: handlers.red.stateColor,
                }}
              />
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                disabled={gameState !== states.MOVING}
                onPress={() => makeMove('green')}
                style={{
                  ...styles.column,
                  ...styles.gameButtonGreen,
                  backgroundColor: handlers.green.stateColor,
                }}
              />
              <TouchableOpacity
                disabled={gameState !== states.MOVING}
                onPress={() => makeMove('blue')}
                style={{
                  ...styles.column,
                  ...styles.gameButtonBlue,
                  backgroundColor: handlers.blue.stateColor,
                }}
              />
            </View>
            <TouchableHighlight style={styles.gameCenter} onPress={handleGame}>
              <>
                {gameState === states.START && (
                  <Icon name="play" size={32} color="#ffffff" />
                )}
                {gameState === states.GAMEOVER && (
                  <Icon name="refresh-cw" size={32} color="#ffffff" />
                )}
                {(gameState === states.MOVING ||
                  gameState === states.LEARNING) && (
                  <View style={styles.gameLevelContainer}>
                    <Text style={styles.gameLevel}>{moves.length}</Text>
                    <Text style={styles.gameLevelLabel}>Nível</Text>
                  </View>
                )}
              </>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
