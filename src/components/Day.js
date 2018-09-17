import React from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
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
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Button onPress={() => this.changeCurrentDay(this.state.index + 1)} title={'Précédent'} disabled={this.state.index === 6} />
          <Text style={{width: 190, textAlign: 'center'}}>{currentDay.dayString} {currentDay.day} {currentDay.monthString} {currentDay.year}</Text>
          <Button onPress={() => this.changeCurrentDay(this.state.index - 1)} title={'Suivant'} disabled={this.state.index === 0} />
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{ marginBottom: 20 }}>Nombre de clopes du jour :</Text>
          <Text style={{marginBottom: 20}}>{currentDay.counter}</Text>
          <View style={{flexDirection: 'row'}}>
            <Button onPress={() => this.updateCounter(-1)} title={'-'} disabled={currentDay.counter === 0}/>
            <Text>{'     '}</Text>
            <Button onPress={() => this.updateCounter(1)} title={'+'} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const mapStateToProps = store => {
  return {
    last7Days: store.days.last7Days,
  }
};

export default connect(mapStateToProps)(Day);