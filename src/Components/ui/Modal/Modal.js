/* React */
import React from 'react';

/* Styling */
import styles from './Modal.module.scss';

/* Components */
import Icon from '../Icon/Icon';
import Button from '../Button/Button';

const Input = (props) => {

    const confirm = () => {
        props.confirm(true);
    }

    const cancel = () => {
        props.cancel(false);
    }

    return (
        <div className={ styles.container }>
            <div className={ styles.container__heading }>
                <h4>asgfasgasg</h4>
                <Icon
                    className={ styles.closeIcon }
                    icon='close'
                />
            </div>
            <hr/>
            <div className={ styles.message }>
                <p>asgfasokgaiasfas fa sfas fas fas fas faosgin asiog naisgianjs g09a si0gn a0isng ias90 gn sagfasg as gas g</p>
            </div>
            <div className={ styles.buttonContainer }>
                <Button
                    className={ styles.cancelButton }
                    label='Cancel'
                    onClick={cancel}
                />
                <Button
                    className={ styles.button }
                    label='Delete Profile'
                    onClick={confirm}
                />
            </div>
        </div>
    );
};

export default Input;