import { useSSO } from '@clerk/clerk-expo'
import { OAuthStrategy } from '@clerk/types'
import { Ionicons } from '@expo/vector-icons'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import { useCallback, useEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

interface SocialProviderProps {
  strategy: OAuthStrategy
  iconName: keyof typeof Ionicons.glyphMap
  iconColor: string
  title: string
}

export function SocialProvider({
  strategy,
  iconName,
  iconColor,
  title,
}: SocialProviderProps) {
  useWarmUpBrowser()
  const { startSSOFlow } = useSSO()

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        redirectUrl: AuthSession.makeRedirectUri(),
      })
      if (createdSessionId) {
        setActive!({ session: createdSessionId })
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }, [strategy, startSSOFlow])

  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        className='bg-white rounded-xl py-4 shadow-sm mt-4'
      >
        <View className='flex-row items-center justify-center'>
          <Ionicons name={iconName} size={20} color={iconColor} />
          <Text className='text-gray-900 font-semibold ml-3 text-lg'>
            Continue with {title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
