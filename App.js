import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, Button, SafeAreaView, ScrollView } from 'react-native';
import MyHeader from './components/Header'
import Journal from './pages/Journal'
import BankAccount from './pages/BankAccount'
import AddForm from './pages/AddForm'
import Login from './pages/Login'
import ListeCourses from './pages/ListeCourses'
import TutorialImage from './pages/TutorialImage';

// [1] : Importer Firebase
import  firebase from './utils/firebase'
// [2] : créer la variable db depuis firebase
let db = firebase.firestore();
export default function App() {

  const [dataJournal, setDataJournal] = useState([])

  const [page, setPage] = useState('Journal');
  const [loggedIn, setLoggedIn] = useState(true);
  
  function navigate(page){
    setPage(page)
  }

  function login(){
    setLoggedIn(true);
  }
  function logout(){
    setLoggedIn(false);
  }

  /*
  Add to state ([dataJournal])
  */
  useEffect(() => {
    db.collection("notes").onSnapshot(function(querySnapshot) {
      // Crée une variable temporaire
      let _tmpList = [];
      querySnapshot.forEach(function(doc) {
        // On ajoute chaque élément à la list
        let data = doc.data()
        data.id = doc.id
        _tmpList.push(data);
        console.log(_tmpList)
      });

      //On met à jour la liste
      setDataJournal(_tmpList);
    })
  }, [])

  function addToJournal(title, desc){
    // [2] : envoyer les données sur Firebase
    db.collection("notes").doc().set({
      title: title,
      description: desc,
      done: false
    })
        .then(function() {
          console.log("Document successfully written!");
          navigate('Journal');
        })
        .catch(function(error) {
          alert('Erreur')
          console.error("Error writing document: ", error);
        });
    //
    // setDataJournal([
    //   ...dataJournal, {
    //     title: title,
    //     description: desc,
    //     done: false
    //   }
    // ])

    navigate('Journal');
  }

  function deletenote(id){
      db.collection("notes").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
        navigate('Journal');
      }).catch(function(error) {
        alert('Erreur')
        console.error("Error writing document: ", error);
      });
  }

  function updateNote(title, desc, id){
      // db.collection("notes").doc(id).update({
      //   title: title,
      //   description: desc
      // })
      //     .then(function() {
      //       console.log("Document successfully written!");
      //       navigate('Journal');
      //     })
      //     .catch(function(error) {
      //       alert('Erreur')
      //       console.error("Error writing document: ", error);
      //     });
      // //
      // // setDataJournal([
      // //   ...dataJournal, {
      // //     title: title,
      // //     description: desc,
      // //     done: false
      // //   }
      // // ])
      //
      // navigate('Journal');
  }

  if(!loggedIn){
    return (
      <Login login={login}/>
    )
  }

  return (
    <SafeAreaView style={styles.container}>

      <MyHeader title={page}/>

      {
        page === 'Journal' &&  <Journal
            data={dataJournal}
            navigate={navigate}
            deletenote={deletenote}
            updateNote={updateNote}
        />
      }

      { page === 'BankAccount' && <BankAccount />}

      { page === 'AddForm' && <AddForm handleAdd={addToJournal}/>}

      { page === 'Tutorial' && <TutorialImage/>}

      { page === 'Courses' && <ListeCourses/>}
      
      <View style={styles.topMenu}>
        <Button 
          title="Bank" 
          color={page === "BankAccount" ? "green" : 'grey'}
          onPress={() => navigate('BankAccount')}
          />
        <Button 
          title="Courses" 
          color={page === "Courses" ? "green" : 'grey'}
          onPress={() => navigate('Courses')}
          />

        <Button 
          title="Journal" 
          color={page === "Journal" ? 'green' : 'grey'}
          onPress={() => navigate('Journal')}
          />

        <Button 
          title="Image" 
          color={page === "Tutorial" ? 'green' : 'grey'}
          onPress={() => navigate('Tutorial')}
          />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topMenu: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
