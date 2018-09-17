import React from 'react';
import { StyleSheet, Text, View, SectionList, Button } from 'react-native';
import { connect } from 'react-redux';
import * as Actions from "../store/actions";

class Overview extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      list: this.formatList(this.props.years)
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      list: this.formatList(nextProps.years)
    })
  }
  
  formatList = (list) => {
    let newList = [];
    list.forEach(element => {
      element.months.forEach(item => {
        newList.push({
          title: `${item.days[0].monthString} ${item.days[0].year}`,
          data: item.days
        })
      })
    });
    return newList
  }

  render() {
    const currentDay = this.props.last7Days[0];
    return (
      <View style={styles.container}>
        <SectionList 
          sections={this.state.list}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={{ fontWeight: 'bold' }}>{title}</Text>
          )}
          renderItem={({ item, index, section }) => <Text key={index}>{item.dayString} {item.day} {item.monthString} {item.year} : {item.counter}</Text>}
          keyExtractor={(item, index) => String(item.year) + String(item.month) + String(item.day) + String(index)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = store => {
  return {
    last7Days: store.days.last7Days,
    years: store.days.years
  }
};

export default connect(mapStateToProps)(Overview);