import {combineReducers} from "redux"
{{#each reducers}}
import {{name}}Reducer from "./{{name}}-reducer"
{{/each}}

export default combineReducers({
  {{#each reducers}}
  {{name}}: {{name}}Reducer,
  {{/each}}
})
