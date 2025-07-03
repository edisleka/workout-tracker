import { useAuth } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ProfileScreen() {
  const { signOut } = useAuth()

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => {
          signOut()
        },
      },
    ])
  }

  return (
    <SafeAreaView className='flex-1 bg-purple-500'>
      <Text className='text-white text-2xl font-bold'>Profile screen</Text>

      <View className='px-6 mb-8'>
        <TouchableOpacity
          className='bg-red-500 rounded-2xl p-4 shadow-md'
          activeOpacity={0.8}
          onPress={handleSignOut}
        >
          <View className='flex-row items-center justify-center'>
            <Ionicons name='log-out-outline' size={20} color='white' />
            <Text className='text-white text-lg font-semibold ml-2'>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
