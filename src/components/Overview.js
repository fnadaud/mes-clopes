import React from 'react';
import { StyleSheet, Text, View, SectionList } from 'react-native';
import { connect } from 'react-redux';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'

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
      <View style={{backgroundColor: '#35a6b4', justifyContent: 'center', paddingVertical: 10, borderBottomWidth: 2, borderColor: '#555'}}>
        <Text style={{ fontWeight: 'bold', textAlign: 'center', color: 'white', fontSize: 17}}>
          {title} - Total : {cpt}
        </Text>
      </View>
    )
  }

  renderItem = ({ item }) => {
    return (
      <View style={{margin: 10, padding: 10, backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', borderRadius: 4, borderWidth: 2, borderColor: '#bbb'}}>
        <Material style={{paddingBottom: 10, marginLeft: 10, width: 50}} name={'smoking'} color={'black'} size={25}/>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.text}>{item.dayString}</Text>
          <Text style={styles.text}>{item.day}</Text>
        </View>
        <View style={{marginRight: 10, flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.text, {width: 50}]}>{item.counter}</Text>
        </View>
      </View>
    )
  }

  renderEmptyList = () => {
    return (
      <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <Text>Vous n'avez saisi aucun jour</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {
        this.state.list.length !== 0 ?
          <SectionList
            style={{width:'100%'}}
            stickySectionHeadersEnabled={true}
            sections={this.state.list}
            renderSectionHeader={this.renderSectionHeader}
            renderItem={this.renderItem}
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