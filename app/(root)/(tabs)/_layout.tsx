        import { Platform } from 'react-native';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Ionicons } from "@expo/vector-icons"
import { useUserStore } from "@/store/userStore"
import { Tabs } from "expo-router"

 function AndroidTabs() {

  const isAdmin = useUserStore((state)=>state.isAdmin)

  return (
    <Tabs screenOptions={{ headerShown: false}}>
      <Tabs.Screen name = "index" options={{
        title: "Home",
        tabBarIcon:({color, size})=>(
          <Ionicons name="home" color={color} size={size} />
        )
      }}/>
      <Tabs.Screen name = "search" options={{
        title: "Search",
        tabBarIcon:({color, size})=>(
          <Ionicons name="search" color={color} size={size} />
        )
      }}/>
      <Tabs.Screen name = "create" options={{
        title: "Add",
        href: isAdmin ? undefined : null,
        tabBarIcon:({color, size})=>(
          <Ionicons name="add-circle" color={color} size={size} />
        )
      }}/>

<Tabs.Screen name = "saved" options={{
        title: "Saved",
        tabBarIcon:({color, size})=>(
          <Ionicons name="heart" color={color} size={size} />
        )
      }}/>      <Tabs.Screen name = "profile" options={{
        title: "Profile",
        tabBarIcon:({color, size})=>(
          <Ionicons name="person" color={color} size={size} />
        )
      }}/>
    </Tabs>
  );
}

function IOSTabs() {

  const isAdmin = useUserStore((state)=>state,isAdmin)

  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf="house.fill" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="search">
        <Icon sf="magnifyingglass"  />
        <Label>Search</Label>
      </NativeTabs.Trigger>

        {/* create property */}

        {
          isAdmin && (
            <NativeTabs.Trigger name="create">
              <Icon sf="plus.circle.fill"/>
              <Label>Add Property</Label>
              </NativeTabs.Trigger>
          )
        }

      <NativeTabs.Trigger name="saved">
        <Icon sf="heart.fill"  />
        <Label>Saved</Label>
      </NativeTabs.Trigger>


      <NativeTabs.Trigger name="profile">
        <Icon sf="person.fill"  />
        <Label>Profile</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

export default function TabsLayout(){
  return Platform.OS === 'ios' ? <IOSTabs /> : <AndroidTabs />;

}
