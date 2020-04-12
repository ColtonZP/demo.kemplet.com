import React, {Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import MainLayout from '../layouts/MainLayout';

export default class Index extends Component {
  render() {
    return (
      <div>
      <MainLayout/>
        <h1>Hello, world! 🌎</h1>
      </div>
    )
  }
}

// export default withTracker(() => {
//   let itemsSub = Meteor.subscribe('allItems');
//   let showAll = Session.get('showAll');
//   return {
//     showAll,
//     ready: itemsSub.ready(),
//     items: Items.find({
//     }, {
//       limit: showAll ? 50 : 1,
//       sort: {lastUpdated: 1}
//     }).fetch()
//   }
// })(App);
