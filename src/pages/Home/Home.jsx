import BannerSlider from './components/BannerSlider'
import LatestNews from './components/LatestNews'
import WelcomeToGIC from './components/WelcomeToGIC'
import WhatWeProvide from './components/WhatWeProvide'
import NewsAndAnnouncements from './components/NewsAndAnnouncements'
import Quicklinks from './components/Quicklinks'
import BusinessLines from './components/BusinessLines'

const Home = () => {
  return (
    <div>

      <BannerSlider />
      <LatestNews />
      <WelcomeToGIC />
      <WhatWeProvide />
      <NewsAndAnnouncements />
      <Quicklinks />
      <BusinessLines />


    </div>
  )
}

export default Home