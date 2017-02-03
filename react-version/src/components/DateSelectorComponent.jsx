import React from 'react'
import { Input , Button } from 'semantic-ui-react';

const DateSelectorComponent = () => (
  <div>
  <Input placeholder='Search...' icon='calendar' iconPosition='left' />
  <Button color='blue' >分钟</Button>
  <Button color='violet'>小时</Button>
  </div>
)

export default DateSelectorComponent;
