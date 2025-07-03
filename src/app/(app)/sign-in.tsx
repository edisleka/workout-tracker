import { SocialProvider } from '@/components/auth/SocialProvider'
import { useSignIn } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { Link, useRouter } from 'expo-router'
import { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const onSignInPress = async () => {
    if (!isLoaded) return
    if (!emailAddress || !password) {
      setErrorMessage('Please fill in all fields')
      return
    }
    setErrorMessage('')
    setIsLoading(true)
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
        setErrorMessage('Sign-in incomplete. Please try again.')
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
      setErrorMessage('Failed to sign in. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView className='flex-1 bg-[#F9FAFB] dark:bg-[#0B0F19]'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='flex-1'
      >
        <View className='flex-1 px-6'>
          <View className='flex-1 justify-center'>
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
                FitTracker
              </Text>
              <Text className='text-lg text-center text-[#6B7280] dark:text-[#9CA3AF]'>
                Track your fitness journey{'\n'} and reach your goals
              </Text>
            </View>

            <View className='rounded-2xl p-6 shadow-sm border mb-6 bg-white dark:bg-[#111827] border-[#E5E7EB] dark:border-[#1F2937]'>
              <Text className='text-2xl font-bold mb-6 text-center text-[#6366F1] dark:text-[#818CF8]'>
                Welcome Back
              </Text>

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
                    placeholderTextColor='#9CA3AF'
                    className='flex-1 ml-3 text-[#111827] dark:text-[#F3F4F6]'
                    editable={!isLoading}
                    keyboardType='email-address'
                  />
                </View>
              </View>

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
                    autoCapitalize='none'
                    value={password}
                    placeholder='Enter your password'
                    onChangeText={setPassword}
                    placeholderTextColor='#9CA3AF'
                    className='flex-1 ml-3 text-[#111827] dark:text-[#F3F4F6]'
                    editable={!isLoading}
                    secureTextEntry={true}
                  />
                </View>
              </View>

              {errorMessage ? (
                <Text className='text-sm text-[#EF4444] mb-4 text-center'>
                  {errorMessage}
                </Text>
              ) : null}
            </View>

            <TouchableOpacity
              onPress={onSignInPress}
              className={`rounded-xl py-4 shadow-sm mb-4 ${
                isLoading
                  ? 'bg-[#E5E7EB] dark:bg-[#374151]'
                  : 'bg-[#6366F1] dark:bg-[#2563EB]'
              }`}
              activeOpacity={0.8}
              disabled={isLoading}
            >
              <View className='flex-row items-center justify-center'>
                <Ionicons
                  name={isLoading ? 'refresh' : 'log-in-outline'}
                  size={20}
                  color='#FFFFFF'
                />
                <Text className='font-semibold text-lg ml-2 text-white'>
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Text>
              </View>
            </TouchableOpacity>

            <View className='flex-row items-center'>
              <View className='flex-1 h-px bg-[#E5E7EB] dark:bg-[#1F2937]' />
              <Text className='px-4 text-sm text-[#6B7280] dark:text-[#9CA3AF]'>
                Or
              </Text>
              <View className='flex-1 h-px bg-[#E5E7EB] dark:bg-[#1F2937]' />
            </View>

            {/* <GoogleSignIn />
            <AppleSignIn /> */}
            <SocialProvider
              strategy='oauth_google'
              iconName='logo-google'
              iconColor='#EA4335'
              title='Google'
            />
            <SocialProvider
              strategy='oauth_apple'
              iconName='logo-apple'
              iconColor='#000000'
              title='Apple'
            />

            <View className='flex-row items-center justify-center mt-4'>
              <Text className='text-[#6B7280] dark:text-[#9CA3AF]'>
                Don&apos;t have an account?
              </Text>
              <Link href='/sign-up' asChild>
                <TouchableOpacity>
                  <Text className='font-semibold ml-1 text-[#6366F1] dark:text-[#818CF8]'>
                    Sign up
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
