import { yupResolver } from '@hookform/resolvers/yup'
import { ErrorMessage } from '@hookform/error-message'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import Api from '../../service/Api'
import { useAuth } from '../../context/useAuth'
import { userSchema } from '../../validation/userValidation'

const inputClassName =
  'w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black'

const primaryButtonClassName =
  'w-full rounded-md bg-red-500 px-4 py-3 text-sm font-medium text-white hover:bg-red-600 transition-colors disabled:opacity-60  cursor-pointer'

const secondaryButtonClassName =
  'w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors cursor-pointer '

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
        aria-invalid={errors[name] ? "true" : "false"}
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
          const finalMessages=Object.values(messages || {}).flat()
          return finalMessages.length > 0 ? (
            <ul className="mt-1 space-y-1 text-xs text-red-600">
              {finalMessages.map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </ul>
          ) : message ? (
            <span className="mt-1 block text-xs text-red-600">
              {message}
            </span>
          ) : null
        }}
      />
    </div>
  )
}

const SignupForm = () => {
  const navigate = useNavigate()
  const { login: authLogin } = useAuth()
  const [serverError, setServerError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
 
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(userSchema, { abortEarly: false }),
    mode: "onChange",
    criteriaMode: "all"
  })
 
  const onSubmit = async (data) => {
    setServerError('')
    setIsSubmitting(true)
    try {
      await Api.registerUser(data.name, data.email, data.password)
      const loginData = await Api.login(data.email, data.password)
      if (!loginData?.token) {
        navigate('/auth/login')
        return
      }
      authLogin(loginData.token, loginData.user)
      navigate('/home', { replace: true })
    } catch (err) {
      setServerError(err?.message || 'Something went wrong')
    } finally {
      setIsSubmitting(false)
      reset()
    }
  }
 
  return (
    <>
      <h1 className="text-3xl font-medium text-black mb-2">Create an account</h1>
      <p className="text-sm text-gray-600 mb-8">Enter your details below</p>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {serverError && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
            {serverError}
          </div>
        )}
 
        <Field
          id="name"
          label="Name"
          autoComplete="name"
          errors={errors}
          {...register('name')}
        />
 
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
          autoComplete="new-password"
          errors={errors}
          {...register('password')}
        />
 
        <div className="space-y-4 pt-2">
          <button
            className={primaryButtonClassName}
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? 'Processing...' : 'Create Account'}
          </button>
 
          <button
            className={secondaryButtonClassName}
            type="button"
            aria-label="Sign up with Google"
          >
            <FcGoogle className="text-xl" />
            <span>Sign up with Google</span>
          </button>
        </div>
 
        <div className="flex items-center justify-between text-sm mt-4">
          <div className="text-gray-600">
            <div className="flex items-center gap-2">
              <span>Already have an account?</span>
              <NavLink
                to="/auth/login"
                className="text-black font-medium hover:underline"
              >
                Log in
              </NavLink>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
 
export default SignupForm
