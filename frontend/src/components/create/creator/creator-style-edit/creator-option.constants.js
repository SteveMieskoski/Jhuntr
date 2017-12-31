

export const creatorOptionsConstants = {
    sectionsArray: [  //todo reduce number of section constant collections to a couple
        {name: 'achievements', label: 'Achievements'},
        {name: 'languages', label: 'Languages'},
        {name: 'projects', label: 'Projects'},
        {name: 'interests', label: 'Passions'},
        {name: 'employment', label: 'Employment'},
        {name: 'education', label: 'Education'},
        {name: 'skills', label: 'Skills'},
        {name: 'volunteer', label: 'Volunteer'},
        {name: 'strengths', label: 'Strengths'},
        {name: 'courses', label: 'Courses'},
        {name: 'summary', label: 'Summary'},
        {name: 'technologies', label: 'Technologies'}],
    allSectionsDefault: {
        achievements: false,
        languages: false,
        projects: false,
        interests: false,
        employment: false,
        education: false,
        skills: true,
        volunteer: true,
        strengths: true,
        courses: true,
        summary: true,
        technologies: true
    },
    allSections: [
        'achievements',
        'languages',
        'projects',
        'interests',
        'employment',
        'education',
        'skills',
        'volunteer',
        'strengths',
        'courses',
        'summary',
        'technologies'],
    sectionsObject: {
        'achievements': 'Achievements',
        'languages': 'Languages',
        'projects': 'Projects',
        'interests': 'Passions',
        'employment': 'Employment',
        'education': 'Education',
        'skills': 'Skills',
        'volunteer': 'Volunteer',
        'strengths': 'Strengths',
        'courses': 'Courses',
        'summary': 'Summary',
        'technologies': 'Technologies'
    },
    sectionLabelField: {
        'achievements': 'label',
        'languages': 'language',
        'projects': 'name',
        'interests': 'name',
        'employment': 'company',
        'education': 'institution',
        'skills': 'name',
        'volunteer': 'organization',
        'strengths': 'name',
        'courses': 'name',
        'technologies': 'name',
        'basics': 'firstname'
    },
    fontListing: [
        {name: 'Default', class: 'basic'},
        {name: 'Lato', class: 'lato-font'},
        {name: 'Garamond', class: 'garamond-font'},
        {name: 'Georgia', class: 'georgia-font'},
        {name: 'Dancing Script', class: 'dancing-script-font'},
        {name: 'Merriweather', class: 'merriweather-font'},
        {name: 'Montserrat', class: 'montserrat-font'},
        {name: 'Neuton', class: 'neuton-font'},
        {name: 'Oswald', class: 'oswald-font'},
        {name: 'QuattrocentoSans', class: 'quattrocento-font'},
        {name: 'Playfair Display', class: 'playfair-display-font'},
        {name: 'Open Sans', class: 'open-sans-font'},
        {name: 'Roboto Slab', class: 'roboto-slab-font'},
        {name: 'Roboto', class: 'roboto-font'},
        {name: 'Alex Brush', class: 'alex-brush-font'},
        {name: 'CAC Champagne', class: 'cac-champagne-font'}
    ],
    fontPairings: [
        {
            name: 'Lato/Merriweather',
            headingName: 'Lato',
            bodyName: 'Merriweather',
            headingFont: 'lato-font',
            subHeadingFont: 'merriweather-font',
            bodyFont: 'merriweather-font'
        },
        {
            name: 'Montserrat/Neuton',
            headingName: 'Montserrat',
            bodyName: 'Neuton',
            headingFont: 'merriweather-font',
            subHeadingFont: 'neuton-font',
            bodyFont: 'neuton-font'
        },
        {
            name: 'Oswald/QuattrocentoSans',
            headingName: 'Oswald',
            bodyName: 'QuattrocentoSans',
            headingFont: 'oswald-font',
            subHeadingFont: 'quattrocento-font',
            bodyFont: 'quattrocento-font'
        },
        {
            name: 'Playfair Display/Open Sans',
            headingName: 'Playfair Display',
            bodyName: 'Open Sans',
            headingFont: 'playfair-display-font',
            subHeadingFont: 'open-sans-font',
            bodyFont: 'open-sans-font'
        },
        {
            name: 'Roboto Slab/Roboto',
            headingName: 'Roboto Slab',
            bodyName: 'Roboto',
            headingFont: 'roboto-slab-font',
            subHeadingFont: 'roboto-font',
            bodyFont: 'roboto-font'
        }
    ],
    colorPairings: [
        {primary: 'first-color', secondary: 'second-color', selectable: 'second-color-choice'},
        {primary: 'first-color', secondary: 'sea-foam-color', selectable: 'sea-foam-choice'},
        {primary: 'first-color', secondary: 'yellow-color', selectable: 'yellow-choice'},
        {primary: 'first-color', secondary: 'bright-blue', selectable: 'bright-blue-choice'},
        {primary: 'first-color', secondary: 'purpleish', selectable: 'purple-choice'},
        {primary: 'first-color', secondary: 'dark-blueish', selectable: 'dark-blueish-choice'},
        {primary: 'first-color', secondary: 'umm-blue', selectable: 'umm-blue-choice'},
        {primary: 'first-color', secondary: 'first-color', selectable: 'first-color-all'}
    ],
    backgrounds: [
        {
            name: 'Honey (color inverted to show detail)',
            file: 'background-design.svg',
            selectable: 'honey-background-select',
            background_display: 'honey-background'
        },
        {
            name: 'Curve (color inverted to show detail)',
            file: 'background-curve.svg',
            selectable: 'curve-background-select',
            background_display: 'curve-background'
        },
        {name: 'None', file: '', selectable: 'no-background-select', background_display: ''}
    ]
};


