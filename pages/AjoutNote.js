import React, { useState, useEffect } from 'react';
import {View, Button, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput} from 'react-native'
import { Input } from 'react-native-elements';

export default function AjoutNote(props){

    const [titleNote, setTitleNote] = useState('')
    const [descriptionNote, setDescriptionNote] = useState('')
    
    function addNoteJournal(){
        let data = props.data.push({
            title: titleNote,
            description: descriptionNote,
            done: false
        })

        props.addJournal(data)
        props.addSuccess()
    }

    return(
        <View>
            <Button
                style={{width:'50%'}}
                onPress={props.addSuccess}
                title="Annuler"
            />
            <Button
                style={{width:'50%'}}
                title="Ajouter"
                onPress={addNoteJournal}
            />

            <Text style={{
                paddingLeft:'10%',
                paddingTop:'10%',
            }}>Ajoutez une note</Text>

            <Input
                style={{
                    width:'80%',
                    marginTop:'5%'
                }}
                placeholder='Titre de la note'
                onChangeText={text => setTitleNote(text)}
            />
            <Input
                style={{
                    width:'80%',
                    marginTop:'5%'
                }}
                placeholder='Description'
                onChangeText={text => setDescriptionNote(text)}
            />
        </View>
    )
}