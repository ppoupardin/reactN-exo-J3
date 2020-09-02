import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import PreviewNote from '../components/PreviewNote'
import {SearchBar, Button, Overlay, Input} from 'react-native-elements'
import Icon from "react-native-vector-icons/FontAwesome";
// [1] : Importer Firebase
import  firebase from '../utils/firebase'
// [2] : créer la variable db depuis firebase
let db = firebase.firestore();

export default function Journal({data, navigate, deletenote, updateNote}){
    const [visible, setVisible] = React.useState(false);
    const [updateID, setUpdateID] = React.useState('');
    const [updateTitle, setUpdateTitle] = React.useState('');
    const [updateDescription, setUpdateDescription] = React.useState('');

    const toggleOverlay = (note) => {
        setUpdateID(note.id)
        setUpdateTitle(note.title)
        setUpdateDescription(note.description)
        setVisible(!visible);
    };

    function validateAndUpdate(){
        db.collection("notes").doc(updateID).update({
            title: updateTitle,
            description: updateDescription
        })
            .then(function() {
                console.log("Document successfully written!");
                setVisible(!visible);
            })
            .catch(function(error) {
                alert('Erreur')
                console.error("Error writing document: ", error);
            });
        // updateNote(updateTitle, updateDescription, updateID)
    }

    function deletente(id){
        deletenote(id)
    }

    return(
        <View style={{flex: 1, width:'100%'}}>

            <ScrollView style={styles.noteContainer}>
                {
                    data.map((el) => {
                        return <PreviewNote dataNote={el} toggleOverlay={toggleOverlay} deletenote={deletente}/>
                    })
                }
            </ScrollView>

            <View>
              <Button
                title="Ajouter une entrée"
                onPress={() => navigate('AddForm')}
                />
            </View>

            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                <View style={{
                    width:'100%'
                }}>

                </View>
                <Text style={{ marginBottom:'5%'}}>Modifier la note</Text>
                <Input
                    style={{ width:'80%'}}
                    value={updateTitle}
                    onChangeText={(str) => setUpdateTitle(str)}
                />

                <Input
                    style={{ width:'80%'}}
                    value={updateDescription}
                    onChangeText={(str) => setUpdateDescription(str)}
                    multiline={true}
                />


                <Button
                    title="Modifier"
                    type="outline"
                    onPress={validateAndUpdate}
                />
            </Overlay>
        </View>
    )
}

const styles = StyleSheet.create({
    countContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    noteTextContainer : {
      paddingHorizontal: 10
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
      marginTop: 20
    },
    dragDrop: {
        width: 40,
        height: '100%',
    },
    noteContainer: {
      paddingHorizontal: 20,
      paddingTop: 10,
      width: '100%'
    },
    scrollHorizontal: {
      backgroundColor: 'white',
      //height: 50,
      width: "100%",
      paddingVertical: 10,
      borderBottomColor: 'grey',
      borderBottomWidth: 1
      
      //flexDirection: 'row',
      //alignItems: 'center'
    },
    scrollText : {
        fontWeight: 'bold',
        fontSize: 22,
        marginHorizontal: 20,
    },
    container: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
  });
  