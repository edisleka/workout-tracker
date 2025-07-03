import { useSignUp } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { Link, useRouter } from 'expo-router'
import { useState } from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return
    if (!emailAddress || !password) {
      Alert.alert('Missing Fields', 'Please fill in all fields')
      return
    }

    setIsLoading(true)

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    } finally {
      setIsLoading(false)
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return
    if (!code) {
      Alert.alert('Missing Fields', 'Please fill in all fields')
      return
    }

    setIsLoading(true)

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    } finally {
      setIsLoading(false)
    }
  }

  if (pendingVerification) {
    return (
      <SafeAreaView className='flex-1 bg-[#F9FAFB] dark:bg-[#0B0F19]'>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className='flex-1'
        >
          <View className='flex-1 px-6'>
            <View className='flex-1 justify-center'>
              {/* Logo/Branding */}
              <View className='items-center mb-8'>
                <LinearGradient
                  colors={['#6366F1', '#EC4899']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className='w-20 h-20 rounded-md items-center justify-center mb-4'
                >
                  <Ionicons name='mail' size={40} color='#FFFFFF' />
                </LinearGradient>
                <Text className='text-3xl font-bold mb-2 text-[#6366F1] dark:text-[#818CF8]'>
                  Check your email
                </Text>
                <Text className='text-lg text-center text-[#6B7280] dark:text-[#9CA3AF]'>
                  We&apos;ve sent a verification code to{'\n'}
                  {emailAddress}
                </Text>
              </View>
              {/* Verification Form */}
              <View className='bg-white dark:bg-[#111827] rounded-2xl p-6 shadow-sm border border-[#E5E7EB] dark:border-[#1F2937] mb-6'>
                <Text className='text-2xl font-bold mb-6 text-center text-[#6366F1] dark:text-[#818CF8]'>
                  Enter Verification Code
                </Text>
                {/* Verification Code Input */}
                <View className='mb-6'>
                  <Text className='text-sm font-medium mb-2 text-[#111827] dark:text-[#F3F4F6]'>
                    Verification Code
                  </Text>
                  <View className='flex-row items-center rounded-xl px-4 py-2 border bg-[#F3F4F6] dark:bg-[#1E293B] border-[#E5E7EB] dark:border-[#1F2937]'>
                    <Ionicons name='key-outline' size={20} color='#6366F1' />
                    <TextInput
                      value={code}
                      placeholder='Enter 6-digit code'
                      keyboardType='number-pad'
                      maxLength={6}
                      onChangeText={setCode}
                      className='flex-1 ml-3 text-center text-lg tracking-widest text-[#111827] dark:text-[#F3F4F6]'
                      placeholderTextColor='#9CA3AF'
                      editable={!isLoading}
                    />
                  </View>
                </View>
                {/* Verify Button */}
                <TouchableOpacity
                  onPress={onVerifyPress}
                  disabled={isLoading}
                  className={`rounded-xl py-4 shadow-sm mb-4 ${
                    isLoading
                      ? 'bg-[#E5E7EB] dark:bg-[#374151]'
                      : 'bg-[#22C55E] dark:bg-[#16A34A]'
                  }`}
                  activeOpacity={0.8}
                >
                  <View className='flex-row items-center justify-center'>
                    {isLoading ? (
                      <Ionicons name='refresh' size={20} color='white' />
                    ) : (
                      <Ionicons
                        name='checkmark-circle-outline'
                        size={20}
                        color='white'
                      />
                    )}
                    <Text className='text-white text-lg font-semibold ml-2'>
                      {isLoading ? 'Verifying...' : 'Verify Email'}
                    </Text>
                  </View>
                </TouchableOpacity>
                {/* Resend Code Button */}
                <TouchableOpacity onPress={() => {}} className='py-2'>
                  <Text className='text-[#6B7280] dark:text-[#9CA3AF] text-center'>
                    Didn&apos;t receive the code?{' '}
                    <Text className='text-[#6366F1] dark:text-[#818CF8] font-semibold'>
                      Resend
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Footer Section */}
            <View className='pb-6'>
              <Text className='text-center text-[#6B7280] dark:text-[#9CA3AF] text-sm'>
                Almost there! Just one more step
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className='flex-1 bg-[#F9FAFB] dark:bg-[#0B0F19]'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='flex-1'
      >
        <View className='flex-1 px-6'>
          {/* Main Content */}
          <View className='flex-1 justify-center'>
            {/* Logo/Branding */}
            <View className='items-center mb-8'>
              <LinearGradient
                colors={['#6366F1', '#EC4899']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className='w-20 h-20 rounded-md items-center justify-center mb-4'
              >
                <Ionicons name='fitness' size={40} color='#FFFFFF' />
              </LinearGradient>
              <Text className='text-3xl font-bold mb-2 text-[#6366F1] dark:text-[#818CF8]'>
                Join FitTracker
              </Text>
              <Text className='text-lg text-center text-[#6B7280] dark:text-[#9CA3AF]'>
                Track your fitness journey and reach your goals
              </Text>
            </View>
            {/* Sign UpForm Section */}
            <View className='bg-white dark:bg-[#111827] rounded-2xl p-6 shadow-sm border border-[#E5E7EB] dark:border-[#1F2937] mb-6'>
              <Text className='text-2xl font-bold mb-6 text-center text-[#6366F1] dark:text-[#818CF8]'>
                Create Your Account
              </Text>
              {/* Email Input */}
              <View className='mb-4'>
                <Text className='text-sm font-medium mb-2 text-[#111827] dark:text-[#F3F4F6]'>
                  Email
                </Text>
                <View className='flex-row items-center rounded-xl px-4 py-2 border bg-[#F3F4F6] dark:bg-[#1E293B] border-[#E5E7EB] dark:border-[#1F2937]'>
                  <Ionicons name='mail-outline' size={20} color='#6366F1' />
                  <TextInput
                    autoCapitalize='none'
                    value={emailAddress}
                    placeholder='Enter your email'
                    onChangeText={setEmailAddress}
                    className='flex-1 ml-3 text-[#111827] dark:text-[#F3F4F6]'
                    keyboardType='email-address'
                    placeholderTextColor='#9CA3AF'
                    editable={!isLoading}
                  />
                </View>
              </View>
              {/* Password Input */}
              <View className='mb-6'>
                <Text className='text-sm font-medium mb-2 text-[#111827] dark:text-[#F3F4F6]'>
                  Password
                </Text>
                <View className='flex-row items-center rounded-xl px-4 py-2 border bg-[#F3F4F6] dark:bg-[#1E293B] border-[#E5E7EB] dark:border-[#1F2937]'>
                  <Ionicons
                    name='lock-closed-outline'
                    size={20}
                    color='#6366F1'
                  />
                  <TextInput
                    value={password}
                    placeholder='Enter your password'
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    className='flex-1 ml-3 text-[#111827] dark:text-[#F3F4F6]'
                    placeholderTextColor='#9CA3AF'
                    editable={!isLoading}
                  />
                </View>
                <Text className='text-[#6B7280] dark:text-[#9CA3AF] text-xs mt-1'>
                  Password must be at least 8 characters long
                </Text>
              </View>
              {/* Sign Up Button */}
              <TouchableOpacity
                onPress={onSignUpPress}
                className={`rounded-xl py-4 shadow-sm mb-4 ${
                  isLoading
                    ? 'bg-[#E5E7EB] dark:bg-[#374151]'
                    : 'bg-[#6366F1] dark:bg-[#2563EB]'
                }`}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                <View className='flex-row items-center justify-center'>
                  {isLoading ? (
                    <Ionicons name='refresh' size={20} color='white' />
                  ) : (
                    <Ionicons
                      name='person-add-outline'
                      size={20}
                      color='white'
                    />
                  )}
                  <Text className='text-white text-lg font-semibold ml-2'>
                    {isLoading ? 'Creating account...' : 'Create Account'}
                  </Text>
                </View>
              </TouchableOpacity>
              {/* Terms and Privacy Policy   */}
              <View className='flex-row items-center justify-center'>
                <Text className='text-[#6B7280] dark:text-[#9CA3AF] text-xs text-center mb-4'>
                  By signing up, you agree to our{' '}
                  <Link
                    href='/terms'
                    className='text-[#6366F1] dark:text-[#818CF8]'
                  >
                    Terms of Service
                  </Link>
                </Text>
              </View>
            </View>
            {/* Sign In Link */}
            <View className='flex-row items-center justify-center'>
              <Text className='text-[#6B7280] dark:text-[#9CA3AF]'>
                Already have an account?
              </Text>
              <Link href='/sign-in' asChild>
                <TouchableOpacity>
                  <Text className='font-semibold ml-1 text-[#6366F1] dark:text-[#818CF8]'>
                    Sign in
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
          {/* Footer Section */}
          <View className='pb-6'>
            <Text className='text-center text-[#6B7280] dark:text-[#9CA3AF] text-sm'>
              Ready to transform your fitness journey?
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
