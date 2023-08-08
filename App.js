import { useState } from 'react';
import { Button, FlatList, StyleSheet,View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GoalItem from './components/goalItem';
import GoalInput from './components/goalInput';

export default function App() {
  const [modalIsVisible,setModalIsVisible] = useState(false)
  const[courseGoals,setCourseGoals] = useState([])
  const[number,setNumber] = useState(1)

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endGoalHandler() {
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    const randomNumber = Math.floor(Math.random()*1000)+1
    setNumber(randomNumber)
    setCourseGoals((currentCourseGoals)=>[
      ...currentCourseGoals,
       { text: enteredGoalText, id: number},
    ])
    endGoalHandler()
  }

  function deleteGoalHandler(id) {
    console.log(id)
    setCourseGoals((currentCourseGoals)=> {
      return currentCourseGoals.filter((goal)=> goal.id !== id)
    })
  }
  return (
    <>
    <StatusBar style='light' />
    <View style = {styles.appContainer}>
      <Button 
      title='Add New Goal' 
      color='#5e0acc' 
      onPress={startAddGoalHandler}
      />
       <GoalInput 
       visible = {modalIsVisible} 
       onAddGoal = {addGoalHandler} 
       onCancel = {endGoalHandler}
       />
      <View style = {styles.goalContainer}>
      <FlatList 
      data={courseGoals} 
      renderItem={(itemData)=>{
        return <GoalItem 
        text = {itemData.item.text} 
        id = {itemData.item.id}
        onDeleteItem={deleteGoalHandler} 
        />;
      }} alwaysBounceVertical = 'false' 
      keyExtractor={(item,index)=> {
        return item.id;
      }}
      />
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer : {
    flex:1,
    paddingTop:50,
    paddingHorizontal:16,
    backgroundColor:'#1e085a'
  },

  goalContainer : {
    flex:6
  },
});
