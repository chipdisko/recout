const React = require("react")
const GlobalContextProvider = require("./src/context/GlobalContextProvider.js")
    .default

exports.wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>
}
