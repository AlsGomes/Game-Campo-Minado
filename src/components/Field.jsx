import React from 'react'
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import params from '../config/params'
import Mine from './Mine'
import Flag from './Flag'

export default props => {
    const styleField = [styles.field]
    const { mined, opened, nearMines, exploded, flagged } = props

    if (opened) styleField.push(styles.opened)
    if (exploded) styleField.push(styles.exploded)
    if (flagged) styleField.push(styles.flagged)
    if (!opened && !exploded) styleField.push(styles.regular)

    let fieldColor = null
    if (nearMines > 0) {
        if (nearMines === 1) fieldColor = '#2A28D7'
        if (nearMines === 2) fieldColor = '#2B520F'
        if (nearMines > 2 && nearMines < 6) fieldColor = '#F9060A'
        if (nearMines >= 6) fieldColor = '#F221A9'
    }

    return (
        <TouchableWithoutFeedback onPress={props.onOpen} onLongPress={props.onSelect}>
            <View style={styleField}>
                {!mined && opened && nearMines > 0 ?
                    <Text style={[styles.label, { color: fieldColor }]}>{nearMines}</Text> :
                    false}

                {mined && opened ? <Mine /> : false}

                {flagged && !opened ? <Flag /> : false}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    field: {
        width: params.blockSize,
        height: params.blockSize,
        borderWidth: params.borderSize
    },
    regular: {
        backgroundColor: '#999999',
        borderLeftColor: '#CCCCCC',
        borderTopColor: '#CCCCCC',
        borderRightColor: '#333333',
        borderBottomColor: '#333333',
    },
    opened: {
        backgroundColor: '#999999',
        borderColor: '#777777',
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontWeight: 'bold',
        fontSize: params.fontSize
    },
    exploded: {
        backgroundColor: 'red',
        borderColor: 'red'
    },
    flagged: {

    }
})