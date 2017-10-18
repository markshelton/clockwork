import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { DragDropContext } from "react-dnd";
import moment from "moment";
import BigCalendar from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import styles from "./Calendar.scss";
import BigCalendarCSS from "react-big-calendar/lib/css/react-big-calendar.css";
import DragAndDropCalendarCSS from "react-big-calendar/lib/addons/dragAndDrop/styles.css";

import { actions } from "../../../state/calendar";

BigCalendar.momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class ViewCalendar extends Component {
  componentDidMount = () => {
    this.props.fetch_tasks();
  };
  handleSelectEvent = ({ id }) => {
    this.props.history.push({
      state: { task: this.props.tasks[id] },
      pathname: `/tasks/${id}/view`
    });
  };
  handleSelectSlot = ({ start, end, action }) => {
    if (action === "click") return false;
    this.props.history.push({
      state: { task: { start, end } },
      pathname: `/tasks/new`
    });
  };
  handleMoveEvent = ({ event, start, end }) => {
    const events = this.generateEvents(this.props.tasks);
    const updatedEvent = { ...event, start, end };
    this.props.updateTask(updatedEvent, { redirect: false });
  };
  generateEvents = tasks => {
    tasks = Object.values(tasks);
    return tasks.map(task => {
      task.id = task._id;
      return task;
    });
  };
  render = () => {
    if (!this.props.tasks) return <div>Loading...</div>;
    return (
      <div className="Calendar">
        <DragAndDropCalendar
          selectable
          events={this.generateEvents(this.props.tasks)}
          startAccessor={({ start }) => moment(start).toDate()}
          endAccessor={({ end }) => moment(end).toDate()}
          defaultView="week"
          defaultDate={moment().toDate()}
          onSelectEvent={this.handleSelectEvent}
          onSelectSlot={this.handleSelectSlot}
          onEventDrop={this.handleMoveEvent}
        />
      </div>
    );
  };
}

const mapStateToProps = state => {
  return { tasks: state.calendar.tasks };
};

export default withRouter(connect(mapStateToProps, actions)(ViewCalendar));
