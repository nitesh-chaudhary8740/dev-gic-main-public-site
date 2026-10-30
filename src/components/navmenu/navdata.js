const navData = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About Us",
    path: "/about-us",
    subMenus: [
      {
        name: "History in Brief",
        path: "/about-us/history-in-brief",
      },
      {
        name: "Vision Mission",
        path: "/about-us/vision-mission",
      },
      {
        name: "Corporate Management", // Layer 2
        path: "/about-us/corporate-management",
        subMenus: [
          {
            name: "Board of Directors", // Layer 3
            path: "/about-us/corporate-management/board-of-directors",
            subMenus: [
              {
                name: "Chairman", // Layer 4
                path: "/about-us/board/chairman",
              },

            ],
          },
          {
            name: "Executive Management",
            path: "/about-us/corporate-management/executives",
          },
          {
            name: "Committees", // Layer 3
            subMenus: [
              {
                name: "Audit Committee", // Layer 4
                path: "/about/committees/audit",
              },
              {
                name: "CSR Committee",
                path: "/about/committees/csr",
              },
            ],
          },
          {
            name: "Key Persons / Key Managerial Persons",
            path: "/about-us/corporate-management/key-persons",
          },
          {
            name: "Independent External Monitor",
            path: "/about-us/corporate-management/independent-external-monitor",
          },
        ],
      },


      {
        name: "Regulatory Framework",
        path: "/about-us/regulatory-framework",
      },
      {
        name: "Subsidiary Company",
        path: "/about-us/subsidiary-company",

        subMenus: [
          {
            name: "GIC re South Africa", // Layer 3
            path: "/about-us/corporate-management/board-of-directors",

          },
          {
            name: "GIC Re India Corporate Member Ltd",
            path: "/about-us/corporate-management/executives",
          },
          {
            name: "GIC Perestrakhovanie LLC", // Layer 3
            path: "/about-us/corporate-management/committees",

          },

        ],
      },

      {
        name: "Brochure",
        path: "/about-us/brochure",
      },

    ],
  },
  {
    name: "Business",
    path: "/business-en",
    subMenus: [
      {
        name: "Domestic", // Layer 2
        path: "/business-en/domestic",

      },
      {
        name: "International", // Layer 2
        path: "/business-en/international",
        subMenus: [
          {
            name: "GIC Re IFSC Insurance Office",
            path: "/business-en/international/gift-iio-en", // Layer 3
            subMenus: [
              {
                name: "GIC Re - GIFT(IIO) -Complaint Handling Policy", // Layer 4
                path: "/",
              },

            ],
          },

        ],
      },
      {
        name: "Overseas Offices",
        path: "/business-en/overseas-offices",
      },
      {
        name: "MGA",
        path: "/business-en/mga",
      },
    ],
  },
  {
    name: "Investors / Public Disclosures",
    subMenus: [
      {
        name: "Financial",
        path: "/", // Layer 2
        subMenus: [
          {
            name: "Ratings / Rankings",
            path: "/investors-public-disclosures/financials/ratings-rankings", // Layer 3

          },
          {
            name: "UK Branch Solvency & Financial Condition Report ",
            path: "/investors-public-disclosures/financials/ratings-rankings",
          },
        ],
      },
      {
        name: "Investors",

        subMenus: [
          {
            name: "Contact Details of Registrar and Transfer Agent (RTA)",
            path: "/investors-public-disclosures/investors-en/contact-details-of-registrar-and-transfer-agent-rta", // Layer 3

          },
          {
            name: "Information to Stock Exchagess ",
            path: "/investors-public-disclosures/investors-en/information-to-stock-exchanges", // Layer 3


            subMenus: [
              {
                name: "Board Meetings ", // Layer 4
                path: "/investors-public-disclosures/investors-en/contact-details-of-registrar-and-transfer-agent-rta", // Layer 3

              },
              {
                name: "Credit Rating", // Layer 4
                path: "/investors-public-disclosures/investors-en/information-to-stock-exchanges", // Layer 3

              },
              {
                name: "Regulation 30 SEBI (LODR) Reg., 2015", // Layer 4
                path: "/investors-public-disclosures/investors-en/information-to-stock-exchanges", // Layer 3

              },
              {
                name: "Other", // Layer 4
                path: "/investors-public-disclosures/investors-en/information-to-stock-exchanges", // Layer 3

              },
            ],

          },

          {
            name: "Financial Performance", // Layer 3
            path: "/investors-public-disclosures/investors-en/financial-performance", // Layer 3
            subMenus: [
              {
                name: "Financial Results", // Layer 4
                path: "/investors-public-disclosures/investors-en/financial-performance/annual-reports",
              },
              {
                name: "Annual Reports", // Layer 4
                path: "/investors-public-disclosures/investors-en/financial-performance/annual-reports",
              },
              {
                name: "Annual Returns", // Layer 4
                path: "/investors-public-disclosures/investors-en/financial-performance/annual-reports",
              },
              {
                name: "Audited Financial Statements of Subsidiaries", // Layer 4
                path: "/investors-public-disclosures/investors-en/financial-performance/annual-reports",
              },
            ],
          },

          {
            name: "Periodical Disclosures", // Layer 3
            path: "/investors-public-disclosures/investors-en/periodical-disclosures", // Layer 3
            subMenus: [
              {
                name: "Quarterly ", // Layer 4
                path: "/investors-public-disclosures/investors-en/periodical-disclosures/shareholding-pattern",
              },
              {
                name: "Half-Yearly", // Layer 4 
                path: "/investors-public-disclosures/investors-en/periodical-disclosures/corporate-governance-report",
              },
              {
                name: "Annualy", // Layer 4 
                path: "/investors-public-disclosures/investors-en/periodical-disclosures/corporate-governance-report",
              },
            ],
          },


          {
            name: "Shareholding Meetings", // Layer 3
            path: "/investors-public-disclosures/investors-en/periodical-disclosures/shareholding-meetings",
            subMenus: [
              {
                name: "Annual General Meeting", // Layer 4
                path: "/investors-public-disclosures/investors-en/periodical-disclosures/shareholding-meetings/annual-general-meeting",

              },
              {
                name: "Postal Ballot", // Layer 4
                path: "/investors-public-disclosures/investors-en/periodical-disclosures/shareholding-meetings/annual-general-meeting",

              },
            ]
          }
          ,

          {
            name: "Committees of the Corporation", // Layer 3
            path: "/investors-public-disclosures/investors-en/committees",
          },
          {
            name: "Analyst/Investor meet or Conference Call", // Layer 3
            path: "/investors-public-disclosures/investors-en/committees",
          },
          {
            name: "Familliarisation Programme for Indepedent Directors", // Layer 3
            path: "/investors-public-disclosures/investors-en/committees",
          },
          {
            name: "Press Releases", // Layer 3
            path: "/investors-public-disclosures/investors-en/committees",
          },
          {
            name: "Notice/Communication to Shareholders", // Layer 3
            path: "/investors-public-disclosures/investors-en/committees",
          },
          {
            name: "Newspaper Notices", // Layer 3
            path: "/investors-public-disclosures/investors-en/committees",
          },
          {
            name: "Online Dispute Resolution", // Layer 3
            path: "/investors-public-disclosures/investors-en/committees",
          },
          {
            name: "Unclaimed Dispute Resolution", // Layer 3
            path: "/investors-public-disclosures/investors-en/committees",
          },
          {
            name: "IEPF", // Layer 3
            path: "/investors-public-disclosures/investors-en/committees",
          },
          {
            name: "Saksham Niveshak - 100 days Campaign", // Layer 3
            path: "/investors-public-disclosures/investors-en/committees",
            subMenus: [
              {
                name: "First Campaign", // Layer 4
                path: "/investors-public-disclosures/investors-en/committees/saksham-niveshak-100-days-campaign",
              },
              {
                name: "Second Campaign", // Layer 4
                path: "/investors-public-disclosures/investors-en/committees/saksham-niveshak-100-days-campaign",
              },
            ]
          },


        ],
      },
      {
        name: "Public Disclosures", // Layer 2
        path: "/investors/governance",
        subMenus: [
          {
            name: "Annual Reports", // Layer 3
            path: "/investors-public-disclosures/public-disclosures/corporate-governance",
          },
          {
            name: "Audited Financial Reports of Subsidiaries", // Layer 3
            path: "/investors-public-disclosures/public-disclosures/audited-financial-reports",
          },
        ],

      },
    ],
  },
  {
    name: "People Resources",
    subMenus: [
      {
        name: "HR Corner", // Layer 2
        path: "/people-resources/hr-corner",


      },
      {
        name: "Retirees Corner",
        path: "/sustainability/csr",
      },
      {
        name: "Corporate Login",
        path: "/sustainability/csr",


        // Layer 3
        subMenus: [
          {
            name: "HRMS Portal", // Layer 4
            path: "/sustainability/environment/solar",
          },
          {
            name: "Email",
            path: "/sustainability/environment/waste",
          },
        ],

      },

      {
        name: "Careers",
        path: "/sustainability/csr",
      },
      {
        name: "Policies & Guidelines",
        path: "/sustainability/csr",
      },

    ],
  },
  {
    name: "Media ",
    subMenus: [
      {
        name: "Event & Visit",
        path: "/media/events", // Layer 2

      },
      {
        name: "Press Releases / Interviews / GIC in the News",
        path: "/procurement/vendor-registration",
      },
      {
        name: "Archives",
        path: "/procurement/vendor-registration",
      },
      {
        name: "AKAM Activities",
        path: "/procurement/vendor-registration",
      },
      {
        name: "Cyber Jaagrookta Diwas",
        path: "/procurement/vendor-registration",
      },
      {
        name: "Vigilance Awareness Week 2024",
        path: "/procurement/vendor-registration",
      },
      {
        name: "Vigilance Awareness Week 2023",
        path: "/procurement/vendor-registration",
      },
      {
        name: "Vigilance Awareness Week 2025",
        path: "/procurement/vendor-registration",
      },
    ],
  },
  {
    name: "RTI",
    subMenus: [
      {
        name: "Organization and Functions",
        path: "/rti/organization",

      },
      {
        name: "Budget and Programmes",
        path: "/rti/budget-programmes",
      },
      {
        name: "Publicity and Interface",
        path: "/rti/publicity-interface",
      },
      {
        name: "E-Governance",
        path: "/rti/e-governance",
      },
      {
        name: "Information as may be Prescribed", // Layer 2
        path: "/rti/e-governance",
      },
      {
        name: "Information Disclosure on Own Initiative", // Layer 2
        path: "/rti/e-governance",
      },
    ],
  },
  {
    name: "Tenders And Notices",

    subMenus: [
      {
        name: "Details of all tenders awarded on nomination", // Layer 2
        path: "/tenders-and-notices/tenders-awarded-on-nomination",
      }

    ],
  },
  {
    name: "Vigilance Online Complaint Portal",
    path: "/vigilance-online-complaint-portal",
  },

  {
    name: "Griance Redressal ",
    path: "/griance-redressal",
  },
  {
    name: "Whistle Blower Portal",
    path: "/whistle-blower-portal",
  },
  {
    name: "Contact Us",
    path: "/contact-us",
    subMenus: [
      {
        name: "Locations",
        path: "/contact-us/contact-details",
      },
      {
        name: "Business Matrix",
        path: "/contact-us/contact-details",
      },
    ]
  },
  {
    name: "Wbsite Policies",
    path: "/website-policies",
    subMenus: [
      {
        name: "Hyperlinking Policy",
        path: "/website-policies/hyperlinking-policy",
      },
      {
        name: "Privacy Policy",
        path: "/website-policies/privacy-policy",
      },
      {
        name: "Website Security Policy",
        path: "/website-policies/website-security-policy",
      },
      {
        name: "Content Archival Policy",
        path: "/website-policies/content-archival-policy",
      },
      {
        name: "Content Owenership Moderation & Approval Policy (COMAP)",
        path: "/website-policies/content-archival-policy",
      },
      {
        name: "Content Review Policy (CRP)",
        path: "/website-policies/content-review-policy",
      },
      {
        name: "Copyright Policy",
        path: "/website-policies/copyright-policy",
      },
      {
        name: "Terms & Conditions",
        path: "/website-policies/terms-conditions",
      },
      {
        name: "Website Monitoring Plan",
        path: "/website-policies/website-monitoring-plan",
      },
      {
        name: "Security Policy",
        path: "/website-policies/website-security-policy",
      },
      {
        name: "Contingency Management Plan",
        path: "/website-policies/contingency-management-plan",
      },
      {
        name: "Content Contribution Moderation & Approval Policy (CCMAP)",
        path: "/website-policies/content-contribution-cmap",
      },
    ]
  }
];

export default navData;