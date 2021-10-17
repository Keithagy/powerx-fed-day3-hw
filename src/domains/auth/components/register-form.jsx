import { Button } from 'components/button';
import { useHistory } from 'react-router-dom';
import { TextField } from 'components/text-field';
import * as React from 'react';
import { useRegister } from '../auth.state';

export const RegisterForm = () => {
    const history = useHistory();
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [avatar, setAvatar] = React.useState(
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.spiritanimal.info%2Fpictures%2Fcat%2FCat-Spirit-Animal-3.jpg&f=1&nofb=1'
    );
    const [status, setStatus] = React.useState('idle');
    const register = useRegister();

    return (
        <div className="max-w-md mx-auto m-6 shadow">
            <form
                onSubmit={(ev) => {
                    ev.preventDefault();
                    setStatus('loading');
                    register({ name, email, password, avatar })
                        .then(() => history.replace('/marketplace'))
                        .catch((err) => {
                            console.log(err);
                            setStatus('error');
                        });
                }}
                className="p-6"
            >
                {status === 'error' && (
                    <div className="p-2 text-red-800 bg-red-200 rounded-sm">
                        Failed to Register.
                    </div>
                )}
                <div className="text-3xl mt-4 mb-8 font-extrabold text-center">
                    Register
                </div>
                <div className="space-y-6">
                    <TextField
                        label="Name"
                        value={name}
                        onChangeValue={setName}
                        name="name"
                        id="name"
                        autoFocus
                        required
                        disabled={status === 'loading'}
                    />

                    <TextField
                        label="Email"
                        value={email}
                        onChangeValue={setEmail}
                        name="email"
                        id="email"
                        required
                        disabled={status === 'loading'}
                    />
                    <TextField
                        label="Password"
                        value={password}
                        onChangeValue={setPassword}
                        name="password"
                        id="password"
                        type="password"
                        required
                        disabled={status === 'loading'}
                    />
                    <TextField
                        label="Avatar"
                        value={avatar}
                        onChangeValue={setAvatar}
                        name="avatar"
                        id="avatar"
                        autoFocus
                        required
                        disabled={status === 'loading'}
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full"
                        disabled={status === 'loading'}
                    >
                        Register
                    </Button>
                </div>
            </form>
        </div>
    );
};
