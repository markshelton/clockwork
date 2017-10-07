import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import BigCalendar from "react-big-calendar";
import BigCalendarCSS from "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

import events from "./_events";
import * as actions from "../../actions";

BigCalendar.momentLocalizer(moment);

class ViewCalendar extends Component {
  componentDidMount = () => {
    //this.props.fetchTasks();
  };
  handleViewEvent = ({ id }) => {
    const { history } = this.props;
    history.push(`/tasks/${id}/view`);
  };
  handleNewEvent = ({ start, end }) => {
    const { history, createTempTask } = this.props;
    createTempTask({ start, end });
    history.push(`/tasks/new`);
  };
  render = () => {
    return (
      <div>
        <BigCalendar
          selectable
          events={events} //{this.props.tasks}
          defaultView="week"
          defaultDate={new Date(2015, 3, 1)} // {moment()}
          onSelectEvent={event => this.handleViewEvent(event)}
          onSelectSlot={event => this.handleNewEvent(event)}
          style={{ height: 800 }}
        />
      </div>
    );
  };
}

const mapStateToProps = state => {
  return { tasks: state.calendar.tasks };
};

export default withRouter(connect(mapStateToProps, actions)(ViewCalendar));
