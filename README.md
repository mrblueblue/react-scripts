# react-scripts

This package includes scripts and configuration used by [Create React App](https://github.com/facebookincubator/create-react-app).<br>
Please refer to its documentation:

* [Getting Started](https://github.com/facebookincubator/create-react-app/blob/master/README.md#getting-started) – How to create a new app.
* [User Guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) – How to develop apps bootstrapped with Create React App.

### Getting Started

```
create-react-app --scripts-version git+https://github.com/mrblueblue/react-scripts.git <app_name>
```

### Generator Scripts

The application will have access to several generator scripts that speed-up development. They are:


```bash
npm run gen -- --c $NAME
# creates a basic class component

npm run gen -- --cc $NAME
# creates a Redux connected commponent

npm run gen -- --r $NAME
# creates a pair of Redux action/reducer

npm run gen -- --a $NAME
# creates a Redux action file
```
