const fs = require("fs")
const Handlebars = require("handlebars")
const argv = require('yargs').argv
const path = require("path")

const srcPath = path.resolve(__dirname, "../../src")
const templatePath = path.resolve(__dirname, "./")

const TYPE_COMPONENT = "TYPE_COMPONENT"
const TYPE_CONNECTED_COMPONENT = "TYPE_CONNECTED_COMPONENT"
const TYPE_REDUCER = "TYPE_REDUCER"
const TYPE_UNKNOWN = "TYPE_UNKNOWN"

function parse () {
  if (argv.r || argv.reducer) {
    return {
      type: TYPE_REDUCER,
      name: argv.r || argv.reducer
    }
  } else if (argv.c || argv.component) {
    return {
      type: TYPE_COMPONENT,
      name: argv.c || argv.component
    }
  } else if (argv.cc || argv.connected) {
    return {
      type: TYPE_CONNECTED_COMPONENT,
      name: argv.cc || argv.connected
    }
  } else {
    return {
      type: TYPE_UNKNOWN
    }
  }
}

function compile (templatePath) {
  const source = fs.readFileSync(templatePath, "utf8")
  return Handlebars.compile(source);
}

function generateActionFile (name) {
  if (!fs.existsSync(path.resolve(srcPath, "actions/"))) {
    fs.mkdirSync(path.resolve(srcPath, "actions/"));
  }

  const template = compile(path.resolve(templatePath, "./template-action.js"));
  fs.writeFileSync(path.resolve(srcPath, `actions/${name}-actions.js`), template())
}

function generateReducerFile (name) {
  const template = compile(path.resolve(templatePath, "./template-reducer.js"));
  fs.writeFileSync(path.resolve(srcPath, `reducers/${name}-reducer.js`), template({"name": name}))
}

function createRootReducerFile () {
  const reducers = fs.readdirSync(path.resolve(srcPath, "reducers/"))
    .map(name => name.split("-")[0])
    .filter(name => name !== "rootReducer.js")
    .map(name => ({"name": name}))

  const template = compile(path.resolve(templatePath, "./template-root-reducer.js"));
  fs.writeFileSync(path.resolve(srcPath, `reducers/rootReducer.js`), template({"reducers": reducers}))
}

function generateComponentFile(name) {
  const template = compile(path.resolve(templatePath, "./template-component.js"));
  fs.writeFileSync(path.resolve(srcPath, `components/${name}.js`), template({"name": name}))
}

function generateConnectedComponentFile(name) {
  const template = compile(path.resolve(templatePath, "./template-connected-component.js"));
  fs.writeFileSync(path.resolve(srcPath, `components/${name}.js`), template({"name": name}))
}

function run (command) {
  switch (command.type) {
    case TYPE_REDUCER:
      generateActionFile(command.name)
      generateReducerFile(command.name)
      createRootReducerFile()
      return
    case TYPE_COMPONENT:
      generateComponentFile(command.name)
      return
    case TYPE_CONNECTED_COMPONENT:
      generateConnectedComponentFile(command.name)
      return
    default:
      return
  }
}

const command = parse()
run(command)
