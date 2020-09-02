import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native'
import {Card, Button} from 'react-native-elements'
function Title({children, done}){
    return (
        <Text style={styles.noteTitle}>{done && '✅'} {children}</Text>
    )
}

/*
addition(1,2,3);

addition({
    nb2: 2,
    nb1: 1,
    nb3: 3
})

function addition(nb1, nb2, nb3){
    return nb1 + nb2 + nb3
}
function addition({nb1, nb2, nb3}){
    return nb1 + nb2 + nb3
}*/

function Description({children}){
    return (
        <Text style={styles.noteDesc}>{children}</Text>
    )
}

export default function PreviewNote({dataNote, toggleOverlay, deletenote}){

    // 1ere manière de faire
    const additionalStyle = {
        opacity : dataNote.done ? 0.3 : 1
    }

    // 2è manière de faire
    let additionalStyle2 = {
        opacity: 1
    }
    if(dataNote.done){
        additionalStyle2.opacity = 0.3
    }

    function deleten(id){
        deletenote(id)
    }

    return (
        <View style={[styles.note, additionalStyle]}>
            <View style={styles.dragDrop}/>
            <Card style={styles.noteTextContainer}>
                <Button
                    title={'Editer'}
                    onPress={() => toggleOverlay(dataNote)}
                />
                <Button
                    title={'Supprimer'}
                    onPress={() => deleten(dataNote.id)}
                />
                <Title done={dataNote.done}>{dataNote.title}</Title>
                <Description>{dataNote.description}</Description>
            </Card>
        </View>
    )
}


const styles = StyleSheet.create({
    noteTextContainer : {
      paddingHorizontal: 10,
    },
    noteTitle : {
      fontSize: 18,
      fontWeight: 'bold'
    },
    noteDesc: {
        fontWeight: '200',
        marginTop: 5,
        },
    note : {
      flexDirection: 'row',
      marginTop: 20,
      flex: 1,
      flexShrink: 1
    },
    dragDrop: {
        width: 40,
        height: '100%',
    },
    noteContainer: {
      paddingHorizontal: 20,
      paddingTop: 10,
    },
  });
  