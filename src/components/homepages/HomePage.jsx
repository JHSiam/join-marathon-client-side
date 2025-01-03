import React from 'react'
import Slider from './Slider'
import MarathonsLimit from './MarathonsLimit'
import MarathonEventCard from './MarathonEventCard'
import WhyJoinMarathons from './WhyJoinMarathons'
import MarathonJoinCount from './MarathonJoinCount'

export default function HomePage() {
  return (
    <div>
      <Slider></Slider>
      <MarathonsLimit></MarathonsLimit>
      <MarathonEventCard></MarathonEventCard>
      <WhyJoinMarathons></WhyJoinMarathons>
      <MarathonJoinCount></MarathonJoinCount>
    </div>
  )
}
