import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ChangeEvent, SubmitEvent } from '../../types';
import { login } from '../../redux/actions';
import logo from '../../assets/logo.svg';
import MainLogin from './styles';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email);
  const isPasswordValid = form.password.length >= 6;
  const isBtnEnabled = !(isEmailValid && isPasswordValid);

  const handleChange = (event: ChangeEvent) => {
    const { target: { name, value } } = event;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    dispatch(login(form.email));
    navigate('/carteira');
  };

  return (
    <MainLogin>
      <section>
        <img src={ logo } alt="TrybeWallet" />
        <form onSubmit={ handleSubmit }>
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={ form.email }
            onChange={ handleChange }
            data-testid="email-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={ form.password }
            onChange={ handleChange }
            data-testid="password-input"
          />
          <button
            type="submit"
            disabled={ isBtnEnabled }
          >
            Entrar
          </button>
        </form>
      </section>
    </MainLogin>
  );
}

export default Login;
