import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Header from './src/components/Header';
import MineField from './src/components/MineField';
import LevelSelection from './src/components/screens/LevelSelection';
import params from './src/config/params';
import { cloneBoard, createMinedBoard, flagsUsed, hasExplosion, invertFlag, openField, showMines, wonGame } from './src/functions';

export default function App() {
  const rows = params.getRowsAmount();
  const columns = params.getColumnsAmount();
  const [won, setWon] = useState(false)
  const [lost, setLost] = useState(false)
  const [showLevelSelection, setShowLevelSelection] = useState(false);
  const [difficultLevel, setDifficultLevel] = useState(params.difficultLevel);
  const [minesAmount, setMinesAmount] = useState(Math.ceil(rows * columns * params.difficultLevel));
  const [board, setBoard] = useState(createMinedBoard(rows, columns, Math.ceil(rows * columns * params.difficultLevel)));
  const [showMinesState, setShowMinesState] = useState(false);

  useEffect(() => { if (won) Alert.alert('Parabéns, Você venceu!') }, [won])

  useEffect(() => {
    if (lost) {
      setShowMinesState(true)
      Alert.alert('Perdeeeeeu!')
    }
  }, [lost])

  useEffect(() => {
    if (showMinesState) {
      showMines(board)
      setShowMinesState(false)
    }
  }, [showMinesState])

  useEffect(() => {
    params.difficultLevel = difficultLevel
    setMinesAmount(Math.ceil(rows * columns * difficultLevel))
  }, [difficultLevel])

  useEffect(() => {
    defaultState()
  }, [minesAmount])

  const defaultState = () => {
    const newBoard = createMinedBoard(rows, columns, minesAmount)
    setBoard(newBoard)
    setWon(false)
    setLost(false)
  }

  const onOpenField = (row, column) => {
    const clonedBoard = cloneBoard(board)
    openField(clonedBoard, row, column)
    const lostValue = hasExplosion(clonedBoard)
    const wonValue = wonGame(clonedBoard)

    setBoard(clonedBoard)
    setWon(wonValue)
    setLost(lostValue)
  }

  const onSelectField = (row, column) => {
    const clonedBoard = cloneBoard(board)
    invertFlag(clonedBoard, row, column)
    setWon(wonGame(clonedBoard))
    setBoard(clonedBoard)
  }

  const onLevelSelected = level => {
    setDifficultLevel(level)
    setShowLevelSelection(false)
  }

  return (
    <View style={styles.container}>

      <LevelSelection
        isVisible={showLevelSelection}
        onLevelSelected={onLevelSelected}
        onCancel={() => setShowLevelSelection(false)} />

      <Header
        flagsLeft={minesAmount - flagsUsed(board)}
        onNewGame={() => defaultState()}
        onFlagPress={() => setShowLevelSelection(true)}
      />

      <View style={styles.board}>
        <MineField board={board} onOpenField={onOpenField} onSelectField={onSelectField} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAAAAA'
  }
});
