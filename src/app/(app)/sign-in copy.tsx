// import GoogleSignIn from '@/components/GoogleSignIn'
// import { useSignIn } from '@clerk/clerk-expo'
// import { Ionicons } from '@expo/vector-icons'
// import { LinearGradient } from 'expo-linear-gradient'
// import { Link, useRouter } from 'expo-router'
// import { useState } from 'react'
// import {
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context'

// export default function SignInScreen() {
//   const { signIn, setActive, isLoaded } = useSignIn()
//   const router = useRouter()

//   const [emailAddress, setEmailAddress] = useState('')
//   const [password, setPassword] = useState('')
//   const [isLoading, setIsLoading] = useState(false)

//   // Handle the submission of the sign-in form
//   const onSignInPress = async () => {
//     if (!isLoaded) return
//     if (!emailAddress || !password) {
//       Alert.alert('Missing Fields', 'Please fill in all fields')
//       return
//     }

//     setIsLoading(true)

//     // Start the sign-in process using the email and password provided
//     try {
//       const signInAttempt = await signIn.create({
//         identifier: emailAddress,
//         password,
//       })

//       // If sign-in process is complete, set the created session as active
//       // and redirect the user
//       if (signInAttempt.status === 'complete') {
//         await setActive({ session: signInAttempt.createdSessionId })
//         router.replace('/')
//       } else {
//         // If the status isn't complete, check why. User might need to
//         // complete further steps.
//         console.error(JSON.stringify(signInAttempt, null, 2))
//       }
//     } catch (err) {
//       // See https://clerk.com/docs/custom-flows/error-handling
//       // for more info on error handling
//       console.error(JSON.stringify(err, null, 2))
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <SafeAreaView className='flex-1 bg-[#1A1A2E]'>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         className='flex-1'
//       >
//         <View className='flex-1 px-6'>
//           {/* Header Section */}
//           <View className='flex-1 justify-center'>
//             {/* Logo/Branding */}
//             <View className='items-center mb-8'>
//               <LinearGradient
//                 colors={['#2C3EFA', '#FFD700']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 1 }}
//                 style={{
//                   width: 80,
//                   height: 80,
//                   borderRadius: 16,
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   marginBottom: 16,
//                 }}
//               >
//                 <Ionicons name='fitness' size={40} color='#FFD700' />
//               </LinearGradient>
//               <Text
//                 className='text-3xl font-bold mb-2'
//                 style={{ color: '#FFD700' }}
//               >
//                 FitTracker
//               </Text>
//               <Text
//                 className='text-lg text-center'
//                 style={{ color: '#E5E4E2' }}
//               >
//                 Track your fitness journey{`\n`} and reach your goals
//               </Text>
//             </View>

//             {/* Form Section */}
//             <View
//               className='rounded-2xl p-6 shadow-sm border mb-6'
//               style={{ backgroundColor: '#232946', borderColor: '#2C3EFA' }}
//             >
//               <Text
//                 className='text-2xl font-bold mb-6 text-center'
//                 style={{ color: '#FFD700' }}
//               >
//                 Welcome Back
//               </Text>
//               {/* Email Input */}
//               <View className='mb-4'>
//                 <Text
//                   className='text-sm font-medium mb-2'
//                   style={{ color: '#E5E4E2' }}
//                 >
//                   Email
//                 </Text>
//                 <View
//                   className='flex-row items-center p-2 rounded-xl px-4 py-4 border'
//                   style={{ backgroundColor: '#1A1A2E', borderColor: '#2C3EFA' }}
//                 >
//                   <Ionicons name='mail-outline' size={20} color='#FFD700' />
//                   <TextInput
//                     autoCapitalize='none'
//                     value={emailAddress}
//                     placeholder='Enter your email'
//                     onChangeText={setEmailAddress}
//                     placeholderTextColor='#BFC0C0'
//                     className='flex-1 ml-3'
//                     editable={!isLoading}
//                     style={{ color: '#FFD700' }}
//                   />
//                 </View>
//               </View>

//               {/* Password Input */}
//               <View className='mb-6'>
//                 <Text
//                   className='text-sm font-medium mb-2'
//                   style={{ color: '#E5E4E2' }}
//                 >
//                   Password
//                 </Text>
//                 <View
//                   className='flex-row items-center p-2 rounded-xl px-4 py-4 border'
//                   style={{ backgroundColor: '#1A1A2E', borderColor: '#2C3EFA' }}
//                 >
//                   <Ionicons
//                     name='lock-closed-outline'
//                     size={20}
//                     color='#FFD700'
//                   />
//                   <TextInput
//                     autoCapitalize='none'
//                     value={password}
//                     placeholder='Enter your password'
//                     onChangeText={setPassword}
//                     placeholderTextColor='#BFC0C0'
//                     className='flex-1 ml-3'
//                     editable={!isLoading}
//                     secureTextEntry={true}
//                     style={{ color: '#FFD700' }}
//                   />
//                 </View>
//               </View>
//             </View>

//             {/* Sign In Button */}
//             <TouchableOpacity
//               onPress={onSignInPress}
//               className={`rounded-xl py-4 shadow-sm mb-4 ${isLoading ? '' : ''}`}
//               activeOpacity={0.8}
//               style={{ backgroundColor: isLoading ? '#BFC0C0' : '#2C3EFA' }}
//             >
//               <View className='flex-row items-center justify-center'>
//                 {isLoading ? (
//                   <Ionicons name='refresh' size={20} color='#FFD700' />
//                 ) : (
//                   <Ionicons name='log-in-outline' size={20} color='#FFD700' />
//                 )}
//                 <Text
//                   className='font-semibold text-lg ml-2'
//                   style={{ color: '#FFD700' }}
//                 >
//                   {isLoading ? 'Signing in...' : 'Sign In'}
//                 </Text>
//               </View>
//             </TouchableOpacity>

//             {/* Divider */}
//             <View className='flex-row items-center my-4'>
//               <View
//                 className='flex-1 h-px'
//                 style={{ backgroundColor: '#2C3EFA' }}
//               />
//               <Text className='px-4 text-sm' style={{ color: '#E5E4E2' }}>
//                 Or
//               </Text>
//               <View
//                 className='flex-1 h-px'
//                 style={{ backgroundColor: '#2C3EFA' }}
//               />
//             </View>

//             {/* Google Sign In Button */}
//             <GoogleSignIn />
//             {/* Sign Up Link */}
//             <View className='flex-row items-center justify-center mt-4'>
//               <Text style={{ color: '#E5E4E2' }}>
//                 Don&apos;t have an account?
//               </Text>
//               <Link href='/sign-up' asChild>
//                 <TouchableOpacity>
//                   <Text className='font-semibold' style={{ color: '#FFD700' }}>
//                     Sign up
//                   </Text>
//                 </TouchableOpacity>
//               </Link>
//             </View>
//           </View>

//           {/* Footer Section */}
//           <View className='pb-6'>
//             <Text className='text-center text-sm' style={{ color: '#BFC0C0' }}>
//               Start your fitness journey today
//             </Text>
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   )
// }
