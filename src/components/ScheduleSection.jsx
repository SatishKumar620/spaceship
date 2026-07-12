import "./ScheduleSection.css";

const SCHEDULE = [
  {
    day: "SOL 01",
    time: "09:00 IST",
    title: "Mission Check-in",
    description: "Registration, ID verification, welcome kit distribution and docking procedures."
  },
  {
    day: "SOL 01",
    time: "10:00 IST",
    title: "Opening Ceremony",
    description: "Mission briefing, keynote speakers and HackQubit launch."
  },
  {
    day: "SOL 01",
    time: "11:00 IST",
    title: "Problem Statement Release",
    description: "Mission objectives unlocked. Teams begin designing solutions."
  },
  {
    day: "SOL 01",
    time: "13:00 IST",
    title: "Development Begins",
    description: "Build, innovate and collaborate with mentor support."
  },
  {
    day: "SOL 01",
    time: "20:00 IST",
    title: "Mentor Review",
    description: "Progress checkpoint with expert guidance."
  },
  {
    day: "SOL 02",
    time: "08:00 IST",
    title: "Final Development",
    description: "Complete features, polish UI and prepare presentation."
  },
  {
    day: "SOL 02",
    time: "11:00 IST",
    title: "Project Submission",
    description: "Source code and presentation uploaded to mission control."
  },
  {
    day: "SOL 02",
    time: "12:00 IST",
    title: "Judging",
    description: "Projects evaluated by the judging panel."
  },
  {
    day: "SOL 02",
    time: "15:00 IST",
    title: "Mission Complete",
    description: "Results announced and prizes awarded."
  }
];

export default function ScheduleSection() {
  return (
    <section id="schedule" className="missionSchedule">

      <div className="spaceBackground">
        <div className="nebula one"></div>
        <div className="nebula two"></div>

        <div className="stars">
          {Array.from({ length: 90 }).map((_, i) => (
            <span key={i}></span>
          ))}
        </div>

        <div className="timelineBeam">
          <div className="beamGlow"></div>
          <div className="energyFlow"></div>

          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className="packet"
              style={{ animationDelay: `${i * 0.8}s` }}
            />
          ))}
        </div>
      </div>

      <div className="scheduleHeader">
        <div className="missionTag">MISSION CONTROL</div>

        <h2>
          MISSION <span>TIMELINE</span>
        </h2>

        <p>
          Every milestone moves your crew one step closer to mission success.
        </p>
      </div>

      <div className="timeline">
        {SCHEDULE.map((item, index) => (
          <div
            key={index}
            className={`missionCard ${index % 2 ? "right" : "left"}`}
          >
            <div className="node">
              <div className="pulse"></div>
            </div>

            <div className="cardGlass">
              <div className="scan"></div>

              <div className="topRow">
                <div className="missionDay">{item.day}</div>
                <div className="status">ONLINE</div>
              </div>

              <div className="timeBlock">
                <div className="time">{item.time}</div>
                <div className="missionCode">
                  T+{String(index).padStart(2, "0")}:00
                </div>
              </div>

              <div className="title">{item.title}</div>

              <p>{item.description}</p>

              <div className="telemetry">
                <div>SIGNAL <b>98%</b></div>
                <div>POWER <b>100%</b></div>
                <div>SYNC <b>OK</b></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="missionEnd">
        <div className="finishGlow"></div>

        <h3>MISSION COMPLETE</h3>

        <p>
          Transmission Successful • Winners Announced • Return to Earth
        </p>
      </div>

    </section>
  );
}
