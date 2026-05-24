import { View, Text } from 'react-native'
import { useUser } from "@clerk/expo"
import { FlatList, Image, TouchableOpacity, ActivityIndicator } from "react-native"
import { supabase } from "@/lib/supabase";
import { useRouter, useFocusEffect } from "expo-router"
import { useState, useCallback } from "react"
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from "@expo/vector-icons"
import FeaturedCard from "@/components/FeaturedCard"
import PropertyCard from "@/components/PropertyCard"
export default function HomeScreen() {


  const { user } = useUser()
  const router = useRouter()

  const [featured, setFeatured] = useState<Property[]>([])
  const [recommended, setRecommended] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  console.log(featured, recommended,)

  const fetchProperties = async ()=>{
    setLoading(true)

    const {data: featuredData} = await supabase.from("properties").select("*").eq("is_featured", true).order("created_at", { ascending: false})

    const {data: recommendedData} = await supabase.from("properties").select("*").eq("is_featured", true).order("created_at", { ascending: false})

    setFeatured(featuredData ?? [])
    setRecommended(recommendedData ?? [])
    setLoading(false)
     
  }

  useFocusEffect(
    useCallback(
      () => {
        fetchProperties()
      },
      []
    )
    
  )

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <FlatList data={recommended} keyExtractor={(item)=> item.id}
        contentContainerStyle={{ paddingBottom: 100}}
        showVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* HEADER */}

            <View className="flex-row items-center justify-between px-5 pt-4 pb-5">
              <Image source={require("../../../assets/images/kribb.png")}
              style={{width:90, height:36}}
              resizeMode="contain"
              />

              <View className="items-end">
                <Text>Good Morning 👋🏾</Text>
                <Text className="text-gray-900 text-base font-bold">
                  {user?.firstName ?? "User"}
                </Text>
              </View>
            </View>

            {/* Search Bar */}
            <TouchableOpacity className={"mx-5 mb-6 flex-row items-center bg-white rounded-2xl px-4 py-3 gap-3"} onPress={()=>router.push("/(root)/(tabs)/search")}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1},
                shadowOpacity: 0.06,
                shadowRadius: 6,
                elevation: 2
              }}
              >
              <Ionicons name="search-outline" size={18} color="#9ca3af" />
              <Text className="text-gray-400 text-sm flex-1">
                Search properties, cities...
              </Text>

              <TouchableOpacity onPress={()=>router.push("/(root)/(tabs)/search?openFilters=true")}
                className="w-8 h-8 bg-blue-500 rounded-xl items-center justify-center"
                >
                <Ionicons name="options-outline" size={15} color="white"></Ionicons>
              </TouchableOpacity>
            </TouchableOpacity>

            {/* Featured Section */}

            <View className="mb-6">
              <Text className="text-gray-900 text-lg font-bold px-5 mb-4">
                Featured
              </Text>
{
  loading ? (
    <ActivityIndicator size="small" color="#2563eb" style={{ paddingVertical: 10 }} />
  ) : (
    <FlatList
      data={featured}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <FeaturedCard property={item} />}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20 }}
    />
  )
}
        
            </View>

            {/* Recommend Header */}

            <Text className="text-gray-900 text-lg font-bold px-5 mb-4">
              Recommended
            </Text>
          </View>
        }

        renderItem ={({item})=>(
          <View className="px-5">
            <PropertyCard property={item} />
          </View>
        )}

        ListEmptyComponent={
          !loading?(<View className="items-center py-10">
            <Text className="text-gray-400">No properties found</Text>
          </View>):null
        }
        />
    </SafeAreaView>
  )
}