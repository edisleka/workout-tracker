import { useAuth } from '@clerk/clerk-expo'
import { Stack } from 'expo-router'
import { ActivityIndicator, View } from 'react-native'

export default function AppLayout() {
  const { isSignedIn, isLoaded, userId, sessionId, getToken } = useAuth()

  console.log('isSignedIn ->', isSignedIn)
  console.log('isLoaded ->', isLoaded)
  console.log('userId ->', userId)
  console.log('sessionId ->', sessionId)
  console.log('getToken ->', getToken())

  if (!isLoaded) {
    return (
      <View className='flex-1 items-center justify-center'>
        <ActivityIndicator size='large' color='green' />
      </View>
    )
  }

  return (
    <Stack>
      <Stack.Protected guard={!!isSignedIn}>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name='sign-in' options={{ headerShown: false }} />
        <Stack.Screen name='sign-up' options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  )
}
