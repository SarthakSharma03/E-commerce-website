import { yupResolver } from '@hookform/resolvers/yup'
import { ErrorMessage } from '@hookform/error-message'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import Api from '../../service/Api'
import { useAuth } from '../../context/useAuth'
import { loginSchema } from '../../validation/loginFormValidation'

const inputClassName =
  'w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black'

const primaryButtonClassName =
  'w-full rounded-md bg-red-500 px-4 py-3 text-sm font-medium text-white hover:bg-red-600 transition-colors disabled:opacity-60  cursor-pointer'


const Field = ({ id, label, errors, type = 'text', ...inputProps }) => {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type
  const { name } = inputProps

  return (
    <div className="w-full relative">
      <input
        id={id}
        type={inputType}
        className={`${inputClassName} ${isPassword ? 'pr-8' : ''}`}
        placeholder={label}
        aria-invalid={errors[name] ? 'true' : 'false'}
        {...inputProps}
      />
      {isPassword && (
        <button
          type="button"
          className="absolute right-0 top-2 text-gray-500 hover:text-gray-700"
          onClick={() => setShowPassword(prev => !prev)}
        >
          {showPassword ? (
            <AiOutlineEyeInvisible size={20} />
          ) : (
            <AiOutlineEye size={20} />
          )}
        </button>
      )}
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ messages, message }) => {
          const finalMessages = Object.values(messages || {}).flat()
          return finalMessages.length > 0 ? (
            <ul className="mt-1 space-y-1 text-xs text-red-600">
              {finalMessages.map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </ul>
          ) : message ? (
            <span className="mt-1 block text-xs text-red-600">{message}</span>
          ) : null
        }}
      />
    </div>
  )
}

const LoginForm = () => {
  const navigate = useNavigate()
  const { login: authLogin } = useAuth()
  const [serverError, setServerError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(loginSchema, { abortEarly: false }),
    mode: 'onChange',
    criteriaMode: 'all',
  })

  const onSubmit = async data => {
    setServerError('')
    setIsSubmitting(true)
    try {
      const response = await Api.login(data.email, data.password)
      if (!response?.token) throw new Error('Invalid login response')
      authLogin(response.token, response.user)
      navigate('/home', { replace: true })
    } catch (err) {
      setServerError(err?.message )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <h1 className="text-3xl font-medium text-black mb-2">Log in to Exclusive</h1>
      <p className="text-sm text-gray-600 mb-8">Enter your details below</p>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {serverError && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">{serverError}</div>
        )}
        <Field
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          errors={errors}
          {...register('email')}
        />
        <Field
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          errors={errors}
          {...register('password')}
        />
        <div className="space-y-4 pt-2">
          <button className={primaryButtonClassName} disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Processing...' : 'Log In'}
          </button>
        </div>
        <div className="flex flex-col gap-4 text-sm mt-4">
          <div className="flex items-center justify-between">
            <div className="text-gray-600">
              <div className="flex items-center gap-2">
                <span>Don't have an account?</span>
                <NavLink to="/auth/signup" className="text-black font-medium hover:underline">
                  Sign Up
                </NavLink>
              </div>
            </div>
            <NavLink to="/auth/forget-password" className="text-red-500 hover:underline cursor-pointer">
              Forgot Password?
            </NavLink>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => navigate('/admin/login')}
              className="text-xs md:text-sm font-medium text-red-500 hover:underline"
            >
              Admin? Go to admin login
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default LoginForm
