import { db } from "@/config/firebase.config";
import { themeColors } from "@/utils/theme.utils";
import Feather from '@expo/vector-icons/Feather';
import { Link } from 'expo-router';
import { deleteDoc, doc, } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, TouchableOpacity, View } from "react-native";

export function UserEventSnippet({eventData,boxWidth }) {
    const {isLoading,setIsLoading } = useState(false);
    const {data, setData } = useState(undefined);

    useEffect(() => {
        setData(eventData)
    },[eventData]);

    const handleDeleteEvent = async () => {
        setIsLoading(true);

        try {
            await deleteDoc(doc(db, "events",eventData.id));
            Alert.alert(
                "Success",
                "Event Deleted!",
                [{ text: "Okay"}]
            );
            setIsLoading(false);
            setData(undefined);
        } catch (error) {
            Alert.alert(
                "Error",
                "Action could not be completed",
                [{ text: "Dismiss"}]
            );
            console.log("Error",error);
            setIsLoading(False);
        }
    }

    if (data !== undefined) {
            return(
                <View style={{
                        position: "relative",
                        width: boxWidth,
                        height: 160,
                        borderRadius: 8,
                    }}>

                    <image
                    style={{
                        width: boxWidth,
                        height: 160,
                        borderRadius: 8,
                        resizeMode: "cover"
                        }}
                        source={{url: data.data.imgUrl }}/>
                        
                        <View style={styles.ctaBlock}>
                            <TouchableOpacity style={styles.ctaBorder}>
                                onPress={handleDeleteEvent}
                                {isLoading
                                ?
                                <ActivityIndicator size="small" color="black"/>
                                :
                                <Feather name="trash-2" size={24} color="black" />}
                            </TouchableOpacity>
                            <Link href="/update-events">
                                <View style={styles.ctaBorder}>
                                    
                                    <Feather name="edit" size={24} color="black" />
                                </View>
                            </Link>
                        </View>
                </View>
                )
            }
    }


const styles = StyleSheet.create({

    ctaBlock: {
        position: "absolute",
        bottom: 4,
        right: 4,
        display: "flex",
        flexDirection: "row",
        gap: 12

    },
    ctaBorder: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 42,
        width: 42,
        borderRadius: 50,
        backgroundColor: themeColors.lightGreen
    },
});
