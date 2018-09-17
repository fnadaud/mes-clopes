import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, TouchableNativeFeedback } from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import * as Actions from "../store/actions";

class Day extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentDay: this.props.last7Days[0],
      index: 0
    };
  }

  update = () => {
    const { dispatch } = this.props;
    dispatch(Actions.days.update(item));
  }

  updateCounter = (number) => {
    let newDay = this.state.currentDay;
    if(newDay.counter > 0 || number > 0){
      if (newDay.counter + number <= 0) {
        newDay.counter = 0;
      } else {
        newDay.counter += number;
      }
      this.setState({
        currentDay: newDay
      });
      this.props.dispatch(Actions.days.update(this.state.currentDay));
    }
  }

  changeCurrentDay = (index) => {
    if(index >= 0 && index < 7){
      this.setState({
        currentDay: this.props.last7Days[index],
        index
      })
    }
  }

  render() {
    const { currentDay } = this.state;
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', width:'100%', paddingVertical: 15, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#35a6b4'}}>
          <TouchableOpacity onPress={() => this.changeCurrentDay(this.state.index + 1)} title={'Précédent'} disabled={this.state.index === 6} style={[styles.button, this.state.index === 6 && {opacity: 0.3}]}>
            <Material name={"chevron-left"} color={'white'} size={24}/>
          </TouchableOpacity>
          <Text style={{ fontSize: 18, textAlign: 'center', color: 'white', fontWeight: 'bold'}}>{currentDay.dayString} {currentDay.day} {currentDay.monthString}</Text>
          <TouchableOpacity onPress={() => this.changeCurrentDay(this.state.index - 1)} title={'Suivant'} disabled={this.state.index === 0} style={[styles.button, this.state.index === 0 && {opacity: 0.3}]}>
            <Material name={"chevron-right"} color={'white'} size={24}/>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{height: 260, width: 200, backgroundColor: 'white', elevation: 4}}>
            <View style={{height: 30, width: 200, backgroundColor: '#35a6b4'}}/>
            <View style={{height: 230, width: 200, alignItems: 'center', justifyContent: 'space-evenly'}}>
              <Text style={{fontSize: 18, textAlign: 'center' }}>Nombre de clopes :</Text>
              <Text style={{fontSize: 45}}>{currentDay.counter}</Text>
              <View style={{flexDirection: 'row'}}>
                <View style={{backgroundColor: currentDay.counter === 0 ? 'grey' : '#35a6b4', borderRadius: 4, elevation: 4}}>
                  <TouchableOpacity onPress={() => this.updateCounter(-1)} disabled={currentDay.counter === 0} style={{width: 45, height: 45, justifyContent: 'center', alignItems: 'center'}} >
                    <Text style={{color: 'white', textAlign: 'center', textAlignVertical: 'center', fontSize: 18, elevation: 2}}>-</Text>
                  </TouchableOpacity>
                </View>
                <Text>{'       '}</Text>
                <View style={{backgroundColor: '#35a6b4', borderRadius: 4, elevation: 4}}>
                  <TouchableOpacity onPress={() => this.updateCounter(1)} style={{width: 45, height: 45, justifyContent: 'center', alignItems: 'center'}} >
                    <Text style={{color: 'white', textAlign: 'center', textAlignVertical: 'center', fontSize: 18, elevation: 2}}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: 80,
    justifyContent: 'center',
    alignItems:'center'
  }
});

const mapStateToProps = store => {
  return {
    last7Days: store.days.last7Days,
  }
};

export default connect(mapStateToProps)(Day);