import { EventSnippet } from "@/components/EventSnippet";
import { Seperator } from "@/components/ListSeperator";
import { db } from "@/config/firebase.config";
import { themeColors } from "@/utils/theme.utils";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// Calculate Screen Width
const screenWidth = Dimensions.get("window").width;

export default function Index() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch events from Firestore
  useEffect(() => {
    const handleFetchData = async () => {
      try {
        const onSnap = await getDocs(collection(db, "events"));
        const receivedData = onSnap.docs.map((doc) => ({
          id: doc.id, ...doc.data(),
        }));
        setEvents(receivedData);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    handleFetchData();
  }, []);

  if (loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.emptyWrapper}>
          <ActivityIndicator size="large" color={themeColors.darkGreen} />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={events}
          ItemSeparatorComponent={() => <Seperator h={32} w={0} />}
          renderItem={({ item }) => <EventSnippet data={item} />}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  emptyWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});