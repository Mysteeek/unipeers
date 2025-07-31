import { Text,View,StyleSheet } from "react-native";
import { customStyles } from "@/components/custom-styles";

export default function Index() {
  return (
    <View style={customStyles.main}>
      <View>
        <Text style = {{
          width: "100%",
          minHeight: 160, 
          fontWeight: "bold", 
          color: "black", 
          fontSize:24
          }}>React Native Training</Text>
        </View>

        <View style ={{
          width: "100%",
          minHeight: 160,
          backgroundColor: "black"
        }}>
          <Text style={styles.text}>Course Banner</Text>
          <Image
            width: "100%"
           width: {140}
           height: {280}
           style: {{
          
          }}
          source={{uri: "https://learn.earlycode.net/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Feaco-89ea2.appspot.com%2Fo%2Fcourses%252FKp5SLBxj9jDKtlE7DLBQ%252Fandroid_and_ios_development.png%3Falt%3Dmedia%26token%3D23d28bee-9d9f-4935-8665-b3e9e8257c32&w=828&q=75"}}
          alt="course photo"/>
        </View>

        <View style ={{
          width: "100%",
          minHeight: 160,
          backgroundColor: "orange"
          marginVertical: 16,
          borderRadius: 12,
        }}>
          <Text style={styles.text}>About Me</Text>

        <View style ={{
          width: "100%",
          minHeight: 160,
          backgroundColor: "purple",
          marginVertical: 16,
          borderRadius: 12,
        }}>
          <Text style={styles.text}>About Early Code</Text>
          <Image 
          source={require("../assets/images/react-logo.png")}
          alt="logo"/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  text:{
    fontSize: 16,
    color: "white"
  }
})