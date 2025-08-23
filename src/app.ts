export type NavItem = {
  href: string;
  text: string;
  ident: string;
  sub?: NavItem[];
};

export type App = ReturnType<typeof App>;

export type MNM = {
  num: string;
  title: string;
  when: string;
  date: string;
};

// prettier-ignore
export const MNMS: MNM[] = [
    { num: '08', title: 'Claudia’s Birthday', when: 'September 2008', date: '2016-09-17' },
    { num: '09', title: 'Minimalism and Modern Classical', when: 'October 2008', date: '2016-09-17' },
    { num: '11', title: 'Geof’s Birthday', when: 'January 2009', date: '2016-09-17' },
    { num: '14', title: '’70s Albums', when: 'April 2009', date: '2016-09-17' },
    { num: '15', title: 'Astronomy Night', when: 'May 2009', date: '2016-09-17' },
    { num: '18', title: '1969, the Shape of Things to Come', when: 'October 2009', date: '2016-09-17' },
    { num: '22', title: '2009 Retrospective', when: 'February 2010', date: '2016-09-17' },
    { num: '23', title: 'Travel Broadens the Mind', when: 'March 2010', date: '2016-09-17' },
    { num: '25', title: 'Screen Gems', when: 'June 2010', date: '2016-09-17' },
    { num: '27', title: 'Cloak & Dagger, Music for Secret Agents', when: 'August 2010', date: '2016-09-17' },
    { num: '29', title: 'The Life Aquatic', when: 'November 2010', date: '2016-09-17' },
    { num: '31', title: 'The Hazards of Love', when: 'February 2011', date: '2016-09-17' },
    { num: '33', title: 'Genetic Drift', when: 'July 2013', date: '2016-09-17' },
    { num: '34', title: 'What Becomes of the Brokenhearted', when: 'November 2013', date: '2016-09-17' },
]

const App = () => {
  const menu: NavItem[] = [
    {
      ident: "mnm",
      text: "Monday Night Martin",
      href: "/mnm/09",
      sub: MNMS.map((mnm) => ({
        href: "/mnm/" + mnm.num,
        text: `#${mnm.num}: ${mnm.title}`,
        ident: mnm.num,
      })),
    },
    {
      ident: "maths",
      text: "Maths",
      href: "/maths-links",
      sub: [
        {
          href: "/parasurf/intro",
          text: "Parametric Surfaces",
          ident: "parasurf",
          // sub: [
          //   {
          //     href: "/parasurf/intro",
          //     text: "Introduction",
          //     ident: "parasurf-intro",
          //   },
          // ],
        },
        // {href:'/mathjax-guide/1', text:'MathJax Guide', ident:'mathjax-guide'},
        // {href:'/tiling-gloss', text:'Tiling Glossary', ident:'tiling'},
      ],
    },
  ];

  const self = {
    menu,
  };

  return self;
};

export const app = App();
