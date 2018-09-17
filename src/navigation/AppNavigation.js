import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Day, Overview } from '../components';
import moment from 'moment';
import * as Actions from "../store/actions";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

const DayStack = createStackNavigator(
  {
    Day: {
      screen: Day,
      navigationOptions: () => {
        return {
          headerTitle: 'Modification du nombre de clopes'
        };
      }
    },
  },
  {
    navigationOptions: () => ({
      headerStyle: { backgroundColor: '#efefef' },
      headerTintColor: "black",
    }),
  }
);

const OverviewStack = createStackNavigator(
  {
    Overview: {
      screen: Overview,
      navigationOptions: () => {
        return {
          headerTitle: "Vue d'ensemble"
        };
      }
    },
  },
  {
    navigationOptions: () => ({
      headerStyle: { backgroundColor: '#efefef' },
      headerTintColor: "black",
    }),
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    DayChange: {
      screen: DayStack,
      navigationOptions: () => {
        return {
          header: null,
          title: "Ajout",
        }
      }
    },
    Overview: {
      screen: OverviewStack,
      navigationOptions: () => {
        return {
          header: null,
          title: "Visualisation",
        }
      }
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'DayChange') {
          iconName = `plus-circle`;
          return <Material name={iconName} size={25} color={tintColor} />;
        } else if (routeName === 'Overview') {
          iconName = `logo-no-smoking`;
          return <Ionicons name={iconName} size={25} color={tintColor} />;
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: '#2b69ab',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
);

class AppNavigation extends React.Component {

  constructor(props){
    super(props);
    moment.updateLocale('fr', {
      months: 'Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Août_Septembre_Octobre_Novembre_Décembre'.split('_'),
      monthsShort: 'Janv._Févr._Mars_Avr._Mai_Juin_Juil._Août_Sept._Oct._Nov._Déc.'.split('_'),
      monthsParseExact: true,
      weekdays: 'Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vendredi_Samedi'.split('_'),
      weekdaysShort: 'Dim._Lun._Mar._Mer._Jeu._Ven._Sam.'.split('_'),
      weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
      weekdaysParseExact: true,
      longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm'
      },
      calendar: {
        sameDay: '[Aujourd’hui à] LT',
        nextDay: '[Demain à] LT',
        nextWeek: 'dddd [à] LT',
        lastDay: '[Hier à] LT',
        lastWeek: 'dddd [dernier à] LT',
        sameElse: 'L'
      },
      relativeTime: {
        future: 'dans %s',
        past: 'il y a %s',
        s: 'quelques secondes',
        m: 'une minute',
        mm: '%d minutes',
        h: 'une heure',
        hh: '%d heures',
        d: 'un jour',
        dd: '%d jours',
        M: 'un mois',
        MM: '%d mois',
        y: 'un an',
        yy: '%d ans'
      },
      dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
      ordinal: function (number) {
        return number + (number === 1 ? 'er' : 'e');
      },
      meridiemParse: /PD|MD/,
      isPM: function (input) {
        return input.charAt(0) === 'M';
      },
      meridiem: function (hours, minutes, isLower) {
        return hours < 12 ? 'PD' : 'MD';
      },
      week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4  // The week that contains Jan 4th is the first week of the year.
      }
    });

    this.last7Days = [];
    for (let i = 0; i < 7; i++) {
      const day = moment().subtract(i, 'days').format('dddd D MMMM MM YYYY').split(' ');
      const dayObj = {
        dayString: day[0],
        day: parseInt(day[1]),
        monthString: day[2],
        month: parseInt(day[3]),
        year: parseInt(day[4]),
        counter: 0
      }
      this.last7Days.push(dayObj);
    }
    this.props.dispatch(Actions.days.setLast7Days(this.last7Days));
  }

  render() {
    return <TabNavigator/>
  }
}

const mapStateToProps = store => {
  return {}
};

export default connect(mapStateToProps)(AppNavigation);