import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import styles from './style.less';

class App extends PureComponent {
    state = {
        name: 'Bob'
    };

    render() {
        return <p className={styles.danger}>Hello, {this.state.name}</p>;
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
