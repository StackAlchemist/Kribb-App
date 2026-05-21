import { useAuth } from '@clerk/expo';
import { router } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
export default function Profile() {

  const { signOut } = useAuth();

  const handleSignOut = async () =>{
    try{
      await signOut()
      router.replace("/sign-in")
    } catch (error){
      console.error("Error signing out:", error)
    }
  }
  return (
    <SafeAreaView>
      <Text>profile</Text>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>
        SignOut
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}