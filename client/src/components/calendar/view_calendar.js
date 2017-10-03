import React, {Component} from "react";
import {connect} from "react-redux";
import {Route, Switch, Redirect} from "react-router-dom";
import BigCalendar from 'react-big-calendar';
import BigCalendarCSS from "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';

import events from "./_events";

BigCalendar.momentLocalizer(moment);

class ViewCalendar extends Component {
  handleSelectEvent({id}) {
    console.log("view event");
    <Redirect to={`/tasks/${id}/view`} push />
  }
  handleSelectSlot(slotInfo) {
    console.log("new event");
    <Redirect to='/tasks/new' push />
  }
  render() {
    return (
      <div>
        <BigCalendar
          selectable
          events= {events} // {this.props.events}
          defaultView='week'
          defaultDate={new Date(2015, 3, 1)} // {moment()}
          onSelectEvent={this.handleSelectEvent.bind(this)}
          onSelectSlot={this.handleSelectSlot.bind(this)}
          style={{height: 800}}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {authenticated: state.auth.authenticated};
};

export default connect(mapStateToProps)(ViewCalendar);