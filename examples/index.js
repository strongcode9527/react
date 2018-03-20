import Strong,{Component} from '../src/index'

console.log(Strong.Component)

class App extends Strong.Component {
  render() {
    return (
      <div>
        <h3>Heading 3</h3>
        <SmallHeaderWithState />
      </div>
    )
  }
}

class SmallHeaderWithState extends Strong.Component {
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
        <div style={{
          fontSize: '36px',
          color: 'red'
        }}>SmallHeader</div>
        { this.state.number }
      </div>
    )
  }
}

Strong.render(<App />, document.getElementById('root'))