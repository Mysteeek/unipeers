import { EventSnippet } from "@/components/EventSnippet";
import { Seperator } from "@/components/ListSeperator";
import { db } from "@/config/firebase.config";
import { themeColors } from "@/utils/theme.utils";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

//Calculate Screen Width
const screenWidth = Dimensions.get("window").width;

export default function Index () {

  const [events,setEvents] = useState([]);     
 
  //fetch events from database
  useEffect(() => {
    const handleFetchData = async () => {
      const receivedData = [];
      const onSnap = await getDocs(collection(db, "events"));
      onSnap.docs.forEach(doc => receivedData.push({
        id: doc.id,
        data: doc.data()
      }));
      setEvents(receivedData);
    }

    handleFetchData()
  },[]);

  console.log(">>>",events)

  if (events.length > 0) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={{flex: 1}}>
          <FlatList
          data={events}
          ItemSeparatorComponent={() =>(<Seperator h={32}/>)}
          renderItem={({item}) => {
            return (
              <EventSnippet data={item}/>
            )
            }}
          keyExtractor={(item) => item.id}
        />
        </SafeAreaView>
      </SafeAreaProvider>
  )
    
  } else {
      return (
        <SafeAreaProvider>
          <SafeAreaView style={styles.emptyWrapper}>
            <ActivityIndicator size="large" color={themeColors.darkGreen} />
          </SafeAreaView>
        </SafeAreaProvider>
  )
  }
}

const styles = StyleSheet.create({
  emptyWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
})