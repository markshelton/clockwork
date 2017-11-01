import React, { Component } from "react";

class Welcome extends Component {
  render = () => {
    return (
      <div>
        <div className="title">Welcome</div>
        <div className="message">Welcome to Clockwork!</div>
      </div>
    );
  };
}

const component = Welcome;
export default { component };

/*


<Page 1>
Welcome to Clockwork!
Before you get started, we have a few quick questions.

First of all, what's your name?
<First Name> <Last Name>

Continue <Button>

</Page 1>

<Page 2>

What's your home address?
<Home Address> (Google Map Search)

What are your usual sleeping hours?
<Start Time> <End Time> (Hour selector)

Continue <Button>

</Page 2>

<Page 3>

What's your work address?
<Work Address> (Google Map Search)

What are your usual working hours?
<Start Time> <End Time> (Hour selector)

Continue <Button>

</Page 3>

*/
