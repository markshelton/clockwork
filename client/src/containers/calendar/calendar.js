import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import { DragDropContext } from "react-dnd";
import moment from "moment";
import BigCalendar from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import BigCalendarCSS from "react-big-calendar/lib/css/react-big-calendar.css";
import DragAndDropCalendarCSS from "react-big-calendar/lib/addons/dragAndDrop/styles.css";

import * as actions from "../../actions/_actions";

BigCalendar.momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class ViewCalendar extends Component {
  componentDidMount = () => {
    this.props.fetchTasks();
  };
  handleSelectEvent = ({ id }) => {
    this.props.history.push(`/tasks/${id}/view`);
  };
  handleSelectSlot = ({ start, end, action }) => {
    if (action === "click") return false;
    this.props.createTempTask({ start, end });
  };
  handleMoveEvent = ({ event, start, end }) => {
    const { events } = this.state;
    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };
    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);
    this.setState({ events: nextEvents });
    this.props.updateTask(updatedEvent);
  };
  generateEvents = tasks => {
    tasks = Object.values(tasks);
    const events = tasks.map(task => {
      task.id = task._id;
      return task;
    });
    //this.setState({ events });
    return events;
  };
  render = () => {
    const { tasks } = this.props;
    if (!tasks) return <div>Loading...</div>;
    return (
      <div>
        <DragAndDropCalendar
          selectable
          events={this.generateEvents(tasks)}
          startAccessor={({ start }) => moment(start).toDate()}
          endAccessor={({ end }) => moment(end).toDate()}
          defaultView="week"
          defaultDate={moment().toDate()}
          onSelectEvent={this.handleSelectEvent}
          onSelectSlot={this.handleSelectSlot}
          onEventDrop={this.handleMoveEvent}
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
