export const individual = {
  id: 1,
  firstName: 'Joe',
  lastName: 'Shmoe',
  name: 'Joe Shmoe',
  city: 'New York',
  state: 'NY',
  couttry: 'USA',
  location: 'New York, NY',
  title: 'CEO',
  company: 'Joe Shmoe Inc.',
  companyUrl: 'https://www.joeshmoe.com',
  avatar: 'images/avatars/d3877ed5-f251-4d69-8e3e-48eaee47d1eb.jpeg',
  team: 'Team Britni',
  email: 'joeshmoe@gmoe.com',
  isPrivate: false,
  bio: {
    blocks: [
      {
        key: '9ma5o',
        text: 'Given an HTML fragment, convert it to an object with two keys; one holding the array of ContentBlock objects, and the other holding a reference to the entityMap. Construct content state from the array of block elements and the entityMap, and then update the editor state with it. Full example available here.',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [
          { offset: 88, length: 12, style: 'CODE' },
          { offset: 303, length: 4, style: 'color-var(--ifm-link-color)' },
          { offset: 303, length: 4, style: 'UNDERLINE' },
        ],
        entityRanges: [{ offset: 303, length: 4, key: 0 }],
        data: {},
      },
      {
        key: 'nm9c',
        text: 'Edit this page',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [
          { offset: 0, length: 14, style: 'color-rgb(28,30,33)' },
          { offset: 0, length: 14, style: 'fontsize-16' },
          {
            offset: 0,
            length: 14,
            style:
              'fontfamily-system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "system-ui", "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol',
          },
          { offset: 0, length: 14, style: 'color-var(--ifm-link-color)' },
          { offset: 0, length: 14, style: 'UNDERLINE' },
        ],
        entityRanges: [{ offset: 0, length: 14, key: 1 }],
        data: { 'text-align': 'start' },
      },
    ],
    entityMap: {
      0: {
        type: 'LINK',
        mutability: 'MUTABLE',
        data: {
          url: 'https://github.com/facebook/draft-js/tree/master/examples/draft-0-10-0/convertFromHTML',
          title: 'here',
          targetOption: '_blank',
          _map: {
            type: 'LINK',
            mutability: 'MUTABLE',
            data: {
              url: 'https://github.com/facebook/draft-js/tree/master/examples/draft-0-10-0/convertFromHTML',
              title: 'here',
              targetOption: '_blank',
            },
          },
        },
      },
      1: {
        type: 'LINK',
        mutability: 'MUTABLE',
        data: {
          url: 'https://github.com/facebook/draft-js/edit/master/docs/APIReference-Data-Conversion.md',
          title:
            '<svg fill="currentColor" height="1.2em" width="1.2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 40 40" style="margin-right: 0.3em; vertical-align: sub;"><g><path d="m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"></path></g></svg>Edit this page',
          targetOption: '_blank',
          _map: {
            type: 'LINK',
            mutability: 'MUTABLE',
            data: {
              url: 'https://github.com/facebook/draft-js/edit/master/docs/APIReference-Data-Conversion.md',
              title:
                '<svg fill="currentColor" height="1.2em" width="1.2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 40 40" style="margin-right: 0.3em; vertical-align: sub;"><g><path d="m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"></path></g></svg>Edit this page',
              targetOption: '_blank',
            },
          },
        },
      },
    },
  },
  hideQuotes: false,
  quotes: [
    {
      quote: `Given where valuations are, given where optimism is, given how fast and far we've come, it feels like the market is due for a little correction. There's a lot of good news out there but it really feels like it's all priced in,” says Spika.`,
      outlet: 'Bloomberg.com',
    },
  ],
  hideHighlights: false,
  highlights: [
    {
      id: 1,
      url: 'https://www.bloomberg.com/news/articles/2018-04-24/joe-shmoe-says-he-has-a-plan-to-make-the-world-a-better-place',
      title: 'Joe Shmoe Says He Has A Plan To Make The World A Better Place',
      outlet: 'Bloomberg.com',
      image: 'https://picsum.photos/200/300',
    },
    // {
    //   id: 2,
    //   url: 'https://www.bloomberg.com/news/articles/2018-04-24/joe-shmoe-says-he-has-a-plan-to-make-the-world-a-better-place',
    //   title: 'Joe Shmoe Says He Has A Plan To Make The World A Better Place',
    //   outlet: 'Bloomberg.com',
    //   image: 'https://picsum.photos/200/300',
    // },
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
      id: 1,
      name: 'CRE',
    },
    {
      id: 2,
      name: 'Investment',
    },
    {
      id: 3,
      name: 'Management',
    },
  ],
}

export const tags = [
  {
    id: 1,
    name: 'CRE',
  },
  {
    id: 2,
    name: 'Investment',
  },
  {
    id: 3,
    name: 'Management',
  },
]
