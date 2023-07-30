import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import './calender.css';

const Schedule = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '60%' }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} // Add the dayGridPlugin here if needed
          initialView="timeGridFourDay"
          views={{
            timeGridFourDay:{
              type:"timeGrid",
              duration: { days: 4 }
            }
          }}
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: 'timeGridFourDay,dayGridMonth',
          }}
          buttonText={{
            today: 'Today',   // Change the text of the today button
            month: 'Month',   // Change the text of the month button
            week: 'Week',     // Change the text of the week button
            timeGridFourDay: 'Day'        // Change the text of the day button
          }}

          slotMinTime="09:00:00"
          slotMaxTime="20:00:00"
          selectable={true}
        />
      </div>
    </div>
  );
};

export default Schedule;
