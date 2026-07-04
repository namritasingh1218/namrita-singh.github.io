window.siteContent = {
  meta: {
    title: 'Namrita Singh — Data Analyst',
    description: 'Namrita Singh is a Data Analyst with 3+ years of experience in SQL, Power BI, Python, and Azure. Based in Gurugram, India.',
  },

  nav: [
    { text: 'About', section: 'about' },
    { text: 'Skills', section: 'skills' },
    { text: 'Experience', section: 'experience' },
    { text: 'Projects', section: 'projects' },
    { text: 'Education', section: 'education' },
    { text: "Let's Talk", section: 'contact', classes: 'nav-cta' },
  ],

  hero: {
    status: 'Available for new opportunities',
    name: { first: 'Namrita', last: 'Singh' },
    subtitle: 'Data Analyst · SQL · Power BI · Python · Azure',
    terminal: {
      query: `SELECT  name, role, experience, status
FROM    candidates
WHERE   expertise IN ('SQL', 'Power BI', 'Python')
  AND   cgpa >= 9.0
  AND   status = 'available';`,
      rows: [
        { key: 'name', value: 'Namrita Singh' },
        { key: 'role', value: 'Data Analyst' },
        { key: 'experience', value: '3+ years @ Cognizant' },
        { key: 'education', value: 'M.Sc. Statistics · 9.0 CGPA' },
        { key: 'status', value: 'OPEN TO WORK', active: true },
      ],
      meta: '5 rows returned · 0 errors',
    },
    ctas: [
      { text: 'View Projects', href: '#projects', classes: 'btn btn-solid' },
      { text: 'Get in Touch', href: '#contact', classes: 'btn btn-border' },
      { text: 'Resume ↓', href: 'namrita-singh-resume.pdf', classes: 'btn btn-ghost', download: true },
    ],
  },

  about: {
    eyebrow: 'About',
    heading: 'Turning raw data<br>into <em>clear decisions</em>',
    bio: [
      "I'm a Data Analyst with 3+ years of experience at Cognizant Technology Solutions and a strong academic foundation in Statistics — M.Sc. and B.Sc. both at 9.0 CGPA from Aligarh Muslim University.",
      'My work spans monitoring Azure Data Factory pipelines and Dynatrace alerts, building Power BI dashboards that inform weekly client decisions, and writing SQL to uncover operational trends at scale. Every dataset I work with is a problem to be structured and a story to be told.',
      'Actively seeking Data Analyst opportunities where analytical precision and clear communication translate directly into business value.',
    ],
    metrics: [
      { count: 3, suffix: '+', label: 'Years experience' },
      { count: 9, suffix: '.0', label: 'M.Sc. CGPA' },
      { count: 9, suffix: '+', label: 'Projects built' },
    ],
    pills: [
      'Data Storytelling',
      'KPI Monitoring',
      'Dashboard Design',
      'Statistical Analysis',
      'Business Reporting',
      'Data Validation',
    ],
    photo: {
      src: 'public/Profile_Image.jpeg' || '/Profile_Image.jpeg',
      alt: 'Namrita Singh',
    },
    contacts: [
      { href: 'mailto:namritasingh1218@gmail.com', label: 'namritasingh1218@gmail.com' },
      { href: 'tel:+917037036551', label: '+91 7037036551' },
    ],
  },

  skills: {
    eyebrow: 'Skills',
    heading: 'The analytical toolkit',
    radarLabel: 'Skill proficiency · 6-axis radar',
    categories: [
      {
        name: 'Data Analysis & Visualization',
        tags: [
          { text: 'Power BI', level: 'hi' },
          { text: 'DAX', level: 'hi' },
          { text: 'KPIs' },
          { text: 'Dashboards' },
          { text: 'Excel' },
        ],
        pct: 90,
      },
      {
        name: 'Databases & Querying',
        tags: [
          { text: 'SQL Server', level: 'hi' },
          { text: 'MySQL', level: 'hi' },
          { text: 'CTEs' },
          { text: 'Window Functions' },
          { text: 'Joins' },
        ],
        pct: 85,
      },
      {
        name: 'Programming',
        tags: [
          { text: 'Python', level: 'hi' },
          { text: 'Pandas' },
          { text: 'NumPy' },
          { text: 'Matplotlib' },
          { text: 'R' },
        ],
        pct: 80,
      },
      {
        name: 'Cloud & Tools',
        tags: [
          { text: 'Azure Data Factory', level: 'hi' },
          { text: 'Azure Data Lake' },
          { text: 'Dynatrace' },
          { text: 'ServiceNow' },
          { text: 'GitHub' },
        ],
        pct: 75,
      },
    ],
  },

  experience: {
    eyebrow: 'Experience',
    heading: 'Career at Cognizant<br><em>Technology Solutions</em>',
    ganttLabel: 'Jul 2022 → Present · career progression timeline',
    roles: [
      {
        date: 'Oct 2024 — Present',
        location: 'Gurugram, HR',
        title: 'Junior Software Engineer',
        company: 'Cognizant Technology Solutions',
        desc: 'Analyzed Azure Data Factory pipeline logs, DLQ queues, and Dynatrace alerts to monitor data workflow health, identify incident patterns, and perform data validation — ensuring accuracy, reliability, and improved operational KPIs.',
        tags: ['Azure Data Factory', 'Dynatrace', 'Data Validation', 'KPI Monitoring'],
        current: true,
      },
      {
        date: 'Jul 2023 — Oct 2024',
        location: 'Remote',
        title: 'Senior Systems Engineer',
        company: 'Cognizant Technology Solutions',
        desc: 'Created and presented weekly performance dashboards and reports by analyzing incident and system data, identifying operational trends, and delivering data-driven insights for client decision-making.',
        tags: ['Power BI', 'Dashboard Design', 'Data Analytics', 'Client Reporting'],
      },
      {
        date: 'Mar 2023 — Jul 2023',
        location: 'Remote',
        title: 'System Engineer',
        company: 'Cognizant Technology Solutions',
        desc: 'Monitored website and application data for uptime and availability, performed large-scale data recertification and IFC control checks, and generated automated reports ensuring 100% data accuracy and compliance.',
        tags: ['Data Monitoring', 'IFC Controls', 'Automated Reports', 'Compliance'],
      },
      {
        date: 'Jul 2022 — Mar 2023',
        location: 'Remote',
        title: 'Programmer Trainee',
        company: 'Cognizant Technology Solutions',
        desc: 'Performed health checks across websites and applications ensuring uptime and availability. Monitored and validated job execution across SAP, Mainframe, and i90 environments.',
        tags: ['SAP Monitoring', 'Mainframe', 'Health Checks', 'Job Validation'],
      },
    ],
  },

  projects: {
    eyebrow: 'Projects',
    heading: 'Work that speaks<br><em>through data</em>',
    cards: [
      {
        type: 'sql',
        badge: 'SQL',
        title: 'SQL Data Analysis',
        desc: "Advanced queries on real-world datasets — Domino's Pizza Sales and Netflix Movies & TV Shows — using joins, CTEs, window functions, and time-based revenue analysis.",
        tags: ['SQL Server', 'CTEs', 'Window Functions'],
        href: '#',
        linkText: 'View on GitHub',
      },
      {
        type: 'bi',
        badge: 'Power BI',
        title: 'Interactive BI Dashboards',
        desc: 'COVID-19 Global Impact, Global Retail Sales Insights, and Mobile Sales Performance dashboards — built with DAX, KPIs, drill-throughs, and dynamic slicers.',
        tags: ['Power BI', 'DAX', 'Drill-through'],
        href: '#',
        linkText: 'View Project',
      },
      {
        type: 'py',
        badge: 'Python',
        title: 'Python Data Analytics',
        desc: 'Internet Speed Analysis and Data Quality Validation projects using Pandas, NumPy, and Matplotlib for data cleaning, analysis, and visualization on CSV datasets.',
        tags: ['Python', 'Pandas', 'Matplotlib'],
        href: '#',
        linkText: 'View on GitHub',
      },
      {
        type: 'academic',
        badge: 'Academic Research',
        title: 'Statistical Research Projects',
        desc: 'NFHS-4 Health Data Analysis applying statistical models to SDG-linked health data (M.Sc. dissertation at AMU). Road Safety Survey Analysis using visualization tools to present insights on accident risk factors (B.Sc. project).',
        tags: ['R', 'Statistical Models', 'SDG Analysis', 'Survey Methods'],
      },
    ],
  },

  education: {
    eyebrow: 'Education',
    heading: 'Academic<br>foundation',
    entries: [
      { year: '2020 – 2022', degree: 'M.Sc. Statistics', school: 'Aligarh Muslim University, Aligarh', pct: 90, score: '9.00 / 10.0' },
      { year: '2017 – 2020', degree: 'B.Sc. Statistics', school: 'Aligarh Muslim University, Aligarh', pct: 90, score: '9.00 / 10.0' },
    ],
    certifications: [
      { name: 'SQL Bootcamp', by: 'Udemy', badge: 'Certified' },
    ],
  },

  contact: {
    eyebrow: 'Contact',
    heading: 'Ready to bring<br>data to life',
    subtext: 'Open to Data Analyst roles, contract projects, and collaborations. Let\'s talk about how I can turn your data into decisions.',
    links: [
      { href: 'mailto:namritasingh1218@gmail.com', type: 'email', label: 'Email', value: 'namritasingh1218@gmail.com' },
      { href: 'tel:+917037036551', type: 'phone', label: 'Phone', value: '+91 7037036551' },
      { href: 'https://www.linkedin.com/in/namrita-singh-ab08111b2', type: 'linkedin', label: 'LinkedIn', value: 'namrita-singh-ab08111b2', external: true },
      { href: 'https://github.com/namritasingh1218', type: 'github', label: 'GitHub', value: 'namritasingh1218', external: true },
    ],
    form: {
      nameLabel: 'Name',
      emailLabel: 'Email',
      messageLabel: 'Message',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'your@email.com',
      messagePlaceholder: 'Tell me about the opportunity…',
      buttonText: 'Send Message',
      note: 'Integrate with Formspree or EmailJS to enable real submissions.',
    },
  },

  footer: {
    name: 'Namrita Singh',
    role: 'Data Analyst · Built with intention',
    copyright: '© 2025',
  },

  radarAxes: [
    { label: 'Data Viz', v: 0.90 },
    { label: 'Power BI', v: 0.88 },
    { label: 'SQL', v: 0.85 },
    { label: 'Python', v: 0.80 },
    { label: 'Azure', v: 0.75 },
    { label: 'Statistics', v: 0.92 },
  ],

  ganttRoles: [
    { title: 'Programmer Trainee', from: '2022-07', to: '2023-03', color: '#7A9BB8' },
    { title: 'System Engineer', from: '2023-03', to: '2023-07', color: '#5B8DB5' },
    { title: 'Senior Systems Engineer', from: '2023-07', to: '2024-10', color: '#3B6FA0' },
    { title: 'Junior Software Engineer', from: '2024-10', to: null, color: '#1E4D75' },
  ],
};
