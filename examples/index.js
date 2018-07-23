import Strong from '../src/index'


class SmallHeaderWithState extends Strong.Component {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps, nextState) {
    console.log('receive', nextProps, nextState)
  }
  componentDidUpdate(preProps, nextState) {
    console.log('did', preProps, nextState)
  }
  render() {
    const {number} = this.props

    return (
      <div>
        <div
          style={{
            color: 'red',
            fontSize: '36px',
          }}
        >
          SmallHeader
        </div>
        { number }
      </div>
    )
  }
}

function Add({name}) {
  return (
    <div>
      {name}
    </div>
  )
}


class Acc extends Strong.Component {
  constructor(props){
    super(props)
  }
  render() {

    return <Add nam={this.props.name}/>
  }
}



class App extends Strong.Component {
  constructor(props) {
    super(props)

    this.state = { number: 0 }

    setInterval( () => {
      this.setState({
        number: this.state.number + 1
      })
    }, 1000)

  }
  render() {
    return (
      <div>
        <h3>Heading 3</h3>
        <SmallHeaderWithState number={this.state.number} />
        <Acc name="strong"/>
      </div>
    )
  }
}


Strong.render(<App />, document.getElementById('root'))