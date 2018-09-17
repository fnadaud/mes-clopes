import React from 'react';
import { StyleSheet, Text, View, SectionList } from 'react-native';
import { connect } from 'react-redux';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
          data: item.days,
          id: item.days[0].year + (item.days[0].month / 100)
        })
      })
    });
    newList.sort(( item1, item2 ) => { return item2.id - item1.id })
    newList.forEach( item => {
      item.data.sort( ( item1, item2 ) => { return item2.day - item1.day })
    })
    return newList
  }

  renderSectionHeader = ({ section: { title, data } }) => {
    let cpt = 0;
    data.forEach(item => cpt += item.counter);
    return (
      <View style={{backgroundColor: '#35a6b4', justifyContent: 'center', paddingVertical: 15}}>
        <Text style={{ fontWeight: 'bold', textAlign: 'center', color: 'white', fontSize: 18}}>
          {title} - Total : {cpt}
        </Text>
      </View>
    )
  }

  renderItem = ({ item }) => {
    return (
      <View style={{paddingVertical: 10, height: 80, flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <View style={{marginLeft: 20, flex:1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', borderRadius: 4, overflow: 'hidden'}}>
            <Text style={styles.text}>{item.dayString} {item.day}</Text>
        </View>
        <View style={{marginHorizontal: 20, backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', borderRadius: 4, overflow: 'hidden'}}>
          <View style={{width: 70, height: "100%", alignItems: 'center', justifyContent: 'center', backgroundColor: '#35a6b4'}}>
            <Material style={{paddingBottom: 10}} name={'smoking'} color={'white'} size={25}/>
          </View>
          <View style={{width: 70, height: "100%", alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
            <Text style={[styles.text, {color: 'black'}]}>{item.counter}</Text>
          </View>
        </View>
      </View>
    )
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 4,
          width: "100%",
          backgroundColor: "white",
        }}
      />
    );
  };

  renderEmptyList = () => {
    return (
      <View style={{height: '100%'}}>
        <View style={{backgroundColor: '#35a6b4', justifyContent: 'center', paddingVertical: 15}}>
          <Text style={{ fontWeight: 'bold', textAlign: 'center', color: 'white', fontSize: 18}}>
            Aucune donnée
          </Text>
        </View>
        <View style={{marginTop:-30, height: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <Ionicons name={'logo-no-smoking'} size={120} color={'white'} />
        </View>
      </View>
    )
  }

  render() {
    return (
      <View>
        {
        this.state.list.length !== 0 ?
          <SectionList
            style={{width:'100%'}}
            stickySectionHeadersEnabled={true}
            sections={this.state.list}
            renderSectionHeader={this.renderSectionHeader}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={(item, index) => String(item.year) + String(item.month) + String(item.day) + String(index)}
          />
        :
          this.renderEmptyList()
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center'
  }
});

const mapStateToProps = store => {
  return {
    last7Days: store.days.last7Days,
    years: store.days.years
  }
};

export default connect(mapStateToProps)(Overview);