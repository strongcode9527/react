import Strong from '../src/index'


class SmallHeaderWithState extends Strong.Component {
  constructor(props) {
    super(props)
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


class App extends Strong.Component {
  constructor(props) {
    super(props)

    this.state = { number: 0 }

    setInterval(() => {
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
      </div>
    )
  }
}


Strong.render(<App />, document.getElementById('root'))