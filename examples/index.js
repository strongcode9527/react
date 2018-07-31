import Strong from '../src/index'


class SmallHeaderWithState extends Strong.Component {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps, nextState) {
  
  }
  componentDidUpdate(preProps, nextState) {
 
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
          data-index={2}
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

  }

  handleClick = (e) => {
    console.log('in callback', e)
    this.setState({
      number: this.state.number + 1,
    })
    e.stopPropagation()
    e.preventDefault()
  }

  handleClickParent = (e) => {
    console.log('in parent', e)
  }

  render() {
    return (
      <div onClick={this.handleClickParent}>
        <a onClick={this.handleClick} href="www.baidu.com">Heading 3</a>
        <SmallHeaderWithState number={this.state.number} />
        <Acc name="strong"/>
      </div>
    )
  }
}


Strong.render(<App />, document.getElementById('root'))