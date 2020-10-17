export default [
  {
    url: {name:"home"},
    name: "Home",
    slug: "home",
    icon: "HomeIcon",
  },
  {
    header: "Accesses & Rules",
    items: [
      {
        url: {name:"accesses"},
        name: "Accesses",
        slug: "accesses",
        icon: "UserCheckIcon",
      },
      {
        url: {name:"groups"},
        name: "Groups",
        slug: "groups",
        icon: "UsersIcon",
      },
    ]
  },
  {
    header: "Endpoints Management",
    items: [
      {
        url: {name:"sensors"},
        name: "Sensors",
        slug: "sensors",
        icon: "EyeIcon",
      },
    ]
  },
  {
    header: "Monitoring",
    items: [
      {
        url: {name:"logs"},
        name: "Logs",
        slug: "logs",
        icon: "ActivityIcon",
      },
    ]
  },
  {
    header: "Account & Settings",
    items: [
      {
        url:{name:"account"},
        name:"Account",
        slug:"account",
        icon:"UserIcon"
      },
      {
        url:{name:"settings"},
        name:"System Settings",
        slug:"settings",
        icon:"SettingsIcon"
      }
    ]
  }
]
