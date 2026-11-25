// @ts-check
import masalaKitchenCover from '../../public/projects/masala-kitchen.webp';

// Copy an entry to add a project. Use a unique URL-friendly id. Array order sets display order.
// Place the cover in public/projects/ and reference it as /projects/filename.webp.
/** @type {import("../types").ProjectItem[]} */
export const PROJECTS = [
  {
    id: 'masala-kitchen',
    title: 'Masala Kitchen',
    focus: 'hospitality',
    category: 'Online Ordering & Android Admin App',
    year: '2026',
    description: 'Customers order directly from the Masala Kitchen website. The restaurant’s admin panel is an Android mobile app where staff receive orders and manage the menu.',
    preview: {
      overview: 'Customers browse the menu and order directly for delivery or pickup.',
      challenge: 'Masala Kitchen wanted more direct orders so it could spend less on Zomato commissions.',
      approach: 'A new website order makes the staff’s Android phone ring like an incoming call. The team manages orders and updates the menu from the admin app.',
    },
    caseStudy: {
      title: 'Masala Kitchen’s ordering website and Android app',
      seoTitle: 'Masala Kitchen case study on Zomato commissions',
      description: 'To spend less on Zomato commissions, Masala Kitchen set up its own ordering website. Customers order directly, and staff manage orders in an Android mobile app.',
      sections: [
        {
          heading: 'Why Zomato commissions mattered',
          paragraphs: [
            'Restaurants pay Zomato a commission on orders placed through its platform. Masala Kitchen, a restaurant in Agra, wanted customers to have a direct way to order so the restaurant could save the Zomato commission on those orders.',
            'A menu website would only solve part of that problem. Staff also needed a way to notice a new order during service, see what the customer requested, and keep the menu current as dishes sold out.',
          ],
        },
        {
          heading: 'How customers order directly',
          paragraphs: [
            'We built an ordering website where customers can browse the menu, choose a portion or add extras, and send their order straight to the restaurant. At checkout they choose delivery or pickup. For a delivery order, they can set the delivery location as part of checkout.',
            'The website also shows whether the kitchen is taking orders. Someone who visits while the kitchen is closed can still browse the menu and decide what to order when it reopens.',
          ],
        },
        {
          heading: 'An Android admin app that rings for a new order',
          paragraphs: [
            'When a customer orders on the website, the admin app makes your Android phone ring like an incoming call. Staff can open the app, review the order, and update its status as the kitchen prepares it. The same app lets the team record counter sales.',
            'If a dish sells out during the dinner rush, staff can mark it as sold out from the app. The website shows that change to the next customer. The same setup lets the team change opening hours from its phone.',
          ],
        },
      ],
    },
    client: 'Masala Kitchen (Agra)',
    impact: 'Online ordering website and Android app for restaurant staff',
    image: masalaKitchenCover.src,
    imageAlt: 'Masala Kitchen ordering website',
    coverAspectRatio: masalaKitchenCover.width / masalaKitchenCover.height,
    tags: ['React', 'Firebase', 'Capacitor', 'Android'],
    featured: true,
  },
  {
    id: 'the-trusted-wall',
    shortTitle: 'The Trusted Wall',
    title: 'The Trusted Wall Architecture',
    focus: 'architecture',
    category: 'Architecture & Luxury Interiors',
    year: '2026',
    tier: 'Multi-page portfolio',
    description: 'An architecture portfolio and journal where prospective clients can explore finished buildings and read the Agra studio’s perspective on its work.',
    preview: {
      overview: 'An architecture portfolio shows finished spaces alongside a journal about the studio’s design decisions.',
      challenge: 'The studio needed clear project photography that clients could comfortably browse on a phone.',
      approach: 'The site delivers photos sized for each screen, and one editor lets the team publish projects and journal entries.',
    },
    caseStudy: {
      title: 'The Trusted Wall’s architecture portfolio and journal',
      seoTitle: 'Architecture portfolio website case study for The Trusted Wall',
      description: 'Webbound built an architecture portfolio and journal for The Trusted Wall in Agra, with photo galleries and an editor the studio can use to publish its own work.',
      sections: [
        {
          heading: 'Showing the space and explaining the design',
          paragraphs: [
            'The Trusted Wall needed a website where a prospective client could look through completed work and also learn how the Agra architecture studio thinks about design. A gallery gives a space room to be seen. A journal gives the architects room to explain the decisions behind it.',
            'The photography also had to work on a phone. Architectural details are hard to see in a small thumbnail, while a full gallery of desktop-sized photos can make a mobile visit unnecessarily heavy.',
          ],
        },
        {
          heading: 'A project archive with room for photography',
          paragraphs: [
            'We built a work archive where visitors can browse by project, then open a dedicated page to look through the photographs and read about the space. A visitor interested in one commission can share its own page directly.',
            'The site serves photos sized for the visitor’s screen. On a phone, the gallery can use a smaller file. On a larger display, the photographs have enough room to show more detail.',
          ],
        },
        {
          heading: 'One editor for projects and journal entries',
          paragraphs: [
            'The journal has its own reading space on the website. Someone comparing completed spaces can stay in the project archive, and someone interested in the practice’s perspective can browse the journal.',
            'Both sections are managed from the same editor. When the studio has new photography, it can publish a project. When it has a design idea to share, it can publish an entry. The site handles the page layout in both cases.',
          ],
        },
      ],
    },
    role: 'Lead Creative Engineer & Architect',
    client: 'The Trusted Wall Studio (Agra)',
    impact: 'Project archive, photo galleries, and an editable journal',
    image: '/projects/the-trusted-wall.webp',
    imageAlt: 'The Trusted Wall architecture studio website homepage',
    coverAspectRatio: 1680 / 853,
    tags: ['Self-service updates', 'React 19', 'GSAP', 'Vite'],
    link: 'https://thetrustedwall.com/',
    featured: true,
  },
  {
    id: 'tdid-interiors',
    shortTitle: 'TDID Interiors',
    title: 'TDID Interiors Luxury Studio',
    focus: 'interiors',
    category: 'Luxury Interior Design & Turnkey',
    year: '2026',
    tier: 'Type 1: Single-Page Flagship',
    description: 'A modular kitchen lookbook that lets Delhi NCR homeowners browse finished interiors and ask TDID about their own space on the same page.',
    preview: {
      overview: 'A single-page portfolio pairs a kitchen lookbook with an enquiry form.',
      challenge: 'TDID needed to show detail in its work and give homeowners a clear next step when they were ready to get in touch.',
      approach: 'Visitors can open gallery photos for a closer look, then choose a service and send an enquiry from the same page.',
    },
    caseStudy: {
      title: 'TDID Interiors’ kitchen lookbook and enquiry website',
      seoTitle: 'Modular kitchen portfolio website case study for TDID Interiors',
      description: 'A single-page interior design website for TDID Interiors that pairs a modular kitchen lookbook with an enquiry form for Delhi NCR homeowners.',
      sections: [
        {
          heading: 'From seeing a kitchen to asking about one',
          paragraphs: [
            'A homeowner looking for a modular kitchen may start with a picture of a cabinet finish, a worktop, or a layout they like. TDID Interiors needed a way to show that detail and give the visitor a clear next step when they were ready to talk about their own kitchen.',
            'The site also had to show that the studio works across interiors. Visitors needed to be able to recognise the type of work they came to see without reading through a long list of services first.',
          ],
        },
        {
          heading: 'A lookbook and project examples on one page',
          paragraphs: [
            'We built a single-page site with dedicated sections for services, projects, photography, and enquiries. The visual gallery brings modular kitchens together with other design details such as woodwork and ceilings. The project section gives visitors more context about individual examples.',
            'Gallery images can be opened for a closer look and browsed in sequence. A homeowner can look at a kitchen photo, close it, and continue down the same page to learn about TDID’s process or send an enquiry.',
          ],
        },
        {
          heading: 'Giving the first enquiry some context',
          paragraphs: [
            'The contact form lets a visitor choose a service and add a message alongside their contact details. Someone asking about a kitchen can use the message to describe their space or mention the feature they liked in the lookbook.',
            'That keeps the path from inspiration to enquiry on the same page. The gallery gives the homeowner something specific to refer to when they get in touch.',
          ],
        },
      ],
    },
    role: 'Digital Engineer & UI Director',
    client: 'TDID Interiors (Delhi NCR)',
    impact: 'Single-page studio portfolio with kitchen lookbook and enquiry form',
    image: '/projects/tdid-interiors.webp',
    imageAlt: 'TDID Interiors studio website homepage',
    coverAspectRatio: 1680 / 854,
    tags: ['React 19', 'Lenis Scroll', 'GSAP', 'Formspree'],
    link: 'https://tdidinteriors.com/',
    featured: true,
  },
  {
    id: 'studio-kalagya',
    shortTitle: 'Studio Kalagya',
    title: 'Studio Kalagya Architecture & Interiors',
    focus: 'architecture',
    category: 'Architecture & Spatial Interiors',
    year: '2026',
    tier: 'Studio-editable portfolio',
    description: 'A portfolio Studio Kalagya can keep current itself, from its latest interior renovation to a one-off installation.',
    preview: {
      overview: 'An editable portfolio gives architecture, interior renovations, and installations their own galleries.',
      challenge: 'Studio Kalagya needed a repeatable way to add new work and keep photo galleries easy to browse on phones.',
      approach: 'The studio can upload project photos and publish them itself. The site handles layout and image sizing.',
    },
    caseStudy: {
      title: 'Studio Kalagya’s editable architecture portfolio',
      seoTitle: 'Editable architecture portfolio case study for Studio Kalagya',
      description: 'Webbound built an editable portfolio for Studio Kalagya in Jabalpur so the team could publish new architecture and interiors galleries on its own.',
      sections: [
        {
          heading: 'A portfolio that could grow with the studio',
          paragraphs: [
            'Studio Kalagya’s work spans architecture, interiors, and installations. A building, a room renovation, and a small installation can each need a different set of photographs. The portfolio had to give each commission enough space while keeping the presentation consistent as visitors moved between projects.',
            'There was a publishing problem, too. Each finished commission meant another gallery to prepare. The studio needed a repeatable way to add photographs and put a new project online as soon as its material was ready.',
          ],
        },
        {
          heading: 'A reusable gallery for each commission',
          paragraphs: [
            'We built the portfolio around individual project galleries. A visitor who is interested in a renovation can open that project and look through its photos in one place. Other work sits in its own gallery and follows the same basic structure.',
            'The site handles the gallery layout and adjusts the photos for the visitor’s screen. The studio can concentrate on picking the photographs that tell each project’s story, while the site takes care of presenting them on phones and larger screens.',
          ],
        },
        {
          heading: 'How the studio publishes new work',
          paragraphs: [
            'When a project is ready to share, the team can add it in the editor, upload its photographs, and publish the gallery. The new project follows the established layout as soon as it goes live.',
            'That publishing workflow was part of the site we delivered. As the practice adds work at different scales, the same editor and gallery structure can accommodate each new commission.',
          ],
        },
      ],
    },
    role: 'Lead Digital Engineer & UI Architect',
    client: 'Studio Kalagya (Jabalpur, MP)',
    impact: 'Studio-managed project portfolio with reusable galleries',
    image: '/projects/studio-kalagya.webp',
    imageAlt: 'Studio Kalagya architecture and interiors portfolio website',
    tags: ['Self-service updates', 'Architecture', 'React 19', 'GSAP'],
    link: 'https://www.studiokalagya.in/',
    featured: true,
  },
  {
    id: 'forever-interior',
    shortTitle: 'Forever Interior',
    title: 'Forever Interior Spatial Studio',
    focus: 'interiors',
    category: 'Modular Kitchen & Spatial Interiors',
    year: '2026',
    tier: 'Multi-page portfolio',
    description: 'A showroom website for a Jaipur interiors studio where homeowners can explore kitchens, wardrobes, or living spaces and request a quote.',
    preview: {
      overview: 'An online showroom lets homeowners explore interiors and request a quote.',
      challenge: 'A visitor planning a wardrobe or kitchen needed a quick way to find relevant examples and ask about their own room.',
      approach: 'The site groups photos into product galleries the studio can update and guides visitors to a quote form.',
    },
    caseStudy: {
      title: 'Forever Interior’s digital showroom and quote request website',
      seoTitle: 'Modular kitchen showroom website case study for Forever Interior',
      description: 'A digital showroom for Forever Interior in Jaipur, with separate kitchen and wardrobe galleries, guided quote requests, and photo updates the studio can make itself.',
      sections: [
        {
          heading: 'Helping homeowners find the right room',
          paragraphs: [
            'A homeowner looking for a wardrobe has a different starting point from someone planning a modular kitchen. Forever Interior needed an online showroom that let both visitors go straight to relevant examples, especially when browsing on a phone.',
            'There was also a practical next step. Once a visitor had seen the work, they needed a way to ask about the scope and price of a project for their own home.',
          ],
        },
        {
          heading: 'Kitchens, wardrobes, and living spaces get their own galleries',
          paragraphs: [
            'We organised the Jaipur studio’s photography by product. A visitor can start with the type of interior they have in mind and browse examples of it. Someone interested in a kitchen can focus on those layouts and finishes, while a visitor planning storage can go straight to the wardrobe gallery.',
            'We also gave the studio a way to upload its own photos. As new interiors are finished, the team can keep the relevant gallery current and show examples from recent work.',
          ],
        },
        {
          heading: 'A guided quote request after browsing',
          paragraphs: [
            'The quote form gives the homeowner a place to start describing what they want. A person who arrives with an idea for one room can browse its gallery, then ask Forever Interior about the project they have in mind.',
            'The showroom and the enquiry form serve consecutive parts of that visit. The photographs give visitors a concrete starting point, and the quote request opens the conversation about what their own space will need.',
          ],
        },
      ],
    },
    role: 'Lead Digital Engineer & UI Architect',
    client: 'Forever Interior (Jaipur, Rajasthan)',
    impact: 'Product galleries the team can update and guided quote requests',
    image: '/projects/forever-interior.webp',
    imageAlt: 'Forever Interior modular kitchen and interiors website',
    tags: ['Self-service updates', 'React 19', 'GSAP', 'Next.js 15'],
    link: 'https://foreverinterio.in/',
    featured: true,
  },
  {
    id: 'blisscraft-events',
    title: 'BlissCraft Events',
    focus: 'events',
    category: 'Event Planning & Decoration',
    year: '2026',
    description: 'An occasion-led décor portfolio where Lucknow hosts can explore birthday and wedding setups, check the service area, and enquire about their celebration.',
    preview: {
      overview: 'Lucknow hosts can browse décor examples and check which areas BlissCraft serves.',
      challenge: 'Hosts needed to know whether BlissCraft could cover their occasion, style, and neighbourhood.',
      approach: 'The site organises services by occasion and pairs them with a gallery, a service-area list, and a decoration enquiry.',
    },
    caseStudy: {
      title: 'BlissCraft Events’ décor portfolio and enquiry website',
      seoTitle: 'Event decoration website case study for BlissCraft Events',
      description: 'Webbound built an event décor website for BlissCraft Events in Lucknow, organised by occasion with example setups, service areas, and a decoration enquiry.',
      sections: [
        {
          heading: 'What hosts need to know before they enquire',
          paragraphs: [
            'Someone arranging a birthday and someone planning a Haldi ceremony arrive with different ideas about how their event should look. BlissCraft Events needed a site that helped each host find a relevant service and see examples of what the team can create.',
            'Location was another practical question. A host in Lucknow needed to know whether BlissCraft works in their neighbourhood before getting in touch about decoration.',
          ],
        },
        {
          heading: 'Decoration services organised by occasion',
          paragraphs: [
            'We organised the services around the celebration. A host can start with the occasion they recognise, such as a birthday or a wedding event, and use the gallery to see the team’s décor work. The photographs give them something concrete to refer to when discussing a style or setup.',
            'The website also lists the Lucknow neighbourhoods the team serves. A visitor can check the location alongside the service and décor examples in the same visit.',
          ],
        },
        {
          heading: 'A clearer starting point for the event enquiry',
          paragraphs: [
            'After looking through the services and checking the area, the host can use the decoration enquiry to contact BlissCraft about their event. They can start that conversation with a clearer idea of the occasion, the kind of decoration they want, and where it will take place.',
            'For a local events business, the site answers the questions a host usually brings to the first visit. It gives them a practical way to move from looking at past setups to discussing their own celebration.',
          ],
        },
      ],
    },
    client: 'BlissCraft Events (Lucknow)',
    impact: 'Event portfolio and enquiry website',
    image: '/projects/blissfullcraft-events.webp',
    imageAlt: 'BlissCraft Events homepage introducing its celebration décor services in Lucknow',
    coverAspectRatio: 16 / 9,
    tags: ['JavaScript', 'CSS', 'Render'],
    link: 'https://blissfullcraft-events.onrender.com/',
    featured: true,
  },
];
