import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {addCounter} from './actions';
import styles from './style.less';

class App extends PureComponent {
    render() {
        const {counter, increase} = this.props;

        return (
            <div>
                <p className={styles.danger}>Counter: {counter}</p>
                <button onClick={() => increase(1)}>Increase</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    counter: state.counter
});
const mapDispatchToProps = dispatch => ({
    increase: (n = 1) => dispatch(addCounter(n))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
