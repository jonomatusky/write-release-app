import React from 'react'
import { Container } from '@mui/material'

const ViewProfile = () => {
  const individual = {
    id: 1,
    firstName: 'Joe',
    lastName: 'Shmoe',
    addres: {
      city: 'New York',
      state: 'NY',
      couttry: 'USA',
    },
    title: 'CEO',
    company: 'Joe Shmoe Inc.',
    image: 'https://picsum.photos/200/300',
    Team: 'Team Britni',
    email: 'joeshmoe@gmoe.com',
    isPrivate: false,
    bio: 'Matthew Tuttle is the Chief Executive Officer and Chief Investment Officer of Tuttle Capital Management, LLC. Tuttle Capital Management (TCM) is an industry leader in offering thematic and actively managed ETFs. While many managers work within their respective silo when it comes to investment strategy, Tuttle looks at all methodologies and market dynamics, using forward-looking due diligence to combine methodologies and timeframes to achieve the best results.',
    hideQuotes: false,
    quotes: [
      {
        quote: `Given where valuations are, given where optimism is, given how fast and far we've come, it feels like the market is due for a little correction. There's a lot of good news out there but it really feels like it's all priced in,” says Spika.`,
        source: 'Bloomberg.com',
      },
    ],
    hideHighlights: false,
    highlights: [
      {
        url: 'https://www.bloomberg.com/news/articles/2018-04-24/joe-shmoe-says-he-has-a-plan-to-make-the-world-a-better-place',
        title: 'Joe Shmoe Says He Has A Plan To Make The World A Better Place',
        source: 'Bloomberg.com',
        poster: 'https://picsum.photos/200/300',
      },
    ],
    hideNews: false,
    trackerUrl: 'https://www.covertracker.com/',
    tabName: 'Coverage Tracker',
    mediaTrained: true,
    quickToBook: false,
    frequentSource: false,
    gender: 'male',
    tags: [
      {
        name: 'CRE',
      },
      {
        name: 'Investment',
      },
      {
        name: 'Management',
      },
    ],
  }

  return <Container></Container>
}
export default ViewProfile
