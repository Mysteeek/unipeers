import { Seperator } from "@/components/ListSeperator";
import { UserEventSnippet } from "@/components/userEventSnippet";
import { db } from "@/config/firebase.config";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

//24 is used for padding, 16 is used for gap, 4 is meant for unaccounted spaces
const screenWidth = Dimensions.get("window").width - 24 - 16 - 4

export default function Profile () {
  let user = "anonymous"
  const [userEvents,setUserEvents] = useState([]);

  useEffect(() => {
    const handleFetchUserEvents = async () => {
      const reData = []; //compile fetched data here

      const q = query(
        collection(db, "events"),
        where("createdBy","==",user),
        orderBy()
      );
      
      onSnapshot(q, (onSnap) => {
        onSnap.docs.forEach(doc => reData.push({
          id: doc.id,
          data: doc.data()
        }));
        setUserEvents(reData);
      })
    }
    handleFetchUserEvents()
  },[user]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{paddingHorizontal: 12}} className="flex gap-6">
        {/* header section */}
        <View className="flex items-center ">
          <Image
          style={{width: 86, height: 86}}
          source={require("../../assets/images/user.png")}
          alt="demo user profile photo"
          />
          <Text className="font-bold">Ademola Suleiman</Text>
          <Text className="text-stone tracking-widest">@adesule</Text>

        {/* profile actions */}
        <View className="flex flex-row items-center gap-6 mt-3">
          <Link href="/" className="px-3 py-2 rounded-md bg-teal-700">
            <View className="flex flex-row items-center gap-3">
              <FontAwesome name="pencil-square-o" size={24} color="white" />
              <Text className="text-ig font-semibold text-white">Update Profile</Text>
            </View>
          </Link>

          <Pressable className="flex flex-row items-center px-3 py-2 rounded-md bg-red-700 gap-3">
          <MaterialIcons name="logout" size={24} color="white" />
          <Text className="text-ig font-semibold text-white">Log Out</Text>
          </Pressable>
        </View>
        </View>
        
        {/* body section */}
        <View className="flex gap-3 border border-stone-200 rounded-md p-4"> 
          <View className="flex flex-row justify-between">
            <Text className="text-ig text-stone-600 track-wider">Account email</Text>
            <Text className="">ademola_sule@gmail.com</Text>
          </View>

          <View className="flex flex-row justify-between">
            <Text className="text-ig text-stone-600 track-wider">Department</Text>
            <Text className="">Computer Engineering</Text>
          </View>

          <View className="flex flex-row justify-between">
            <Text className="text-ig text-stone-600 track-wider">Faculty</Text>
            <Text className="">Engineering</Text>
          </View>

          <View className="flex flex-row justify-between">
            <Text className="text-ig text-stone-600 track-wider">Account email</Text>
            <Text className="">ademola_sule@gmail.com</Text>
          </View>

           <View className="flex flex-row justify-between">
            <Text className="text-ig text-stone-600 track-wider">Institution</Text>
            <Text className="">Ahmadu Bello University, Zaria</Text>
          </View>
        </View>

        {/* show events by the user */}
        <View>
          <Text style={{fontSize: 24, marginBottom: 16}}>My Events</Text>
            <FlatList
                data={userEvents}
                renderItem={({ item }) => {
                  return (
                    <UserEventSnippet boxWidth={screenWidth/3} eventData={item}/>
                  )
                }}
                horizontal={true}
                showHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                ItemSeperatorComponent={() => <Seperator h={0} w={8}/>}
                />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}