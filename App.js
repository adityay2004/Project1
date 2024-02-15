import React from 'react'
import StackNavigation from './src/components/screen/Navigation'
import { Provider } from 'react-redux'
import store from './src/redux/Store/Store'

const App = () => {

  return (
    <Provider store={store}>
      <StackNavigation />
    </Provider>

  )
}

export default App