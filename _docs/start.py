class Calendar(Object):
  def __init__(self, tasks = None, paths = None):
    self.tasks = tasks
    self.paths = paths

  def place_task(self, task):
    task.check_errors()
    self.tasks += task

  def remove_task(self, task):
    self.tasks.remove(task)

  def remove_path(self, path):
    self.paths.remove(path)

  def check_network(self):
    for path in self.paths:
      if path.not_valid(self.tasks): self.remove_path(path)

  def display(self):
    return None

class Task(Object):
  def __init__(self, title = "Untitled", time_period = None, location = None):
    self.title = title
    self.time_period = time_period if time_period else TimePeriod()
    self.active_location = location if location else Location()
  
  def check_errors(self):
    return None

class Path(Object):
  def __init__(self, start_task, end_task, active_route = None, routes = None):
    self.start_task = start_task
    self.end_task = end_task
    self.active_route = active_route if active_route else Route()
    self.routes = routes if routes else [self.active_route]

  def not_valid(self, tasks):
    return (self.start_task is in tasks and self.end_task is in tasks)

class Location(Object):
  def __init__(self):
    pass

class Route(Object):
  def __init__(self, mode, waypoints, time_period, distance):

class TimePeriod(Object):
  def __init__(self, start_time, end_time, duration, is_fixed):

class User(Object):
  def __init__(self, home_location, available_paths, available_times)