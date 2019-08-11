const h = React.createElement;

// styles
const styles = {
  body: {
    padding: "10px"
  },
  buttonArea: {
    padding: "10px",
    border: "solid 1px black"
  },
  modal: {
    position: "fixed",
    top: "50%",
    left: "50%",
    padding: "25px",
    "background-color": "rgba(0,0,0,0.3)",
    transform: "translateX(-50%)",
    transition: ".3s",
    cursor: "pointer"
  }
};

// ForwardRef
const TextInput = React.forwardRef((props, ref) => (
  <input ref={ref} placeHolder="clickCount" />
));
const TextInputRef = React.createRef();

// Context
const ThemeContext = React.createContext("light");

// Error Boundary
class ErrorBoundary extends React.Component {
  state = {
    hasCountError: false
  };
  componentDidCatch() {
    this.setState({
      hasCountError: true
    });
  }
  render() {
    if (this.state.hasCountError) {
      return <div>Error Boundary : Count Times Error</div>;
    }
    return this.props.children;
  }
}

// Dialog
class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.dialogRef = React.createRef();
    this.state = {
      show: false,
      theme: "light"
    };
    this.createNodes();
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ show: true });
    }, 300);
  }
  clearOldNodes() {
    this.node = document.querySelectorAll(".dialog");
    console.log(this.node);
    Array.prototype.slice.call(this.node).map(x => x.remove());
  }
  createNodes() {
    this.clearOldNodes();
    this.node = document.createElement("div");
    this.node.setAttribute("class", "dialog");
    // this.node.setAttribute('style', Object.entries(styles.modal).map(([k, v]) => `${k}:${v}`).join(';'))
    document.body.appendChild(this.node);
  }
  close() {
    this.dialogRef.current.style.color = "white";
    setTimeout(() => {
      this.setState({ show: false });
    }, 1000);
  }
  render() {
    return ReactDOM.createPortal(
      this.state.show && (
        <div
          ref={this.dialogRef}
          onClick={this.close.bind(this)}
          style={styles.modal}
        >
          {this.props.children}
        </div>
      ),
      this.node
    );
  }
}

// Timer
let timerTick = null;
function Timer() {
  const [time, setTime] = useState(0);
  useEffect(() => {
    if (timerTick) {
      clearInterval(timerTick);
    }
    timerTick = setInterval(() => {
      document.title = time;
      setTime(time + 1);
    }, 1000);
    // return function cleanup () {
    //   console.log('destroyed')
    //   document.title = 'Normal'
    // }
  }, [time]);

  return <div>Now TimeTick : {time}</div>;
}

// HOC
const withInitValueButton = WrappedComponent => {
  return props => <WrappedComponent value="10" {...props} />;
};

// Button
class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickCount: props.value || "0"
    };
  }
  handleClick() {
    this.state.clickCount = Number(this.state.clickCount) + 1;
    TextInputRef.current.value = +TextInputRef.current.value + 1;

    const limitValue = +(this.props.value || "0") + 2;
    if (this.state.clickCount > limitValue) {
      this.setState({
        clickCount: 0
      });
    } else {
      this.setState({
        clickCount: String(this.state.clickCount)
      });
    }
  }
  render() {
    return React.createElement(
      "button",
      {
        type: "submit",
        onClick: this.handleClick.bind(this)
      },
      this.props.label + " " + this.state.clickCount.slice(-2)
    );
  }
}

const ButtonWithClickEffect = withInitValueButton(Button);

// MsgShow
const MsgShow = ({ msg }) => <div> Msg: {msg} </div>;

// InputForm
const InputForm = () => (
  <div>
    <TextInput ref={TextInputRef} />
    <div style={{ marginTop: "10px" }}>
      <Button label="Click To Add" />
      <span style={{ marginLeft: "10px" }}>
        <ButtonWithClickEffect label="Click To Add" />
      </span>
    </div>
  </div>
);

// ALertDialog - static contextType / context.provider / context.consumer
class AlertDialog extends React.Component {
  static contextType = ThemeContext;
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ThemeContext.Provider value="light">
        <Dialog>
          <div>{this.context}</div>
          <ThemeContext.Consumer>
            {theme => "Current Theme : " + theme + "\n"}
          </ThemeContext.Consumer>
          <p />
          <MsgShow msg="please ignore this dialog" />
        </Dialog>
      </ThemeContext.Provider>
    );
  }
}

// 空标签是 React.Fragment 的语法糖
ReactDOM.render(
<>
    <p>Lionad's Demo React Codes To Explore React API</p>
    <div style={styles.body}>
      <div style={styles.buttonArea}>
        <Timer />
        <ErrorBoundary>
          <InputForm />
        </ErrorBoundary>
      </div>
      <AlertDialog />
    </div>
  </>,
  mountNode
);
