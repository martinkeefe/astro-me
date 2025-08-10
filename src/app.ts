export type NavItem = {
  href: string;
  text: string;
  ident: string;
  sub?: NavItem[];
};

export type App = ReturnType<typeof App>;

const App = () => {
  const menu: NavItem[] = [
    {
      ident: "maths",
      text: "Maths",
      href: "/maths-links",
      //sub:[
      //	{href:'/parasurf/intro', text:'Parametric Surfaces', ident:'parasurf'},
      //	{href:'/mathjax-guide/1', text:'MathJax Guide', ident:'mathjax-guide'},
      //	{href:'/tiling-gloss', text:'Tiling Glossary', ident:'tiling'},
      //]
    },
  ];

  const self = {
    menu,
  };

  return self;
};

export const app = App();
