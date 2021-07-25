const { default: axios } = require("axios")
const config = require('./config.json')
const DashApp = require("./src/DashApp")
const PanelApp = require("./src/PanelApp")

const dash = new DashApp(config.dash.host, config.dash.key)
const panel = new PanelApp(config.panel.host, config.panel.key)

// Rest code goes here...