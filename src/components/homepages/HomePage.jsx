import React from 'react'
import Slider from './Slider'
import MarathonsLimit from './MarathonsLimit'
import MarathonEventCard from './MarathonEventCard'
import WhyJoinMarathons from './WhyJoinMarathons'
import MarathonJoinCount from './MarathonJoinCount'
import { Helmet, HelmetProvider } from 'react-helmet-async'

export default function HomePage() {
  return (
    <div>
      <HelmetProvider><Helmet><title>Home - Join Marahton</title></Helmet></HelmetProvider>
      <Slider></Slider>
      <MarathonsLimit></MarathonsLimit>
      <MarathonEventCard></MarathonEventCard>
      <WhyJoinMarathons></WhyJoinMarathons>
      <MarathonJoinCount></MarathonJoinCount>
    </div>
  )
}
